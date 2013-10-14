/**
 * Viewport for the Savanna Client application
 */
Ext.define('Savanna.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Savanna.view.Login'
    ],

    border: false,
    layout: 'fit',

    items: [
        {
            xtype: 'login',
            itemId: 'login'
        }
    ]
});
