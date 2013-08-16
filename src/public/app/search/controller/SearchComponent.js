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

    searchComponentInstance:null,

    init: function () {
        this.control({
            'search_searchcomponent > #searchbar #main_panel #search_reset #search_reset_button': {
                click: this.handleNewSearch
            },
            'search_searchcomponent > #searchbody #mainsearchoptions #mainsearchtabpanel #searchMap #searchLocationDockedItems #clearLocationSearch': {
                click: function (button) {
                    button.up('search_searchmap').queryById('leafletMap').fireEvent('locationSearch:clear');
                }
            },
            'search_searchcomponent > #searchbody #mainsearchoptions #mainsearchtabpanel #searchMap #searchLocationDockedItems #mapZoomTo': {
                click: function (button) {
                    button.up('search_searchmap').queryById('leafletMap').fireEvent('locationSearch:zoomto', button);
                }
            },
            'search_searchcomponent > #searchbody #mainsearchoptions #mainsearchtabpanel #searchMap #leafletMap': {
                'draw:created': function (layerType) {
                }
            },
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
                click: this.handleClose
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

    handleNewSearch: function (elem) {

        /*
         Do we want this to return the user to the search options screen, if
         they are currently in the results screen?
         */

        var form = elem.findParentByType('search_searchcomponent').down('#search_form')

        form.queryById('search_terms').setValue('');

        var formField = form.queryById('form_container');

        Ext.Array.each(formField.query('searchadvanced_textfield'), function (field) {
            if (field.xtype === 'searchadvanced_textfield') {
                field.setValue('');
            }
        });
        /*
        return to the options screen if we're not already there
         */
        var component = elem.findParentByType("search_searchcomponent");
        if(component.down('#searchbody').currentPanel != "searchoptions") {
            var optionsBtn = component.queryById('optionsbutton');
            optionsBtn.fireEvent("click", optionsBtn);
        }

        /*
        clear the selected dals
         */
        var dalStore = Ext.data.StoreManager.lookup('dalSources');

        dalStore.each(function (source) {
            var dals = component.down('#searchdals');
            var results_dals = component.down('#resultsdals');
            if (dals.queryById(source.data.id).query('checkbox')[0].getValue()) {
                dals.queryById(source.data.id).query('checkbox')[0].setValue(false);
                results_dals.queryById(source.data.id).query('checkbox')[0].setValue(false);
                results_dals.queryById(source.data.id).down('#dalStatusIcon').getEl().setStyle(results_dals.queryById(source.data.id).dalLoadNone);
            }
        });
    },

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode === 13) {
            // user pressed enter
            this.doSearch(field);
        }
    },

    handleClose:function(btn)   {
        btn.up('#searchadvanced_menu').ownerButton.up('#searchcomponent').down('#searchadvanced_menu').hide();
    },

    hideMenu: function (elem) {
        elem.down('#searchadvanced_menu').hide();
    },

    alignMenuWithTextfield: function (btn) {
        btn.menu.alignTo(btn.up('#search_form').getEl());
    },

    onHistoryItemClick: function (btn) {
        this.doSearch(btn);
    },

    onBodyToolbarClick: function (button) {
        var component = button.findParentByType('search_searchcomponent');
        var body = component.queryById('searchbody');

        if (body.currentPanel !== 'searchoptions' && button === component.queryById('optionsbutton')) {
            body.queryById('mainsearchoptions').show();
            body.queryById('searchresults').hide();
            body.currentPanel = 'searchoptions';
        }

        if (body.currentPanel !== 'results' && button === component.queryById('resultsbutton')) {
            body.queryById('mainsearchoptions').hide();
            body.queryById('searchresults').show();
            body.currentPanel = 'results';
        }
    },

    doSearch: function (elem) {

        var component;

        if (elem.xtype == 'searchadvanced_textfield' || elem.itemId === 'advancedsearch_submit') {
            // dig your way out of the menu via 'ownerButton'
            component = elem.up('#searchadvanced_menu').ownerButton.up('#searchcomponent');
        } else {
            component = elem.findParentByType('search_searchcomponent');
        }
        this.currentComponentInstance = component;

        this.hideMenu(component);

        var bar = component.queryById('searchbar'),
            store = bar.store,
            searchString = bar.buildSearchString(),
            dalStore = Ext.data.StoreManager.lookup('dalSources');

        store.removeAll();

        component.firstResultsReturned = false;

        // populate with search string and set to default dal
        var searchObj = Ext.create('Savanna.search.model.SearchRequest', {
            'textInputString': searchString,
            'displayLabel': searchString,
            'searchPreferencesVOs': [
                {
                    'dalId': dalStore.defaultId,
                    'resultPerPage': 100,
                    'sortOrder': 'Default'
                }
            ]
        });

        /*
         Set the search request json payload that is sent to the server,
         and do the search on the default Dal
         */
        store.proxy.jsonData = Ext.JSON.encode(searchObj.data);
        store.load({
            callback: this.searchCallback,
            scope: this
        });


        /*
         Check for selected additional Dals, and do a search on each of them
         */

        dalStore.each(function (source) {
            var dals = component.down('#searchdals');

            if (dals.queryById(source.data.id).query('checkbox')[0].getValue()) {

                // Dal has been selected, apply to the request model and do search
                searchObj.set('searchPreferencesVOs', [
                    {
                        'dalId': source.data.id,
                        'resultPerPage': 100,
                        'sortOrder': 'Default'
                    }
                ]);

                store.proxy.jsonData = Ext.JSON.encode(searchObj.data);
                store.load({
                    callback: this.searchCallback,
                    scope: this
                });
            }

        }, this);

        /*
         track in recent searches
         */
        this.logHistory(bar.buildSearchString());
    },

    searchCallback: function (records, operation, success) {
        if (success) {
            if (!this.currentComponentInstance.firstResultsReturned) {
                this.showResultsPage(); // only need to do this once per search
                this.currentComponentInstance.firstResultsReturned = true;
            }
            this.currentComponentInstance.down("#resultsdals").setDalStatus(operation, success);
        }
        else {
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the search request.'
            });
        }
    },

    showResultsPage: function () {
        var resultsBtn = this.currentComponentInstance.down('#resultsbutton');

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