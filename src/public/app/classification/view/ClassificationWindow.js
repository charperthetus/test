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
    cls: "classification",

    layout: 'anchor',
    width: 480,
    height: 526,
    padding:15,
    ghost: false,
    constrain: true,

    bbar: [
        '->',
        {
            xtype: 'button',
            itemId: 'finishButton',
            text: 'OK',
            ui: 'commit'
        },
        {
            xtype: 'button',
            itemId: 'cancelButton',
            text: 'Cancel'
        }
    ],

    items: [{
        xtype: 'fieldcontainer',
        layout: 'anchor',
        anchor: '100%',
        defaults: {
            layout: "100%"
        },
        fieldDefaults: {
            labelAlign: 'top',
            labelWidth: 100
        },
        items: [
        {
            xtype: 'label',
            itemId: 'errorLabel',
            hidden: true,
            cls:'errorLabel',
            anchor: '100%'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Classification',
            itemId: 'classificationField',
            queryMode: 'local',
            store: {
                fields: ['id', 'displayLabel']
            },
            displayField: 'displayLabel',
            valueField: 'id',
            allowBlank: false,
            editable: false,
            anchor: '100%'
        },
        {
            xtype: 'boxselect',
            fieldLabel: 'SCI',
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
            anchor: '100%'
        },
        {
            xtype: 'boxselect',
            fieldLabel: 'FGI',
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
            anchor: '100%'
        },
        {
            xtype: 'boxselect',
            fieldLabel: 'Dissemination',
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
            anchor: '100%'
        },
        {
            xtype: 'boxselect',
            fieldLabel: 'Release TO',
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
            anchor: '100%'
        }
    ]
}
]
});