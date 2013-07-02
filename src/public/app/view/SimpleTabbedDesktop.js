/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.view.SimpleTabbedDesktop', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.simpletabbeddesktop',

    requires:[
        'Savanna.view.search.SearchToolbar',
        'Savanna.view.search.SearchBar',
        'Savanna.view.search.SearchBody'
    ],
    items: [
        {
            xtype:  'tabpanel',
            itemId: 'maintabs',
            region: 'center',
            deferredRender: false,
            activeTab: 0,
            border: false,
            items: [
                {
                    title: 'Simple Tabbed Desktop',
                    closable: false,
                    flex: 4,
                    layout: 'border',
                    border: false,
                    items: [
                        {
                            xtype:  'search.searchbar',
                            itemId: 'searchbar',
                            region: 'north'
                        },
                        {
                            xtype:  'search.searchbody',
                            itemId: 'searchbody',
                            region: 'center'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype:  'search.searchtoolbar',
                            itemId: 'searchtoolbar'
                        }
                    ]
                }
            ]
        }
    ]
});