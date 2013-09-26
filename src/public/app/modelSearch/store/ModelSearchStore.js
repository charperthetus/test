/**
 * Created with IntelliJ IDEA.
 * User: amartin
 * Date: 9/24/13
 * Time: 9:02 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.modelSearch.store.ModelSearchStore', {
    extend: 'Ext.data.JsonStore',

    model: 'Savanna.modelSearch.model.ModelSearchModel',

    storeId: 'modelSearchStore',

    pageSize: 20,

    remoteSort: true,

    autoLoad: false,

    searchText: '',

    constructor: function() {
        this.callParent(arguments);

        savannaUrl = SavannaConfig.savannaUrlRoot;

        // HACK: we have to set the proxy manually because for some reason the config is not read by default
        this.setProxy({
            type: 'rest',
            actionMethods: { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
            url: SavannaConfig.modelSearchUrl,
            buildUrl: function (request) {
                return this.getUrl(request) + ';jsessionid=' + Savanna.jsessionid;
            },
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            doRequest: function (operation, callback, scope) {
                var writer = this.getWriter(),
                    request = this.buildRequest(operation, callback, scope);

                if (operation.allowWrite()) {
                    request = writer.write(request);
                }

                Ext.apply(request, {
                    headers: this.headers,
                    timeout: this.timeout,
                    scope: this,
                    callback: this.createRequestCallback(request, operation, callback, scope),
                    method: this.getMethod(request),
                    jsonData: this.jsonData,
                    disableCaching: false // explicitly set it to false, ServerProxy handles caching
                });

                Ext.Ajax.request(request);
                return request;
            },
            reader: {
                type: 'json',
                root: 'modelItems',
                totalProperty: 'totalResults'
            },
            writer: {
                type: 'json'
            }
        });
    },

    listeners: {
        beforeload: function(store, operation) {
            store.proxy.jsonData = {
                searchId: 0,
                startIndex: (operation.page - 1) * operation.limit,
                pageSize: operation.limit,
                filters: [{
                    _type:'com.thetus.services.model.search.objects.filters.KeywordFilter',
                    keywords: this.searchText ? [this.searchText] : [],
                    displayName: 'Keyword',
                    isActive: true
                }]
            };

        }

    }
});
