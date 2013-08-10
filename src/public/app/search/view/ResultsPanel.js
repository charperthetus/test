/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.search.view.ResultsPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.search_resultspanel",
    requires: [
        "Savanna.search.view.ResultsPanelToolbar",
        "Savanna.search.view.ResultsPanelGrid",
        'Savanna.controller.Factory'
    ],
    stores: [
        "Savanna.search.store.SearchResults"
    ],
    region:'center',
    header:false,
    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
        this.callParent(arguments);
    },
    items:  [
        {
            xtype:"search_resultspanelgrid",
            itemId:"resultspanelgrid"
        }
    ],
    dockedItems:    [
        {
            xtype:"search_resultspaneltoolbar",
            itemId:"resultspaneltoolbar"
        }
    ]
})
