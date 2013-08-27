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
    init: function (app) {

        this.control({
            "search_resultscomponent panel[cls=search-dal]": {
                "render": this.onDalRender
            }
        })
    },

    onDalRender: function (dal, evt) {
        dal.body.on('click', this.displayDalFacets, this, dal);
    },

    displayDalFacets: function (evt, body, dal) {
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
        } else {
            // indicate that there are no facets in UI...
        }
    },

    createFacet: function (facet) {
        return Ext.create('Savanna.search.view.resultsDals.ResultsFacet', {
            model: facet
        });
    }
});