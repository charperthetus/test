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
        "Savanna.search.model.SearchRequest",
        "Savanna.search.model.SearchHistory",
        'Savanna.search.store.SearchResults',
        'Savanna.search.store.SearchHistory'
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

    refs: [
        { ref: 'advancedButton', selector: 'search_searchcomponent > #searchbar #main_panel #search_toolbar #searchadvanced_btn' },
        { ref: "advancedMenu", selector: "search_searchcomponent > #searchbar #main_panel #search_toolbar #searchadvanced_menu" },
        { ref: "searchButton", selector: "search_searchcomponent > #searchbar #main_panel #search_toolbar #search_submit" },
        { ref: "searchBar", selector: "search_searchcomponent > #searchbar" },
        { ref: "historyMenu", selector: "search_searchcomponent > #searchtoolbar #historybutton #historymenu" },
        { ref: "searchBody", selector: "search_searchcomponent > #searchbody" },
        { ref: 'optionsButton', selector: 'search_searchcomponent > #searchbody #searchbodytoolbar #optionsbutton' },
        { ref: "resultsButton", selector: "search_searchcomponent > #searchbody #searchbodytoolbar #resultsbutton" }
    ],

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode == 13) {
            // user pressed enter
            this.doSearch(this.getSearchButton());
        }
    },
    hideMenu: function (el, evt) {
        this.getAdvancedMenu().hide();
    },
    alignMenuWithTextfield: function (btn, evt) {
        btn.menu.alignTo(btn.up("#search_toolbar").getEl());
    },
    onHistoryItemClick: function (btn, evt) {
        this.doSearch(this.getSearchButton, evt);
    },
    onBodyToolbarClick: function (button, event) {
        var body = this.getSearchBody();
        if (body.currentPanel != "searchoptions" && button == this.getOptionsButton()) {
            body.queryById("mainsearchoptions").show();
            body.queryById("searchresults").hide();
            body.currentPanel = "searchoptions";
        }
        if (body.currentPanel != "results" && button == this.getResultsButton()) {
            body.queryById("mainsearchoptions").hide();
            body.queryById("searchresults").show();
            body.currentPanel = "results";
        }
    },
    init: function (app) {
        this.control({
            "search_searchcomponent > #searchbar #main_panel #search_toolbar #searchadvanced_btn": {
                click: this.alignMenuWithTextfield
            },
            "search_searchcomponent > #searchbar #main_panel #search_toolbar #search_terms": {
                keyup: this.handleSearchTermKeyUp
            },
            "search_searchcomponent > #searchbar #main_panel #search_toolbar #searchadvanced_menu textfield": {
                keyup: this.handleSearchTermKeyUp
            },
            "search_searchcomponent > #searchbar #main_panel #search_toolbar #search_submit": {
                click: this.doSearch
            },
            "search_searchcomponent > #searchbar #main_panel #search_toolbar #searchadvanced_menu #submit_panel #advancedsearch_submit": {
                click: this.doSearch
            },
            "search_searchcomponent > #searchbar #main_panel #search_toolbar #searchadvanced_menu #close_panel button": {
                click: this.hideMenu
            },
            'search_searchcomponent > #searchtoolbar #historybutton #historymenu menuitem': {
                click: this.onHistoryItemClick
            },
            'search_searchcomponent > #searchbody #searchbodytoolbar #optionsbutton': {
                click: this.onBodyToolbarClick
            },
            'search_searchcomponent > #searchbody #searchbodytoolbar #resultsbutton': {
                click: this.onBodyToolbarClick
            }
        });
    },
    doSearch: function (el, evt) {
        this.hideMenu(el, evt);
        var searchString = this.getSearchBar().buildSearchString();
        var searchObj = Ext.create("Savanna.search.model.SearchRequest", {
            "textInputString": searchString,
            "displayLabel": searchString
        });
        this.getSearchBar().store.removeAll();
        this.getSearchBar().store.proxy.jsonData = Ext.JSON.encode(searchObj.data);
        this.getSearchBar().store.load({
            callback: this.onCallback,
            scope: this
        });
        this.logHistory(this.getSearchBar().buildSearchString());
    },
    onCallback: function (records, operation, success) {
        if (success) {
            console.log(records);
            this.showResultsPage()
        } else {
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the search request.'
            });
        }
    },
    showResultsPage: function () {
        var resultsBtn = Savanna.getApplication().viewport.queryById("main").down("#resultsbutton");
        resultsBtn.fireEvent("click", resultsBtn);
    },
    logHistory: function (searchString) {
        var historyObj = Ext.create("Savanna.search.model.SearchHistory", {
            "query": searchString,
            "date": Ext.Date.format(new Date(), 'time')
        });
        var store = Ext.data.StoreManager.lookup('searchHistory');
        store.searches.push(historyObj.data);
        store.load();

    }
});