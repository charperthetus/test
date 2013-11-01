Ext.define('Savanna.classification.view.ClassificationWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'Savanna.classification.controller.WindowController',
        'Savanna.component.BoxSelect'
    ],

    controller: 'Savanna.classification.controller.WindowController',

    config: {
        portionMarking: null
    },

    title: 'Edit Classification',

    layout: 'vbox',
    width: 480,
    height: 526,

    bbar: [
        '->',
        {
            xtype: 'button',
            itemId: 'finishButton',
            text: 'Finish',
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
            allowBlank: false,
            forceSelection: true,
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