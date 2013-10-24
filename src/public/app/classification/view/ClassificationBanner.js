Ext.define('Savanna.classification.view.ClassificationBanner', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.classification_banner',

    controller: 'Savanna.classification.controller.BannerController',
    width: '100%',
    height: '20',
    items: [{
        xtype: 'label',
        itemId: 'label'
    }]
});
