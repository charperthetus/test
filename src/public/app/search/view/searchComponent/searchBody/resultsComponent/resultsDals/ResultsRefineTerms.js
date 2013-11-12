/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 9/13/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms', {
    extend: 'Ext.container.Container',
    alias: 'widget.search_resultsDals_resultsterms',
    controller: 'Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineTermsController',
    requires: [
        'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm',
        'Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineTermsController',
        'Savanna.components.tags.Tag'
    ],

    addTerm: function (field) {
        if (this.queryById('term_' + field.getValue()) === null) {
            var refineTerm = Ext.create('Savanna.components.tags.Tag', {
                itemId: 'term_' + field.getValue(),
                cls:'refine-term'
            });

            refineTerm.setTerm(field.getValue());
            this.add(refineTerm);

            var termWidth = (refineTerm.getWidth());
            refineTerm.setWidth(termWidth);
        }
        field.setValue('');
    }
});