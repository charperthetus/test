Ext.define('Savanna.component.ClassificationPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Savanna.classification.view.ClassificationBanner'
    ],

    config: {
        itemUri: null
    },

    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [{
                xtype: 'classification_banner',
                dock: 'top'
            }]
        });
        this.callParent(arguments);
    }
});
