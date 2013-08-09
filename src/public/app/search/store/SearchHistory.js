/* global Ext: false, Savanna: false */
Ext.define('Savanna.search.store.SearchHistory', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.Config',
        'Savanna.search.model.SearchHistory',
        'Savanna.proxy.Cors'
    ],

    storeId: 'searchHistory',

    // does this need to be set?
    pageSize: Savanna.Config.searchHistoryPageSize,

    autoLoad: false,

    model: 'Savanna.search.model.SearchHistory',

    searches: [],

    restAction: 'POST',

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: Savanna.Config.savannaUrlRoot + 'rest/search/history',
            // Use this if you don't have Savanna 3.4 running
            // NOTE: two tests in SpecRunner fail in this circumstance, but will work once the dev server is up and running
            //url: 'app/assets/data/testSearchHistory.json',
            writer: {
                type: 'json',
                allowSingle: false
            }
        });
    }
});
