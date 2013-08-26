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

    pageSize: Savanna.Config.searchHistoryPageSize,

    autoLoad: false,

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: Savanna.Config.buildSavannaUrl('searchHistoryUrl'),
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,

            writer: {
                type: 'json',
                allowSingle: false
            }
        });
    }
});
