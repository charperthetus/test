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
        var me = this;
        this.control({
            'search_searchcomponent': {
                render: this.onSearchRender
            },
            'search_searchcomponent #search_reset_button': {
                click: this.handleNewSearch
            },
            'search_searchcomponent #mapZoomTo': {
                click: function (button) {
                    button.up('search_searchmap').queryById('leafletMap').fireEvent('locationSearch:zoomto', button);
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
            'search_searchcomponent #searchadvanced_menu': {
                render: function (menu) {
                    menu.queryById('close_panel').on('click', this.handleClose);
                    menu.queryById('advancedsearch_submit').on('click', me.handleSearchSubmit, me);
                }
            },
            'search_searchcomponent #optionsbutton': {
                click: this.onBodyToolbarClick
            },
            'search_searchcomponent #resultsbutton': {
                click: this.onBodyToolbarClick
            },
            'search_searchcomponent #searchMapCanvas': {
                beforerender: this.loadDefaultLayer,
                afterrender: this.loadVectorLayer,
                resize: this.onMapCanvasResize
            },
            'search_searchcomponent #drawLocationSearch': {
                click: this.activateDrawFeature
            },
            'search_searchcomponent #clearLocationSearch': {
                click: this.clearDrawFeature
            }
        });

        this.getApplication().on('results:dalreset', this.doSearch, this);

        this.getApplication().on('results:refineSearch', this.doSearch, this);

        this.getApplication().on('results:buildAndLoadResultsStore', this.buildAndLoadResultsStore, this);
    },

    // CUSTOM METHODS

    /*
    with search now appearing within a window component, the advanced search terms menu
    no longer works correctly as a menu. Converted it to a panel (which is a good thing), but
    moving the window around with the menu open causes misalignment issues with the menu.  These event
    listeners on the parent window seem to sort it out.
     */

    onSearchRender: function (search) {
        if(search.up('desktop_searchwindow'))   {
            var advanced_menu = search.down('#searchadvanced_menu');

            search.up('desktop_searchwindow').header.getEl().on('mousedown', function () {
                advanced_menu.wasOpen = advanced_menu.isVisible();
                advanced_menu.hide();
            });

            search.up('desktop_searchwindow').on('move', function (win) {
                if (advanced_menu.wasOpen) {
                    advanced_menu.showBy(win.down('#search_form'));
                }
            });
        }
    },

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

        component.down('search_resultsDals_resultsterms').queryById('termValues').removeAll();  // remove refine terms in results screen


        var form = component.down('#search_form'),
            searchBar = component.down('#searchbar');



        searchBar.queryById('search_terms').setValue('');

        var formField = form.queryById('searchadvanced_menu').queryById('form_container');

        Ext.Array.each(formField.query('searchadvanced_textfield'), function (field) {
            if (field.xtype === 'searchadvanced_textfield') {
                field.setValue('');
            }
        });

        var sources = this.getSelectedDals(this.getSearchComponent(elem));

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
         clear the grid - it's misleading in error states to see results in the grid, even though
         the search request has failed for one reason or another
         */
        component.down('#resultspanel').updateGridStore({store: Ext.create('Savanna.search.store.SearchResults')});
    },
    clearSearch: function (elem) {
        var form = elem.findParentByType('search_searchcomponent').down('#searchbar');
        form.queryById('search_terms').setValue('');

        var formField = form.queryById('searchadvanced_menu').queryById('form_container');

        Ext.Array.each(formField.query('searchadvanced_textfield'), function (field) {
            if (field.xtype === 'searchadvanced_textfield') {
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

    alignMenuWithTextfield: function (btn) {
        var adv_menu = btn.findParentByType('search_searchcomponent').down('#searchadvanced_menu');

        if(adv_menu.isVisible())    {
            adv_menu.hide();
        }   else    {
            adv_menu.showBy(btn.up('#search_form'));
        }
    },

    onBodyToolbarClick: function (button) {
        var component = button.findParentByType('search_searchcomponent'),
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
        return elem.findParentByType('search_searchcomponent');
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

    buildSearchObject: function (searchString, dal, currentDalPanel) {
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

    buildAndLoadResultsStore:function(dal, component, searchObj, action, comboboxComponent) {

        var pageSize;

        if(comboboxComponent)   {
            pageSize = comboboxComponent.value;
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

            var dalId = source.get('id'),
                currentDalPanel = dals.queryById(dalId),
                checked = dals.queryById(dalId).query('checkbox')[0].getValue();    // has this checkbox been selected in search options?

            if (checked) {  // checked, or always search the default dal

                searchObj = this.buildSearchObject(searchString, source, currentDalPanel);

                this.buildAndLoadResultsStore(source, component, searchObj, 'search');
            }

        }, this);

        this.showResultsPage(component);
    },

    getCustomSearchSelections: function (currentDalPanel) {

        var customSearchOptions = [],
            customInputs = currentDalPanel.query('[cls=customInputField]');

        Ext.each(customInputs, function(input)  {
            var customSearchInput = {},
                type = input.xtype;

            customSearchInput.key = input.name;
            customSearchInput.value = input.value;

            switch(type)  {
                case 'datefield':
                    customSearchInput.value = input.value.valueOf();
                    break;
                case 'radiogroup':
                    if(input.defaultType === 'radiofield')    {
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
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the search request - the DAL "' + dalId + '" may be unavailable.'
            });
        } else {

            var resultsObj = {id: dalId, store: store};

            if (action === 'search') {
                /*
                 add an object tying the dal and store together for referencing
                 */
                resultsPanel.up('#searchresults').allResultSets.push(resultsObj);

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

            var statusString = success ? 'success' : 'fail';
            resultsDal.updateDalStatus(dalId, statusString);


            if (action === 'search') {
                if (dalId === Ext.data.StoreManager.lookup('dalSources').defaultId) {

                    this.getApplication().fireEvent('search:changeSelectedStore', {}, {}, resultsDal.queryById(dalId));
                }
            } else {
                /*
                 filtering, action set to 'filter'
                 */
                this.getApplication().fireEvent('search:changeSelectedStore', {}, {}, resultsDal.queryById(dalId));
            }
        }
    },

    showResultsPage: function (component) {
        var resultsBtn = component.down('#resultsbutton');

        resultsBtn.fireEvent('click', resultsBtn);
    },

    loadDefaultLayer: function (canvas) {
        canvas.map.addLayer(new OpenLayers.Layer.WMS(SavannaConfig.mapBaseLayerLabel,
            SavannaConfig.mapBaseLayerUrl, {layers: SavannaConfig.mapBaseLayerName}));
    },

    loadVectorLayer: function (canvas) {
        // Add a feature layer to the map.
        var searchLayer = new OpenLayers.Layer.Vector('searchLayer');
        canvas.searchLayer = searchLayer;
        canvas.map.addLayer(searchLayer);

        // Add the draw feature control to the map.
        var drawFeature = new OpenLayers.Control.DrawFeature(searchLayer, OpenLayers.Handler.Polygon, {
            featureAdded: this.onFeatureAdded
        });

        drawFeature.handler.callbacks.point = this.pointCallback;
        canvas.map.addControl(drawFeature);
        canvas.drawFeature = drawFeature;
    },

    onFeatureAdded: function () {
        // Scope: drawFeature
        this.deactivate();
    },

    onMapCanvasResize: function (canvas) {
        canvas.map.updateSize();
    },

    pointCallback: function () {
        // Scope: drawFeature
        // Called each time a point is added to the feature.
        if (this.layer.features.length > 0) {
            this.layer.removeAllFeatures();
        }
    },

    activateDrawFeature: function (button) {
        var canvas = button.up('search_searchmap').down('search_map_canvas');
        canvas.drawFeature.activate();
    },

    clearDrawFeature: function (button) {
        var canvas = button.up('search_searchmap').down('search_map_canvas');
        canvas.searchLayer.removeAllFeatures();
        canvas.drawFeature.deactivate();
    }
});