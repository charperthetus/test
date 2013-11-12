/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 4:36 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.controller.ProcessItemMetadataController', {
    extend: 'Deft.mvc.ViewController',

    store: null,
    storeHelper: null,
    itemName: null,

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    control: {
        view: {
            processItemUriChanged: 'onUriChanged',
            savechanges: 'onSaveChanges'
        },
        openBtn: {
            click: 'onOpenBtnClick'
        },

        itemTitle: {
            blur: 'itemTitleBlur'
        },
        itemDescription: {
            blur: 'itemDescriptionBlur'
        },
        itemPrimeImage: true,
        quantityValue:  {
            blur: 'quantityValueChanger'
        },
        quantityUnit: {
            select: 'quantityValueChanger'
        },
        itemInstanceTitle: {
            blur: 'instanceTitleBlur'
        },
        roleAutoCompleteBox: {
            'AutoComplete:ItemSelected': 'addingRole',
            'AutoComplete:TagRemoved': 'removingRole'
        },
        roleChooserButton: {
            click: 'onRoleChooserButtonSelect'
        },

        itemQualities: true
    },

    onOpenBtnClick: function() {
        EventHub.fireEvent('open', {uri: this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Type').data.values[0].value, type: 'Item', label: this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Type').data.values[0].label});
    },

    onUriChanged: function(processUri, itemName) {
        this.itemName = itemName;
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.store.getProxy().url = this.buildItemDataFetchUrl(processUri);

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    buildItemDataFetchUrl: function (uri) {
        return SavannaConfig.itemViewUrl + encodeURI(uri);
        //return SavannaConfig.mockItemViewUrl + encodeURI(uri); // mock data
    },

    handleRecordDataRequestSuccess: function(record, operation, success) {
        if(success) {
            this.storeHelper.init(this.store);
            this.getItemTitle().setText(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Type').data.values[0].label);

            if (this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0)) {
                this.getItemDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
            }

            this.getItemInstanceTitle().setValue(this.store.getAt(0).data.label);
            this.getItemQualities().storeHelper = this.storeHelper;
            this.getItemQualities().store = record[0].propertyGroupsStore.getById('Properties').valuesStore;
            this.getItemQualities().fireEvent('EditQualities:StoreSet');

            if (this.store.getAt(0).propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.getAt(0)) {
                var imageURI = record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.getAt(0).data.uri;
                this.getItemPrimeImage().setSrc( SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageURI) + '/original/');
            }

            if(!this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role')) {
                this.storeHelper.addGroupItemInStore('Related Items'
                    , 'has role'
                    , 'lib%2EExtendedRelationOntology%3Ahas_role%2FModelPredicate'
                    , this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore);
            }

            if(!this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity')) {
                this.storeHelper.addGroupItemInStore('Annotations'
                    , 'Quantity'
                    , 'thetus%2EInformationEntityOntology%3Aquantitative_property_measurement%2FModelProperty'
                    , this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore);
            } else {
                var qunit = this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0).data.value.split('_');
                var quantity = qunit[0];
                var unit = null;
                if(2 === qunit.length) {
                    unit = qunit[1];
                }
                this.getQuantityValue().setValue(quantity);
                this.getQuantityUnit().setValue(unit);
            }

            this.getView().fireEvent('itemReadyForDisplay');
        }
    },

    onSaveChanges: function() {
        if(this.store && this.store.getAt(0)) {
            this.store.getAt(0).setDirty();
            this.store.sync();
        }
        this.clearValues();
    },

    itemTitleBlur: function(e) {
        if(this.store.getAt(0).data.label !== e.getValue()) {
            this.store.getAt(0).data.label = e.getValue();
            this.store.getAt(0).setDirty();
        }
    },

    itemDescriptionBlur: function(e) {
        var value = {label: "Description", comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore(null, value, this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description'));
    },

    instanceTitleBlur: function(e) {
        var value = {label: e.getValue(), comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore(null, value, this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Label'));
        this.store.getAt(0).data.label = e.getValue();
    },

    addingRole: function(tagName, tagData, aView) {
        this.storeHelper.addBotLevItemInStore(tagName, tagData, this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role'));
    },

    removingRole: function(tagName, aView) {
        this.storeHelper.removeBotLevItemInStore(tagName, this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role'));
    },

    onRoleChooserButtonSelect:function() {
        var valNameArray = [];
        var disabledNameArray = [];

        Ext.each(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.data.items, function(value) {
            valNameArray.push(value.data.label);

            if (!value.data.editable) {
                disabledNameArray.push(value.data.label);
            }
        });

        var rChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore,
            valNameArray: valNameArray,
            disabledItemsArray: disabledNameArray,
            uri: 'lib%252EExtendedRelationOntology%253Ahas_role%252FModelPredicate',
            storeHelper: this.storeHelper
        });

        rChooser.on('close', this.closedRPicker, this);
    },

    closedRPicker: function(view) {
        if (view.updatedStore) {
            Ext.Array.erase(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values, 0, this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values.length);
            this.getRoleAutoCompleteBox().clearTags();

            Ext.each(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.data.items, function(value) {
                this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values.push(value.data);
                this.getRoleAutoCompleteBox().addTag(value.data.label, value.data.editable);
            }, this);
        }
    },

    quantityValueChanger: function() {
        var quantity = this.getQuantityValue().getValue();
        var unit = this.getQuantityUnit().displayValue;
        this.setQuantityValue(quantity + '_' + unit );
    },

    setQuantityValue: function(value) {
        var data = {label: "Quantity", comment: null, value: value};
        this.storeHelper.updateBotLevItemInStore("Quantity", data, this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity'));
    },

    clearValues: function() {
        this.getItemTitle().setText('');
        this.getItemDescription().setValue('');
        //this.getItemPrimeImage().setValue('');
        this.getQuantityValue().setValue('');
        this.getQuantityUnit().setValue('');
        this.getItemInstanceTitle().setValue('');
        this.getItemQualities().removeAll();
        this.getRoleAutoCompleteBox().clearTags();
    }
});