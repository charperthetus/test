/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:27 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.controller.MetadataViewController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.metadata.view.String',
        'Savanna.metadata.view.StringVerticalEdit',
        'Savanna.metadata.view.Classification',
        'Savanna.metadata.view.Title',
        'Savanna.metadata.view.Date',
        'Savanna.metadata.view.Uri',
        'Savanna.metadata.view.Integer',
        'Savanna.metadata.view.Boolean',
        'Savanna.metadata.view.Double',
        'Savanna.metadata.view.StringList',
        'Savanna.metadata.view.BooleanList',
        'Savanna.metadata.view.DateList',
        'Savanna.metadata.view.IntegerList',
        'Savanna.metadata.view.DoubleList',
        'Savanna.metadata.view.UriList'
    ],

    control: {
        metadata_edit_button: {
            click: 'handleEditMode'
        },
        metadata_save_button: {
            click: 'handleSave'
        },
        metadata_cancel_button: {
            click: 'handleCancel'
        },
        view: {
            create_metadata_fields: 'createMetadataFields',
            update_Uri: 'updateUri'
        }
    },

    store: null,

    handleEditMode: function (button) {
        this.getMetadata_save_button().show();
        this.getMetadata_cancel_button().show();
        button.hide();
        this.getView().setEditMode(true);
    },

    handleCancel: function (button) {
        this.getMetadata_save_button().hide();
        button.hide();
        this.getMetadata_edit_button().show();
        this.getView().setEditMode(false);
    },

    handleSave: function (button) {
        button.hide();
        this.getMetadata_cancel_button().hide();
        this.getMetadata_edit_button().show();

        var me = this;
        var theStore = this.store;
        var  stuffChanged = false;
        Ext.Array.each(me.getView().down('#wrapperPanel').items.items, function(metadata) {
            var key = metadata.key;
            //var thing = theStore.data.get(key); // if this would work (we have an actual key set on the store data items) then we wouldn't need the loop below.
            Ext.Array.each(theStore.data.items, function(storeData) {
                if(storeData.get('key') == key) {
                    if(storeData.get('value') !== metadata.value || ( Ext.isArray(metadata.value) && !Ext.Array.equals(metadata.value, storeData.get('value'))  )) {
                        // classification must be handled separately
                        // the sync request will fail if the classification metadata is changed
                        if(key === 'classification') {
                            me.saveClassification(metadata.value);
                        } else {
                            storeData.set('value', metadata.value);
                            stuffChanged = true;
                        }
                    }
                    return false; // terminate this inner loop
                }
                return true;
            });
        });
        if(stuffChanged)
            theStore.sync();

        this.getView().setEditMode(false); // this causes the view to be rebuilt in view mode with the new data.
    },

    init: function () {
        if(this.getView().getEditMode()) {
            this.getMetadata_save_button().show();
            this.getMetadata_cancel_button().show();
            this.getMetadata_edit_button().hide();
        } else {
            this.getMetadata_save_button().hide();
            this.getMetadata_cancel_button().hide();
            this.getMetadata_edit_button().show();
        }

        var itemUri = this.getView().itemURI;
        if(itemUri) {
            this.store = Ext.create('Savanna.metadata.store.Metadata', {
                itemURI: itemUri
            });
            this.loadStore();
        }
        return this.callParent(arguments);
    },

    createMetadataFields: function() {
        var me = this;
        // TODO: need to create and add a classification thing.

        Ext.Array.each(this.store.data.items, function(metadata) {
            var typeToAdd = me.getTypeFromName(metadata.data.type, metadata.data.key);

            if('' != typeToAdd) {
                var valueObject = {
                    key:            metadata.data.key,
                    value:          metadata.data.value,
                    displayLabel:   metadata.data.displayLabel,
                    visible:        metadata.data.visible !== undefined ? metadata.data.visible : false,
                    editable:       metadata.data.editable !== undefined ? metadata.data.editable : false,
                    editMode:       me.getView().getEditMode(),
                    type:           metadata.data.type
                };
                var metadataView = me.createViewForType(typeToAdd, valueObject );
                if (metadataView) {
                    me.getView().down('#wrapperPanel').add( metadataView );
                }
            }
        });
    },

    getTypeFromName: function(name, key) {
        var typeToAdd = '';
        switch(key) {
            case 'classification':
                typeToAdd = 'Savanna.metadata.view.Classification';
                break;
            case 'docTitle':
                typeToAdd = 'Savanna.metadata.view.Title';
                break;
            case 'document-description':
                typeToAdd = 'Savanna.metadata.view.StringVerticalEdit';
                break;
        }

        if('' === typeToAdd) {
            switch(name){
                case 'String':
                    typeToAdd = 'Savanna.metadata.view.String';
                    break;
                case 'LongString':
                    typeToAdd = 'Savanna.metadata.view.StringVerticalEdit';
                    break;
                case 'Date':
                    typeToAdd = 'Savanna.metadata.view.Date';
                    break;
                case 'Uri':
                    typeToAdd = 'Savanna.metadata.view.Uri';
                    break;
                case 'Integer':
                    typeToAdd = 'Savanna.metadata.view.Integer';
                    break;
                case 'Boolean':
                    typeToAdd = 'Savanna.metadata.view.Boolean';
                    break;
                case 'Double':
                    typeToAdd = 'Savanna.metadata.view.Double';
                    break;
                case 'String_List':
                    typeToAdd = 'Savanna.metadata.view.StringList';
                    break;
                case 'Boolean_List':
                    typeToAdd = 'Savanna.metadata.view.BooleanList';
                    break;
                case 'Date_List':
                    typeToAdd = 'Savanna.metadata.view.DateList';
                    break;
                case 'Integer_List':
                    typeToAdd = 'Savanna.metadata.view.IntegerList';
                    break;
                case 'Double_List':
                    typeToAdd = 'Savanna.metadata.view.DoubleList';
                    break;
                case 'Uri_List':
                    typeToAdd = 'Savanna.metadata.view.UriList';
                    break;
                default:
                    //console.log('Unknown metadata type', name);
                    typeToAdd = '';
                    break;
            }
        }
        return typeToAdd;
    },

    createViewForType: function(fieldType, valueObject) {
        var fieldView = null;
        if(fieldType) {
            fieldView = Ext.create(fieldType, {
                value:          valueObject.value,
                key:            valueObject.key,
                displayLabel:   valueObject.displayLabel,
                editable:       valueObject.editable,
                visible:        valueObject.visible,
                editMode:       valueObject.editMode,
                type:           valueObject.type
            })
        }
        return fieldView;
    },

    saveClassification: function(portionMarking) {
        Ext.Ajax.request({
            url: SavannaConfig.capcoUrl + this.getView().itemURI + ';jsessionid=' + Savanna.jsessionid,
            method: 'POST',
            jsonData: Ext.JSON.encode(portionMarking),
            callback: this.onClassificationSaved,
            scope: this
        });
    },

    onClassificationSaved: function() {
        // the classification banner controller is listening for this event to be fired
        EventHub.fireEvent('classificationchanged', this.getView().itemURI);
        this.loadStore();
    },

    loadStore: function() {
        this.store.load({
            scope: this,
            callback: function() {
                this.createMetadataFields();
            }
        });
    },

    updateUri: function(itemUri) {
        if(this.store) {
            this.store.itemURI = itemUri;
            this.loadStore();
        } else {
            this.store = Ext.create('Savanna.metadata.store.Metadata', {
                itemURI: itemUri
            });
            this.loadStore();
        }
    }
});