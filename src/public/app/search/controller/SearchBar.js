/**
 * TODO: Document what events we may emit/consume...
 */
Ext.define('Savanna.search.controller.SearchBar', {
    extend: 'Ext.app.Controller',
    requires: [
        "Savanna.search.model.SearchRequest",
        "Savanna.search.model.SearchHistory",
        'Savanna.search.store.SearchResults'
    ],
    models: [],

    stores: [],

    views: [
        'Savanna.search.view.SearchBar'
    ],

    refs: [
        { ref: 'advancedButton', selector: 'search_searchbar > #main_panel #search_toolbar #searchadvanced_btn' },
        {ref: "searchButton", selector: "search_searchbar > #main_panel #search_toolbar #search_submit"}
    ],

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode == 13) {
            // user pressed enter
            this.doSearch(this.getSearchButton());
        }
    },
    hideMenu: function (el, evt) {
        if(el != undefined)  {
            el.up("search_searchbar").queryById("searchadvanced_menu").hide();
        }
    },
    alignMenuWithTextfield: function (btn, evt) {
        btn.menu.alignTo(btn.up("#search_toolbar").getEl());
    },
    init: function (app) {
        this.control({
            "search_searchbar > #main_panel #search_toolbar #searchadvanced_btn": {
                click: this.alignMenuWithTextfield
            },
            "search_searchbar > #main_panel #search_toolbar #search_terms": {
                keyup: this.handleSearchTermKeyUp
            },
            "search_searchbar > #main_panel #search_toolbar #searchadvanced_menu textfield": {
                keyup: this.handleSearchTermKeyUp
            },
            "search_searchbar > #main_panel #search_toolbar #search_submit": {
                click: this.doSearch
            },
            "search_searchbar > #main_panel #search_toolbar #searchadvanced_menu #submit_panel #advancedsearch_submit": {
                click: this.doSearch
            },
            "search_searchbar > #main_panel #search_toolbar #searchadvanced_menu #close_panel button": {
                click: this.hideMenu
            }
        })
    },

    doSearch: function (el, evt) {
        this.hideMenu(el, evt);
        var s_str = el.up("search_searchbar").buildSearchString();
        var searchObj = Ext.create("Savanna.search.model.SearchRequest", {
                "textInputString": s_str,
                "displayLabel": s_str
            }),
            store = Ext.create('Savanna.search.store.SearchResults'),
            me = this;
        store.proxy.jsonData = Ext.JSON.encode(searchObj.data);
        store.load({
            callback: me.onCallback,
            scope: me
        });
        this.logHistory(s_str);
    },
    onCallback: function (records, operation, success) {
        if (success) {
            console.log(records);
            this.showResultsPage()
        } else {
            console.log("error loading search results");
        }
    },
    showResultsPage: function () {
        var resultsBtn = Savanna.getApplication().viewport.queryById("main").down("#resultsbutton");
        resultsBtn.fireEvent("click", resultsBtn);
    },
    logHistory: function (s_str) {
        var historyObj = Ext.create("Savanna.search.model.SearchHistory", {
            "query": s_str,
            "date": Ext.Date.format(new Date(), 'time')
        });
        try {
            var store = Savanna.getApplication().viewport.queryById("main").down("#searchcomponent").store;
            store.onHistory(historyObj, "POST");
        }   catch(err)  {
            console.log(err);
        }

    }
});
