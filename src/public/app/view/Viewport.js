/**
 * Viewport for the Savanna Client application
 */
Ext.define('Savanna.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tab.Panel',
        'Savanna.view.Login',
        "Deft.mixin.Controllable",
        "Deft.mixin.Injectable"
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
