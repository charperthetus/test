/**
 * Viewport for the Savanna Client application
 */
Ext.define('Savanna.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Savanna.view.Login'
    ],

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'login',
            itemId: 'login',
            region: 'center'
        }
    ]
});