/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 11/7/13
 * Time: 12:59 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.map.view.part.AddFeatureWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.map_add_feature_window',

    layout: 'vbox',
    height: 200,
    width: 350,
    minWidth: 200,
    minHeight: 100,
    closable: true,
    closeAction: 'hide',
    draggable: true,
    floating: true,

    header: {
        title: 'Add Feature'
    },

    tbar: [
        '->',
        {
            xtype: 'button',
            itemId: 'addRandomFeature',
            text: 'Add Random Feature',
            align: 'center',
            listeners: {
                'click' : function () {
                    EventHub.fireEvent('randomFeature', arguments);
                },
                scope: this
            }
        }
    ],

    items: [
        {
            xtype: 'combobox',
            itemId: 'addFeatureSelection',
            fieldLabel: 'Add GeoJSON',
            emptyText: 'Select Type',
            padding: '15 0 0 5',
            store: Ext.create('Ext.data.Store', {
                fields: ['name', 'value'],
                data: [
                    {"name":"Point", "value":"point"},
                    {"name":"Line", "value":"line"},
                    {"name":"Polygon", "value":"polygon"}
                ]
            }),
            valueField: 'value',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                'select' : function () {
                    EventHub.fireEvent('itemSelected', arguments);
                },
                scope: this
            }
        },
        {
            xtype: 'textfield',
            itemId: 'jsonInputField',
            emptyText: 'Paste json here...',
            width: 340,
            padding: '0 0 0 5'
        }
    ],

    bbar: [
        '->',
        {
            xtype: 'button',
            itemId: 'addFeatureToMap',
            disabled: true,
            text: 'Add GeoJSON To Map',
            listeners: {
                'click' : function () {
                    EventHub.fireEvent('addFeature', arguments);
                },
                scope: this
            }
        }
    ],



    initComponent: function () {
        this.callParent();
    }
});
