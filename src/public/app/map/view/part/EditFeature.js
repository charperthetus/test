/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 11/14/13
 * Time: 9:04 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.map.view.part.EditFeature', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.map_edit_feature',

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
            xtype: 'button',
            itemId: 'previousFeature',
            text: '<',
            direction: 'prev',
            disabled: true
        },
        '->',
        {
            xtype: 'button',
            itemId: 'nextFeature',
            text: '>',
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

    initComponent: function () {
        this.callParent(arguments);
    },

    onRender: function () {
        this.callParent(arguments);
    }
});