/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.view.search.SearchBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchbody',

    layout: 'fit',
    border: false,

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
                    plain: true,
                    region: 'center',
                    margins: '10 0 0 0',
                    activeTab: 0,
                    flex: 3,
                    anchor: '100% 100%',
                    tabPosition: 'top',
                    border: false,
                    items: [
                        {
                            title: 'Search Sources',
                            html: 'sources here'
                        },
                        {
                            title: 'Location',
                            html: 'leaflet here'
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
            border: false,
            width: '100%',
            docked: 'top',
            itemId:"searchbodytoolbar",
            items: [
                {
                    xtype: 'button',
                    text: 'Search Options',
                    itemId:"optionsbutton",
                    style: {
                        background: 'transparent',
                        border: 'none'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Results',
                    itemId:"resultsbutton",
                    style: {
                        background: 'transparent',
                        border: 'none'
                    }
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);

        Savanna.controller.Factory.getController('search.SearchBody');
    }
});