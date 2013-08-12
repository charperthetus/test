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
        'Savanna.search.model.SearchRequest',
        'Savanna.search.model.SearchHistory',
        'Savanna.search.store.SearchResults',
        'Savanna.search.store.SearchHistory',
        'Savanna.search.store.DalSources'
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

        });
    }
});