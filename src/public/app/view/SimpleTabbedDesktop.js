/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.view.SimpleTabbedDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.simpletabbeddesktop',
    requires:[
        "Savanna.view.search.SearchToolbar",
        "Savanna.view.search.SearchBar"
    ],
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
                    flex: 4,
                    items:[
                        {
                            xtype:"mainsearchtoolbar",
                            itemId:"toptoolbar"
                        },
                        {
                            xtype:"mainsearchbar",
                            itemId:"searchbar"
                        }
                    ]
                }
            ]
        }
    ]
});