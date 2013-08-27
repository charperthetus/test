/* global
 Ext: false, ExtSpec: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
 createTestDom: false, cleanTestDom: false, ThetusTestHelpers: false, setupNoCacheNoPagingStore: false,
 Savanna: false
 */
Ext.require('Savanna.Config');
Ext.require('Savanna.search.controller.SearchComponent');
Ext.require('Savanna.search.model.SearchHistory');
Ext.require('Savanna.search.model.SearchRequest');
Ext.require('Savanna.search.model.SearchResult');
Ext.require('Savanna.search.store.SearchHistory');
Ext.require('Savanna.search.view.ResultsComponent');
Ext.require('Savanna.search.view.ResultsPanel');
Ext.require('Savanna.search.view.ResultsPanelGrid');
Ext.require('Savanna.search.view.ResultsPanelToolbar');
Ext.require('Savanna.search.view.ResultsDals');

describe("Search Results", function () {

    var dalFixtures;

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);

        dalFixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);

        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function () {
        fixtures = null;

        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('View', function () {

        var searchComponent = null;

        var component = null;

        beforeEach(function () {
            // create a SearchResults store for results tests
            searchComponent = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            component = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
        });

        afterEach(function () {
            if (component) {
                component.destroy();
                component = null;
            }
            if (searchComponent) {
                searchComponent.destroy();
                searchComponent = null;
            }
        });

        it('should have a sources panel instance', function () {
            expect(component.queryById('resultsdals') instanceof Savanna.search.view.ResultsDals).toBeTruthy();
        });

        it('should have a main results panel instance', function () {
            expect(component.queryById('resultspanel') instanceof Savanna.search.view.ResultsPanel).toBeTruthy();
        });

        describe('Search Sources subview', function () {

            var view = null,
                store = null;

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
                view = component.queryById('resultsdals');
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
                    view = component.queryById('resultsdals');
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

                    view = component.queryById('resultsdals');

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

                    dalsView.queryById('MediaWiki').query('checkbox')[0].setValue(true);

                    view.createDalPanels();

                    view.updateDalStatus('mockDAL', 'success');

                    var myDal = view.queryById('mockDAL'),
                        green = 'rgb(0, 128, 0)';

                    expect(myDal.down('#dalStatusIcon').getEl().getStyle('backgroundColor')).toEqual(green);

                });

                it('should select a fail indicator if passed a "false" value', function () {

                    dalsView.createDalPanels();

                    dalsView.queryById('MediaWiki').query('checkbox')[0].setValue(true);

                    view.createDalPanels();

                    view.updateDalStatus('mockDAL', 'fail');

                    var myDal = view.queryById('mockDAL'),
                        red = 'rgb(255, 0, 0)';

                    expect(myDal.down('#dalStatusIcon').getEl().getStyle('backgroundColor')).toEqual(red);
                });
            });
        });

        describe('Grid subview', function () {

            var grid = null;
            var tools = null;

            beforeEach(function () {
                grid = component.queryById('resultspanel').queryById('resultspanelgrid');
                tools = component.queryById('resultspanel').queryById('resultspaneltoolbar');
            });

            it('should have a grid of the correct component type', function () {
                expect(grid instanceof Savanna.search.view.ResultsPanelGrid).toBeTruthy();
            });

            it('should have a toolbar of the correct component type', function () {
                expect(tools instanceof Savanna.search.view.ResultsPanelToolbar).toBeTruthy();
            });

            it('should have a paging toolbar', function () {
                expect(grid.queryById("gridtoolbar") instanceof Ext.toolbar.Paging).toBeTruthy();
            });

        });
    });

    describe('Controller', function () {

        var component = null,
            controller = null,
            panel = null,
            grid = null,
            sources = null,
            store = null;

        beforeEach(function () {

            component = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            controller = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
            panel = component.queryById('resultspanel');
            grid = panel.queryById("resultspanelgrid");
            sources = component.queryById("resultsdals");

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
            var teardown = [component, controller, panel, grid, sources];

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

                spyOn(controller, 'displayDalFacets');

                sources.createDalPanels();

                dalItem = sources.query('panel[cls=search-dal]')[1];
            });

            afterEach(function () {

                dalItem = null;

            });

            it('should add a click handler which calls "displayDalFacets"', function () {

                controller.onDalRender(dalItem, {});

                dalItem.body.dom.click();

                expect(controller.displayDalFacets).toHaveBeenCalled();
            });

        });

        describe('displayDalFacets', function () {

            var dalItem, facets;

            beforeEach(function () {
                //noinspection JSValidateTypes

                sources.store = store;
                sources.createDalPanels();

                facets = sources.queryById("resultsfacets");
                dalItem = sources.query('panel[cls=search-dal]')[1];

                spyOn(facets, 'add');
            });

            afterEach(function () {
                dalItem = null;
                facets = null;
            });

            it('should add a facet for each DAL facetDescription', function () {

                controller.displayDalFacets({}, {}, dalItem);

                var expected = store.getById(dalItem.itemId).data.facetDescriptions.length;

                expect(facets.add.callCount).toBe(expected);
            });

        });

        describe('createFacet', function () {

            it('should return a component of the correct type', function () {

                var facet = controller.createFacet(store.getById('SolrJdbc').data.facetDescriptions[0]);

                expect(facet instanceof Savanna.search.view.resultsDals.ResultsFacet).toBeTruthy()
            });

        });
    });
});
