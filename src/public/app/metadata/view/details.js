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
    itemId: 'detailsPanel',

    height: '100%',
    width: '100%',

    layout: 'fit',

    store: null,

    requires: [
        'Savanna.metadata.controller.MetadataViewController',
        'Savanna.metadata.store.Metadata'
    ],

    controller: 'Savanna.metadata.controller.MetadataViewController',


    items: [
        {
            xtype: 'panel',
            itemId: 'wrapperPanel',
            title: 'Information',
            header: {
                ui: 'light-blue'
            },
            height: '100%',
            width: '100%',
            layout: 'vbox',
            collapsible: true,
            overflowY: 'auto',
            tbar: [
                '->',
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
            autoScroll: true
        }
    ],


    config: {
        editMode: false,
        itemURI: ''
    },

    updateEditMode: function(newEditMode, oldEditMode) {
        var me = this;
        if(undefined != oldEditMode ) { // don't want to do this on init
            me.down('#wrapperPanel').removeAll();
            me.getController().createMetadataFields();
        }
    },

    updateItemURI: function(newURI, oldURI) {
        if(undefined != oldURI ) { // don't want to do this on init
            this.down('#wrapperPanel').removeAll();
        }
        console.log('updateItemURI');
        this.store.itemURI = newURI;
        this.store.load({
            scope: this,
            callback: function(records, operation, success) {
                this.getController().createMetadataFields();
            }
        });

    },

    initComponent: function () {
        this.callParent(arguments);

        var config = this.initialConfig || {};
        this.store = Ext.create('Savanna.metadata.store.Metadata');

        this.setItemURI( config.itemURI );

        this.store.itemURI = config.itemURI;
        this.store.load({
            scope: this,
            callback: function(records, operation, success) {
                this.getController().createMetadataFields();
            }
        });
    }

});
