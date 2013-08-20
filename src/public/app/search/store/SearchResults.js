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
            url: Savanna.Config.buildSavannaUrl('searchUrl'),

            reader: {
                type: 'json',
                root: 'results',
                // TODO: this does not appear to be working yet...
                totalProperty: 'totalResults'
            },

            // TODO: we should take one last stab at not having to monkey with the jsonData...
            modifyRequest:function(request) {
                Ext.apply(request, {
                    jsonData: this.jsonData
                });

                return request;
            }
        });
    }
});
