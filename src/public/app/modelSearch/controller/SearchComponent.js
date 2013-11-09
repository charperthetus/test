/* global Ext: false, OpenLayers: false, SavannaConfig: false */
/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.controller.SearchComponent', {
    extend: 'Ext.app.Controller',

    requires: [
        'Savanna.modelSearch.model.SearchRequest',
        'Savanna.modelSearch.store.SearchResults',
        'Savanna.controller.Factory',
        'Savanna.metadata.store.Metadata',
        'Savanna.modelSearch.model.ResultMetadata',
        'Savanna.modelSearch.store.ResultsMetadata'
    ],
    stores: [
        'Savanna.modelSearch.store.DalSources'
    ],

    views: [
        'Savanna.modelSearch.view.SearchComponent'
    ],

    init: function () {
        this.control({
            'model_search_searchcomponent': {
                render: this.onSearchRender
            },
            'model_search_searchcomponent #search_reset_button': {
                click: this.handleNewSearch
            },
            'model_search_searchcomponent #toolbarmodelsearchbutton': {
                click: this.doSearch
            },
            'model_search_searchcomponent #searchadvanced_btn': {
                click: this.showHideMenu
            },
            'model_search_searchcomponent #search_terms': {
                onsearchclick: this.doSearch
            },
            'model_search_searchcomponent #search_clear': {
                click: this.clearSearch
            },
            'model_search_searchcomponent #advancedsearch_submit': {
                click: this.handleSearchSubmit
            },
            'model_search_searchcomponent #optionsbutton': {
                click: this.onBodyToolbarClick
            },
            'model_search_searchcomponent #resultsbutton': {
                click: this.onBodyToolbarClick
            }
        });

        this.getApplication().on('model_results:dalreset', this.doSearch, this);

        this.getApplication().on('model_results:refineSearch', this.doSearch, this);

        this.getApplication().on('model_results:buildAndLoadResultsStore', this.buildAndLoadResultsStore, this);

        this.resultsStore = Ext.create('Savanna.modelSearch.store.SearchResults', {
            pageSize: 20,
            currentPage: 1
        });

    },

    resultsStore: null,

    // CUSTOM METHODS

    /*
     with search now appearing within a window component, the advanced search terms menu
     no longer works correctly as a menu. Converted it to a panel (which is a good thing), but
     moving the window around with the menu open causes misalignment issues with the menu.  These event
     listeners on the parent window seem to sort it out.
     */

    onSearchRender: function (search) {
        if (search.up('model_desktop_searchwindow')) {
            var advanced_menu = search.down('#searchadvanced_menu');

            search.up('model_desktop_searchwindow').header.getEl().on('mousedown', function () {
                advanced_menu.wasOpen = advanced_menu.isVisible();
                advanced_menu.hide();
            });

            search.up('model_desktop_searchwindow').on('move', function (win) {
                if (advanced_menu.wasOpen) {
                    advanced_menu.showBy(win.down('#search_form'));
                }
            });


        }


        var resultsPanel = search.down('model_search_resultspanel');
        resultsPanel.updateGridStore(this.resultsStore);

        /*
         hide Start New Search button
         */
        search.down('#search_reset_button').setVisible(false);

        //jwb force a move to the results tab.
        var resultsButton = search.queryById('resultsbutton');
        resultsButton.fireEvent('click', resultsButton);

    },

    handleNewSearch: function (elem) {
        var component = this.getSearchComponent(elem);

        if (component.down('model_search_resultsDals_resultsterms')) {   // doesn't exist if results page has not yet been created

            component.down('model_search_resultsDals_resultsterms').queryById('termValues').removeAll();  // remove refine terms in results screen
        }

        var form = component.down('#search_form'),
            searchBar = component.down('#searchbar');


        searchBar.queryById('search_terms').setValue('');

        var formField = form.queryById('searchadvanced_menu').queryById('form_container');

        Ext.Array.each(formField.query('model_searchadvanced_textfield'), function (field) {
            if (field.xtype === 'model_searchadvanced_textfield') {
                field.setValue('');
            }
        });

        var sources = this.getSelectedDals(this.getSearchComponent(elem)),
            dals = component.down('#searchdals');

        Ext.each(sources, function (source) {
            /*
             clear facet filters, if any
             */
            if (source.get('facetFilterCriteria').length) {
                source.set('facetFilterCriteria', []);
            }

            /*
             clear date ranges, if any
             */
            if (source.get('dateTimeRanges').length) {
                source.set('dateTimeRanges', []);
            }

            if (dals.queryById(source.get('id')).query('checkbox')[0].getValue()) {
                dals.queryById(source.get('id')).query('checkbox')[0].setValue(false);
            }
        });

        dals.queryById(dals.store.defaultId).query('checkbox')[0].setValue(true);

        component.down('#resultsdals').removeAll();



        /*
         hide Start New Search button
         */
        component.down('#search_reset_button').setVisible(false);
    },

    clearSearch: function (elem) {
        var form = elem.findParentByType('model_search_searchcomponent').down('#searchbar');
        form.queryById('search_terms').setValue('');

        var formField = form.queryById('searchadvanced_menu').queryById('form_container');

        Ext.Array.each(formField.query('model_searchadvanced_textfield'), function (field) {
            if (field.xtype === 'model_searchadvanced_textfield') {
                field.setValue('');
            }
        });

    },

    handleSearchSubmit: function (btn) {
        this.doSearch(btn);
    },

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            this.doSearch(field);
        }
    },

    handleClose: function (btn) {
        btn.up('#searchadvanced_menu').hide();
    },

    hideMenu: function (elem) {
        elem.down('#searchadvanced_menu').hide();
    },

    showHideMenu: function (btn) {
        var adv_menu = btn.findParentByType('model_search_searchcomponent').down('#searchadvanced_menu');

        if (adv_menu.isVisible()) {
            adv_menu.hide();
        } else {
            adv_menu.showBy(btn.up('#search_form'));
        }
    },

    onBodyToolbarClick: function (button) {
        var component = button.findParentByType('model_search_searchcomponent'),
            body = component.queryById('searchbody'),
            options = body.queryById('mainsearchoptions'),
            results = body.queryById('searchresults'),
            options_button = component.queryById('optionsbutton'),
            results_button = component.queryById('resultsbutton');

        if (body.currentPanel !== 'searchoptions' && button === options_button) {
            options.show();
            results.hide();
            body.currentPanel = 'searchoptions';
        }

        if (body.currentPanel !== 'results' && button === results_button) {
            options.hide();
            results.show();
            body.currentPanel = 'results';
        }
    },


    /*
     used in a few places, moving this out of doSearch
     */
    getSearchComponent: function (elem) {
        return elem.findParentByType('model_search_searchcomponent');
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

    buildSearchObject: function (searchString, dal) {


        var searchObj = {
            keywords: searchString
        };

        /*
         set the facet filters, if any  format is:
         https://confluence.thetus.com/display/CTW/Item+View+Rest+Services+High+Level+Strategy?src=search
         */
        if (dal.get('facetFilterCriteria').length) {
            searchObj.filters = dal.get('facetFilterCriteria');
        }
        return searchObj;
    },

    buildAndLoadResultsStore:function(dal, component, searchObj, action, pageSize) {
        if( typeof pageSize != 'undefined'){
            this.resultsStore.pageSize = pageSize;
        }
        this.resultsStore.searchParamVO =  searchObj;


        var resultsDal = component.down('#resultsdals'),
            resultsPanel = component.down('#resultspanel');

        this.resultsStore.proxy.jsonData = Ext.JSON.encode(searchObj);  // attach the search request object
        this.resultsStore.load({
            callback: Ext.bind(this.searchCallback, this, [resultsDal, resultsPanel, dal.get('id'), this.resultsStore, action], true)
        });

        resultsDal.updateDalStatus(dal.get('id'), 'pending');   // begin in a pending state
    },

    doSearch: function (elem) {

        var component = this.getSearchComponent(elem),
            sources = this.getSelectedDals(component);

        //The body is hidden when the view first opens.
        var searchBody =  component.queryById('searchbody');
        searchBody.show();

        this.hideMenu(component);

        var searchString = component.queryById('searchbar').buildSearchString(),
            resultsComponent = component.queryById('searchresults'),
            resultsPanel =  component.down('#resultspanel');

        //Clear message so it does not show while the search is happening
        resultsPanel.setErrorText("", false);

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

            var dalId = source.get('id'),
                currentDalPanel = dals.queryById(dalId),
                checked = dals.queryById(dalId).query('checkbox')[0].getValue();    // has this checkbox been selected in search options?

            if (checked) {  // checked, or always search the default dal

                source.data.facetFilterCriteria = [];
                searchObj = this.buildSearchObject(searchString, source, currentDalPanel);

                this.resultsStore.currentPage = 1;
                this.buildAndLoadResultsStore(source, component, searchObj, 'search');
            }

        }, this);


        this.showResultsPage(component);
    },

    getCustomSearchSelections: function (currentDalPanel) {

        var customSearchOptions = [],
            customInputs = currentDalPanel.query('[cls=customInputField]');

        Ext.each(customInputs, function (input) {
            var customSearchInput = {},
                type = input.xtype;

            customSearchInput.key = input.name;
            customSearchInput.value = input.value;

            switch (type) {
                case 'datefield':
                    customSearchInput.value = input.value.valueOf();
                    break;
                case 'radiogroup':
                    if (input.defaultType === 'radiofield') {
                        customSearchInput.value = input.getValue().options;
                    }
                    break;
                case 'fieldcontainer':
                    customSearchInput.key = input.down('combobox').value;
                    customSearchInput.value = input.down('[name=keyValueText]').value;
                    break;
            }

            if (customSearchInput.value === undefined || customSearchInput.value === null) {
                customSearchInput.value = '';
            }
            customSearchOptions.push(customSearchInput);
        });

        return customSearchOptions;
    },

    searchCallback: function (records, operation, success, resultsDal, resultsPanel, dalId, store, action) {

        if (!success) {
            var errorString = (operation.error && operation.error.statusText) ? " Error: " + operation.error && operation.error.statusText + " " : " Unknown Error ",
                requestStatus = (operation.error && (operation.error.status != 0) ) ? " Status: " + operation.error && operation.error.status + " " : " Unknown Status ";

            var message = 'Search failed. Details: ' + errorString + " " + requestStatus;
            console.log( message );
            //This is what we want to show to the user.  (We are aware it is a good deal less precise/accurate then the result above).
            resultsPanel.setErrorText("Invalid search term(s)", true);

        } else {

            if(records && records.length){
                resultsPanel.setErrorText('', false);
            } else {
                resultsPanel.setErrorText('No search results', false);
            }


            var resultsObj = {id: dalId, store: store, metadata: []};

            /*
             array of uri's to get the metadata for these results
             */

            var metadataArray = [];

            Ext.each(records, function (record) {
                metadataArray.push(record.data.uri);
            });


            if (action === 'search') {        //was action === 'search'
                /*
                 add an object tying the dal and store together for referencing
                 */
                resultsPanel.up('#searchresults').allResultSets = [resultsObj];

                if (store.facetValueSummaries !== null) {
                    resultsDal.createDalFacets(dalId);
                }

            } else {
                /*
                 filtering, action set to 'filter'
                 */
                Ext.each(resultsPanel.up('#searchresults').allResultSets, function (resultset, index) {
                    if (resultset.id === dalId) {
                        resultsPanel.up('#searchresults').allResultSets[index] = resultsObj;
                    }
                });
            }
            resultsDal.updateDalStatus(dalId, 'success');
        }
    },

    showResultsPage: function (component) {
        var resultsBtn = component.down('#resultsbutton');
        resultsBtn.fireEvent('click', resultsBtn);
    }

});
