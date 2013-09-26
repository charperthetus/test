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
    //collapsible: 'true',

    autoScroll: true,
    editMode: false,

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
    },

    onStoreLoad: function() {

        this.createMetadataFields();
    },

    createMetadataFields: function() {

        var me = this;

        //console.log('this.store.data.items[0].data.metadata', this.store.data.items[0].data.metadata);

        Ext.Array.each(this.store.data.items[0].data.metadata.metadataEntries, function(metadata) {
            if(metadata.value) {
                var TypeToAdd = '';

                switch(metadata.metadataType.name){
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
                        //console.log("metadata.value", metadata.value);
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

                if('' != TypeToAdd) {
                    me.add(
                        Ext.create(TypeToAdd, {
                            value: metadata.value,
                            displayLabel: metadata.key.displayLabel
                        })
                    );
                }

            } else {
                console.log('Field has no value ', metadata.metadataType.name, metadata.value);
            }
        });
    }
});
