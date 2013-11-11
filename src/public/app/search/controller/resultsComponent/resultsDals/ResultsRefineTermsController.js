/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineTermsController',
    {
        extend: 'Deft.mvc.ViewController',

        init: function () {
            this.getView().on('Tag:RemoveSearchTerm', this.onRemoveSearchTerm, this);
            return this.callParent(arguments);
        },

        onRemoveSearchTerm: function ( termString, termComponent ) {
            var myValue = termString + ' AND ',
                searchComponent = this.getView().findParentByType('search_searchcomponent'),
                newSearch = searchComponent.refineSearchString.replace(myValue, '');

            searchComponent.refineSearchString = newSearch;
            console.log(searchComponent);
            termComponent.destroy();

            var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            if (searchController !== undefined) {
                searchController.doSearch(this.getView());
            }
        }
    }
);