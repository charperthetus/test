Ext.define('Savanna.map.view.part.EditFeaturePanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.editfeaturepanel',

    requires: [
        'Savanna.map.controller.EditFeatureController',
        'Ext.grid.plugin.RowEditing'
    ],

    title: 'Edit Feature',
    header: {
        ui: 'off-white'
    },
    collapsible: true,
    width: '100%',

    config: {
        currentIndex: 0
    },

    controller: 'Savanna.map.controller.EditFeatureController',
    sortableColumns: false,

    style: {
        'overflow': "visible"
    },

    columns: [
        {
            text: 'Field Name',
            dataIndex: 'field',
            flex: 1,
            menuDisabled: true
        },
        {
            text: 'Value',
            dataIndex: 'value',
            flex: 1,
            editor: 'textfield'
        }
    ],

    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 1
    })],

    tbar: [
        {
            xtype: 'label',
            itemId: 'featureIndexDisplay'
        },
        '->',
        {
            xtype: 'button',
            itemId: 'previousFeature',
            text: 'Previous',
            direction: 'prev',
            disabled: true
        },
        '-',
        {
            xtype: 'button',
            itemId: 'nextFeature',
            text: 'Next',
            direction: 'next'
        }
    ],

    bbar: [
        {
            xtype: 'button',
            itemId: 'removeFeature',
            text: 'Remove Feature'
        },
        '->',
        {
            xtype: 'button',
            itemId: 'submitEditFeature',
            text: 'Submit'
        }
    ],

    initComponent: function() {
        this.callParent(arguments);
        this.store = Ext.create('Ext.data.Store', {
            fields: ['field', 'value'],
            data: {},
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'item'
                }
            }
        });
    }
});