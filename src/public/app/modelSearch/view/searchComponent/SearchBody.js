/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.modelSearch.view.searchComponent.SearchBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_searchbody',

    requires: [
        'Ext.tab.Panel',
        'Savanna.modelSearch.view.searchComponent.searchBody.SearchDals',
        'Savanna.modelSearch.view.searchComponent.searchBody.SearchMap',
        'Savanna.modelSearch.view.searchComponent.searchBody.ResultsComponent',
        /*
         Why is this needed?  If the controller is listed in the requires for the view,
         the whole app blows up with no error messages.  If this is removed from these
         requires, the console complains that the controller has had to be loaded
         asynchronously.  Maybe because results is in a tab that has not been rendered..?
          */
        'Savanna.modelSearch.controller.ResultsComponent',

        'Savanna.controller.Factory'
    ],

    layout: 'fit',
    border: false,
    currentPanel: 'searchoptions',  //jwb was 'searchoptions'

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
                            title: 'Refine Search',
                            autoScroll: true,
                            cls: 'search-dal',
                            itemId:'searchdals',
                            xtype: 'model_search_searchdals'
                        },
                        {
                            title: 'Location',
                            itemId: 'searchMap',
                            xtype: 'model_search_searchmap'
                        }
                    ]
                }
            ]

        },
        {
            xtype: 'model_search_resultscomponent',
            layout: 'border',
            itemId: 'searchresults'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            hidden: true,
            width: '100%',
            itemId: 'searchbodytoolbar',
            items: [

                {
                    xtype: 'button',
                    text: 'Results',         //was 'Results'
                    itemId: 'resultsbutton'
                },

                {
                    xtype: 'button',
                    text: 'Search Options',  //was 'Search Options'
                    itemId: 'optionsbutton'
                }

            ]
        }
    ]
});
