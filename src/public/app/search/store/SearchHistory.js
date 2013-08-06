Ext.define('Savanna.search.store.SearchHistory', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.Config',
        "Savanna.search.model.SearchHistory"
    ],

    storeId: 'searchHistory',

    // does this need to be set?
    pageSize: 10,

    autoLoad: false,

    model:"Savanna.search.model.SearchHistory",

    searches:[],

    constructor: function (config) {
        this.callParent(arguments);
    },
    onHistory:function(mdl, act)   {
        var me = this;
        this.searches.push(mdl.data)
        this.setProxy({
            type: 'rest',
            method:me.restAction,
            url: Savanna.Config.savannaUrlRoot + "rest/search/history;jsessionid=" + Savanna.jsessionid,
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
                    method: act,
                    disableCaching: false // explicitly set it to false, ServerProxy handles caching
                });
                if(act == "POST") {
                    Ext.apply(request, {
                        jsonData:Ext.JSON.encode(me.searches)
                    });
                }
                Ext.Ajax.request(request);
                return request;
            },
            reader: {
                type: 'json',
                root:"results"
            },
            writer: {
                type: 'json'
            }
        });
        this.load({
            callback:this.onCallback
        });
    },
    onCallback:function(records, operation, success)   {
        var toolbar = Savanna.getApplication().viewport.queryById("main").down("#searchtoolbar");
        toolbar.ctrl.logHistory(this.searches, toolbar);
    }
});
