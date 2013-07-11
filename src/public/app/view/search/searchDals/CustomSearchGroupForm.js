Ext.define('Savanna.view.search.searchDals.CustomSearchGroupForm', {
    extend: 'Ext.Component',
    alias: 'widget.search_searchDals_customsearchgroupform',

    record: null,

    html: 'booo',

    initComponent: function() {
        this.store = this.initialConfig.store;

        console.log('store', this.store);

        this.callParent(arguments);
    }
});