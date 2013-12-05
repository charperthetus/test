Ext.define('Savanna.map.view.part.EditFeatureGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.editfeaturegridpanel',

    requires: [
        'Savanna.map.controller.EditFeatureController',
        'Ext.grid.plugin.RowEditing'
    ],

    config: {
        currentIndex: 0
    },

    controller: 'Savanna.map.controller.EditFeatureController',
    minHeight: 200,
    autoScroll: true,
    sortableColumns: false,
    toFrontOnShow: false,
    hidden: true,

    style: {
        'overflow': "visible"
    },

    columns: [],

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
    ]
});