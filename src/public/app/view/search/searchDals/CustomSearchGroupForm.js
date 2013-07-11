Ext.define('Savanna.view.search.searchDals.CustomSearchGroupForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.search_searchDals_custom-search-group-form',

    requires: [
        'Savanna.view.search.searchDals.CustomGroup'
    ],

    store: null,

    items: [],

    constructor: function(config) {
        config = config || {};

        var me = this;

        this.store = config.store;

        this.store.each(function(record) {
            me.items.push(Ext.create('Savanna.view.search.searchDals.CustomGroup', { model: record }));
        });

        console.log('items', this.items);

        this.callParent(arguments);
    }
});