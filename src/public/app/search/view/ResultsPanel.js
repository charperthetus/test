/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.ResultsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultspanel',

    requires: [
        'Savanna.search.view.ResultsPanelToolbar',
        'Savanna.search.view.ResultsPanelGrid',
        'Savanna.controller.Factory'
    ],

    region: 'center',
    header: false,
    layout:'fit',


    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {
        return [
            {
                xtype: 'search_resultspanelgrid',
                itemId: 'resultspanelgrid',
                store: Ext.create('Savanna.search.store.SearchResults'),
                dockedItems:[
                    {
                        xtype: 'pagingtoolbar',
                        itemId: 'gridtoolbar',
                        dock: 'top',
                        store: Ext.create('Savanna.search.store.SearchResults'),
                        displayInfo: true
                    }
                ]
            }
        ];
    },

    updateItems: function (obj) {
        var grid = this.queryById('resultspanelgrid');
        grid.reconfigure(obj.store);
        grid.queryById('gridtoolbar').bindStore(obj.store);
        obj.store.loadPage(1);
    },

    dockedItems: [
        {
            xtype: 'search_resultspaneltoolbar',
            itemId: 'resultspaneltoolbar'
        }
    ]
});
