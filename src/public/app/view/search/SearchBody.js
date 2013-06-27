/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.view.search.SearchBody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search.searchbody',

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
        /*
         This is the panel that contains Search Results,
         controlled by the docked toolbar
         */

        {
            xtype: 'panel',
            layout: 'border',
            float: true,
            itemId: 'mainresults',
            items: [
                {
                    xtype: 'panel',
                    region: 'center',
                    border: false,
                    html: 'results here'
                }
            ]
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            border: false,
            width: '100%',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Search Options',
                    style: {
                        background: 'transparent',
                        border: 'none'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Results',
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