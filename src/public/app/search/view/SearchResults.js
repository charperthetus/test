/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.search.view.SearchResults", {
    extend: "Ext.panel.Panel",
    alias: "widget.search_searchresults",
    requires: [],
    stores: [
        "Savanna.search.store.SearchResults"
    ],
    layout:'border',
    defaults: {
        collapsible: true,
        split: true,
        bodyStyle: 'padding:15px'
    },
    initComponent: function () {
        this.callParent(arguments);

        Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
    },
    items: [{
        title: 'Search Sources',
        region:'west',
        margins: '5 0 0 0',
        cmargins: '5 5 0 0',
        width: 175,
        minSize: 100,
        maxSize: 250
    },{
        collapsible: false,
        region:'center',
        margins: '5 0 0 0'
    }]
})
