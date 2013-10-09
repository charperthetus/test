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
        type: 'fit'
    },

    items: [
        {
            xtype: 'desktop_savannadesktop'
        }
    ]
});
