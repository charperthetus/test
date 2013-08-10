/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/8/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.search.view.ResultsPanelGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.search_resultspanelgrid",
    requires: [
        'Savanna.controller.Factory'
    ],
    store:"Savanna.search.store.SearchResults",
    columns: [
        { text: 'Document',  dataIndex: 'documentFileName' }
    ],
    header:false,
    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
    }
})
