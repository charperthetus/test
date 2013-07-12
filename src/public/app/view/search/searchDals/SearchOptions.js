Ext.define('Savanna.view.search.searchDals.SearchOptions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchDals_searchoptions',

    requires: [
        'Ext.form.field.Checkbox'
    ],

    header: false,

    width: '100%',

    padding: 20,

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
            var showButton = config.showButton || null;

            this.down('checkbox').boxLabel = checkboxLabel;
            this.down('label').text = label;

            if (!showButton) {
                this.down('button').hide()
            }
        }, this));
    }
});