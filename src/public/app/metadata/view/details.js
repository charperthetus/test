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
        'Savanna.metadata.store.Metadata',
        'Ext.form.Panel',
        'Ext.button.Button'],

    controller: 'Savanna.metadata.controller.MetadataViewController',

    header: {
        ui: 'light-blue'
    },
    collapseMode : 'header',   
    headerPosition: 'left',
    collapsedCls : 'light-blue',

    items: [
        {
            xtype: 'form',
            itemId: 'wrapperPanel',
            title: 'Information',
            header: {
                ui: 'off-white'
            },
            ui: 'off-white',
            height: '100%',
            width: '100%',
            layout: 'vbox',
            collapsible: true,
            overflowY: 'auto',
            tbar: {
                ui: 'off-white',
                items: [
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
            ]},
            autoScroll: true
        }
    ],

    config: {
        editMode: false,
        itemURI: ''
    },

    updateItemURI: function(newItemURI, oldItemURI) {
        this.fireEvent('update_Uri', newItemURI);
        this.callParent(arguments);
    },

    updateEditMode: function(newEditMode, oldEditMode) {
        var me = this;
        if(undefined != oldEditMode ) { // don't want to do this on init
            me.down('#wrapperPanel').removeAll();
            this.fireEvent('create_metadata_fields', this);
        }
    },

    initComponent: function () {
        this.callParent(arguments);

        var config = this.initialConfig || {};
    }

});
