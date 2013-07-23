/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.search.view.SearchBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchbody',

    requires: [
        'Savanna.search.view.SearchDals',
        'Savanna.search.view.SearchMap',
        'Savanna.controller.Factory'
    ],

    layout: 'fit',

    items: [
        /*
         This is the panel that contains Search Options,
         need to make another absolutely
         positioned panel for results, controlled by
         the docked toolbar
         */
        {
            xtype: 'panel',
            layout: 'border',
            itemId: 'mainsearchoptions',
            items: [
                {
                    xtype: 'tabpanel',
                    cls: 'flat-tab',
                    activeTab: 0,
                    flex: 3,
                    anchor: '100% 100%',
                    tabPosition: 'top',
                    region: 'center',
                    items: [
                        {
                            title: 'Search Sources',
                            autoScroll: true,
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
            xtype: 'panel',
            layout: 'border',
            itemId: 'mainresults',
            html: "results here"
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'link-toolbar',
            width: '100%',
            itemId:"searchbodytoolbar",
            items: [
                {
                    xtype: 'button',
                    ui: 'link-button',
                    text: 'Search Options',
                    itemId:"optionsbutton"
                },
                {
                    xtype: 'button',
                    ui: 'link-button',
                    text: 'Results',
                    itemId:"resultsbutton"
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);

        Savanna.controller.Factory.getController('Savanna.search.controller.SearchBody');
    }
});
