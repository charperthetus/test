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
        'Savanna.controller.Factory'
    ],

    layout: 'vbox',

    editMode: false,

    items: [
        {
            xtype: 'label',
            itemId: 'classification',
            text: 'testing'
        },
        {
            xtype: 'textfield',
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

        Ext.Array.each(this.store.data.items[0].data.metadata.metadataEntries, function(metadata) {
            switch(metadata.metadataType.name){
                case 'String':
                    me.add(
                        Ext.create('Savanna.metadata.view.String', {
                            value: metadata.value,
                            displayLabel: metadata.key.displayLabel
                        })
                    );
                    break;
                default:
                    console.log('metadata.metadataType.name', metadata.metadataType.name);
            }

/*            var myPanel = this.createPanel(record);
            this.add(myPanel);
            if(record.data.id === this.store.defaultId)  {
                myPanel.query('checkbox')[0].setValue(true);
            }
            */
        });
    },

    createPanel: function(myRecord) {
        return Ext.create('Savanna.search.view.searchComponent.searchBody.searchDals.SearchOptions', {
            itemId: myRecord.data.id,
            checkboxLabel: myRecord.data.displayName,
            label: myRecord.data.textDescription,
            showButton: (myRecord.getCustomSearchDescription().customSearchGroups().data.length > 0)
        });
    }

});
