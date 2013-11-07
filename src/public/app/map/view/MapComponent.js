Ext.define('Savanna.map.view.MapComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mapcomponent',

    requires: [
        'Savanna.map.controller.MapController',
        'Savanna.map.view.part.OL3MapComponent'
    ],

    controller: 'Savanna.map.controller.MapController',

    layout: 'border',

    items: [{
        xtype: 'ol3mapcomponent',
        itemId: 'ol3Map'
    }]
});