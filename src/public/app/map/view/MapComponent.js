Ext.define('Savanna.map.view.MapComponent', {
    extend: 'Savanna.component.ClassificationPanel',
    alias: 'widget.mapcomponent',

    requires: [
        'Savanna.map.controller.MapController',
        'Ext.layout.container.Border',
        'Savanna.map.view.part.OL3MapPanel',
        'Ext.tree.Panel',
        'Savanna.metadata.view.part.InformationPanel'
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
            xtype: 'panel',
            itemId: 'mapSidePanel',
            region: 'east',
            width: '30%',
            layout: 'anchor',
            collapsible: true,
            header: {
                ui: 'light-blue'
            },
            ui: 'off-white',
            collapseMode : 'header',
            headerPosition: 'left',
            collapsedCls : 'light-blue',

            items: [{
                xtype: 'informationpanel'
            }]
        }
    ]
});