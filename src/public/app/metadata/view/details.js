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
        'Savanna.metadata.controller.MetadataViewController',
        'Savanna.metadata.store.Metadata'
    ],

    controller: 'Savanna.metadata.controller.MetadataViewController',

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
            me.getController().createMetadataFields();
        }
    },

    updateItemURI: function(newURI, oldURI) {
        if(undefined != oldURI ) { // don't want to do this on init
            this.removeAll();
        }
        var metadataStore = Ext.data.StoreManager.lookup('metadata');
        metadataStore.itemURI = newURI;
        metadataStore.load();

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
        this.getController().createMetadataFields();
    }

});
