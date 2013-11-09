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
        roleAutoCompleteBox: true,
        roleChooserButton: {
            click: 'onRoleChooserButtonSelect'
        },

//        itemInstanceDescription: true,
        itemQualities: true

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
        return SavannaConfig.itemViewUrl + uri;
        //return SavannaConfig.mockItemViewUrl + encodeURI(uri); // mock data
    },

    handleRecordDataRequestSuccess: function(record, operation, success) {
        if(success) {
            this.storeHelper.init(this.store);
            this.getItemTitle().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Intended Use').valuesStore.getAt(0).data.inheritedFrom.label);

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

            this.getView().up('process_metadata').fireEvent('itemReadyForDisplay');
        }
    },

    onSaveChanges: function() {
        console.log('ProcessItemMetadataController saveChanges');
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
        if( this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0)) {
            if(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value !== e.getValue()) {
                this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value = e.getValue();

                for (var i = 0; i < this.store.getAt(0).data.propertyGroups.length; i++) {
                    if ('Header' === this.store.getAt(0).data.propertyGroups[i].label) {
                        for (var j = 0; j < this.store.getAt(0).data.propertyGroups[i].values.length; j++) {
                            if ('Description' === this.store.getAt(0).data.propertyGroups[i].values[j].label) {
                                this.store.getAt(0).data.propertyGroups[i].values[j].values[0].value = e.getValue();
                                break;
                            }
                        }

                        break;
                    }
                }
                this.store.getAt(0).setDirty();
            }
        } else {

            this.storeHelper.addBotLevItemInStore("Description", {uri: e.getValue()}, this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description'));
            this.store.getAt(0).setDirty();
        }
    },

    instanceTitleBlur: function(e) {
        if( this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Label').valuesStore.getAt(0)) {
            if(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Label').valuesStore.getAt(0).data.value !== e.getValue()) {
                this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Label').valuesStore.getAt(0).data.value = e.getValue();

                for (var i = 0; i < this.store.getAt(0).data.propertyGroups.length; i++) {
                    if ('Header' === this.store.getAt(0).data.propertyGroups[i].label) {
                        for (var j = 0; j < this.store.getAt(0).data.propertyGroups[i].values.length; j++) {
                            if ('Label' === this.store.getAt(0).data.propertyGroups[i].values[j].label) {
                                this.store.getAt(0).data.propertyGroups[i].values[j].values[0].value = e.getValue();
                                this.store.getAt(0).data.propertyGroups[i].values[j].values[0].label = e.getValue();
                                break;
                            }
                        }

                        break;
                    }
                }
                this.store.getAt(0).setDirty();
            }
        } else {
            this.storeHelper.addBotLevItemInStore(e.getValue(), null, this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Label'));
            this.store.getAt(0).setDirty();
        }

        this.store.getAt(0).data.label = e.getValue();
    },

    quantityValueChanger: function() {
        var quantity = this.getQuantityValue().getValue().toString();
        var unit = this.getQuantityUnit().getValue().toString();
        this.setQuantityValue(quantity + '_' + unit );
    },

    setQuantityValue: function(value) {
        if( this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0)) {
            if(this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0).data.value !== value) {
                this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity').valuesStore.getAt(0).data.value = value;

                for (var i = 0; i < this.store.getAt(0).data.propertyGroups.length; i++) {
                    if ('Annotations' === this.store.getAt(0).data.propertyGroups[i].label) {
                        for (var j = 0; j < this.store.getAt(0).data.propertyGroups[i].values.length; j++) {
                            if ( 'Quantity' === this.store.getAt(0).data.propertyGroups[i].values[j].label) {
                                this.store.getAt(0).data.propertyGroups[i].values[j].values[0].value = value;
                                break;
                            }
                        }

                        break;
                    }
                }
                this.store.getAt(0).setDirty();
            }
        } else {

            this.storeHelper.addBotLevItemInStore("Quantity", {uri: value}, this.store.getAt(0).propertyGroupsStore.getById('Annotations').valuesStore.getById('Quantity'));
            this.store.getAt(0).setDirty();
        }

    },


    clearValues: function() {
        this.getItemTitle().setValue('');
        this.getItemDescription().setValue('');
        //this.getItemPrimeImage().setValue('');
        this.getQuantityValue().setValue('');
        this.getQuantityUnit().setValue('');
        this.getItemInstanceTitle().setValue('');
        this.getItemQualities().removeAll();
    },

    onRoleChooserButtonSelect:function() {
        var valNameArray = [];

        Ext.each(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.data.items, function(value) {
            valNameArray.push(value.data.label);
        });

        var vChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore,
            valNameArray: valNameArray,
            uri: 'lib%252EExtendedRelationOntology%253Ahas_role%252FModelPredicate',
            storeHelper: this.storeHelper
        });

        vChooser.on('close', this.closedVPicker, this);
    },

    closedVPicker: function(view) {
        if (view.updatedStore) {
            Ext.Array.erase(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values, 0, this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values.length);
            this.getRoleAutoCompleteBox().clearTags();

            Ext.each(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').valuesStore.data.items, function(value) {
                this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.getById('has role').data.values.push(value.data);
                this.getRoleAutoCompleteBox().addTag(value.data.label);
            }, this);

        }
    }




});