/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.view.SimpleTabbedDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.simpletabbeddesktop',
    id: 'mainview',

    items: [
        {
            xtype: 'tabpanel',
            itemId: 'maintabs',
            region: 'center',
            deferredRender: false,
            activeTab: 0,
            items: [
                {
                    title: 'Simple Tabbed Desktop',
                    closable: false,
                    flex: 4
                }
            ]
        }
    ]
});