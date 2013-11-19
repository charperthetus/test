Ext.define('Savanna.map.view.MapComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mapcomponent',

    requires: [
        'Savanna.map.controller.MapController',
        'Ext.layout.container.Border',
        'Savanna.map.view.part.OL3MapComponent',
        'Ext.layout.container.Fit',
        'Savanna.metadata.view.part.InformationPanel',
        'Savanna.map.view.part.DataCard'
    ],

    controller: 'Savanna.map.controller.MapController',

    layout: 'border',

    items: [
        {
            xtype: 'ol3mapcomponent',
            itemId: 'ol3Map',
            region: 'center'
        },
        {
            xtype: 'map_popup_datacard',
            itemId: 'featureDataCard',
            hidden: true
        },
        {
            xtype: 'panel',
            item: 'mapSidePanel',
            region: 'east',
            width: '30%',
            layout: 'fit',
            collapsible: true,
            header: {
                ui: 'light-blue'
            },
            collapseMode : 'header',
            headerPosition: 'left',
            collapsedCls : 'light-blue',

            tbar: [
                {
                    xtype: 'button',
                    glyph: 'addLayer',
                    size: 24,
                    menu: {
                        items: [
                            {
                                itemId: 'addPointFeature',
                                text: 'Add Point Feature'
                            },
                            {
                                itemId: 'drawLineFeature',
                                text: 'Add Line Feature'
                            },
                            {
                                itemId: 'drawPolygonFeature',
                                text: 'Add Polygon Feature'
                            }
                        ]
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'identifyFeature',
                    text: 'Identify'
                },
                {
                    xtype: 'button',
                    itemId: 'modifyFeatureTool',
                    text: 'Modify'
                }
            ],

            items: [
                {
                    xtype: 'panel',
                    itemId: 'featureDetailsView',
                    title: 'Feature View',
                    collapsible: true
                },
                {
                    xtype: 'informationpanel'
                }
            ]
        }
    ]
});