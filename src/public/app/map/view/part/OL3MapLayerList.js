Ext.define('Savanna.map.view.part.OL3MapLayerList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.ol3maplayerlist',
    requires: [
        'Ext.tree.Column',
        'Ext.grid.column.Action',
        'Savanna.map.store.LayerStore'
    ],

    lines: false,
    rootVisible: false,
    hideHeaders: true,

    columns: [{
        xtype: 'treecolumn',
        text: 'Layer',
        dataIndex: 'layerLabel',
        flex: 1
    }],

    initComponent: function() {
        this.store = Ext.create('Savanna.map.store.LayerStore');
        this.callParent();
    }
});