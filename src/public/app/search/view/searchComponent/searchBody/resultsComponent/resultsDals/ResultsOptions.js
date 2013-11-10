Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions', {
    extend: 'Ext.button.Button',
    alias: 'widget.search_resultsDals_resultsoptions',

    requires: [
        'Savanna.search.controller.resultsComponent.resultsDals.ResultsOptionsController'
    ],

    bubbleEvents: ['search:changeSelectedStore'],

    controller: 'Savanna.search.controller.resultsComponent.resultsDals.ResultsOptionsController',

    itemId: 'dalResultOptions',

    cls: 'results-dal',

    iconAlign: 'right',
    textAlign: 'left',
    width: '100%',
    margin: '5 0'

    // items: [{
    //             xtype:'button',
    //             itemId: 'dalName',
    //             height:20,
                
    //              NOTE: to be replaced with a class attribute I'm sure - this just
    //              here to get the panel to display for development.
                 
    //             width:'100%'
    //         }]
});