/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineTermsController',
    {
        extend: 'Deft.mvc.ViewController',

        init: function () {
            this.getView().on('Search:RemoveSearchTerm', this.onRemoveSearchTerm, this);
            return this.callParent(arguments);
        },

        onRemoveSearchTerm: function ( termString, termComponent ) {

            var myValue = termString + ' AND ';

            var searchComponent = this.getView().findParentByType('search_searchcomponent');
            searchComponent.refineSearchString = searchComponent.refineSearchString.replace(myValue, '');
            this.getView().queryById('termValues').remove(termComponent);

            var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            if (searchController !== undefined) {
                searchController.doSearch(this.getView());
            }
        }


    }
);