/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 9/13/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultsDals_resultsterms',
    controller: 'Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsRefineTermsController',
    requires: [
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm'
    ],

    minHeight: 5,
    width: '100%',
    border: false,

    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);

    },

    setupItems: function () {

        return [
            {
                xtype: 'panel',
                itemId: 'termValues',
                items: [],
                width: '100%',
                minHeight: 5,
                layout: 'auto',
                border: false
            }
        ]
    },

    addTerm: function (field) {

        if (this.queryById('term_' + field.getValue()) === null) {
            var refineTerm = Ext.create('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm', {
                itemId: 'term_' + field.getValue()
            });
            refineTerm.setTerm(field.getValue());

            this.queryById('termValues').add(refineTerm);

            var termWidth = (refineTerm.queryById('termValue').getWidth() + refineTerm.queryById('removeTerm').getWidth() + 6);
            refineTerm.setWidth(termWidth);
        }
        field.setValue('');
    }


});
