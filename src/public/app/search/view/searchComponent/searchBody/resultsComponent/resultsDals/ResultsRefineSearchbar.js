/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 9/13/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineSearchbar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsDals_resultsrefine',

    requires: [
        'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms'
    ],


    initComponent: function () {
        this.callParent(arguments);
    },

    items: [
        {
            xtype: 'panel',
            itemId: 'refine_search_panel',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    width: 180,
                    fieldLabel: '',
                    name: 'refine_search_terms',
                    itemId: 'refine_search_terms',
                    enableKeyEvents: true,
                    emptyText: 'Search'
                },
                {
                    xtype: 'button',
                    itemId: 'refine_search_submit',
                    glyph: 61808
                }
            ]
        }
    ]

});