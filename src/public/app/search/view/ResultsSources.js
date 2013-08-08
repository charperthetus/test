/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.search.view.ResultsSources", {
    extend: "Ext.panel.Panel",
    alias: "widget.search_resultssources",
    requires: [
        'Savanna.controller.Factory'
    ],
    stores: [
        "Savanna.search.store.SearchResults"
    ],
    title: 'Search Sources',
    region:'west',
    margins: '5 0 0 0',
    cmargins: '5 5 0 0',
    width: 175,
    minSize: 100,
    maxSize: 250,
    initComponent: function () {
        this.callParent(arguments);

        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
    }
})
