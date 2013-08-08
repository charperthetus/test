Ext.define('Savanna.search.store.SearchHistory', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.Config',
        "Savanna.search.model.SearchHistory"
    ],

    storeId: 'searchHistory',

    // does this need to be set?
    pageSize: Savanna.Config.searchHistoryPageSize,

    autoLoad: false,

    model: "Savanna.search.model.SearchHistory",

    searches: [],

    restAction: "POST",

    constructor: function (config) {
        this.callParent(arguments);

        var me = this;

        this.setProxy({
            type: 'rest',
            actionMethods: { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
            //url: Savanna.Config.savannaUrlRoot + "rest/search/history;jsessionid=" + Savanna.jsessionid,
            // Use this if you don't have Savanna 3.4 running
            // NOTE: two tests in SpecRunner fail in this circumstance, but will work once the dev server is up and running
            url: 'app/assets/data/testSearchHistory.json',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            doRequest: function (operation, callback, scope) {
                var writer = this.getWriter(),
                    request = this.buildRequest(operation, callback, scope);
                request = writer.write(request);
                Ext.apply(request, {
                    headers: this.headers,
                    timeout: this.timeout,
                    scope: this,
                    callback: this.createRequestCallback(request, operation, callback, scope),
                    method: this.getMethod(request),
                    disableCaching: false // explicitly set it to false, ServerProxy handles caching
                });
                if (me.restAction == "POST") {
                    Ext.apply(request, {
                        jsonData: Ext.JSON.encode(me.searches)
                    });
                }
                Ext.Ajax.request(request);
                return request;
            },
            reader: {
                type: 'json',
                root: "results"
            },
            writer: {
                type: 'json'
            }
        });
    }
});
