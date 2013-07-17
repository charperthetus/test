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
        // coming soon...
    ],
    stores: [
        // coming soon...
    ],

    views: [
        'Savanna.search.view.SearchComponent'
    ],

    currentPanel: 'searchoptions',

    init: function (app) {
        var me = this;
        me.control({
            'search_searchcomponent': {
                render: function (comp, event) {
                    // do something
                }
            }
        });
    }
});