Ext.define('Savanna.component.ClassificationPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Savanna.classification.view.ClassificationBanner'
    ],

    config: {
        itemURI: null
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
