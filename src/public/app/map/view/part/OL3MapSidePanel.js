Ext.define('Savanna.map.view.part.OL3MapSidePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ol3mapsidepanel',
    requires: [
        'Savanna.map.view.part.OL3MapLayerPanel',
        'Savanna.metadata.view.part.InformationPanel',
        'Savanna.map.view.part.EditFeaturePanel'
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
            xtype: 'editfeaturepanel',
            itemId: 'editFeaturePanel',
            collapsible: true,
            collapsed: true
        },
        {
            xtype: 'informationpanel',
            collapsible: true,
            width: '100%'
        }
    ]
});