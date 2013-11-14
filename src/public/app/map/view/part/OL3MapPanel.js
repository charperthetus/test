Ext.define('Savanna.map.view.part.OL3MapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ol3mappanel',

    requires: [
        'Savanna.map.view.part.OL3MapToolbar',
        'Savanna.map.view.part.OL3MapComponent'
    ],

    tbar: {
        xtype: 'ol3maptoolbar',
        itemId: 'ol3MapToolbar'
    },

    items: [{
        xtype: 'ol3mapcomponent',
        itemId: 'ol3Map'
    }]
});