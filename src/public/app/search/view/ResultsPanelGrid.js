/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/8/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.ResultsPanelGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.search_resultspanelgrid',

    requires: [
        'Savanna.controller.Factory',
        'Ext.grid.column.Template'
    ],

    store:'Savanna.search.store.SearchResults',

    columns: [
        { text: ' ', xtype:'templatecolumn',  tpl: '<b>{documentFileName}</b><br />{documentSource}<br />{previewString}<br /><br />' }
    ],

    header:false,
    forceFit: true,

    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
    },

    dockedItems:[
        {
            xtype:'pagingtoolbar',
            itemId:"gridtoolbar",
            dock:'top',
            store:this.store,
            displayInfo:true
        }
    ]
});
