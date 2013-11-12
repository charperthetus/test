Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions', {
    extend: 'Ext.button.Button',
    alias: 'widget.model_search_resultsDals_resultsoptions',

    requires: [
        'Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsOptionsController'
    ],

    bubbleEvents: ['search:changeSelectedStore'],

    controller: 'Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsOptionsController',

    itemId: 'dalResultOptions',

    cls: 'results-dal',

    iconAlign: 'right',
    textAlign: 'left',
    width: '100%',
    margin: '5 0'
});
