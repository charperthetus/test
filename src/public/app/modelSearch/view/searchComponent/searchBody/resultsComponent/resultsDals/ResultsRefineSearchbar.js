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
                    xtype: 'textfield',
                    width: 180,             //was making submit button below get clipped
                    fieldLabel: '',
                    name: 'refine_search_terms',
                    itemId: 'refine_search_terms',
                    enableKeyEvents: true,
                    emptyText: 'Refine Search'
                },
                {
                    xtype: 'button',
                    itemId: 'refine_search_submit',
                    glyph: 61808
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
