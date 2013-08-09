/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.controller.ResultsComponent', {
    extend: 'Ext.app.Controller',

    requires: [
        "Savanna.search.model.SearchRequest",
        "Savanna.search.model.SearchHistory",
        'Savanna.search.store.SearchResults',
        'Savanna.search.store.SearchHistory'
    ],

    models: [

    ],
    stores: [
        // coming soon...
    ],

    views: [
        'Savanna.search.view.ResultsComponent'
    ],

    refs: [

    ],

    init: function (app) {
        this.control({
            "search_resultscomponent > #resultssources": {
                render: function (elem, evt) {

                }
            },
            "search_resultscomponent > #resultspanel": {
                render: function (elem, evt) {

                }
            },
            "search_resultscomponent > #resultspanel #resultspaneltoolbar": {
                render: function (elem, evt) {

                }
            },
            "search_resultscomponent > #resultspanel #resultspanelgrid": {
                render: this.onPanelGridRender
            }
        });
    },

    onPanelGridRender: function (elem, evt) {
        console.log(elem.store)
    }
});