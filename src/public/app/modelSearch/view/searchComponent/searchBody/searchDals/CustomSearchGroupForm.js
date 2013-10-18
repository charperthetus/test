Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.searchDals.CustomSearchGroupForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.model_search_searchDals_custom-search-group-form',

    requires: [
        'Savanna.modelSearch.view.searchComponent.searchBody.searchDals.CustomGroup'
    ],

    store: null,

    items: [],

    constructor: function(config) {
        config = config || {};

        this.callParent(arguments);

        var me = this;

        this.store = config.store;

        this.store.each(function(record) {
            me.add(Ext.create('Savanna.modelSearch.view.searchComponent.searchBody.searchDals.CustomGroup', { model: record }));
        });
    }
});
