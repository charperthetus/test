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
            items:  [
                {
                    xtype:  'login',
                    itemId: 'login'
                },
                {
                    xtype:  Savanna.Config.desktopType,
                    itemId: 'main'
                }
            ]
        }

    ]
});