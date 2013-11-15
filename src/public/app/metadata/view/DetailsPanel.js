Ext.define('Savanna.metadata.view.DetailsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.detailspanel',

    requires: ['Savanna.metadata.view.part.InformationPanel'],

    config: {
        itemUri: null
    },

    layout: 'fit',
    collapsible: true,

    header: {
        ui: 'light-blue'
    },
    collapseMode : 'header',
    headerPosition: 'left',
    collapsedCls : 'light-blue',

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function() {
        return [{
            xtype: 'informationpanel',
            itemId: 'informationPanel',
            itemUri: this.getItemUri()
        }]
    },

    updateItemUri: function(newItemUri) {
        this.down('#informationPanel').setItemUri(newItemUri);
    }
});