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
            xtype: 'map_add_feature_window',
            itemId: 'createFeatureWindow',
            hidden: true
        },
        {
            xtype: 'map_popup_datacard',
            itemId: 'featureDataCard',
            hidden: true
        }
    ],

    tbar: [
        {
            xtype: 'button',
            itemId: 'addPointWindow',
            text: 'Add Feature Menu'
        },
        '-',
        {
            xtype: 'button',
            itemId: 'removeSelectedFeature',
            text: 'Remove Selected Features'
        },
        '->',
        {
            xtype: 'button',
            itemId: 'addPointFeature',
            text: 'Add Point Feature',
            toolInUse: false
        },
        '-',
        {
            xtype: 'button',
            itemId: 'drawLineFeature',
            text: 'Add Line Feature',
            toolInUse: false
        },
        '-',
        {
            xtype: 'button',
            itemId: 'drawPolygonFeature',
            text: 'Add Polygon Feature',
            disabled: true
        }
    ]
});