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
        'Savanna.search.view.searchComponent.searchBody.searchMap.SearchForm',
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
            },
            'search_searchform #zoomToLocationButton': {
                click: this.zoomToLocation
            },
            'search_searchcomponent #mapZoomToMenu': {
                click: this.enableZoomMenu
            },
            'search_searchcomponent #mapZoomToMenu menu': {
                click: this.zoomToSearchExtent
            }
        });
    },

    // CUSTOM METHODS    
    onFindLocation: function (button) {
        var locationSearchInput = button.up('#searchLocationDockedItems').down('#findLocationSearchText');
        var locationSearchText = locationSearchInput.value;
        if (locationSearchText) {
            var searchForm = button.up('search_searchmap').down('search_searchform');
            //remove all the previous search contents
            searchForm.down('#numResults').update('Loading Results...');
            searchForm.removeAll();
            searchForm.store.load({
                params: {
                 q: locationSearchText
                }
            });
            searchForm.showBy(locationSearchInput, 'tl-bl?');

        }
    },

    handleNewSearch: function (elem) {
        var component = this.getSearchComponent(elem);

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
            resultsPanel = component.down('#resultspanel'),
            searchObj = Ext.create('Savanna.search.model.SearchRequest', {
                'textInputString': searchString,
                'displayLabel': searchString
            });

        resultsDal.createDalPanels(sources);

        /*
         Check for selected additional Dals, and do a search on each of them
         */
        Ext.each(sources, function (source) {

            var dalId = source.get('id');
            var currentDalPanel = dals.queryById(dalId);
            var checked = dals.queryById(dalId).query('checkbox')[0].getValue();    // has this checkbox been selected in search options?

            if (checked) {  // checked, or always search the default dal

                // Dal has been selected, apply to the request model and do search

                searchObj.set('contentDataSource', dalId);

                searchObj.set('searchPreferencesVOs', [
                    {
                        'dalId': dalId,
                        'sortOrder': 'Default',
                        'customSearchSelections': this.getCustomSearchSelections(currentDalPanel)
                    }
                ]);

                /*
                 build the 'desiredFacets' array for the request, by iterating over
                 facetValueSummaries in the DAL sources json
                 */
                var desiredFacets = [];

                Ext.each(source.get('facetDescriptions'), function (description) {
                    desiredFacets.push(description.facetId);
                });

                searchObj.set('desiredFacets', desiredFacets);


                /*
                 set the facet filters, if any
                 */
                if (source.get('facetFilterCriteria').length) {
                    searchObj.set('facetFilterCriteria', []);
                }

                /*
                 set the date ranges, if any
                 */
                if (source.get('dateTimeRanges').length) {
                    searchObj.set('dateTimeRanges', []);
                }

                /*
                 Set to default pageSize for the stores.
                 and create a new store for each DAL
                 */
                var resultsStore = Ext.create('Savanna.search.store.SearchResults', {
                    storeId: 'searchResults_' + dalId,
                    pageSize: 20
                });
                resultsStore.proxy.jsonData = Ext.JSON.encode(searchObj.data);  // attach the search request object
                resultsStore.load({
                    callback: Ext.bind(this.searchCallback, this, [resultsDal, resultsPanel, dalId, resultsStore], true)
                });

                resultsDal.updateDalStatus(dalId, 'pending');   // begin in a pending state
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

    searchCallback: function (records, operation, success, resultsDal, resultsPanel, dalId, store) {

        if (!success) {
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the search request - the DAL "' + dalId + '" may be unavailable.'
            });
        } else {

            var resultsObj = {id: dalId, store: store};

            resultsPanel.up('#searchresults').allResultSets.push(resultsObj);   // add an object tying the dal and store together for referencing

            var statusString = success ? 'success' : 'fail';

            resultsDal.updateDalStatus(dalId, statusString);

            if (store.facetValueSummaries !== null) {
                resultsDal.createDalFacets(dalId);
            }

            if (dalId === Ext.data.StoreManager.lookup('dalSources').defaultId) {
                var controller = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
                controller.changeSelectedStore({}, {}, resultsDal.queryById(dalId));
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

    loadVectorLayer: function(canvas) {
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

    onFeatureAdded: function() {
        // Scope: drawFeature
        this.deactivate();
    },

    onMapCanvasResize: function(canvas) {
        canvas.map.updateSize();
    },

    pointCallback: function() {
        // Scope: drawFeature
        // Called each time a point is added to the feature.
        if(this.layer.features.length > 0) {
            this.layer.removeAllFeatures();
        }
    },

    activateDrawFeature: function(button) {
        var canvas = button.up('search_searchmap').down('search_map_canvas');
        canvas.drawFeature.activate();
    },

    clearDrawFeature: function(button) {
        var canvas = button.up('search_searchmap').down('search_map_canvas');
        canvas.searchLayer.removeAllFeatures();
        canvas.drawFeature.deactivate();
    },
    zoomToLocation: function(button) {
        var resultPanel = button.up('panel');
        var viewBox = resultPanel.viewBox;
        var mapCanvas = button.up('search_searchmap').down('search_map_canvas');
        var extent = new OpenLayers.Bounds(viewBox.west, viewBox.south, viewBox.east, viewBox.north);
        mapCanvas.map.zoomToExtent(extent, true);
    },

    enableZoomMenu: function (button) {
        var mapCanvas = button.up('search_searchmap').down('search_map_canvas');
        var menuButton = button.menu.items.get('zoomToSelectedArea');
        //check if search layer is populated
        //if search layer has a feature enable zoom to selected area
        if (mapCanvas.searchLayer.features.length > 0){
            menuButton.setDisabled(false);
        }
        else{
            menuButton.setDisabled(true);
        }
    },

    zoomToSearchExtent: function (menu) {
        var mapCanvas = menu.up('search_searchmap').down('search_map_canvas');
        if (menu.activeItem) {
            switch (menu.activeItem.itemId) {
                case 'zoomToWholeWorld':
                    mapCanvas.map.zoomToMaxExtent();
                    break;
                case 'zoomToSelectedArea':
                    mapCanvas.map.zoomToExtent(mapCanvas.searchLayer.getDataExtent());
                    break;
            }
        }
    }
});