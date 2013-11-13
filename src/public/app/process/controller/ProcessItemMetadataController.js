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
            clearPanel: 'onClearPanel'
        },
        openBtn: {
            click: 'onOpenBtnClick'
        },

        itemTitle: true,
        itemDescription: true,
        itemPrimeImage: true,
        instancePanel: true,
        itemInstanceTitle: {
            blur: 'instanceTitleBlur'
        },
        itemInstanceDescription: {
            blur: 'itemDescriptionBlur'
        },
        roleAutoCompleteBox: {
            'AutoComplete:ItemSelected': 'addingRole',
            'AutoComplete:TagRemoved': 'removingRole'
        },
        roleChooserButton: {
            click: 'onRoleChooserButtonSelect'
        },
        quantityValue:  {
            blur: 'quantityValueChanger'
        },
        quantityUnit: {
            select: 'quantityValueChanger'
        },
        itemQualities: true
    },

    onOpenBtnClick: function() {
        EventHub.fireEvent('open', {uri: this.store.getAt(this.index).data.classUri, type: 'Item', label: this.store.getAt(this.index).data.className});
    },

    onUnlockBtnClick: function() {
        this.getUnlockBtn().setVisible(false);
        this.getInstancePanel().setDisabled(false);
        this.getItemQualities().setDisabled(false);
    },

    onUriChanged: function(store, index) {
        this.store = store;
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.index = index;
        this.handleData();
    },

    handleData: function() {
        this.storeHelper.init(this.store, this.index);
        this.getItemTitle().setText(this.store.getAt(this.index).data.className);
        this.getItemDescription().setValue(this.store.getAt(this.index).data.classDescription)

        if (this.store.getAt(this.index).data.classPrimaryImage) {
            var imageURI = this.store.getAt(this.index).data.classPrimaryImage;
            this.getItemPrimeImage().setSrc( SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageURI) + '/original/');
        }

        this.getItemInstanceTitle().setValue(this.store.getAt(this.index).data.label);

        if (this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0)) {
            this.getItemInstanceDescription().setValue(this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
        }

        this.getItemQualities().storeHelper = this.storeHelper;
        this.getItemQualities().store = this.store.getAt(this.index).propertyGroupsStore.getById('Properties').valuesStore;
        this.getItemQualities().fireEvent('EditQualities:StoreSet');

        if(!this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role')) {
            this.storeHelper.addGroupItemInStore('Related Items'
                , 'has role'
                , 'lib%2EExtendedRelationOntology%3Ahas_role%2FModelPredicate'
                , this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore);
        }
        else if (this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.getAt(0)) {
            Ext.each(this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values, function(value) {
                this.getRoleAutoCompleteBox().addTag(value.label, value.editable);
            }, this);
        }

        if(!this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity')) {
            this.storeHelper.addGroupItemInStore('Annotations'
                , 'Quantity'
                , 'thetus%2EInformationEntityOntology%3Aquantitative_property_measurement%2FModelProperty'
                , this.store.getAt(indexpropertyGroupsStore.getById('Annotations').valuesStore));
        }
        else if (this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0)){
            var qunit = this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0).data.value.split('_');
            var quantity = qunit[0];
            var unit = null;
            if(2 === qunit.length) {
                unit = qunit[1];
            }
            this.getQuantityValue().setValue(quantity);
            this.getQuantityUnit().setValue(unit);
        }

        this.getView().fireEvent('readyForDisplay');
    },

    onClearPanel: function() {
        this.clearValues();
    },

    itemDescriptionBlur: function(e) {
        var value = {label: "Description", comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore(null, value, this.store.getAt(this.index).propertyGroupsStore.getById('Header').valuesStore.getById('Description'));
    },

    instanceTitleBlur: function(e) {
        this.store.getAt(this.index).data.label = e.getValue();
        var diagram = this.getView().up('process_component').down('#canvas').diagram;
        var nodeData = this.getView().up('process_component').getController().store.getAt(0).data.nodeDataArray[this.index]
        nodeData.label = e.getValue();
        diagram.findNodeForData(nodeData).updateTargetBindings('label');
    },

    addingRole: function(tagName, tagData, aView) {
        this.storeHelper.addBotLevItemInStore(tagName, tagData, this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role'));
    },

    removingRole: function(tagName, aView) {
        this.storeHelper.removeBotLevItemInStore(tagName, this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role'));
    },

    onRoleChooserButtonSelect:function() {
        var valNameArray = [];
        var disabledNameArray = [];

        Ext.each(this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.data.items, function(value) {
            valNameArray.push(value.data.label);

            if (!value.data.editable) {
                disabledNameArray.push(value.data.label);
            }
        });

        var rChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.store.getAt(this.index).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore,
            valNameArray: valNameArray,
            disabledItemsArray: disabledNameArray,
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
        this.storeHelper.updateBotLevItemInStore("Quantity", data, this.store.getAt(this.index).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity'));
    },

    clearValues: function() {
        this.getItemTitle().setText('');
        this.getItemDescription().setValue('');
        this.getItemInstanceTitle().setValue('');
        this.getItemInstanceDescription().setValue('');
        this.getItemPrimeImage().setSrc(null);
        this.getQuantityValue().setValue('');
        this.getQuantityUnit().setValue('');
        this.getItemQualities().removeAll();
        this.getRoleAutoCompleteBox().clearTags();
    }
});