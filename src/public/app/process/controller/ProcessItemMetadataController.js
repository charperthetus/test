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
    index: 0,

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
        //console.log('open item');
        EventHub.fireEvent('open', {uri: this.store.getAt(this.index).data.uri, type: 'Item', label: this.store.getAt(this.index).data.label});
    },

    onUriChanged: function(store, index) {
        this.store = store;
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.index = index;
        this.handleRecordDataRequestSuccess();
    },

    buildItemDataFetchUrl: function (uri) {
        return SavannaConfig.itemViewUrl + encodeURI(uri);
        //return SavannaConfig.mockItemViewUrl + encodeURI(uri); // mock data
    },

    handleRecordDataRequestSuccess: function() {
        this.storeHelper.init(this.store);
        this.getItemTitle().setText(this.store.getAt(this.index).data.label);//this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Type').data.values[0].label);

        if (this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0)) {
            this.getItemDescription().setValue(this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
        }

//        this.getItemInstanceTitle().setValue(this.store.getAt(this.index).data.label);
        this.getItemQualities().storeHelper = this.storeHelper;
        this.getItemQualities().store = this.store.getAt(this.index).propertyGroupsStore.getById('Properties').valuesStore;
        this.getItemQualities().fireEvent('EditQualities:StoreSet');

        if (this.store.getAt(this.index).propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.getAt(0)) {
            var imageURI = this.store.getAt(this.index).propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.getAt(0).data.uri;
            this.getItemPrimeImage().setSrc( SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageURI) + '/original/');
        }

        if(!this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role')) {
            this.storeHelper.addGroupItemInStore('Related Items'
                , 'has role'
                , 'lib%2EExtendedRelationOntology%3Ahas_role%2FModelPredicate'
                , this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore);
        }

        if(!this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity')) {
            this.storeHelper.addGroupItemInStore('Annotations'
                , 'Quantity'
                , 'thetus%2EInformationEntityOntology%3Aquantitative_property_measurement%2FModelProperty'
                , this.store.getAt(indexpropertyGroupsStore.getById('Annotations').valuesStore));
        } else if (this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0)){
            var qunit = this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0).data.value.split('_');
            var quantity = qunit[0];
            var unit = null;
            if(2 === qunit.length) {
                unit = qunit[1];
            }
            this.getQuantityValue().setValue(quantity);
            this.getQuantityUnit().setValue(unit);
        }

        this.getView().fireEvent('itemReadyForDisplay');
    },

    onSaveChanges: function() {
        // TODO: save the existing set of changes, if any
        console.log('ProcessItemMetadataController saveChanges');
//        if(this.store && this.store.getAt(this.index)) {
//            this.store.getAt(this.index).setDirty();
//            this.store.sync();
//        }
        this.clearValues();
    },

    itemTitleBlur: function(e) {
        if(this.store.getAt(this.index).data.label !== e.getValue()) {
            this.store.getAt(this.index).data.label = e.getValue();
            this.store.getAt(this.index).setDirty();
        }
    },

    itemDescriptionBlur: function(e) {
        var value = {label: "Description", comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore("Description", value, this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Description'));
    },

    instanceTitleBlur: function(e) {
        var value = {label: e.getValue(), comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore(null, value, this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Label'));
        this.store.getAt(this.index).data.label = e.getValue();
    },

    addingRole: function(tagName, tagData, aView) {
        this.storeHelper.addBotLevItemInStore(tagName, tagData, this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role'));
    },

    removingRole: function(tagName, aView) {
        this.storeHelper.removeBotLevItemInStore(tagName, this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role'));
    },

    onRoleChooserButtonSelect:function() {
        var valNameArray = [];

        Ext.each(this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.data.items, function(value) {
            valNameArray.push(value.data.label);
        });

        var rChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore,
            valNameArray: valNameArray,
            uri: 'lib%252EExtendedRelationOntology%253Ahas_role%252FModelPredicate',
            storeHelper: this.storeHelper
        });

        rChooser.on('close', this.closedRPicker, this);
    },

    closedRPicker: function(view) {
        if (view.updatedStore) {
            Ext.Array.erase(this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values, 0, this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values.length);
            this.getRoleAutoCompleteBox().clearTags();

            Ext.each(this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.data.items, function(value) {
                this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values.push(value.data);
                this.getRoleAutoCompleteBox().addTag(value.data.label);
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
        this.storeHelper.updateBotLevItemInStore("Quantity", data, this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity'));
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