/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.controller.ResultsComponent', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.search.view.searchComponent.searchBody.ResultsComponent'
    ],
    init: function () {

        this.control({
            'search_resultscomponent panel[cls=results-dal]': {
                'render': this.onDalRender
            },
            'search_resultscomponent #resultsPageSizeCombobox':   {
                select: this.onPageComboChange
            },
            'search_resultscomponent #resultsSortByCombobox':   {
                select: this.onSortByChange
            },
            'search_resultscomponent #resultsFacetsReset':  {
                'click': this.onDalReset
            }
        });
    },

    onDalRender: function (dal) {
        dal.body.on('click', this.changeSelectedStore, this, dal);
    },

    onDalReset:function(btn)   {
        var id = btn.findParentByType('search_resultscomponent').currentResultSet.id;
        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id);
        dalRecord.data.facetFilterCriteria = [];
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        searchController.doSearch(btn);
    },

    onSortByChange:function(combo){
        /*
        this is a placeholder at the moment - not sure what the available sort options
        will be, and only 'relevance' appears in the comps and flex client version.
         */
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        searchController.doSearch(combo);
    },

    onPageComboChange:function(combo){
        // just need to trigger a new search
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        searchController.doSearch(combo);
    },

    /*
    tried to give this a more intuitive name - it swaps the store assigned to our grid
    based on whichever DAL the user selects from the left-hand panel, and triggers an update
    of the facets for the newly selected store.
     */
    changeSelectedStore:function(evt, body, dal) {
        var component = dal.findParentByType('search_resultscomponent');
        var me = this;

        Ext.each(component.allResultSets, function(set) {
            if(set.id === dal.itemId)    {
                component.queryById('resultspanel').updateGridStore(set);

                me.displayDalFacets(dal);
                component.currentResultSet = set;
                return false;
            }
        });
    },

    displayDalFacets: function (dal) {
        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(dal.itemId),
            descriptions = dalRecord.data.facetDescriptions,
            facets = dal.up('#resultsdals').queryById('resultsfacets'),
            me = this;

        facets.removeAll();

        if (descriptions.length > 0) {
            Ext.each(descriptions, function (facet) {
                var facetElement = me.createFacet(facet, dal.findParentByType('search_resultscomponent').currentResultSet, dalRecord);
                facets.add(facetElement);
            });
        }
    },

    createFacet: function (facet, results, dalRecord) {
        return Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
            model: facet,
            set:results,
            dal: dalRecord
        });
    }
});