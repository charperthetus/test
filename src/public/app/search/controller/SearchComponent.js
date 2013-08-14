/* global Ext: false, Savanna: false */
/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.controller.SearchComponent', {
    extend: 'Ext.app.Controller',

    requires: [
        'Savanna.search.model.SearchRequest',
        'Savanna.search.model.SearchHistory',
        'Savanna.search.store.SearchResults',
        'Savanna.search.store.SearchHistory'
    ],

    models: [
        'Savanna.search.model.SearchHistory'
    ],
    stores: [
        'Savanna.search.store.DalSources'
    ],

    views: [
        'Savanna.search.view.SearchComponent'
    ],

    refs: [
        { ref: 'advancedButton', selector: 'search_searchcomponent > #searchbar #main_panel #search_form #searchadvanced_btn' },
        { ref: 'advancedMenu', selector: 'search_searchcomponent > #searchbar #main_panel #search_form #searchadvanced_menu' },
        { ref: 'searchButton', selector: 'search_searchcomponent > #searchbar #main_panel #search_form #search_submit' },
        { ref: 'searchBar', selector: 'search_searchcomponent > #searchbar' },
        { ref: 'historyMenu', selector: 'search_searchcomponent > #searchtoolbar #historybutton #historymenu' },
        { ref: 'searchBody', selector: 'search_searchcomponent > #searchbody' },
        { ref: 'optionsButton', selector: 'search_searchcomponent > #searchbody #searchbodytoolbar #optionsbutton' },
        { ref: 'resultsButton', selector: 'search_searchcomponent > #searchbody #searchbodytoolbar #resultsbutton' }
    ],

    init: function () {
        this.control({


            'search_searchcomponent > #searchbar #main_panel #search_form #searchadvanced_btn': {
                click: this.alignMenuWithTextfield
            },
            'search_searchcomponent > #searchbar #main_panel #search_form #search_terms': {
                keyup: this.handleSearchTermKeyUp
            },
            'search_searchcomponent > #searchbar #main_panel #search_form #searchadvanced_menu textfield': {
                keyup: this.handleSearchTermKeyUp
            },
            'search_searchcomponent > #searchbar #main_panel #search_form #search_submit': {
                click: this.doSearch
            },
            'search_searchcomponent > #searchbar #main_panel #search_form #searchadvanced_menu #submit_panel #advancedsearch_submit': {
                click: this.doSearch
            },
            'search_searchcomponent > #searchbar #main_panel #search_form #searchadvanced_menu #close_panel': {
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

    // CUSTOM METHODS

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode === 13) {
            // user pressed enter
            this.doSearch();
        }
    },

    hideMenu: function () {
        this.getAdvancedMenu().hide();
    },

    alignMenuWithTextfield: function (btn) {
        btn.menu.alignTo(btn.up('#search_form').getEl());
    },

    onHistoryItemClick: function () {
        this.doSearch();
    },

    onBodyToolbarClick: function (button) {
        var body = this.getSearchBody();

        if (body.currentPanel !== 'searchoptions' && button === this.getOptionsButton()) {
            body.queryById('mainsearchoptions').show();
            body.queryById('searchresults').hide();
            body.currentPanel = 'searchoptions';
        }

        if (body.currentPanel !== 'results' && button === this.getResultsButton()) {
            body.queryById('mainsearchoptions').hide();
            body.queryById('searchresults').show();
            body.currentPanel = 'results';
        }
    },

    doSearch: function () {
        this.hideMenu();

        var searchString = this.getSearchBar().buildSearchString();
        var searchObj = Ext.create('Savanna.search.model.SearchRequest', {
            'textInputString': searchString,
            'displayLabel': searchString
        });

        this.getSearchBar().store.removeAll();
        this.getSearchBar().store.getProxy().jsonData = Ext.JSON.encode(searchObj.data);

        this.getSearchBar().store.load({
            callback: this.searchCallback,
            scope: this
        });

        this.logHistory(this.getSearchBar().buildSearchString());
    },

    searchCallback: function (records, operation, success) {
        if (success) {
            this.showResultsPage();
        }
        else {
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the search request.'
            });
        }
    },

    showResultsPage: function () {
        var resultsBtn = Savanna.getApplication().viewport.queryById('main').down('#resultsbutton');
        resultsBtn.fireEvent('click', resultsBtn);
    },

    logHistory: function (searchString) {
        var store = Ext.data.StoreManager.lookup('searchHistory');

        if (store) {
            store.add({
                'query': searchString,
                'date': Ext.Date.format(new Date(), 'time')
            });

            store.sync();
        }
        else {
            Ext.Error.raise('Unable to find "searchHistory" store');
        }
    }
});