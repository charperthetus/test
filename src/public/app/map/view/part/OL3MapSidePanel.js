Ext.define('Savanna.map.view.part.OL3MapSidePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ol3mapsidepanel',
    requires: [
        'Savanna.map.view.part.OL3MapLayerPanel',
        'Savanna.metadata.view.part.InformationPanel'
    ],

    layout: 'vbox',
    overflowY: 'auto',
    collapsible: true,

    header: {
        ui: 'light-blue'
    },
    collapsedCls : 'light-blue',
    collapseMode : 'header',
    headerPosition: 'left',
    cls: 'off-white-bg',

    items: [
        {
            xtype: 'ol3maplayerpanel',
            itemId: 'ol3MapLayerPanel'
        },
        {
            xtype: 'informationpanel',
            collapsible: true,
            width: '100%'
        }
    ]
});