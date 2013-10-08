/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/4/13
 * Time: 11:04 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.components.AutoCompleteWithTags', {
    extend: 'Ext.container.Container',

    alias: 'widget.auto_complete_with_tags',

    width: '100%',

    layout: 'vbox',

    config: {
        labelType: ''
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
                xtype: 'textfield',
                itemId: 'auto_complete_text_box',
                width: '100%',
                enableKeyEvents: true,
                emptyText: this.getLabelType()
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
            var refineTerm = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm', {
                itemId: 'term_' + tag.replace(/[\s'"]/g, "_")
            });

            refineTerm.setTerm(tag);
            this.queryById('tagsList').add(refineTerm);
        }
    },

    removeTerm: function (closeButton) {
        var myTerm = this.queryById(closeButton.up('search_resultsDals_resultsterm').itemId);
        this.queryById('tagsList').remove(myTerm);
    }
});
