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
        'Savanna.search.store.SearchHistory',
        'Savanna.search.view.searchComponent.searchBody.searchMap.SearchLocationForm',
        'Savanna.controller.Factory'
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

    init: function () {
        this.control({
            'search_searchcomponent #search_reset_button': {
                click: this.handleNewSearch
            },
            'search_searchcomponent #clearLocationSearch': {
                click: function (button) {
                    button.up('search_searchmap').queryById('leafletMap').fireEvent('locationSearch:clear');
                }
            },
            'search_searchcomponent #mapZoomTo': {
                click: function (button) {
                    button.up('search_searchmap').queryById('leafletMap').fireEvent('locationSearch:zoomto', button);
                }
            },
            'search_searchcomponent #leafletMap': {
                'draw:created': function () {
                }
            },
            'search_searchcomponent #findLocation': {
                click: this.onFindLocation
            },
            'search_searchcomponent #searchadvanced_btn': {
                click: this.alignMenuWithTextfield
            },
            'search_searchcomponent #search_terms': {
                keyup: this.handleSearchTermKeyUp
            },
            'search_searchcomponent #searchadvanced_menu textfield': {
                keyup: this.handleSearchTermKeyUp
            },
            'search_searchcomponent #search_submit': {
                click: this.doSearch
            },
            'search_searchcomponent #search_clear': {
                click: this.clearSearch
            },
            'search_searchcomponent #advancedsearch_submit': {
                click: this.doSearch
            },
            'search_searchcomponent #close_panel': {
                click: this.handleClose
            },
            'search_searchcomponent #historymenu menuitem': {
                click: this.onHistoryItemClick
            },
            'search_searchcomponent #optionsbutton': {
                click: this.onBodyToolbarClick
            },
            'search_searchcomponent #resultsbutton': {
                click: this.onBodyToolbarClick
            }
        });
    },

    // CUSTOM METHODS    
    onFindLocation: function(button) {
        var locationSearchInput =  button.up('#searchLocationDockedItems').down('#findLocationSearchText');
        var locationSearchText = locationSearchInput.value;
        if (locationSearchText) {
            var myForm =  Ext.create('Savanna.search.view.searchComponent.searchBody.searchMap.SearchLocationForm');
            myForm.show();
        }
    },

    handleNewSearch:function(elem)  {

        /*
         Do we want this to return the user to the search options screen, if
         they are currently in the results screen?
         */

        var form = elem.findParentByType('search_searchcomponent').down('#search_form');

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
        var component = elem.findParentByType('search_searchcomponent');
        if (component.down('#searchbody').currentPanel !== 'searchoptions') {
            var optionsBtn = component.queryById('optionsbutton');
            optionsBtn.fireEvent('click', optionsBtn);
        }

        /*
         clear the selected dals
         */
        var dalStore = Ext.data.StoreManager.lookup('dalSources');

        dalStore.each(function (source) {
            var dals = component.down('#searchdals'),
                resultsDals = component.down('#resultsdals'),
                checkbox = dals.queryById(source.data.id).query('checkbox')[0].getValue();
            if (checkbox.getValue()) {
                checkbox.setValue(false);
                resultsDals.queryById(source.data.id).down('#dalStatusIcon').getEl().setStyle(resultsDals.queryById(source.data.id).dalLoadNone);
            }
        });
    },
    clearSearch:function(elem)  {
        var form = elem.findParentByType('search_searchcomponent').down('#search_form');
        form.queryById('search_terms').setValue('');
    },

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode === 13) {
            // user pressed enter
            this.doSearch(field);
        }
    },

    handleClose: function (btn) {
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

        if (elem.xtype === 'searchadvanced_textfield' || elem.itemId === 'advancedsearch_submit') {
            /*
            dig your way out of the menu via 'ownerButton'.  not sure why this is necessary,
            but I spent half an hour trying a conventional 'up' or 'findParentByType' with no
            luck before trying the 'ownerButton' property
            */
            component = elem.up('#searchadvanced_menu').ownerButton.up('#searchcomponent');

        } else {
            component = elem.findParentByType('search_searchcomponent');
        }

        this.hideMenu(component);

        var searchString = component.queryById('searchbar').buildSearchString(),
            dalStore = Ext.data.StoreManager.lookup('dalSources'),
            resultsComponent = component.queryById('searchresults');


        /*
        this is an array of objects - they store the dal id and the store instance for that dal's results.
        For each selected DAL, a new store is generated and this array is used to keep track
         */
        resultsComponent.allResultSets = [];

        /*
        Create the search request payload
         */
        var searchObj = Ext.create('Savanna.search.model.SearchRequest', {
            'textInputString': searchString,
            'displayLabel': searchString
        });


        var dals = component.down('#searchdals'),
            resultsDal = component.down('#resultsdals'),
            resultsPanel = component.down('#resultspanel');

        /*
         Check for selected additional Dals, and do a search on each of them
         */
        dalStore.each(function (source) {

            var dalId = source.data.id,
                checked = dals.queryById(dalId).query('checkbox')[0].getValue();    // has this checkbox been selected in search options?

            if (checked || dalId === dalStore.defaultId) {  // checked, or always search the default dal

                // Dal has been selected, apply to the request model and do search
                searchObj.set('searchPreferencesVOs', [
                    {
                        'dalId': dalId,
                        'sortOrder': 'Default'
                    }
                ]);
                /*
                Determine the pageSize for the stores.
                 */
                var resultsPerPage = component.down('#resultsPageSizeCombobox').value;
                /*
                Create a new store for each DAL
                 */
                var resultsStore = Ext.create('Savanna.search.store.SearchResults', {
                    storeId:'searchResults_' + dalId,
                    pageSize: resultsPerPage
                });
                resultsStore.proxy.jsonData = Ext.JSON.encode(searchObj.data);  // attach the search request object
                resultsStore.load({
                    callback: Ext.bind(this.searchCallback, this, [resultsDal, resultsPanel, dalId, resultsStore], true)
                });
                resultsDal.updateDalStatus(dalId, 'pending');   // begin in a pending state
            } else {
                resultsDal.updateDalStatus(dalId, 'none');  // ...or, if not selected, style accordingly as well
            }

        }, this);
        this.showResultsPage(component);
        /*
         track in recent searches
         */
        this.logHistory(searchString);
    },

    searchCallback: function (records, operation, success, resultsDal, resultsPanel, dalId, store) {
        var resultsObj = {id:dalId, store:store};
        resultsPanel.up('#searchresults').allResultSets.push(resultsObj);   // add an object tying the dal and store together for referencing

        var statusString = success ? 'success' : 'fail';
        resultsDal.updateDalStatus(dalId, statusString);

        if (!success) {
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the search request.'
            });
        }   else    {
            if(dalId === Ext.data.StoreManager.lookup('dalSources').defaultId)    {
                var controller = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
                controller.changeSelectedStore({}, {}, resultsDal.queryById(dalId));
            }
        }
    },

    showResultsPage: function (component) {
        var resultsBtn = component.down('#resultsbutton');
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