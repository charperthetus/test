Ext.define('Savanna.map.view.MapComponent', {
    extend: 'Savanna.component.ClassificationPanel',
    alias: 'widget.mapcomponent',

    requires: [
        'Savanna.map.controller.MapController',
        'Ext.layout.container.Border',
        'Savanna.map.view.part.OL3MapComponent',
        'Ext.layout.container.Fit',
        'Savanna.metadata.view.part.InformationPanel'
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

            items: [{
                xtype: 'informationpanel'
            }]
        }
    ]
});