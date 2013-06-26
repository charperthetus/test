/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.view.SavannaDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.savannadesktop',

    items: [
        {
            xtype: 'tabpanel',
            itemId: 'maintabs',
            region: 'center',
            deferredRender: false,
            activeTab: 0,
            items: [
             {
             title: 'Savanna Desktop',
             closable: false,
             flex: 4
             }
             ]
        }
    ]
});