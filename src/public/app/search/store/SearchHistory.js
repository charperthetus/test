/* global Ext: false, Savanna: false */
Ext.define('Savanna.search.store.SearchHistory', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.Config',
        'Savanna.search.model.SearchHistory',
        'Savanna.proxy.Cors'
    ],

    storeId: 'searchHistory',

    model: 'Savanna.search.model.SearchHistory',

    // does this need to be set?
    pageSize: Savanna.Config.searchHistoryPageSize,

    autoLoad: false,


    searches: [],

    restAction: 'POST',

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            //url: Savanna.Config.savannaUrlRoot + 'rest/search/history',
            url: 'app/assets/data/testSearchHistory.json',
            addSessionId: false,
            noCache: false,
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,

            writer: {
                type: 'json',
                allowSingle: true
            }
        });
    }
});
