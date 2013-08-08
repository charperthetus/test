/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.search.view.SearchBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchbody',

    requires: [
        'Savanna.search.view.SearchDals',
        'Savanna.search.view.SearchMap',
        'Savanna.search.view.SearchResults',
        'Savanna.controller.Factory'
    ],

    layout: 'fit',
    border: false,
    currentPanel: 'searchoptions',

    items: [
        {
            xtype: 'panel',
            layout: 'border',
            itemId: 'mainsearchoptions',
            border: false,
            items: [
                {
                    xtype: 'tabpanel',
                    cls: 'flat-tab',
                    border: false,
                    itemId: 'mainsearchtabpanel',
                    activeTab: 0,
                    flex: 3,
                    anchor: '100% 100%',
                    tabPosition: 'top',
                    region: 'center',
                    items: [
                        {
                            title: 'Search Sources',
                            autoScroll: true,
                            cls: 'search-dal',
                            xtype: 'search_searchdals'
                        },
                        {
                            title: 'Location',
                            itemId: 'searchMap',
                            cls: 'search-map',
                            xtype: 'search_searchmap'
                        }
                    ]
                }
            ]

        },
        {
            xtype: 'search_searchresults',
            layout: 'border',
            itemId: 'searchresults'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'link-toolbar',
            width: '100%',
            itemId: "searchbodytoolbar",
            border: false,
            items: [
                {
                    xtype: 'button',
                    ui: 'link-button',
                    text: 'Search Options',
                    itemId: "optionsbutton"
                },
                {
                    xtype: 'button',
                    ui: 'link-button',
                    text: 'Results',
                    itemId: "resultsbutton"
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            xtype: 'button',
            text: 'Search',
            itemId: "toolbarsearchbutton"
        }
    ],
    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        this.callParent(arguments);
    }
});
