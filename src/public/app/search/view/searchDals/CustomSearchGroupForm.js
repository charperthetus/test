Ext.define('Savanna.search.view.searchDals.CustomSearchGroupForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.search_searchDals_custom-search-group-form',

    requires: [
        'Savanna.search.view.searchDals.CustomGroup'
    ],

    store: null,

    items: [],

    constructor: function(config) {
        config = config || {};

        this.callParent(arguments);

        var me = this;

        this.store = config.store;

        this.store.each(function(record) {
            me.add(Ext.create('Savanna.search.view.searchDals.CustomGroup', { model: record }));
        });
    }
});
