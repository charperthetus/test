/* global
 Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
 ThetusTestHelpers: false,
 Savanna: false
 */
Ext.require('Savanna.Config');
Ext.require('Savanna.search.controller.SearchComponent');
Ext.require('Savanna.search.model.SearchHistory');
Ext.require('Savanna.search.model.SearchRequest');
Ext.require('Savanna.search.model.SearchResult');
Ext.require('Savanna.search.store.SearchHistory');
Ext.require('Savanna.search.view.SearchComponent');
Ext.require('Savanna.search.view.searchComponent.searchBody.ResultsComponent');
Ext.require('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPanel');
Ext.require('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPanelGrid');
Ext.require('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPanelToolbar');
Ext.require('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsDals');

describe('Search Results', function () {

    var dalFixtures;

    beforeEach(function () {

        dalFixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);

        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function () {
        dalFixtures = null;

        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('View', function () {

        var searchComponent = null;

        var resultsComponent = null;

        var resultsController = null;

        var searchController = null;

        beforeEach(function () {
            // create a SearchResults store for results tests
            searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            resultsComponent = searchComponent.down('#searchresults');

            resultsController = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');

            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        });

        afterEach(function () {
            if (resultsComponent) {
                resultsComponent.destroy();
                resultsComponent = null;
            }
            if (searchComponent) {
                searchComponent.destroy();
                searchComponent = null;
            }

            resultsController = null;
            searchController = null;
        });

        it('should have a sources panel instance', function () {
            expect(resultsComponent.queryById('resultsdals') instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsDals).toBeTruthy();
        });

        it('should have a main results panel instance', function () {
            expect(resultsComponent.queryById('resultspanel') instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPanel).toBeTruthy();
        });

        describe('Results Toolbar subview', function () {
            it('should apply a select handler to the "Sort By" combobox', function () {
                var combo = resultsComponent.down('#resultsSortByCombobox');

                combo.removeListener('select');

                resultsController.init();

                expect(combo.hasListener('select')).toBeTruthy();
            });

            it('should apply a select handler to the "Results Per Page" combobox', function () {
                var combo = resultsComponent.down('#resultsPageSizeCombobox');

                combo.removeListener('select');

                resultsController.init();

                expect(combo.hasListener('select')).toBeTruthy();
            });
        });

        describe('Results Sources subview', function () {

            var view = null,
                store = null,
                server = null;

            beforeEach(function () {
                //noinspection JSValidateTypes

                // Set up the store first as it is autovivified by our main view
                store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'GET',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                // load the store now (should trigger event to render the view)
                store.load();

                server.respond({
                    errorOnInvalidRequest: true
                });


                spyOn(Savanna.controller.Factory, 'getController');
                view = searchComponent.down('#resultsdals');
            });

            afterEach(function () {

                view = null;

                server = null;
                store = null;
            });

            describe('createDalPanels', function () {

                beforeEach(function () {
                    //noinspection JSValidateTypes

                    view = searchComponent.down('#resultsdals');

                    // Set up the store first as it is autovivified by our main view
                    store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                    // now set up server to get store data
                    server = new ThetusTestHelpers.FakeServer(sinon);

                    var readMethod = 'GET',
                        testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                    server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                    // load the store now (should trigger event to render the view)
                    store.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });

                });

                afterEach(function () {

                    view = null;
                    server.restore();

                    server = null;
                    store = null;
                });


                it('should create a Panel for every record in the store', function () {
                    //noinspection JSValidateTypes
                    spyOn(view, 'add');

                    searchComponent.down('#searchdals').store = store;
                    searchComponent.down('#searchdals').createDalPanels();

                    view.store = store;

                    searchComponent.down('#searchdals').store.each(function (record) {
                        var dalId = record.data.id;
                        searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                    });


                    view.createDalPanels();
                    // checking against (view.add.callCount - 1) because of the facets panel, which also triggers an 'add' event
                    expect(view.add.callCount - 1).toBe(store.count());
                });
            });


            describe('createDalPanel', function () {
                it('should create an instance of the ResultsOptions panel', function () {

                    var panelView = view.createDalPanel(store.getAt(0));

                    expect(panelView instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions).toBeTruthy();
                });
            });

            describe('createFacetsTabPanel', function () {
                it('should create an instance of the ResultsFacets panel', function () {

                    searchComponent.down('#searchdals').store = store;
                    searchComponent.down('#searchdals').createDalPanels();

                    searchComponent.down('#resultsdals').store = store;
                    searchComponent.down('#resultsdals').createDalPanels();

                    var panelView = view.createFacetsTabPanel();

                    expect(panelView instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacets).toBeTruthy();
                });
            });

            describe('createDalFacets', function () {

                var fixtures, server, store, dalStore, dalFixtures, facets, resultsDals, searchDals;

                beforeEach(function () {

                    /*
                     fixtures for both results and sources needed for facets
                     */
                    fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
                    dalFixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);

                    /*
                     ...and DAL panels in search and results
                     */
                    searchDals = searchComponent.down('#searchdals');
                    resultsDals = searchComponent.down('#resultsdals');


                    /*
                     search results store
                     */
                    store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                    // now set up server to get store data
                    server = new ThetusTestHelpers.FakeServer(sinon);

                    var readMethod = 'POST',
                        testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                    server.respondWith(readMethod, testUrl, fixtures.searchResults);

                    store.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });


                    /*
                     sources store load
                     */
                    dalStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                    server = new ThetusTestHelpers.FakeServer(sinon);

                    readMethod = 'GET';
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(dalStore.getProxy(), 'read', readMethod);

                    server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                    // load the store now (should trigger event to render the view)
                    dalStore.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });


                    /*
                     set up the DAL panels now that we have a sources store
                     */
                    searchDals.store = dalStore;
                    searchDals.createDalPanels();

                    resultsDals.store = dalStore;
                    resultsDals.createDalPanels();


                    /*
                     create facets panel and line up the last few things needed for createDalFacets method
                     */

                    resultsDals.createFacetsTabPanel();

                    searchComponent.down('#searchresults').allResultSets.push({id: 'mockDAL', store: store});
                    resultsDals.store = dalStore;

                    facets = resultsDals.queryById('resultsfacets').queryById('tab_mockDAL');

                    spyOn(facets, 'add');
                });

                afterEach(function () {
                    var teardown = [fixtures, dalFixtures, facets, resultsDals, searchDals];

                    for (var i = 0; i < teardown; i++) {
                        if (teardown[i]) {
                            teardown[i].destroy();
                            teardown[i] = null;
                        }
                    }

                    server.restore();
                    server = null;
                    store = null;
                    dalStore = null;
                });

                it('should create a facet for each facetDescription', function () {

                    searchComponent.down('#resultsdals').createDalFacets('mockDAL');

                    var expected = dalStore.getById('mockDAL').data.facetDescriptions.length;

                    expect(facets.add.callCount).toBe(expected);
                });

                describe('Results Facet subview', function () {
                    var myFacet, facetFixture, store, server, errorRaised = false, origErrorHandler;
                    beforeEach(function () {

                        origErrorHandler = Ext.Error.handle;

                        Ext.Error.handle = function () {
                            errorRaised = true;

                            return true;
                        };

                        facetFixture = Ext.clone(ThetusTestHelpers.Fixtures.FacetModels);

                        // Set up the store first as it is autovivified by our main view
                        store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                        // now set up server to get store data
                        server = new ThetusTestHelpers.FakeServer(sinon);

                        var readMethod = 'POST',
                            testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                        server.respondWith(readMethod, testUrl, fixtures.searchResults);

                        // load the store now (should trigger event to render the view)
                        store.load();

                        server.respond({
                            errorOnInvalidRequest: true
                        });
                    });

                    afterEach(function () {
                        myFacet = null;
                        facetFixture = null;
                        store = null;
                        server = null;
                        origErrorHandler = null;
                        errorRaised = false;
                    });

                    describe('buildFacetFilterGroup', function () {

                        it('should return the correct UI for date facets', function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                model: facetFixture.dateFacet
                            });

                            expect(myFacet.queryById('facets_published-date').queryById('dateFacet')).toBeTruthy();
                        });

                        it('should return the correct UI for string facets', function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                model: facetFixture.stringFacet,
                                set: {id: 'mockDAL', store: store}
                            });

                            expect(myFacet.queryById('facets_producer').queryById('stringFacet')).toBeTruthy();
                        });

                        it('should raise an error for an unexpected facetDataType', function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                model: facetFixture.unknownFacet,
                                set: {id: 'mockDAL', store: store}
                            });

                            expect(errorRaised).toBeTruthy();
                        });
                    });

                    describe('buildFacetFilterGroup', function () {

                        it('should add a checkbox for each facetValue', function () {
                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                model: facetFixture.stringFacet,
                                set: {id: 'mockDAL', store: store}
                            });
                            spyOn(myFacet.queryById('facets_producer').queryById('stringFacet'), 'add');

                            myFacet.buildFacetFilterGroup();

                            expect(myFacet.queryById('facets_producer').queryById('stringFacet').add.callCount).toBe(6);
                        });
                    });

                    describe('onFacetFilterChange', function()  {

                        var dalStore, server, myFacet, myCheckbox;

                        beforeEach(function()   {
                            /*
                             sources store load
                             */
                            dalStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                            server = new ThetusTestHelpers.FakeServer(sinon);

                            var readMethod = 'GET';
                            var testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(dalStore.getProxy(), 'read', readMethod);

                            server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                            // load the store now (should trigger event to render the view)
                            dalStore.load();

                            server.respond({
                                errorOnInvalidRequest: true
                            });

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                model: facetFixture.stringFacet,
                                set: {id: 'mockDAL', store: store},
                                dal: dalStore.getById('mockDAL')
                            });
                        });

                        afterEach(function()    {
                            dalStore = null;
                            server = null;
                            myFacet = null;
                            myCheckbox = null;
                        });

                        it('should add a new facetFilterCriteria for selections that do not yet exist', function () {

                            myCheckbox = myFacet.queryById('facets_producer').queryById('stringFacet').items.getAt(0);

                            myCheckbox.setValue(true);

                            var expected = {
                                facetName: 'producer',
                                facetValues: ['Unknown']
                            };

                            expect(myFacet.dal.data.facetFilterCriteria[0]).toEqual(expected);


                        });

                        it('should add a new facetValue array element to an existing facetFilterCriteria', function () {


                            myCheckbox = myFacet.queryById('facets_producer').queryById('stringFacet').items.getAt(0);

                            myCheckbox.setValue(true);

                            myCheckbox = myFacet.queryById('facets_producer').queryById('stringFacet').items.getAt(1);

                            myCheckbox.setValue(true);

                            var expected = {
                                facetName: 'producer',
                                facetValues: ['Unknown', 'Webizens']
                            };

                            expect(myFacet.dal.data.facetFilterCriteria[0]).toEqual(expected);


                        });

                        it('should remove facetValues from facetFilterCriteria when a checkbox is deselected ', function () {


                            myCheckbox = myFacet.queryById('facets_producer').queryById('stringFacet').items.getAt(0);

                            myCheckbox.setValue(true);

                            myCheckbox = myFacet.queryById('facets_producer').queryById('stringFacet').items.getAt(1);

                            myCheckbox.setValue(true);

                            myCheckbox = myFacet.queryById('facets_producer').queryById('stringFacet').items.getAt(0);

                            myCheckbox.setValue(false);

                            var expected = {
                                facetName: 'producer',
                                facetValues: ['Webizens']
                            };

                            expect(myFacet.dal.data.facetFilterCriteria[0]).toEqual(expected);


                        });
                    });

                    describe('onDateRangeChange', function()  {

                        var dalStore, server, myFacet, myRadio;

                        beforeEach(function()   {
                            /*
                             sources store load
                             */
                            dalStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                            server = new ThetusTestHelpers.FakeServer(sinon);

                            var readMethod = 'GET';
                            var testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(dalStore.getProxy(), 'read', readMethod);

                            server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                            // load the store now (should trigger event to render the view)
                            dalStore.load();

                            server.respond({
                                errorOnInvalidRequest: true
                            });

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                model: facetFixture.dateFacet,
                                set: {id: 'mockDAL', store: store},
                                dal: dalStore.getById('mockDAL')
                            });
                        });

                        afterEach(function()    {
                            dalStore = null;
                            server = null;
                            myFacet = null;
                            myRadio = null;
                        });

                        it('should create start and end dates correctly', function () {

                            myRadio = myFacet.queryById('facets_published-date').queryById('dateFacet').items.getAt(1);

                            var endDate = Ext.Date.format(new Date(), 'c\\Z');
                            var startDate = Ext.Date.format(Ext.Date.subtract(new Date(), Ext.Date.YEAR, 1), 'c\\Z');

                            myFacet.onDateRangeChange(myRadio);

                            expect(myFacet.dal.data.dateTimeRanges[0].StartDate).toEqual(startDate);

                            expect(myFacet.dal.data.dateTimeRanges[0].EndDate).toEqual(endDate);

                        });
                    });
                });

            });

            describe('createFacet', function () {

                it('should return a component of the correct type', function () {

                    var facet = view.createFacet({}, {}, store.getById('mockDAL'));

                    expect(facet instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet).toBeTruthy();
                });

            });


            describe('updateDalStatus', function () {
                var dalsView = null;

                beforeEach(function () {

                    searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

                    dalsView = searchComponent.queryById('searchdals');

                    view = searchComponent.down('#resultsdals');

                    // Set up the store first as it is autovivified by our main view
                    store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                    // now set up server to get store data
                    server = new ThetusTestHelpers.FakeServer(sinon);

                    var readMethod = 'GET',
                        testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                    server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                    // load the store now (should trigger event to render the view)
                    store.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });

                    view.store = store;

                    dalsView.store = store;

                });

                afterEach(function () {
                    view = null;

                    if (searchComponent) {
                        searchComponent.destroy();
                        searchComponent = null;
                    }

                    server.restore();

                    server = null;
                    store = null;
                });

                it('should select a success indicator if passed a "true" value', function () {

                    dalsView.createDalPanels();

                    view.createDalPanels();

                    view.updateDalStatus('mockDAL', 'success');

                    var myDal = view.queryById('mockDAL'),
                        green = 'rgb(0, 128, 0)';

                    expect(myDal.down('#dalStatusIcon').getEl().getStyle('backgroundColor')).toEqual(green);

                });

                it('should select a fail indicator if passed a "false" value', function () {

                    dalsView.createDalPanels();

                    view.createDalPanels();

                    view.updateDalStatus('mockDAL', 'fail');

                    var myDal = view.queryById('mockDAL'),
                        red = 'rgb(255, 0, 0)';

                    expect(myDal.down('#dalStatusIcon').getEl().getStyle('backgroundColor')).toEqual(red);
                });

                it('should set the DAL item label based on a DAL id and status', function () {

                    view.store = store;

                    searchComponent.down('#searchdals').store = store;
                    searchComponent.down('#searchdals').createDalPanels();

                    view.createDalPanels();

                    var dalItem = view.query('panel[cls=results-dal]')[0],
                        expected = store.getById(dalItem.itemId).data.displayName + ' (8)';

                    view.up('#searchresults').allResultSets.push({id: dalItem.itemId, store: store});

                    view.updateDalStatus('mockDAL', 'success');


                    expect(dalItem.queryById('dalName').text).toEqual(expected);
                });
            });
        });


        describe('Grid subview', function () {

            var grid = null;
            var tools = null;

            beforeEach(function () {
                grid = resultsComponent.queryById('resultspanel').queryById('resultspanelgrid');
                tools = resultsComponent.queryById('resultspanel').queryById('resultspaneltoolbar');
            });

            it('should have a grid of the correct component type', function () {
                expect(grid instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPanelGrid).toBeTruthy();
            });

            it('should have a toolbar of the correct component type', function () {
                expect(tools instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPanelToolbar).toBeTruthy();
            });

            it('should have a paging toolbar', function () {
                expect(grid.queryById('gridtoolbar') instanceof Ext.toolbar.Paging).toBeTruthy();
            });

        });
    });

    describe('Controller', function () {

        var resultsComponent = null,
            resultsController = null,
            searchComponent = null,
            searchController = null,
            panel = null,
            grid = null,
            sources = null,
            store = null,
            server = null;

        beforeEach(function () {


            resultsComponent = Ext.create('Savanna.search.view.searchComponent.searchBody.ResultsComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            resultsController = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');

            searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            panel = resultsComponent.queryById('resultspanel');

            grid = panel.queryById('resultspanelgrid');

            sources = searchComponent.down('#resultsdals');

            // Set up the store first as it is autovivified by our main view
            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', {autoLoad: false});

            // now set up server to get store data
            server = new ThetusTestHelpers.FakeServer(sinon);

            var readMethod = 'GET',
                testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

            server.respondWith(readMethod, testUrl, dalFixtures.allDals);

            // load the store now (should trigger event to render the view)
            store.load();

            sources.store = store;

            server.respond({
                errorOnInvalidRequest: true
            });
        });

        afterEach(function () {
            var teardown = [resultsComponent, resultsController, searchComponent, searchController, panel, grid, sources];

            for (var i = 0; i < teardown; i++) {
                if (teardown[i]) {
                    teardown[i].destroy();
                    teardown[i] = null;
                }
            }

            server.restore();
            server = null;
            store = null;
        });

        it('should have a store behind the grid panel', function () {
            expect(grid.store).toBeTruthy();
        });

        it('should have a store behind the sources panel', function () {
            expect(sources.store).toBeTruthy();
        });

        describe('onDalRender', function () {

            var dalItem;

            beforeEach(function () {

                // Set up the store first as it is autovivified by our main view
                store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'GET',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                // load the store now (should trigger event to render the view)
                store.load();

                sources.store = store;

                server.respond({
                    errorOnInvalidRequest: true
                });

                searchComponent.down('#searchdals').store = store;
                searchComponent.down('#searchdals').createDalPanels();

                sources.createDalPanels();

                dalItem = sources.query('panel[cls=results-dal]')[0];
            });

            afterEach(function () {

                dalItem = null;

            });

            it('should add a click handler', function () {

                dalItem.removeListener('click');

                resultsController.onDalRender(dalItem, {});

                expect(dalItem.hasListener('click')).toBeTruthy();
            });

        });

        describe('onSortByChange', function () {

            beforeEach(function () {

                spyOn(searchController, 'doSearch');
            });

            it('should call doSearch"', function () {

                resultsController.onSortByChange(resultsComponent.down('#resultsSortByCombobox'));

                expect(searchController.doSearch).toHaveBeenCalled();
            });

        });

        describe('onPageComboChange', function () {

            beforeEach(function () {

                spyOn(searchController, 'doSearch');
            });

            it('should call doSearch"', function () {

                resultsController.onSortByChange(resultsComponent.down('#resultsPageSizeCombobox'));

                expect(searchController.doSearch).toHaveBeenCalled();
            });

        });

        describe('changeSelectedStore', function () {

            var dalItem, resultsPanel;

            beforeEach(function () {
                // Set up the store first as it is autovivified by our main view
                store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'GET',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                // load the store now (should trigger event to render the view)
                store.load();

                sources.store = store;

                server.respond({
                    errorOnInvalidRequest: true
                });

                searchComponent.down('#searchdals').store = store;
                searchComponent.down('#searchdals').createDalPanels();

                sources.createDalPanels();

                dalItem = sources.query('panel[cls=results-dal]')[0];

                resultsPanel = searchComponent.down('#resultspanel');

                spyOn(resultsPanel, 'updateGridStore');
            });

            afterEach(function () {

                dalItem = null;

            });

            it('should update the results grid with the passed dal store', function () {

                dalItem.findParentByType('search_resultscomponent').allResultSets.push({id: dalItem.itemId, store: store});

                /*
                 This call swaps the store behind the grid
                 */
                resultsController.changeSelectedStore({}, {}, dalItem);

                expect(resultsPanel.updateGridStore).toHaveBeenCalled();
            });

        });
    });
});
