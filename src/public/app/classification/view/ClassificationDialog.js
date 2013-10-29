Ext.define('Savanna.classification.view.ClassificationDialog', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.classification_dialog',
    requires: [
        'Savanna.classification.controller.DialogController',
        'Savanna.component.BoxSelect'
    ],

    controller: 'Savanna.classification.controller.DialogController',

    layout: 'vbox',

    bbar: [
        '->',
        {
            xtype: 'button',
            itemId: 'okButton',
            text: 'OK',
            ui: 'commit'
        },
        {
            xtype: 'button',
            itemId: 'cancelButton',
            text: 'Cancel'
        }
    ],

    items: [
        {
            xtype: 'label',
            itemId: 'errorLabel',
            hidden: true
        },
        {
            xtype: 'label',
            text: 'Classification'
        },
        {
            xtype: 'combo',
            itemId: 'classificationField',
            queryMode: 'local',
            store: {
                fields: ['id', 'displayLabel']
            },
            displayField: 'displayLabel',
            valueField: 'id',
            editable: false,
            width: '100%'
        },
        {
            xtype: 'label',
            text: 'SCI'
        },
        {
            xtype: 'boxselect',
            itemId: 'sciField',
            queryMode: 'local',
            store: {
                fields: ['id', 'displayLabel']
            },
            displayField: 'displayLabel',
            valueField: 'id',
            triggerOnClick: false,
            filterPickList: true,
            pinList: false,
            grow: true,
            width: '100%'
        },
        {
            xtype: 'label',
            text: 'FGI'
        },
        {
            xtype: 'boxselect',
            itemId: 'fgiField',
            queryMode: 'local',
            store: {
                fields: ['text']
            },
            valueField: 'text',
            triggerOnClick: false,
            filterPickList: true,
            pinList: false,
            grow: true,
            width: '100%'
        },
        {
            xtype: 'label',
            text: 'Dissemination'
        },
        {
            xtype: 'boxselect',
            itemId: 'disField',
            queryMode: 'local',
            store: {
                fields: ['id', 'displayLabel']
            },
            displayField: 'displayLabel',
            valueField: 'id',
            triggerOnClick: false,
            filterPickList: true,
            pinList: false,
            grow: true,
            width: '100%'
        },
        {
            xtype: 'label',
            text: 'Release TO'
        },
        {
            xtype: 'boxselect',
            itemId: 'relField',
            queryMode: 'local',
            store: {
                fields: ['text']
            },
            valueField: 'text',
            triggerOnClick: false,
            filterPickList: true,
            pinList: false,
            grow: true,
            width: '100%'
        }
    ]
});