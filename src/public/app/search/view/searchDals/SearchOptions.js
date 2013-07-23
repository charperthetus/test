Ext.define('Savanna.search.view.searchDals.SearchOptions', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchDals_searchoptions',

    requires: [
        'Ext.form.field.Checkbox'
    ],

    header: false,

    width: '100%',

    itemId: 'NO_ID',

    cls: 'search-dal',

    layout: {
        type: 'hbox'
    },

    items: [{
        xtype: 'checkbox',
        boxLabel: 'NO LABEL',
        flex: 1
    }, {
        flex: 3,
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'label',
            text: 'NO LABEL',
            flex: 2
        },
        {
            xtype: 'button',
            itemId: 'searchOptionsToggle',
            text: 'Show Search Options',
            flex: 1
        }]
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
