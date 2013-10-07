/* global
 Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
 ThetusTestHelpers: false,
 Savanna: false
 */
Ext.require('Savanna.controller.Factory');
Ext.require('Savanna.search.controller.SearchComponent');
Ext.require('Savanna.search.model.SearchRequest');
Ext.require('Savanna.search.model.SearchResult');
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

                store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'GET',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, dalFixtures.allDals);

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


                    view.createDalPanels(searchController.getSelectedDals(searchComponent));
                    // testing againt the value -3 to account for the facets, refine searchbar, and refine terms panels, which also fire add events
                    expect(view.add.callCount - 3).toBe(store.count());
                });
            });


            describe('createDalPanel', function () {
                it('should create an instance of the ResultsOptions panel', function () {

                    var panelView = view.createDalPanel(store.getAt(0));

                    expect(panelView instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions).toBeTruthy();
                });
            });

            describe('createRefineSearchPanel', function () {
                var panelView;

                beforeEach(function () {
                    panelView = view.createRefineSearchPanel();
                });

                afterEach(function () {
                    panelView = null;
                });

                it('should create an instance of the ResultsRefineSearchbar panel', function () {

                    expect(panelView instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineSearchbar).toBeTruthy();
                });
            });

            describe('createRefineTermsPanel', function () {
                var panelView, searchbarView;
                beforeEach(function () {

                    view.store = store;

                    searchComponent.down('#searchdals').store = store;
                    searchComponent.down('#searchdals').createDalPanels();

                    view.createDalPanels(searchController.getSelectedDals(searchComponent));

                    panelView = view.queryById('refineterms');
                    searchbarView = view.queryById('refinesearch');

                });

                it('should create an instance of the ResultsRefineTerms panel', function () {

                    expect(panelView instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms).toBeTruthy();
                });

                describe('add refine terms', function () {
                    it('should add terms from the search bar', function () {
                        searchbarView.queryById('refine_search_terms').setValue('apples');
                        panelView.addTerm(searchbarView.queryById('refine_search_terms'));
                        expect(panelView.queryById('termValues').queryById('term_apples')).toBeTruthy();
                    });

                    it('should remove selected terms', function () {
                        searchbarView.queryById('refine_search_terms').setValue('apples');
                        panelView.addTerm(searchbarView.queryById('refine_search_terms'));
                        panelView.removeTerm(panelView.queryById('termValues').queryById('term_apples').queryById('removeTerm'));
                        expect(panelView.queryById('termValues').queryById('term_apples')).not.toBeTruthy();
                    });
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

                var fixtures, server, searchStore, dalFixtures, facets, resultsDals, searchDals;

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
                    searchStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                    // now set up server to get store data
                    server = new ThetusTestHelpers.FakeServer(sinon);

                    var readMethod = 'POST',
                        testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(searchStore.getProxy(), 'read', readMethod);

                    server.respondWith(readMethod, testUrl, fixtures.searchResults);

                    searchStore.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });

                    /*
                     set up the DAL panels now that we have a sources store
                     */
                    searchDals.store = store;
                    searchDals.createDalPanels();

                    resultsDals.store = store;

                    searchComponent.down('#searchdals').store.each(function (record) {
                        var dalId = record.data.id;
                        searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                    });


                    resultsDals.createDalPanels(searchController.getSelectedDals(searchComponent));

                    /*
                     create facets panel and line up the last few things needed for createDalFacets method
                     */

                    //resultsDals.createFacetsTabPanel(true);

                    searchComponent.down('#searchresults').allResultSets.push({id: 'mockDAL', store: searchStore});
                    resultsDals.store = store;

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
                    searchStore = null;
                });

                it('should create a facet for each facetDescription', function () {

                    searchComponent.down('#resultsdals').createDalFacets('mockDAL');

                    var expected = store.getById('mockDAL').data.facetDescriptions.length;

                    expect(facets.add.callCount).toBe(expected);
                });

                describe('Results Facet subview', function () {
                    var myFacet, facetFixture, searchStore, server, errorRaised = false, origErrorHandler;
                    beforeEach(function () {

                        origErrorHandler = Ext.Error.handle;

                        Ext.Error.handle = function () {
                            errorRaised = true;

                            return true;
                        };

                        facetFixture = Ext.clone(ThetusTestHelpers.Fixtures.FacetModels);

                        searchStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                        // now set up server to get store data
                        server = new ThetusTestHelpers.FakeServer(sinon);

                        var readMethod = 'POST',
                            testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(searchStore.getProxy(), 'read', readMethod);

                        server.respondWith(readMethod, testUrl, fixtures.searchResults);

                        searchStore.load();

                        server.respond({
                            errorOnInvalidRequest: true
                        });
                    });

                    afterEach(function () {
                        myFacet = null;
                        facetFixture = null;
                        searchStore = null;
                        server = null;
                        origErrorHandler = null;
                        errorRaised = false;
                    });

                    describe('buildFacetFilterGroup', function () {

                        it('should return the correct UI for date facets', function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                facet: facetFixture.dateFacet
                            });

                            expect(myFacet.queryById('facets_published-date').queryById('dateFacet')).toBeTruthy();
                        });

                        it('should return the correct UI for string facets', function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                facet: facetFixture.stringFacet,
                                searchResults: {id: 'mockDAL', store: searchStore}
                            });

                            expect(myFacet.queryById('facets_producer').queryById('stringFacet')).toBeTruthy();
                        });

                        it('should raise an error for an unexpected facetDataType', function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                facet: facetFixture.unknownFacet,
                                searchResults: {id: 'mockDAL', store: searchStore}
                            });

                            expect(errorRaised).toBeTruthy();
                        });
                    });

                    describe('buildFacetFilterGroup', function () {

                        it('should add a checkbox for each facetValue', function () {
                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                facet: facetFixture.stringFacet,
                                searchResults: {id: 'mockDAL', store: searchStore}
                            });
                            spyOn(myFacet.queryById('facets_producer').queryById('stringFacet'), 'add');

                            myFacet.buildFacetFilterGroup();

                            var expected = searchStore.facetValueSummaries.producer.facetValues.length;

                            expect(myFacet.queryById('facets_producer').queryById('stringFacet').add.callCount).toBe(expected);
                        });
                    });

                    describe('onFacetFilterChange', function () {

                        var server, myFacet, myCheckbox;

                        beforeEach(function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                facet: facetFixture.stringFacet,
                                searchResults: {id: 'mockDAL', store: searchStore},
                                dal: store.getById('mockDAL')
                            });

                        });

                        afterEach(function () {
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

                    describe('onDateRangeChange', function () {

                        var server, myFacet, myRadio;

                        beforeEach(function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                facet: facetFixture.dateFacet,
                                searchResults: {id: 'mockDAL', store: store},
                                dal: store.getById('mockDAL')
                            });
                        });

                        afterEach(function () {
                            server = null;
                            myFacet = null;
                            myRadio = null;
                        });

                        it('should create start date and end date correctly', function () {

                            myRadio = myFacet.queryById('facets_published-date').queryById('dateFacet');

                            myRadio.queryById('date_past_year').setValue(true);  // one year

                            var dateRange = myFacet.getFormattedDateRange('past_year');

                            myFacet.onDateRangeChange(myRadio);

                            expect(myFacet.dal.data.dateTimeRanges[0].Startdate).toEqual(dateRange.startDate);

                            expect(myFacet.dal.data.dateTimeRanges[0].Enddate).toEqual(dateRange.endDate);

                        });
                    });

                    describe('doCustomDateSearch', function () {

                        var server, myFacet, myRadio, myPanel;

                        beforeEach(function () {

                            myFacet = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                                facet: facetFixture.dateFacet,
                                searchResults: {id: 'mockDAL', store: store},
                                dal: store.getById('mockDAL')
                            });

                            myRadio = myFacet.queryById('facets_published-date').queryById('dateFacet');

                            myPanel = myRadio.up('#facets_' + myFacet.facet.facetId).queryById('customDatesPanel');
                        });

                        afterEach(function () {
                            server = null;
                            myFacet = null;
                            myRadio = null;
                            myPanel = null;
                        });

                        it('should show and hide From and To date pickers when Custom is and is not selected', function () {

                            myRadio.queryById('date_custom').setValue(true);  // custom

                            expect(myPanel.collapsed).toBeFalsy();

                            myRadio.queryById('date_past_year').setValue(true);  // one year

                            expect(myPanel.collapsed).toBeTruthy();

                        });

                        it('should set start and end dates to search from the custom date picker values', function () {

                            myRadio = myFacet.queryById('facets_published-date').queryById('dateFacet');

                            myRadio.queryById('date_custom').setValue(true);  // custom

                            var startDate = Ext.Date.format(myPanel.queryById('fromDate').getValue(), myFacet.dateFormat),
                                endDate = Ext.Date.format(myPanel.queryById('toDate').getValue(), myFacet.dateFormat),

                                expectedStart = '1971-01-01T00:00:00.01Z',  // default
                                expectedEnd = Ext.Date.format(new Date(), myFacet.dateFormat);

                            /*
                             match the year, month and day - the exact time will never match, of course - since
                             we are matching against the textfield value for the date picker component
                             */

                            expect(startDate).toEqual(expectedStart);

                            expect(endDate.substr(0, 10)).toEqual(expectedEnd.substr(0, 10));

                        });
                    });
                });

            });

            describe('createFacet', function () {

                var searchStore;

                beforeEach(function () {

                    searchStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                    // now set up server to get store data
                    server = new ThetusTestHelpers.FakeServer(sinon);

                    var readMethod = 'POST',
                        testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(searchStore.getProxy(), 'read', readMethod),
                        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);

                    server.respondWith(readMethod, testUrl, fixtures.searchResults);

                    searchStore.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });
                });

                afterEach(function () {
                    searchStore = null;
                    server = null;
                });

                it('should return a component of the correct type', function () {

                    var facet = view.createFacet({
                        'enumValues': null,
                        'facetId': 'producer',
                        'facetDataType': 'STRING',
                        'providesAggregateData': true,
                        'canFilterOn': true,
                        'displayValue': 'Producer',
                        'enumValuesType': 'sav_facetEnumType_None'
                    }, {id: 'mockDAL', store: searchStore}, store.getById('mockDAL'));

                    expect(facet instanceof Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet).toBeTruthy();
                });

            });


            describe('updateDalStatus', function () {
                var dalsView = null;

                beforeEach(function () {

                    searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

                    dalsView = searchComponent.queryById('searchdals');

                    view = searchComponent.down('#resultsdals');

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
                });

                it('should select a success indicator if passed a "true" value', function () {

                    dalsView.createDalPanels();


                    view.store = store;

                    searchComponent.down('#searchdals').store.each(function (record) {
                        var dalId = record.data.id;
                        searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                    });


                    view.createDalPanels(searchController.getSelectedDals(searchComponent));


                    view.updateDalStatus('mockDAL', 'success');

                    var myDal = view.queryById('mockDAL'),
                        green = 'rgb(0, 128, 0)';

                    expect(myDal.down('#dalStatusIcon').getEl().getStyle('backgroundColor')).toEqual(green);

                });

                it('should select a fail indicator if passed a "false" value', function () {

                    dalsView.createDalPanels();

                    view.store = store;

                    searchComponent.down('#searchdals').store.each(function (record) {
                        var dalId = record.data.id;
                        searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                    });


                    view.createDalPanels(searchController.getSelectedDals(searchComponent));

                    view.updateDalStatus('mockDAL', 'fail');

                    var myDal = view.queryById('mockDAL'),
                        red = 'rgb(255, 0, 0)';

                    expect(myDal.down('#dalStatusIcon').getEl().getStyle('backgroundColor')).toEqual(red);
                });

                it('should set the DAL item label based on a DAL id and status', function () {

                    view.store = store;

                    searchComponent.down('#searchdals').store = store;
                    searchComponent.down('#searchdals').createDalPanels();

                    view.store = store;

                    searchComponent.down('#searchdals').store.each(function (record) {
                        var dalId = record.data.id;
                        searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                    });


                    view.createDalPanels(searchController.getSelectedDals(searchComponent));

                    var dalItem = view.query('panel[cls=results-dal]')[0],
                        expected = store.getById(dalItem.itemId).data.displayName + ' (8)';

                    view.up('#searchresults').allResultSets.push({id: dalItem.itemId, store: store});

                    view.updateDalStatus('SolrJdbc', 'success');


                    expect(dalItem.queryById('dalName').text).toEqual(expected);
                });
            });
        });


        describe('Grid subview', function () {

            var grid = null;
            var tools = null;
            var searchStore = null;
            var origErrorHandler = null;
            var fixtures = null;
            var server = null;
            var errorRaised = false;

            beforeEach(function () {
                grid = resultsComponent.queryById('resultspanel').queryById('resultspanelgrid');
                tools = resultsComponent.queryById('resultspanel').queryById('resultspaneltoolbar');
                origErrorHandler = Ext.Error.handle;

                Ext.Error.handle = function () {
                    errorRaised = true;

                    return true;
                };

                fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);

                searchStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'POST',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(searchStore.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.searchResults);


                searchStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                grid.store = searchStore;

                resultsComponent.down('#resultspanel').updateGridStore({id: 'mockDAL', store: searchStore});
                resultsComponent.down('#resultspanel').updateGridStore({id: 'mockDAL', store: searchStore});
                resultsComponent.down('#resultspanel').updateGridStore({id: 'mockDAL', store: searchStore});

                grid.getView().store = searchStore;

            });

            afterEach(function () {
                server.restore();
                server = null;
                searchStore = null;
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


            it('should have a store', function () {
                expect(grid.store).toBeTruthy();
            });

            it('should have some data in it', function () {
                var count = grid.store.snapshot ? grid.store.snapshot.length : grid.store.getCount();
                expect( count ).toBeGreaterThan(0);
            });

            it('should have a view', function () {
                expect(grid.getView()).not.toBe(null);
            });


            it('should stop being a hozer and let me select something', function () {
                var sm =  grid.getSelectionModel();
                expect( sm ).not.toBeNull();
                sm.clearSelections();
                sm.select(0);
                //expect( sm.hasSelection() ).toBeTruthy(); I commented this out because this EXTJS feature does not work the way one might expect.
                expect(sm.getSelection()).not.toBeNull();
                expect(sm.getSelection()[0]).not.toBeNull();
            });

            it('should have first item in the store', function () {
                var itemIndex = 0;
                expect(grid.store.getAt(itemIndex)).not.toBeNull();
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
            server = null,
            origErrorHandler = null,
            errorRaised = false,
            fixtures = null,
            searchStore = null;

        beforeEach(function () {


            resultsComponent = Ext.create('Savanna.search.view.searchComponent.searchBody.ResultsComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            resultsController = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');

            searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            panel = resultsComponent.queryById('resultspanel');

            grid = panel.queryById('resultspanelgrid');

            sources = searchComponent.down('#resultsdals');

            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', {autoLoad: false});

            // now set up server to get store data
            server = new ThetusTestHelpers.FakeServer(sinon);

            var readMethod = 'GET',
                testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

            server.respondWith(readMethod, testUrl, dalFixtures.allDals);

            store.load();

            sources.store = store;

            server.respond({
                errorOnInvalidRequest: true
            });
        });

        afterEach(function () {
            var teardown = [resultsComponent, resultsController, searchComponent, searchController, panel, grid, sources, origErrorHandler, fixtures, searchStore];

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

        it('should be able to compute the page for different previewIndexes', function () {
            resultsController.getGrid();
            resultsController.previewIndex = 0;
            expect(resultsController.pageOfCurrentPreviewIndex()).toBe(1);
            resultsController.previewIndex = 19;
            expect(resultsController.pageOfCurrentPreviewIndex()).toBe(1);

            resultsController.previewIndex = 30;
            expect(resultsController.pageOfCurrentPreviewIndex()).toBe(2);

        });

        describe('Controller Helper Functions', function () {

            it('should have a working getGrid helper function', function () {
                expect(resultsController.getGrid()).not.toBe(null);
            });

            it('should have a working getGridStore helper function', function () {
                expect(resultsController.getGridStore()).not.toBe(null);
            });

            it('should be able to return the previewWindow', function () {
                expect(resultsController.previewWindow()).not.toBe(null);
            });

            it('should be able to return the previous button on the preview Window', function () {
                expect(resultsController.previewPrevButton()).not.toBe(null);
            });

            it('should be able to return the next button on the preview Window', function () {
                expect(resultsController.previewPrevButton()).not.toBe(null);
            });

            it('should be able to return the index label on preview Window', function () {
                expect(resultsController.previewIndexAndTotalLabel()).not.toBe(null);
            });

        });

        describe('Preview functions', function () {
            beforeEach(function () {

                origErrorHandler = Ext.Error.handle;

                Ext.Error.handle = function () {
                    errorRaised = true;

                    return true;
                };

                fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);

                searchStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'POST',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(searchStore.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.searchResults);


                searchStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                //grid.store = searchStore;

                resultsController.getGrid().store = store;

                searchStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });
            });

            describe('Test Record Zero', function () {

                beforeEach(function () {
                    resultsController.previewIndex = 0;
                    resultsController.updatePreview();
                });

                it('should update the preview label for the first record', function () {

                    var total =resultsController.getGridStore().totalCount;
                    expect(resultsController.previewIndexAndTotalLabel().text).toBe('Preview Result 1 of ' + total);


                });

                it('should prev button disabled for first record', function () {
                    expect(resultsController.previewPrevButton().disabled).toBeTruthy();
                });

                it('should next button enabled for first record', function () {
                    expect(resultsController.previewNextButton().disabled).not.toBeTruthy();
                });


            });

            describe('Test Record ONE', function () {

                beforeEach(function () {
                    resultsController.previewIndex = 1;
                    resultsController.updatePreview();
                });

                it('should update the preview label for the second record', function () {

                    var total =resultsController.getGridStore().totalCount;
                    expect(resultsController.previewIndexAndTotalLabel().text).toBe('Preview Result 2 of ' + total);


                });

                it('should prev button disabled for second record', function () {
                    expect(resultsController.previewPrevButton().disabled).not.toBeTruthy();
                });

                it('should next button enabled for second record', function () {
                    expect(resultsController.previewNextButton().disabled).not.toBeTruthy();
                });
            });
        });




        describe('onDalRender', function () {

            var dalItem;

            beforeEach(function () {

                searchComponent.down('#searchdals').store = store;
                searchComponent.down('#searchdals').createDalPanels();


                sources.store = store;

                searchComponent.down('#searchdals').store.each(function (record) {
                    var dalId = record.data.id;
                    searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                });


                sources.createDalPanels(searchController.getSelectedDals(searchComponent));

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

        describe('add and remove terms', function () {
            var refineTerm, fixtures, server, searchStore, dalFixtures, resultsDals, searchDals;
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
                searchStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'POST',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(searchStore.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.searchResults);

                searchStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                /*
                 set up the DAL panels now that we have a sources store
                 */
                searchDals.store = store;
                searchDals.createDalPanels();

                resultsDals.store = store;


                searchComponent.down('#searchdals').queryById('mockDAL').query('checkbox')[0].setValue(true);



                resultsDals.createDalPanels(searchController.getSelectedDals(searchComponent));


                spyOn(searchComponent.down('#refineterms'), 'removeTerm');

                refineTerm = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm',     {
                    itemId:'term_apple'
                });
                refineTerm.setTerm('apple');



            });

            describe('onTermRender', function() {

                it('should add an event listener when a term is rendered', function()  {
                    searchComponent.down('#refineterms').queryById('termValues').add(refineTerm);

                    expect(refineTerm.hasListener('click')).toBeTruthy();
                });
            });

            describe('handleRemoveTerm', function() {
                it('should call removeTerm', function () {

                    searchComponent.down('#refineterms').queryById('termValues').add(refineTerm);

                    resultsController.handleRemoveTerm(refineTerm.queryById('removeTerm'));

                    expect(searchComponent.down('#refineterms').removeTerm).toHaveBeenCalled();
                });
            });
        });

        describe('onCloseItemPreview', function()    {


            it('should hide the preview window', function() {

                resultsController.onCloseItemPreview(searchComponent.queryById('resultspreviewwindow').down('#previewclosebutton'));

                expect(searchComponent.queryById('resultspreviewwindow').isVisible()).toBeFalsy();
            });
        });

        describe('onShowHideFacets', function () {

            var fixtures, server, searchStore, dalFixtures, facets, resultsDals, searchDals;

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
                searchStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults', { autoLoad: false });

                // now set up server to get store data
                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'POST',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(searchStore.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.searchResults);

                searchStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                /*
                 set up the DAL panels now that we have a sources store
                 */
                searchDals.store = store;
                searchDals.createDalPanels();

                resultsDals.store = store;


                searchComponent.down('#searchdals').queryById('mockDAL').query('checkbox')[0].setValue(true);



                resultsDals.createDalPanels(searchController.getSelectedDals(searchComponent));

                /*
                 create facets panel and line up the last few things needed for createDalFacets method
                 */

                //resultsDals.createFacetsTabPanel(true);

                searchComponent.down('#searchresults').allResultSets.push({id: 'mockDAL', store: searchStore});
                resultsDals.store = store;

                facets = resultsDals.queryById('resultsfacets').queryById('tab_mockDAL');


                searchComponent.down('#resultsdals').createDalFacets('mockDAL');



            });

            afterEach(function () {
                var teardown = [fixtures, dalFixtures, facets, resultsDals, searchDals];

                for (var i = 0; i < teardown; i++) {
                    if (teardown[i]) {
                        teardown[i].destroy();
                        teardown[i] = null;
                    }
                }
                server = null;
                searchStore = null;
            });

            it('should expand all facets"', function () {
                searchComponent.down('#resultsdals').queryById('resultsfacets').setActiveTab(0);
                resultsController.onShowHideFacets(searchComponent.down('#resultsdals').queryById('resultsfacets').queryById('showHideFacets'));
                var allExpanded = true;
                Ext.each(resultsDals.queryById('resultsfacets').query('panel[cls=results-facet]'), function(facet) {
                    if(facet.collapsed) {
                        allExpanded = false;
                    }
                });
                expect(allExpanded).toEqual(true);
            });

        });

        describe('onSortByChange', function () {

            beforeEach(function () {

                spyOn(searchController, 'doSearch');
            });

            it('should call doSearch"', function () {

                // removed for now - no functionality to test until we have options in the list
            });

        });

        describe('onPageComboChange', function () {

            beforeEach(function () {

                spyOn(searchComponent.down('#resultsdals'), 'updateDalStatus');
            });

            it('should call doSearch"', function () {

                searchComponent.down('#searchresults').currentResultSet = {id: 'mockDAL', store: store};

                searchComponent.down('#searchdals').store = store;
                searchComponent.down('#searchdals').createDalPanels();

                searchComponent.down('#resultsdals').store = store;

                searchComponent.down('#searchdals').store.each(function (record) {
                    var dalId = record.data.id;
                    searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                });


                searchComponent.down('#resultsdals').createDalPanels(searchController.getSelectedDals(searchComponent));


                resultsController.onPageComboChange(searchComponent.down('#resultsPageSizeCombobox'));

                expect(searchComponent.down('#resultsdals').updateDalStatus).toHaveBeenCalled();
            });

        });

        describe('changeSelectedStore', function () {

            var dalItem, resultsPanel;

            beforeEach(function () {

                resultsPanel = searchComponent.down('#resultspanel');

                searchComponent.down('#searchresults').currentResultSet = {id: 'mockDAL', store: store};

                searchComponent.down('#searchdals').store = store;
                searchComponent.down('#searchdals').createDalPanels();

                searchComponent.down('#resultsdals').store = store;

                searchComponent.down('#searchdals').store.each(function (record) {
                    var dalId = record.data.id;
                    searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                });

                sources.createDalPanels(searchController.getSelectedDals(searchComponent));

                dalItem = sources.query('panel[cls=results-dal]')[0];

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

        describe('handleSearchTermKeyUp and handleSearchSubmit', function()    {
            var dalItem, resultsPanel;

            beforeEach(function () {

                resultsPanel = searchComponent.down('#resultspanel');

                searchComponent.down('#searchresults').currentResultSet = {id: 'mockDAL', store: store};

                searchComponent.down('#searchdals').store = store;
                searchComponent.down('#searchdals').createDalPanels();

                searchComponent.down('#resultsdals').store = store;

                searchComponent.down('#searchdals').store.each(function (record) {
                    var dalId = record.data.id;
                    searchComponent.down('#searchdals').queryById(dalId).query('checkbox')[0].setValue(true);
                });

                sources.createDalPanels(searchController.getSelectedDals(searchComponent));

                dalItem = sources.query('panel[cls=results-dal]')[0];

                spyOn(resultsPanel, 'updateGridStore');
            });

            afterEach(function () {

                dalItem = null;

            });
            it('handleSearchTermKeyUp should call doSearch', function()  {
                var field = sources.queryById('refinesearch').down('#refine_search_terms');

                field.setValue('apples');

                var success = resultsController.handleSearchTermKeyUp(field, {keyCode:Ext.EventObject.ENTER});

                expect(success).toBeTruthy();
            });

            it('handleSearchSubmit should call doSearch', function()  {
                var field = sources.queryById('refinesearch').down('#refine_search_terms');

                field.setValue('apples');

                var btn = sources.queryById('refinesearch').down('#refine_search_submit');

                var success = resultsController.handleSearchSubmit(btn);

                expect(success).toBeTruthy();
            });
        });
    });
});
