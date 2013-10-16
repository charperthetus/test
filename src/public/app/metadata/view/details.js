/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:32 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.view.Details', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_details',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store: 'Savanna.metadata.store.Metadata',

    requires: [
        'Savanna.metadata.view.String',
        'Savanna.metadata.view.LongString',
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
        'Savanna.metadata.view.UriList',
        'Savanna.metadata.controller.MetadataViewController',
        'Savanna.metadata.store.Metadata'
        //'Savanna.controller.Factory'
    ],

    controller: 'Savanna.metadata.controller.MetadataViewController',

    tbar: [
        {
          xtype:    'button',
          text:     'Edit',
          itemId:   'metadata_edit_button'
        },
        {
            xtype:    'button',
            text:     'Save',
            itemId:   'metadata_save_button'
        },
        {
            xtype:    'button',
            text:     'Cancel',
            itemId:   'metadata_cancel_button'
        }
    ],

    items: [
    ],

    layout: 'vbox',
    collapsible: true,

    overflowY: 'auto',
    autoScroll: true,

    config: {
        editMode: false,
        itemURI: ''
    },

    updateEditMode: function(newEditMode, oldEditMode) {
        var me = this;
        if(undefined != oldEditMode ) { // don't want to do this on init
            me.removeAll(); // this is only ok if all of our display items are created via createMetadataFields.
            me.createMetadataFields();
        }
    },

    initComponent: function () {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);

        var config = this.initialConfig || {};
        this.setItemURI( config.itemURI );

        var metadataStore = Ext.data.StoreManager.lookup('metadata');
        metadataStore.itemURI = config.itemURI;
        metadataStore.load();
    },

    onStoreLoad: function() {
        this.createMetadataFields();
    },

    createMetadataFields: function() {
        var me = this;

        // TODO: need to create and add a classification thing.

        Ext.Array.each(this.store.data.items, function(metadata) {
            var typeToAdd = me.getTypeFromName(metadata.data.type);

            if('' != typeToAdd) {
                var valueObject = {
                    key:            metadata.data.key,
                    value:          metadata.data.value,
                    displayLabel:   metadata.data.displayLabel,
                    visible:        metadata.data.visible !== undefined ? metadata.data.visible : false,
                    editable:       metadata.data.editable !== undefined ? metadata.data.editable : false,
                    editMode:       me.getEditMode(),
                    type:           metadata.data.type
                };
                var metadataView = me.createViewForType(typeToAdd, valueObject );
                if (metadataView) {
                    //me.add( metadataView );
                    me.add( metadataView );
                }
            }
        });
    },

    getTypeFromName: function(name) {
        var typeToAdd = '';

        switch(name){
            case 'String':
                typeToAdd = 'Savanna.metadata.view.String';
                break;
            case 'LongString':
                typeToAdd = 'Savanna.metadata.view.LongString';
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
    }
});
