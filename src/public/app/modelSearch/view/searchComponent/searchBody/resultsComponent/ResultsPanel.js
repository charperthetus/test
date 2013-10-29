/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultspanel',
    bubbleEvents: ['Search:PageSizeChanged', "Search:SortByChanged"],
    requires: [
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelToolbar',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelGrid',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelGridMultiColumn',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsMap',
        'Savanna.controller.Factory'
    ],

    region: 'center',
    header: false,
    layout:'fit',


    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ResultsComponent');
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {
        return [
            {
                xtype: 'model_search_resultspanelgrid',
                itemId: 'resultspanelgrid'

            },
            {
                xtype: 'model_search_resultspanelgrid_multi_column',
                itemId: 'resultspanelgrid_multi_column',
                dockedItems:[
                    {
                        xtype: 'pagingtoolbar',
                        itemId: 'gridtoolbar',
                        dock: 'top',
                        displayInfo: true
                    }
                ]
            },
            {
                xtype: 'model_search_resultsmap',
                itemId: 'resultsmap',
                hidden: true
            }
        ];
    },
    /*
     tried to give this a more intuitive name - it swaps the store assigned to our grid
     based on whichever DAL the user selects from the left-hand panel, pages to the current
     page, and re-binds the paging toolbar.
     */
    updateGridStore: function (obj) {
        var grid = this.queryById('resultspanelgrid');
        grid.reconfigure(obj.store);
        this.queryById('gridtoolbar').bindStore(obj.store);

        var gridMulti = this.queryById('resultspanelgrid_multi_column');
        gridMulti.reconfigure(obj.store);
        gridMulti.queryById('gridtoolbar').bindStore(obj.store);

        obj.store.loadPage(obj.store.currentPage);
    },

    dockedItems: [
        {
            xtype: 'model_search_resultspaneltoolbar',
            itemId: 'resultspaneltoolbar'
        }
    ]
});
