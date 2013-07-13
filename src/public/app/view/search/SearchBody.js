/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.view.search.SearchBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchbody',

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
                    plain: true,
                    region: 'center',
                    margins: '10 0 0 0',
                    activeTab: 0,
                    flex: 3,
                    anchor: '100% 100%',
                    tabPosition: 'top',
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

        Savanna.controller.Factory.getController('search.SearchBody');
    }
});