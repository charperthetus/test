/**
 * TODO: Document what events we may emit/consume...
 */
Ext.define('Savanna.search.controller.SearchToolbar', {
    extend: 'Ext.app.Controller',

    models: [
        // coming soon
    ],

    stores: [
        // coming soon
    ],

    views: [
        'Savanna.search.view.SearchToolbar'
    ],
    logHistory: function (searches, view) {

        while (view.queryById("historybutton").menu.items.items.length > 0) {
            view.queryById("historybutton").menu.items.items.pop();
        }
        //TODO: look for dupes and do not include them - or, remove at store level
        Ext.each(searches, function (search, index) {
            view.queryById("historybutton").menu.add({
                text: search.query
            })
        })
    },
    onHistoryItemClick:function(btn, evt)   {
        var bar = btn.up("#searchcomponent").queryById("searchbar");
        var sbtn = bar.down("#search_submit");
        bar.ctrl.doSearch(sbtn, evt);
    },
    init: function (app) {
        this.control({
            'search_searchtoolbar > #historybutton #historymenu menuitem': {
                click: this.onHistoryItemClick
            }
        })
    }
});