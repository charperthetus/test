Ext.define('Savanna.view.search.searchDals.SearchOptions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchDals_searchoptions',

    header: false,

    width: '100%',
    height: 100,

    itemId: 'NO_ID',

    items: [{
        xtype: 'checkbox',
        boxLabel: 'NO LABEL'
    }, {
        xtype: 'label',
        text: 'NO LABEL'
    },{
        xtype: 'button',
        itemId: 'searchOptionsToggle',
        text: 'Show Search Options'
    }],

    initComponent: function() {
        this.callParent(arguments);

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};
            var checkboxLabel = config.checkboxLabel || 'NO LABEL';
            var label = config.label || 'NO LABEL';

            this.down('checkbox').boxLabel = checkboxLabel;
            this.down('label').text = label;
        }, this));
    }
});