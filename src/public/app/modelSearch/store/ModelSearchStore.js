/**
 * Created with IntelliJ IDEA.
 * User: amartin
 * Date: 9/24/13
 * Time: 9:02 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.modelSearch.store.ModelSearchStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.proxy.Cors'
    ],

    model: 'Savanna.modelSearch.model.ModelSearchModel',

    storeId: 'modelSearchStore',

    pageSize: 20,

    remoteSort: true,

    autoLoad: false,

    searchText: '',

    constructor: function () {
        var ReaderClass = null;

        this.callParent(arguments);

        ReaderClass = Ext.extend(Ext.data.JsonReader, {
            type:'json',
            root: 'modelItems',
            totalProperty:'totalResults'
        });

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.modelSearchUrl,
            reader: new ReaderClass(),

            modifyRequest: function(request) {
                Ext.apply(request, {
                    jsonData: this.jsonData,
                    method:'POST'
                });
                return request;
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
