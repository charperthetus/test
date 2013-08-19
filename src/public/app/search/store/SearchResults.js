/* global Ext: false, Savanna: false */
Ext.define('Savanna.search.store.SearchResults', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.Config',
        'Savanna.search.model.SearchResult',
        'Savanna.proxy.Cors'
    ],

    storeId: 'searchResults',

    model: 'Savanna.search.model.SearchResult',

    pageSize: 100,

    autoLoad: false,

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: Savanna.Config.savannaUrlRoot + 'rest/search',
            devUrl: 'app/assets/data/testSearchResults.json',

            // DEV SETTINGS (for when you don't have the endpoint working...)
            //startParam: undefined,
            //limitParam: undefined,
            //pageParam: undefined,

            reader: {
                type: 'json',
                root: 'results',
                // TODO: this does not appear to be working yet...
                totalProperty: 'totalResults'
            },

            // TODO: remove this when we have things working correctly...
            modifyRequest:function(request) {
                Ext.apply(request, {
                    jsonData: this.jsonData
                });

                return request;
            }
        });
    }
});
