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

    var dalFixtures;
    var dalStore;
    var server;
    var fixtures;
    var store;



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
        // create a SearchResults store for results tests

    });

//    beforeEach(function(){
//        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.LocationSources);
//        ThetusTestHelpers.ExtHelpers.createTestDom();
//        view = Ext.create('Savanna.search.view.searchComponent.searchBody.SearchMap', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
//    });
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


        var searchMap = null;

        var mapCanvas = null;

        var locationSearch = null;

        var mapSearchComboBox = null;

        var searchComponent = null;

        var resultsComponent = null;

        var searchMapComponent = null;

        var resultsController = null;

        var searchController = null;

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

        it('should have a toolbar instance', function () {
            expect(mapSearchComboBox instanceof Savanna.search.view.searchComponent.searchBody.searchMap.SearchLocationComboBox).toBeTruthy();
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

            //server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function() {

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