/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.ResultsComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultscomponent',
    bubbleEvents: ['Search:PageSizeChanged', "Search:SortByChanged", 'search:changeSelectedStore'],
    requires: [
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsDals',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanel',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPreviewContent',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPreviewWindow',
        'Savanna.controller.Factory',
        'Savanna.modelSearch.store.DalSources'
    ],
    layout: 'border',
    defaults: {
        // is collapsible good?  seemed handy.
        collapsible: true,
        split: true
    },
    currentResultSet:null,
    initComponent: function () {
        this.allResultSets = [];
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ResultsComponent');
    },

    items: [
        {
            xtype: 'model_search_resultsdals',
            itemId: 'resultsdals'
        },
        {
            xtype: 'model_search_resultspanel',
            itemId: 'resultspanel'
        },
        {
            xtype: 'model_search_resultspreviewwindow',
            itemId: 'resultspreviewwindow'
        }
    ]
});
