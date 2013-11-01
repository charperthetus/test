Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineSearchbar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultsDals_resultsrefine',

    requires: [
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms',
        'Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsRefineSearchbarController'
    ],

    controller: 'Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsRefineSearchbarController',

    border:false,
    width:'100%',


    initComponent: function () {
        this.callParent(arguments);
    },

    items: [
        {
            xtype: 'panel',
            itemId: 'refine_search_panel',
            layout: 'hbox',
            border:false,
            items: [
                {
                    //sav-5935 removing for demo, when boolean search expressions are working, this can be shown.
                    hidden: true,
                    // adding thetus-searchfield removes the necessity for a submit button.
                    xtype: 'thetus-searchfield',
                    width: 168,
                    fieldLabel: '',
                    name: 'refine_search_terms',
                    itemId: 'refine_search_terms',
                    enableKeyEvents: true,
                    emptyText: 'Search'
                }
            ]
        }
    ],

    tbar:   [
        {
            xtype: 'tbtext',
            text: '' //jwb was Refine Search
        },
        {
            xtype: 'tbfill'
        },
        {
            text:'Reset',
            itemId:'resultsFacetsReset'
        }

    ]
});
