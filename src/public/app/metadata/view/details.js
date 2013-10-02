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
        'Savanna.metadata.controller.FieldTypes',
        'Savanna.metadata.store.Metadata',
        'Savanna.controller.Factory'
    ],

    layout: 'vbox',
    collapsible: 'true',

    autoScroll: true,
    editMode: false,

    itemURI: '',

    tbar: [
      {
          xtype:    'button',
          text:     'Edit',
          itemId:   'metadata_edit_button'
      }
    ],

    items: [
        {
            // this should be replaced by a Classification bar or something of the sort
            xtype: 'label',
            itemId: 'classification',
            text: 'UnClassified'
        },
        {
            xtype: 'label',
            itemId: 'docTitle'
        }
    ],

    initComponent: function () {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        var config = this.initialConfig || {};
        this.itemURI = config.itemURI;

        var metadataStore = Ext.data.StoreManager.lookup('metadata');
        metadataStore.itemURI = config.itemURI;
        metadataStore.load();
    },

    onStoreLoad: function() {
        this.createMetadataFields();
    },

    createMetadataFields: function() {
        var me = this;

        // to sort and filter these, we'll need an array of keys
        Ext.Array.each(this.store.data.items, function(metadata) {
            if(metadata.data.value && metadata.data.value != [] /*&& false != metadata.visible*/) {
                var typeToAdd = me.getTypeFromName(metadata.data.type);

                if('' != typeToAdd) {
                    var valueObject = {
                        key:            metadata.data.key,
                        value:          metadata.data.value,
                        displayLabel:   metadata.data.displayLabel,
                        visible:        metadata.data.visible !== undefined ? metadata.data.visible : false,
                        editable:       metadata.data.editable !== undefined ? metadata.data.editable : false
                    };
                    var metadataView = me.createViewForType(typeToAdd, valueObject );
                    if (metadataView) {
                        me.add( metadataView );
                    }
                }
            } else {
                console.log('Field has no value ', metadata.data.key, metadata.data.value);
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
                console.log('Unknown metadata type', name);
                typeToAdd = '';
                break;
        }
        return typeToAdd;
    },

    createViewForType: function(fieldType, valueObject) {
        var fieldView = null;
        if(fieldType) {
            fieldView = Ext.create(fieldType, {
                value: valueObject.value,
                key: valueObject.key,
                displayLabel: valueObject.displayLabel,
                editable: valueObject.editable,
                visible: valueObject.visible
            })
        }
        return fieldView;
    }
});
