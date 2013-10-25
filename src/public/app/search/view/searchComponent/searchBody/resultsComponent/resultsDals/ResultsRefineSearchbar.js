Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineSearchbar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsDals_resultsrefine',

    requires: [
        'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms',
        'Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineSearchbarController',
        'ThetusUikit.ux.form.SearchField'
    ],

    controller: 'Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineSearchbarController',

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
                    // adding thetus-searchfield removes the necessity for a submit button.
                    xtype: 'thetus-searchfield',
                    width: 170,
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
            text: 'Refine Search'
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