/* global Ext: false */
Ext.define('Savanna.process.view.metadata.ProcessDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.process_details',

    config: {
        label: '',
        description: ''
    },

    initComponent: function() {
        this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function() {
        this.items = [
            {
                xtype: 'textfield',
                itemId: 'processTitle',
                value: this.getLabel(),
                width:'100%'
            },
            {
                xtype: 'textarea',
                itemId: 'processDescription',
                fieldLabel: 'Process Description',
                value: this.getDescription(),
                labelAlign: 'top',
                width:'100%'
            }
        ];
    }

});