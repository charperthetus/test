Ext.define('Savanna.view.search.searchDals.CustomSearchGroupForm', {
    extend: 'Ext.Component',
    alias: 'widget.search_searchDals_customsearchgroupform',

    record: null,

    html: 'booo',

    initComponent: function() {
        this.record = this.initialConfig.record;

        console.log('record', this.record);

        this.callParent(arguments);
    }
});