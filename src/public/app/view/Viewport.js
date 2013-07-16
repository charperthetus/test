/**
 * Viewport for the Savanna Client application
 */
Ext.define('Savanna.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tab.Panel',
        'Savanna.view.Login'
    ],

    border: false,
    layout: {
        type: 'border'
    },

    items: [
        {
            xtype:"panel",
            region:"center",
            layout:"fit",
            itemId:"viewport_main",
            items:  [
                {
                    xtype:  'login',
                    itemId: 'login'
                },
                {
                    xtype:  'savannadesktop',
                    itemId: 'main'
                }
            ]
        }

    ]
});