/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.ResultsComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultscomponent',
    requires: [
        'Savanna.search.view.ResultsSources',
        'Savanna.search.view.ResultsPanel',
        'Savanna.controller.Factory'
    ],
    stores: [

    ],
    layout:'border',
    defaults: {
        collapsible: true,
        split: true
    },
    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
    },
    items: [{
        xtype:'search_resultssources',
        itemId:'resultssources'
    },{
        xtype:'search_resultspanel',
        itemId:'resultspanel'
    }]
})
