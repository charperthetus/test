/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/4/13
 * Time: 11:04 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.components.AutoCompleteWithTags', {
    extend: 'Ext.container.Container',

    alias: 'widget.auto_complete_with_tags',

    store: null,

    width: '100%',

    layout: 'vbox',

    config: {
        labelType: '',
        tagValues: null,
        propData: null
    },

    attachedStore: null,

    controller: 'Savanna.itemView.controller.AutoCompleteController',

    requires: 'Savanna.itemView.controller.AutoCompleteController',

    listeners: {
        afterrender: function() {
            if (this.getTagValues()) {
                for (var i = 0; i < this.getTagValues().length; i++) {
                    this.addTerm(this.getTagValues()[i]);
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
        return [
            {
                xtype: 'combo',
                itemId: 'autoCompleteBox',
                displayField: 'title',
                typeAhead: false,
                hideLabel: true,
                hideTrigger: true,
                anchor: '100%',
                width: '100%',
                minChars: 1,
                store: this.store,
//              "fieldLabel": "Intended Uses",
                enableKeyEvents: true,
                emptyText: this.getLabelType(),
                queryMode: 'local'
            },
            {
                xtype: 'container',
                layout: 'column',
                itemId: 'tagsList',
                width: '100%',
                items: []
            }
        ];
    },

    addTerm: function (tag) {
        if (this.queryById('term_' + tag.replace(/[\s'"]/g, "_")) === null) {
            var newTag = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm', {
                itemId: 'term_' + tag.replace(/[\s'"]/g, "_")
            });

            newTag.setTerm(tag);
            this.queryById('tagsList').add(newTag);
        }
    },

    removeTerm: function (view) {
        var myTag = view.itemId;
        this.queryById('tagsList').remove(myTag);
    }
});
