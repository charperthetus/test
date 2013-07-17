Ext.define('Savanna.search.view.searchDals.CustomGroup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.searchDals_custom-group',

    requires: [
        'Ext.form.field.ComboBox'
    ],

    // NOTE: Been trying to figure out how to configure the collapse to be left-aligned and this appears to be the best candidate (though it is all CSS)
    //       http://www.sencha.com/forum/showthread.php?91512-moving-toggle-button-to-the-left
    collapsible: true,
    collapsed: true,

    items: [],

    model: null,

    constructor: function(config) {
        config = config || {};

        this.callParent(arguments);

        var me = this;

        this.model = config.model;

        if (this.model) {
            this.title = this.model.get('displayLabel');

            this.model.customSearchParameters().each(function(record) {
               me.add(me.buildFormXtype(record));
            });
        }
    },

    // CUSTOM METHODS

    buildFormXtype: function(record) {
        var config = {
            xtype: 'textfield',
            fieldLabel: record.get('displayLabel'),
            name: record.get('id')
        },
        list = record.get('list');

        if (list) {
            config.xtype = 'combobox';
            config.store = Ext.create('Ext.data.Store', { fields: ['name','value'], data: list.map(function(choice){return {name:choice,value:choice}}) });
            config.valueField = 'value';
            config.displayField = 'value';
            config.forceSelection = true;
            config.queryMode = 'local';
        }

        return config;
    }
});