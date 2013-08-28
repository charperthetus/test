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
        'Savanna.search.view.ResultsComponent'
    ],
    init: function () {

        this.control({
            'search_resultscomponent panel[cls=results-dal]': {
                'render': this.onDalRender
            }
        });
    },

    onDalRender: function (dal) {
        dal.body.on('click', this.changeSelectedStore, this, dal);
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
            }
        });
    },

    displayDalFacets: function (dal) {
        var record = Ext.data.StoreManager.lookup('dalSources').getById(dal.itemId),
            descriptions = record.data.facetDescriptions,
            facets = dal.up('#resultsdals').queryById('resultsfacets'),
            me = this;

        facets.removeAll();

        if (descriptions.length > 0) {
            Ext.each(descriptions, function (facet) {
                var facetElement = me.createFacet(facet);
                facets.add(facetElement);
            });
        }
    },

    createFacet: function (facet) {
        return Ext.create('Savanna.search.view.resultsDals.ResultsFacet', {
            model: facet
        });
    }
});