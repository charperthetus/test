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

            // 8/19/2013 (thille) should reads really be a "POST"? What about updates?
            actionMethods: {
                read: 'POST',
                create: 'POST',
                update: 'POST',
                destroy: 'POST'
            },

            // TODO: these params are disabled right now, but we may need them...
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
