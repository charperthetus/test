Ext.define('Savanna.map.view.MapComponent', {
    extend: 'Savanna.component.ClassificationPanel',
    alias: 'widget.mapcomponent',

    requires: [
        'Savanna.map.controller.MapController',
        'Ext.layout.container.Border',
        'Savanna.map.view.part.OL3MapPanel',
        'Savanna.map.view.part.OL3MapSidePanel'
    ],

    controller: 'Savanna.map.controller.MapController',

    layout: 'border',

    items: [
        {
            xtype: 'ol3mappanel',
            itemId: 'ol3MapPanel',
            region: 'center'
        },
        {
            xtype: 'ol3mapsidepanel',
            itemId: 'ol3MapSidePanel',
            region: 'east',
            height: '100%',
            width: 300
        }
    ]
});