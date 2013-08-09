/* global Ext: false */
Ext.define('Savanna.search.store.SearchResults', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.Config',
        'Savanna.search.model.SearchResult',
        'Savanna.proxy.Cors'
    ],

    storeId: 'searchResults',

    pageSize: 100,

    autoLoad: false,

    model: 'Savanna.search.model.SearchResult',

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            //url: Savanna.Config.savannaUrlRoot + 'rest/search',

            // DEV SETTINGS (for when you don't have the endpoint working...)
            url: 'app/assets/data/testSearchResults.json',
            addSessionId: false,
            noCache: false,
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,
            actionMethods: {
                create: 'GET',
                read: 'GET',
                update: 'GET',
                destroy: 'GET'
            },
            // END DEV SETTINGS

            modifyRequest: function(request) {
                if (this.restAction === 'POST') {
                    console.log('data', this.data);
                    Ext.apply(request, {
                        jsonData: Ext.JSON.encode(this.searches)
                    });
                }

                return request;
            }
        });
    }
});
