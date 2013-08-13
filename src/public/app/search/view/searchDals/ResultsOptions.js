Ext.define('Savanna.search.view.searchDals.ResultsOptions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchDals_resultsoptions',

    requires: [
        'Ext.form.field.Checkbox'
    ],

    header: false,

    width: '100%',

    itemId: 'dalSearchOptions',

    cls: 'search-dal',

    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};
            this.down('checkbox').boxLabel = config.checkboxLabel || 'NO LABEL';
        }, this));
    },
    setupItems: function() {
        return [
            {
                xtype: 'checkbox',
                itemId: 'includeDalCheckBox',
                boxLabel: 'NO LABEL',
                cls: 'dal-checkbox'
            }
        ]
    }
});