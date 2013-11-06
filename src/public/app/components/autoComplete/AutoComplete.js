/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/4/13
 * Time: 11:04 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.components.autoComplete.AutoComplete', {
    extend: 'Ext.container.Container',

    alias: 'widget.auto_complete',

    store: null,

    width: '100%',

    layout: 'vbox',

    config: {
        labelType: '',
        tagValues: null,
        showTags: false,
        hasNoStore: false,
        preLabel: '',
        isClosable: false,
        hasControls: false
    },

    attachedStore: null,

    controller: 'Savanna.components.autoComplete.AutoCompleteController',

    requires: [
        'Savanna.components.autoComplete.AutoCompleteController',
        'Savanna.components.tags.Tag'
    ],

    listeners: {
        afterrender: function() {
            if (this.getTagValues()) {
                for (var i = 0; i < this.getTagValues().length; i++) {
                    this.addTag(this.getTagValues()[i]);
                }
            }
        }
    },

    constructor: function(configs) {
        this.callParent(arguments);
        this.initConfig(configs);  //initializes configs passed in constructor
    },

    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
    },

    buildItems: function() {
        // If autocomplete has additional controls, generate a space to insert them.
        var closeButton = (this.getIsClosable()) ? Ext.create('Ext.button.Button', { glyph: 'closeRollover', itemId: 'closeautocomplete', height:43,
            cls:'edit-qualities-button' }) : {};

        return [
            {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                items: [
                    {
                        xtype: 'combo',
                        itemId: 'autoCompleteBox',
                        displayField: 'label',
                        typeAhead: false,
                        hideTrigger: true,
                        anchor: '100%',
                        flex: 2,
                        queryParam: 'q',
                        minChars: 1,
                        store: this.store,
                        fieldLabel: this.getPreLabel(),
                        enableKeyEvents: true,
                        emptyText: this.getLabelType(),
                        queryMode: 'remote',
                        anyMatch: true
                    },
                    closeButton
                ]
            },
            {
                xtype: 'container',
                layout: 'column',
                itemId: 'tagsList',
                width: '100%',
                items: [],
                margin:'1 0 0 0'
            }
        ];
    },

    addTag: function (tag) {
        var newTag = Ext.create('Savanna.components.tags.Tag');
        newTag.setTerm(tag);
        this.queryById('tagsList').add(newTag);
    },

    removeTag: function (view) {
        view.destroy();
    },

    clearTags: function () {
        this.queryById('tagsList').removeAll();
    }
});
