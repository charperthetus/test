Ext.define('Savanna.map.view.MapComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mapcomponent',

    requires: [
        'Savanna.map.controller.MapController',
        'Savanna.map.view.part.OL3MapComponent',
        'Savanna.map.view.part.DataCard'
    ],

    controller: 'Savanna.map.controller.MapController',

    layout: 'border',

    items: [
        {
            xtype: 'ol3mapcomponent',
            itemId: 'ol3Map'
        },
        {
            xtype: 'map_popup_datacard',
            itemId: 'featureDataCard',
            hidden: true
        },
        {
            xtype: 'map_edit_feature',
            itemId: 'editFeatureWindow',
            hidden: true
        }
    ],

    tbar: [
        {
            xtype: 'button',
            itemId: 'removeSelectedFeature',
            text: 'Remove Selected Features'
        },
        '->',
        {
            xtype: 'button',
            itemId: 'addPointFeature',
            text: 'Add Point Feature'
        },
        '-',
        {
            xtype: 'button',
            itemId: 'drawLineFeature',
            text: 'Add Line Feature'
        },
        '-',
        {
            xtype: 'button',
            itemId: 'drawPolygonFeature',
            text: 'Add Polygon Feature'
        }
    ]
});