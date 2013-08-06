/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.search.controller.SearchComponent', {
    extend: 'Ext.app.Controller',

    requires: [

    ],

    models: [
        "Savanna.search.model.SearchHistory"
    ],
    stores: [
        // coming soon...
    ],

    views: [
        'Savanna.search.view.SearchComponent'
    ],

    historyStore:null,

    onRender:function (comp, event) {
        comp.store = this.historyStore;
    },

    init: function (app) {
        this.historyStore = Ext.create('Savanna.search.store.SearchHistory');
        var me = this;
        me.control({
            'search_searchcomponent': {
                render: this.onRender
            }
        });
    }
});