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
        'Savanna.search.store.SearchResults',
        'Savanna.search.view.searchComponent.searchBody.searchMap.SearchLocationForm',
        'Savanna.controller.Factory'
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
                click: this.handleSearchSubmit
            },
            'search_searchcomponent #search_clear': {
                click: this.clearSearch
            },
            'search_searchcomponent #advancedsearch_submit': {
                click: this.handleSearchSubmit
            },
            'search_searchcomponent #close_panel': {
                click: this.handleClose
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
    onFindLocation: function (button) {
        var locationSearchInput = button.up('#searchLocationDockedItems').down('#findLocationSearchText');
        var locationSearchText = locationSearchInput.value;
        if (locationSearchText) {
            var myForm = Ext.create('Savanna.search.view.searchComponent.searchBody.searchMap.SearchLocationForm');
            myForm.show();
        }
    },

    handleNewSearch: function (elem) {
        var component = this.getSearchComponent(elem);

            component.down('search_resultsDals_resultsterms').queryById('termValues').removeAll();


        var form = component.down('#search_form');

        form.queryById('search_terms').setValue('');

        var formField = form.queryById('form_container');

        Ext.Array.each(formField.query('searchadvanced_textfield'), function (field) {
            if (field.xtype === 'searchadvanced_textfield') {
                field.setValue('');
            }
        });

        var sources = this.getSelectedDals(this.getSearchComponent(elem));

        Ext.each(sources, function (source) {
            /*
             set the facet filters, if any
             */
            if (source.get('facetFilterCriteria').length) {
                source.set('facetFilterCriteria', []);
            }

            /*
             set the date ranges, if any
             */
            if (source.get('dateTimeRanges').length) {
                source.set('dateTimeRanges', []);
            }
        });

        component.down('#resultsdals').removeAll();



        /*
         return to the options screen if we're not already there
         */

        if (component.down('#searchbody').currentPanel !== 'searchoptions') {
            var optionsBtn = component.queryById('optionsbutton');
            optionsBtn.fireEvent('click', optionsBtn);
        }

        /*
         clear the grid - it's misleading in error states with mockDAL to see results in the grid
         */
        component.down('#resultspanelgrid').removeAll();
    },
    clearSearch: function (elem) {
        var form = elem.findParentByType('search_searchcomponent').down('#search_form');
        form.queryById('search_terms').setValue('');
    },

    handleSearchSubmit: function (btn) {
        this.doSearch(btn);
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


    /*
     used in a few places, moving this out of doSearch
     */
    getSearchComponent: function (elem) {

        var component;
        /*
         dig your way out of the menu via 'ownerButton'.  not sure why this is necessary,
         but I spent half an hour trying a conventional 'up' or 'findParentByType' with no
         luck before trying the 'ownerButton' property
         */
        if (elem.xtype === 'searchadvanced_textfield' || elem.itemId === 'advancedsearch_submit') {
            component = elem.up('#searchadvanced_menu').ownerButton.up('#searchcomponent');
        } else {
            component = elem.findParentByType('search_searchcomponent');
        }

        return component;
    },

    /*
     used in a few places, moving this out of doSearch
     */
    getSelectedDals: function (component) {

        var sources = [],
            dalSelected = false,
            dals = component.down('#searchdals');

        dals.store.each(function (source) {

            if (dals.queryById(source.get('id')).query('checkbox')[0].getValue()) {
                dalSelected = true;
                sources.push(source);
            }
        });

        if (!dalSelected) {
            dals.queryById(dals.store.defaultId).query('checkbox')[0].setValue(true);
            sources.push(dals.store.getById(dals.store.defaultId));
        }

        return sources;
    },

    buildSearchObject:function(searchString, dal, currentDalPanel){
        var searchObj = Ext.create('Savanna.search.model.SearchRequest', {
            'textInputString': searchString,
            'displayLabel': searchString
        });


        searchObj.set('contentDataSource', dal.get('id'));

        searchObj.set('searchPreferencesVOs', [
            {
                'dalId': dal.get('id'),
                'sortOrder': 'Default',
                'customSearchSelections': this.getCustomSearchSelections(currentDalPanel)
            }
        ]);

        /*
         build the 'desiredFacets' array for the request, by iterating over
         facetValueSummaries in the DAL sources json
         */
        var desiredFacets = [];

        Ext.each(dal.get('facetDescriptions'), function (description) {
            desiredFacets.push(description.facetId);
        });

        searchObj.set('desiredFacets', desiredFacets);


        /*
         set the facet filters, if any
         */
        if (dal.get('facetFilterCriteria').length) {
            searchObj.set('facetFilterCriteria', dal.get('facetFilterCriteria'));
        }

        /*
         set the date ranges, if any
         */
        if (dal.get('dateTimeRanges').length) {
            searchObj.set('dateTimeRanges', dal.get('dateTimeRanges'));
        }

        return searchObj;
    },

    buildAndLoadResultsStore:function(dal, component, searchObj, action, combo) {

        var pageSize;
        if(combo)   {
            pageSize = combo.value;
        }   else    {
            pageSize = dal.get('resultsPerPage');
        }

        var resultsStore = Ext.create('Savanna.search.store.SearchResults', {
            storeId: 'searchResults_' + dal.get('id'),
            pageSize: pageSize
        });

        var resultsDal = component.down('#resultsdals'),
            resultsPanel = component.down('#resultspanel');

        resultsStore.proxy.jsonData = Ext.JSON.encode(searchObj.data);  // attach the search request object
        resultsStore.load({
            callback: Ext.bind(this.searchCallback, this, [resultsDal, resultsPanel, dal.get('id'), resultsStore, action], true)
        });

        resultsDal.updateDalStatus(dal.get('id'), 'pending');   // begin in a pending state
    },

    doSearch: function (elem) {

        var component = this.getSearchComponent(elem),
            sources = this.getSelectedDals(component);

        this.hideMenu(component);

        var searchString = component.queryById('searchbar').buildSearchString(),
            resultsComponent = component.queryById('searchresults');


        /*
         this is an array of objects - they store the dal id and the store instance for that dal's results.
         For each selected DAL, a new store is generated and this array is used to keep track
         */
        resultsComponent.allResultSets = [];



        /*
         Create the search request payload
         */

        var dals = component.down('#searchdals'),
            resultsDal = component.down('#resultsdals'),
            searchObj;

        resultsDal.createDalPanels(sources);

        /*
         Check for selected additional Dals, and do a search on each of them
         */
        Ext.each(sources, function (source) {

            var dalId = source.get('id');
            var currentDalPanel = dals.queryById(dalId);
            var checked = dals.queryById(dalId).query('checkbox')[0].getValue();    // has this checkbox been selected in search options?

            if (checked) {  // checked, or always search the default dal

                searchObj = this.buildSearchObject(searchString, source, currentDalPanel);

                this.buildAndLoadResultsStore(source, component, searchObj, 'search');
            }

        }, this);

        this.showResultsPage(component);
    },

    getCustomSearchSelections: function (currentDalPanel) {

        var customSearchOptions = [];
        var customInputs = currentDalPanel.query('[cls=customInputField]');
        for (var i = 0, total = customInputs.length; i < total; i++) {
            var customSearchInput = {};
            customSearchInput.key = customInputs[i].name;
            if (customInputs[i].xtype === 'datefield') {
                customSearchInput.value = customInputs[i].value.valueOf();
            } else if (customInputs[i].xtype === 'radiogroup' && customInputs[i].defaultType === 'radiofield') {
                customSearchInput.value = customInputs[i].getValue().options;
            } else if (customInputs[i].xtype === 'fieldcontainer') {
                // then this item must be a key value pair and will need special handling
                customSearchInput.key = customInputs[i].down('combobox').value;
                customSearchInput.value = customInputs[i].down('[name=keyValueText]').value;

            } else {
                customSearchInput.value = customInputs[i].value;
            }
            if (customSearchInput.value === undefined || customSearchInput.value === null) {
                customSearchInput.value = '';
            }
            customSearchOptions.push(customSearchInput);
        }
        return customSearchOptions;
    },

    searchCallback: function (records, operation, success, resultsDal, resultsPanel, dalId, store, action) {

        if (!success) {
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the search request - the DAL "' + dalId + '" may be unavailable.'
            });
        } else {

            var resultsObj = {id: dalId, store: store};

            if(action === 'search') {
                /*
                add an object tying the dal and store together for referencing
                 */
                resultsPanel.up('#searchresults').allResultSets.push(resultsObj);

                if (store.facetValueSummaries !== null) {
                    resultsDal.createDalFacets(dalId);
                }

            }   else    {
                /*
                filtering, action set to 'filter'
                 */
                Ext.each(resultsPanel.up('#searchresults').allResultSets, function (resultset, index) {
                    if (resultset.id === dalId) {
                        resultsPanel.up('#searchresults').allResultSets[index] = resultsObj;
                    }
                });
            }

            var statusString = success ? 'success' : 'fail';
            resultsDal.updateDalStatus(dalId, statusString);

            var controller = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');

            if(action === 'search') {
                if (dalId === Ext.data.StoreManager.lookup('dalSources').defaultId) {

                    controller.changeSelectedStore({}, {}, resultsDal.queryById(dalId));
                }
            }   else    {
                /*
                 filtering, action set to 'filter'
                 */
                controller.changeSelectedStore({}, {}, resultsDal.queryById(dalId));
            }
        }
    },

    showResultsPage: function (component) {
        var resultsBtn = component.down('#resultsbutton');
        resultsBtn.fireEvent('click', resultsBtn);
    }
});