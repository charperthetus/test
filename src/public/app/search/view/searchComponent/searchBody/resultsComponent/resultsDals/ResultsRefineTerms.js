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

    minHeight:30,
    minWidth:200,


    initComponent:function()    {
        this.callParent(arguments);
    },

    items: [
        {
            xtype: 'panel',
            itemId:'termValues',
            items:[],
            width:200,
            minHeight:30
        }
    ],
    addTerm:function(field)  {
        if(this.queryById('term_' + field.getValue()) === null)   {
            var refineTerm = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm',     {
                itemId:'term_' + field.getValue()
            });
            refineTerm.setTerm(field.getValue());
            this.queryById('termValues').add(refineTerm);
        }
        field.setValue('');
    },
    removeTerm:function(term)   {
        this.remove(term.itemId);
    }
});