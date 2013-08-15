/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.search.view.SearchBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchbody',

    requires: [
        'Savanna.search.view.SearchDals',
        'Savanna.search.view.SearchMap',
        'Savanna.search.view.ResultsComponent',
        /*
         Why is this needed?  If the controller is listed in the requires for the view,
         the whole app blows up with no error messages.  If this is removed from these
         requires, the console complains that the controller has had to be loaded
         asynchronously.  Maybe because results is in a tab that has not been rendered..?
          */
        'Savanna.search.controller.ResultsComponent',

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
                            itemId:"searchdals",
                            xtype: 'search_searchdals'
                        },
                        {
                            title: 'Location',

                            xtype: 'search_searchmap'
                        }
                    ]
                }
            ]

        },
        {
            xtype: 'search_resultscomponent',
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
        this.callParent(arguments);
    }
});
