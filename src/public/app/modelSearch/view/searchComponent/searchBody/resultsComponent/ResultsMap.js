/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 10/1/13
 * Time: 1:50 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsMap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultsmap',

    requires: [
        'Savanna.controller.Factory',
        'Savanna.modelSearch.view.searchComponent.searchBody.searchMap.Canvas'
    ],

    region: 'center',
    header: false,
    layout:'fit',

    items:[
        {
            xtype: 'model_search_map_canvas',
            height: '100%',
            width: '100%',
            itemId: 'resultMapCanvas',
            flex: 1
        }
    ],


    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ResultsComponent');
        this.callParent(arguments);
    }
});
