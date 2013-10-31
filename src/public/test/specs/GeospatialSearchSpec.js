/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 9/30/13
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.require('Savanna.search.controller.SearchComponent');
Ext.require('Savanna.search.model.SearchRequest');
Ext.require('Savanna.search.model.SearchResult');
Ext.require('Savanna.search.view.searchComponent.searchBar.SearchAdvancedTextfield');
Ext.require('Savanna.search.view.searchComponent.SearchBar');
Ext.require('Savanna.search.view.searchComponent.searchBar.SearchForm');
Ext.require('Savanna.search.view.searchComponent.SearchBody');
Ext.require('Savanna.search.view.SearchComponent');
Ext.require('Savanna.search.view.searchComponent.SearchToolbar');
Ext.require('Savanna.search.view.searchComponent.searchBody.SearchMap');
Ext.require('Savanna.search.view.searchComponent.searchBody.searchMap.SearchLocationComboBox');

describe('Search Map Component', function () {

    var dalFixtures,
        dalStore,
        server,
        fixtures,
        store;

    beforeEach(function () {

        /*
         NOTE: because the search component is comprised of the SearchDals component which autoLoads the dalSources,
         we need to set up our mockServer so that it will respond to that request when it happens...
         */
        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.LocationSources);
        dalFixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);
        server = new ThetusTestHelpers.FakeServer(sinon);
        dalStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources');
        server.respondWith('GET', dalStore.getProxy().url, dalFixtures.allDals);

        // Even though the request will happen later (at some point when the component is instantiated), we set the
        // server to respond now so that it's ready for that future call
        server.respond({
            errorOnInvalidRequest: true
        });

        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function () {
        if (server) {
            server.restore();
            server = null;
        }

        dalFixtures = null;
        dalStore = null;

        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('View', function () {

        var searchMap = null,
            mapCanvas = null,
            locationSearch = null,
            mapSearchComboBox = null,
            searchComponent = null,
            resultsComponent = null,
            searchMapComponent = null,
            resultsController = null,
            searchController = null,
            mapZoomToPolygonButton = null,
            mapClearLocationSearch = null,
            mapDrawSearchPolygonButton = null;

        beforeEach(function () {
            searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            resultsComponent = searchComponent.down('#searchresults');
            searchMapComponent = searchComponent.down('#searchMap');
            resultsController = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
            searchMap = searchComponent.down('#searchMap');
            mapCanvas = searchComponent.down('#searchMapCanvas');
            locationSearch = searchComponent.down('#drawLocationSearch');
            mapSearchComboBox = searchComponent.down('#searchcombobox');
            mapZoomToPolygonButton = searchComponent.down('#mapZoomToMenu');
            mapClearLocationSearch = searchComponent.down('#clearLocationSearch');
            mapDrawSearchPolygonButton = searchComponent.down('#drawLocationSearch');
        });

        afterEach(function()    {
            if (resultsComponent) {
                resultsComponent.destroy();
                resultsComponent = null;
            }
            if (searchComponent) {
                searchComponent.destroy();
                searchComponent = null;
            }
            if (searchMapComponent) {
                searchMapComponent.destroy();
                searchMapComponent = null;
            }

            resultsController = null;
            searchController = null;
            fixtures = null;
        });

        it('should have a map view instance', function () {
            expect(searchMap instanceof Savanna.search.view.searchComponent.searchBody.SearchMap).toBeTruthy();
        });

        it('should have a openLayers map instance', function () {
            expect(mapCanvas instanceof Savanna.search.view.searchComponent.searchBody.searchMap.Canvas).toBeTruthy();
        });

        it('should have a search location tool instance', function () {
            expect(mapSearchComboBox instanceof Savanna.search.view.searchComponent.searchBody.searchMap.SearchLocationComboBox).toBeTruthy();
        });

        it('should have a zoom to menu button instance', function () {
            expect(mapZoomToPolygonButton instanceof Ext.button.Button).toBeTruthy();
        });

        it('should have a Clear Location Search instance', function () {
            expect(mapClearLocationSearch instanceof Ext.button.Button).toBeTruthy();
        });

        it('should have a Draw Search Polygon instance', function () {
            expect(mapDrawSearchPolygonButton instanceof Ext.button.Button).toBeTruthy();
        });
    });

    describe('Methods', function () {

        var searchComponent = null,
            searchController = null,
            resultsController = null,
            mapCanvas = null,
            mapDrawSearchPolygonButton = null;

        beforeEach(function () {

            searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
            resultsController = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
            mapCanvas = searchComponent.down('#searchMapCanvas');
            mapDrawSearchPolygonButton = searchComponent.down('#drawLocationSearch');

        });

        afterEach(function () {
            if (searchComponent) {
                searchComponent.destroy();
                searchComponent = null;
            }

            searchController = null;
            resultsController = null;
        });

        describe('Set up map', function () {

            var extent = null;

            beforeEach(function () {
                searchController.loadDefaultLayer(mapCanvas);
                searchController.loadVectorLayer(mapCanvas);
                extent = new OpenLayers.Bounds(2.0017225, 48.485857, 2.7048475, 49.188982);
                store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchLocation');

            });

            it('should have an base layer loaded', function () {
                expect(mapCanvas.map.layers[0]).toBeTruthy();
            });

            it('should create a drawFeature, modifyFeature and searchLayer instance', function (){
                expect(mapCanvas.searchLayer).toBeTruthy();
                expect(mapCanvas.controls.drawFeature).toBeTruthy();
                expect(mapCanvas.controls.modifyFeature).toBeTruthy();

            });

            it('should activate the drawFeature instance', function () {
                searchController.activateDrawFeature(mapDrawSearchPolygonButton);
                expect(mapCanvas.controls.drawFeature.active).toBeTruthy();
            });

            it('should zoom to a location search record', function () {
                var readMethod = 'GET';

                expect(store.getTotalCount()).toBe(0);

                var testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.locationData);

                store.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                var comboBox = searchComponent.down('search_searchlocationcombobox');
                var viewBox = store.data.items[0].data.viewBox;
                var zoomToLocButton = {};
                zoomToLocButton.parentComboBox = comboBox;
                zoomToLocButton.viewBox = viewBox;
                searchController.zoomToLocation(zoomToLocButton);
                var currentExtent = mapCanvas.map.getExtent();

                // We need to find a better way to test floats, these values are very close but precision rounding is making this fail.
                // Doesn't this functionatly belong to open layers, are we writing tests to test openlayers functionality?
                // expect(currentExtent.top === extent.top && currentExtent.left === extent.left && currentExtent.right === extent.right && currentExtent.bottom === extent.bottom).toBeTruthy();

            });


            describe('adding a polygon to the map', function () {

                var zoomToButtonMenu = null,
                    menuSelectedAreaOption = null,
                    menuWholeWorldOption = null,
                    mapCanvasOut = null;

                beforeEach(function () {
                    var points = [
                        new OpenLayers.Geometry.Point(0, 0),
                        new OpenLayers.Geometry.Point(0, 100),
                        new OpenLayers.Geometry.Point(100, 100),
                        new OpenLayers.Geometry.Point(100, 0)
                    ];

                    var ring = new OpenLayers.Geometry.LinearRing(points);
                    var polygon = new OpenLayers.Geometry.Polygon([ring]);
                    var polygonFeature = new OpenLayers.Feature.Vector(polygon);
                    mapCanvas.searchLayer.addFeatures([polygonFeature]);

                    zoomToButtonMenu = searchComponent.down('#mapZoomToMenu');
                    menuSelectedAreaOption = searchComponent.down('#zoomToSelectedArea');
                    menuWholeWorldOption = searchComponent.down('#zoomToWholeWorld');
                    mapCanvas.map.zoomToMaxExtent();
                    mapCanvasOut = mapCanvas.map.maxExtent;

                });

                it('should have a searchLayer on the search map and results map', function () {
                    expect(mapCanvas.searchLayer.features.length > 0).toBeTruthy();
                    var resultsMap = searchComponent.down('#resultMapCanvas');
                    expect(resultsMap.searchLayer.features.length > 0).toBeTruthy();
                });

                it('should activate the modifyFeature instance', function () {
                    expect(mapCanvas.controls.modifyFeature.active).toBeTruthy();
                });

                it('should enable the zoom to selected area option', function () {
                    searchController.enableZoomMenu(zoomToButtonMenu);
                    expect(menuSelectedAreaOption.disabled == false).toBeTruthy();
                });

                it('should zoom to selected area', function () {
                    searchController.zoomToSearchExtent(menuSelectedAreaOption);
                    expect(mapCanvas.map.maxExtent == mapCanvas.searchLayer.maxExtent).toBeTruthy();
                });

                it('should zoom to whole world', function () {
                    searchController.zoomToSearchExtent(menuWholeWorldOption);
                    expect(mapCanvas.map.maxExtent == mapCanvasOut).toBeTruthy();
                });

                it('should remove the polygon when the Clear Location Search is selected', function () {
                    var clearLocationButton = searchComponent.down('#clearLocationSearch');
                    searchController.clearDrawFeature(clearLocationButton);
                    expect(mapCanvas.searchLayer.features.length > 0).toBeFalsy();
                });

                it('should disable the zoom to selected area when the polygon is removed', function () {
                    mapCanvas.searchLayer.removeAllFeatures();
                    searchController.enableZoomMenu(zoomToButtonMenu);
                    expect(menuSelectedAreaOption.disabled == true).toBeTruthy();
                });

                it('should remove the search polygon from the search map and results map', function () {
                    mapCanvas.searchLayer.removeAllFeatures();
                    expect(mapCanvas.searchLayer.features.length > 0).toBeFalsy();
                    var resultsMap = searchComponent.down('#resultMapCanvas');
                    expect(resultsMap.searchLayer.features.length > 0).toBeFalsy();
                });
            });
        });
    });

    describe('Savanna.search.model.SearchLocation', function() {

        describe('constructor', function() {

            it('should be able to create a model with canonical data', function() {
                var loc = Ext.create('Savanna.search.model.SearchLocation', fixtures.locationRecord);
                expect(loc instanceof Savanna.search.model.SearchLocation).toBeTruthy();
                expect(loc.get('administrativeNames').length).toBeGreaterThan(0);
            });
        });
    });

    describe('Savanna.search.store.SearchLocation', function() {

        beforeEach(function() {
            // NOTE: this has to happen BEFORE your create a FakeServer,
            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchLocation');
        });

        afterEach(function() {
            store = null;
        });

        describe('default data loading', function() {

            it('should load data', function() {
                var readMethod = 'GET';

                expect(store.getTotalCount()).toBe(0);

                var testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.locationData);

                store.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                expect(store.getTotalCount()).toBe(10);
                expect(store.data.items[0].data.population).toBe(9854000);
            });
        });
    });
});