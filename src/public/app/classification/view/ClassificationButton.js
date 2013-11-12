Ext.define('Savanna.classification.view.ClassificationButton', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.classificationbutton',
    requires: ['Savanna.classification.controller.ButtonController'],

    controller: 'Savanna.classification.controller.ButtonController',

    config: {
        portionMarking: null,
        text: 'UNSPECIFIED'
    },

    items: [{
        xtype: 'label',
        itemId: 'label'
    }],

    width: 115,
    height: 17,

    updateText: function(newText) {
        this.fireEvent('updatelabeltext', newText);
    }
});