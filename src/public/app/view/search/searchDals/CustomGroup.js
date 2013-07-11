Ext.define('Savanna.view.search.searchDals.CustomGroup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchDals_custom-group',

    // NOTE: Been trying to figure out how to configure the collapse to be left-aligned and this appears to be the best candidate (though it is all CSS)
    //       http://www.sencha.com/forum/showthread.php?91512-moving-toggle-button-to-the-left
    collapsible: true,

    items: [],

    model: null,

    constructor: function(config) {
        config = config || {};

        var me = this;

        this.model = config.model;

        if (this.model) {
            this.title = this.model.get('displayLabel');

            this.model.customSearchParameters().each(function(record) {
               me.items.push({
                   xtype: 'textfield',
                   fieldLabel: record.get('displayLabel'),
                   name: record.get('id')
               });
            });
        }

        this.callParent(arguments);
    }
});