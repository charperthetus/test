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


    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');


        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {
        var store = Ext.create('Savanna.search.store.SearchResults');
        return  [
            {
                xtype:'pagingtoolbar',
                itemId:'gridtoolbar',
                dock:'top',
                store:store,
                displayInfo:true
            },
            {
                xtype: 'search_resultspanelgrid',
                itemId: 'resultspanelgrid',
                store:store,
                height:'100%'
            }
        ]
    },
    /*
    items: [
        {
            xtype: 'search_resultspanelgrid',
            itemId: 'resultspanelgrid'
        }
    ],
    */
    dockedItems: [
        {
            xtype: 'search_resultspaneltoolbar',
            itemId: 'resultspaneltoolbar'
        }
    ]
});
