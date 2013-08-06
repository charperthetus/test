/**
 * TODO: Document what events we may emit/consume...
 */
Ext.define('Savanna.search.controller.SearchBar', {
    extend: 'Ext.app.Controller',

    models: [
        // coming soon...
    ],

    stores: [
        // coming soon...
    ],

    views: [
        'Savanna.search.view.SearchBar'
    ],

    refs: [
        { ref: 'advancedButton', selector: 'search_searchbar > #main_panel #search_toolbar #searchadvanced_btn' }
    ],

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode == 13) {
            // user pressed enter
            this.doSearch();
        }
    },
    hideMenu: function (el, evt) {
        el.up('#searchadvanced_menu').hide();
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
            "search_searchbar > #main_panel #search_toolbar #searchadvanced_menu #close_panel": {
                click: this.hideMenu
            }
        });
    },
    doSearch: function (el, evt) {
        this.hideMenu(el, evt);
        console.log("search for: " + el.up("search_searchbar").buildSearchString());
            }
});
