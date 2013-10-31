Ext.define('Savanna.component.ClassificationPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Savanna.classification.view.ClassificationBanner'
    ],

    config: {
        systemHigh: false,
        itemUri: null
    },

    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [
                {
                    xtype: 'classification_banner',
                    dock: 'top'
                },
                {
                    xtype: 'classification_banner',
                    dock: 'bottom'
                }
            ]
        });
        this.callParent(arguments);
    }
});
