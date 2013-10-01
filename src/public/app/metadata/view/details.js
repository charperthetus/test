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
        //console.log('URI', this.itemURI);
    },

    onStoreLoad: function() {
        this.createMetadataFields();
    },

    createMetadataFields: function() {
        var me = this;

        //console.log('this.store.data.items[0].data.metadata', this.store.data.items[0].data.metadata);
        //console.log('this.store.itemURI', this.store.itemURI);

        // to sort and filter these, we'll need an array of keys
        Ext.Array.each(this.store.data.items[0].data.metadata.metadataEntries, function(metadata) {

            if(metadata.value /*&& false != metadata.visible*/) {
                var TypeToAdd = me.getTypeFromName(metadata.metadataType.name);

                if('' != TypeToAdd) {
                    var valueObject = {
                        key:            metadata.key.key,
                        value:          metadata.value,
                        displayLabel:   metadata.key.displayLabel,
                        visible:        metadata.visible !== undefined ? metadata.visible : false,
                        editable:       metadata.editable !== undefined ? metadata.editable : false
                    };
                    var metadataView = me.createViewForType(TypeToAdd, valueObject );
                    if (metadataView) {
                        me.add( metadataView );
                    }
                }
            } else {
                console.log('Field has no value ', metadata.metadataType.name, metadata.value);
            }
        });
    },

    getTypeFromName: function(name) {
        var TypeToAdd = '';

        switch(name){
            case 'String':
                TypeToAdd = 'Savanna.metadata.view.String';
                break;
            case 'LongString':
                TypeToAdd = 'Savanna.metadata.view.LongString';
                break;
            case 'Date':
                TypeToAdd = 'Savanna.metadata.view.Date';
                break;
            case 'Uri':
                TypeToAdd = 'Savanna.metadata.view.Uri';
                break;
            case 'Integer':
                TypeToAdd = 'Savanna.metadata.view.Integer';
                break;
            case 'Boolean':
                TypeToAdd = 'Savanna.metadata.view.Boolean';
                break;
            case 'Double':
                TypeToAdd = 'Savanna.metadata.view.Double';
                break;
            case 'String_List':
                TypeToAdd = 'Savanna.metadata.view.StringList';
                break;
            case 'Boolean_List':
                TypeToAdd = 'Savanna.metadata.view.BooleanList';
                break;
            case 'Date_List':
                TypeToAdd = 'Savanna.metadata.view.DateList';
                break;
            case 'Integer_List':
                TypeToAdd = 'Savanna.metadata.view.IntegerList';
                break;
            case 'Double_List':
                TypeToAdd = 'Savanna.metadata.view.DoubleList';
                break;
            case 'Uri_List':
                TypeToAdd = 'Savanna.metadata.view.UriList';
                break;
            default:
                console.log('metadata.metadataType.name', metadata.metadataType.name);
        }
        return TypeToAdd;
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
