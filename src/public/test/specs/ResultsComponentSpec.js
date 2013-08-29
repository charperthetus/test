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
Ext.require('Savanna.search.view.ResultsComponent');
Ext.require('Savanna.search.view.ResultsPanel');
Ext.require('Savanna.search.view.ResultsPanelGrid');
Ext.require('Savanna.search.view.ResultsPanelToolbar');
Ext.require('Savanna.search.view.ResultsDals');

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

            resultsComponent = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

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
            expect(resultsComponent.queryById('resultsdals') instanceof Savanna.search.view.ResultsDals).toBeTruthy();
        });

        it('should have a main results panel instance', function () {
            expect(resultsComponent.queryById('resultspanel') instanceof Savanna.search.view.ResultsPanel).toBeTruthy();
        });

        describe('Results Toolbar subview', function () {
              it('should apply a select handler to the "Sort By" combobox', function()  {
                  var combo = resultsComponent.down('#resultsSortByCombobox');

                  combo.removeListener('select');

                  resultsController.init();

                  expect(combo.hasListener('select')).toBeTruthy();
              });

            it('should apply a select handler to the "Results Per Page" combobox', function()  {
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
                view = resultsComponent.queryById('resultsdals');
            });

            afterEach(function () {

                view = null;
                server.restore();

                server = null;
                store = null;
            });


            describe('createPanel', function () {
                it('should create an instance of the ResultsOptions panel', function () {

                    var panelView = view.createPanel(store.getAt(0));

                    expect(panelView instanceof Savanna.search.view.resultsDals.ResultsOptions).toBeTruthy();
                });
            });

            describe('createFacetsPanel', function () {
                it('should create an instance of the ResultsFacets panel', function () {

                    var panelView = view.createFacetsPanel();

                    expect(panelView instanceof Savanna.search.view.resultsDals.ResultsFacets).toBeTruthy();
                });
            });

            describe('createDalPanels', function () {

                beforeEach(function () {
                    view = resultsComponent.queryById('resultsdals');
                });


                it('should create a Panel for every record in the store', function () {
                    //noinspection JSValidateTypes
                    spyOn(view, 'add');
                    view.store = store;
                    view.createDalPanels();
                    // checking against (view.add.callCount - 1) because of the facets panel, which also triggers an 'add' event
                    expect(view.add.callCount - 1).toBe(store.count());
                });
            });

            describe('setDalStatus', function () {
                var dalsView = null;

                beforeEach(function () {

                    searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

                    dalsView = searchComponent.queryById('searchdals');

                    view = resultsComponent.queryById('resultsdals');

                    view.store = store;

                    dalsView.store = store;

                });

                afterEach(function () {
                    view = null;

                    if (searchComponent) {
                        searchComponent.destroy();
                        searchComponent = null;
                    }
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
            });

            describe('updateDalNameCount', function () {
                beforeEach(function () {
                    view = resultsComponent.queryById('resultsdals');
                });
                it('should set the DAL item label based on a DAL id and status', function () {
                    view.createDalPanels();

                    var dalItem = view.query('panel[cls=results-dal]')[0],
                        expected = store.getById(dalItem.itemId).data.displayName + ' (8)';

                    resultsComponent.allResultSets.push({id:dalItem.itemId, store:store});

                    dalItem.updateDalNameCount(dalItem.itemId, 'success');

                    expect(dalItem.queryById('dalName').html).toEqual(expected);
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
                expect(grid instanceof Savanna.search.view.ResultsPanelGrid).toBeTruthy();
            });

            it('should have a toolbar of the correct component type', function () {
                expect(tools instanceof Savanna.search.view.ResultsPanelToolbar).toBeTruthy();
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

            resultsComponent = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            resultsController = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');

            searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            panel = resultsComponent.queryById('resultspanel');

            grid = panel.queryById('resultspanelgrid');

            sources = resultsComponent.queryById('resultsdals'),

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

                spyOn(resultsController, 'displayDalFacets');

                sources.createDalPanels();

                dalItem = sources.query('panel[cls=results-dal]')[1];
            });

            afterEach(function () {

                dalItem = null;

            });

            it('should add a click handler which calls "displayDalFacets"', function () {

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

                sources.createDalPanels();

                dalItem = sources.query('panel[cls=results-dal]')[1];

                resultsPanel = resultsComponent.queryById('resultspanel');

                spyOn(resultsPanel, 'updateGridStore');
            });

            afterEach(function () {

                dalItem = null;

            });

            it('should update the results grid with the passed dal store', function () {

                resultsComponent.allResultSets.push({id:dalItem.itemId, store:store});
                /*
                This call swaps the store behind the grid
                 */
                resultsController.changeSelectedStore({}, {}, dalItem);

                expect(resultsPanel.updateGridStore).toHaveBeenCalled();
            });

        });

        describe('displayDalFacets', function () {

            var dalItem, facets;

            beforeEach(function () {
                //noinspection JSValidateTypes

                sources.store = store;
                sources.createDalPanels();

                facets = sources.queryById('resultsfacets');
                dalItem = sources.query('panel[cls=results-dal]')[1];

                spyOn(facets, 'add');
            });

            afterEach(function () {
                dalItem = null;
                facets = null;
            });

            it('should add a facet for each DAL facetDescription', function () {

                resultsController.displayDalFacets(dalItem);

                var expected = store.getById(dalItem.itemId).data.facetDescriptions.length;

                expect(facets.add.callCount).toBe(expected);
            });

        });

        describe('createFacet', function () {

            it('should return a component of the correct type', function () {

                var facet = resultsController.createFacet(store.getById('SolrJdbc').data.facetDescriptions[0]);

                expect(facet instanceof Savanna.search.view.resultsDals.ResultsFacet).toBeTruthy();
            });

        });
    });
});
