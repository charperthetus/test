Ext.define('Savanna.metadata.view.part.InformationPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.informationpanel',
    requires: ['Savanna.metadata.controller.InformationPanelController'],

    controller: 'Savanna.metadata.controller.InformationPanelController',

    config: {
        itemUri: null
    },

    title: 'Information',

    layout: 'card',

    header: {
        ui: 'off-white'
    },
    ui: 'off-white',

    items: [
        {
            xtype: 'form',
            itemId: 'viewCard',
            ui: 'off-white',
            tbar: {
                ui: 'off-white',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        itemId: 'editButton',
                        text: 'Edit'
                    }
                ]
            },
            autoScroll: true
        },
        {
            xtype: 'form',
            itemId: 'editCard',
            ui: 'off-white',
            tbar: {
                ui: 'off-white',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        itemId: 'saveButton',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        itemId: 'cancelButton',
                        text: 'Cancel'
                    }
                ]
            },
            autoScroll: true
        }
    ],

    updateItemUri: function(newItemUri, oldItemUri) {
        this.fireEvent('updateitemuri', newItemUri, oldItemUri);
    }
});