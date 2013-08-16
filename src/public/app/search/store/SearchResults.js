/* global Ext: false */
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

            // DEV SETTINGS (for when you don't have the endpoint working...)
            //url: 'app/assets/data/testSearchResults.json',
            addSessionId: false,
            noCache: false,
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,

            reader: {
                type: 'json',
                root:"results",
                // why this no worky?  I'll figure it out...
                totalProperty:"totalResults"
            },
            modifyRequest:function(request) {
                Ext.apply(request, {
                    jsonData: this.jsonData
                });
                return request;
            }

            // END DEV SETTINGS
        });
    }
});
