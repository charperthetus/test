/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 9/13/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms', {
    extend: 'Ext.panel.Panel',
    alias:'widget.search_resultsDals_resultsterms',

    requires:   [
        'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm'
    ],

    minHeight:5,
    width:'100%',
    border:false,

    items: [
        {
            xtype: 'panel',
            itemId:'termValues',
            items:[],
            width:'100%',
            minHeight:5,
            layout:'auto',
            border:false
        }
    ],

    addTerm:function(field)  {

        if(this.queryById('term_' + field.getValue()) === null)   {
            var refineTerm = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm',     {
                itemId:'term_' + field.getValue()
            });
            refineTerm.setTerm(field.getValue());

            this.queryById('termValues').add(refineTerm);

            var termWidth = (refineTerm.queryById('termValue').getWidth() + refineTerm.queryById('removeTerm').getWidth() + 6);
            refineTerm.setWidth(termWidth);
        }
        field.setValue('');
    },

    removeTerm:function(closeButton)   {
        var myTerm = this.queryById(closeButton.up('panel[cls=refine-term]').itemId),
            myValue = myTerm.queryById('termValue').text + ' AND ';

        this.findParentByType('search_searchcomponent').refineSearchString = this.findParentByType('search_searchcomponent').refineSearchString.replace(myValue, '');
        this.queryById('termValues').remove(myTerm);

        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

        if (searchController !== undefined) {
            searchController.doSearch(this);
        }
    }
});