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

    var dal_fixtures;

    var TEST_SESSION_ID = 'TEST_SESSION_ID';

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);

        dal_fixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);

        createTestDom();
    });

    afterEach(function () {
        fixtures = null;
        cleanTestDom();
    });

    describe('View', function () {

        var search_component = null;
        var component = null;

        beforeEach(function () {
            // create a SearchResults store for results tests
            search_component = Ext.create('Savanna.search.view.SearchComponent', { renderTo: 'test-html' });

            component = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: 'test-html' });
        });

        afterEach(function () {
            if (component) {
                component.destroy();
                component = null;
            }
            if (search_component) {
                search_component.destroy();
                search_component = null;
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
            ;

            beforeEach(function () {
                //noinspection JSValidateTypes

                store = setupNoCacheNoPagingStore('Savanna.search.store.DalSources');

                server = new ThetusTestHelpers.FakeServer(sinon);

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
                    /*
                     This test broke due to the data restructure and use of 'hasOne'.  Creating a store and adding allDals - which
                     includes the legacyDal model - fixes the test since the associations stuff executes and creates the customSearchDescription
                     */
                    server.respondWith('GET', store.getProxy().url, dal_fixtures.allDals);

                    store.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });

                    var panelView = view.createPanel(store.getAt(0));

                    expect(panelView instanceof Savanna.search.view.searchDals.ResultsOptions).toBeTruthy();
                });
            });

            describe('createDalPanels', function () {
                var server = null,
                    store = null;

                beforeEach(function () {
                    view = component.queryById('resultsdals');

                    // NOTE: this has to happen BEFORE your create a FakeServer,
                    store = setupNoCacheNoPagingStore('Savanna.search.store.DalSources');

                    server = new ThetusTestHelpers.FakeServer(sinon);

                    server.respondWith('GET', store.getProxy().url, dal_fixtures.allDals);

                    store.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });
                });

                afterEach(function () {
                    server = null;
                    store = null;
                    view = null;
                });

                it('should create a Panel for every record in the store', function () {
                    //noinspection JSValidateTypes
                    spyOn(view, 'add');
                    view.store = store;
                    view.createDalPanels();
                    expect(view.add.callCount).toBe(store.count());
                });
            });

            describe('setDalStatus', function () {
                var server = null,
                    store = null,
                    dals_view = null;

                beforeEach(function () {

                    search_component = Ext.create('Savanna.search.view.SearchComponent', { renderTo: 'test-html' });

                    dals_view = search_component.queryById('searchdals');

                    view = component.queryById('resultsdals');

                    store = setupNoCacheNoPagingStore('Savanna.search.store.DalSources');

                    view.store = store;

                    dals_view.store = store;

                    server = new ThetusTestHelpers.FakeServer(sinon);

                    server.respondWith('GET', store.getProxy().url, dal_fixtures.allDals);

                    store.load();

                    server.respond({
                        errorOnInvalidRequest: true
                    });
                });

                afterEach(function () {
                    server = null;
                    store = null;
                    view = null;
                    if (search_component) {
                        search_component.destroy();
                        search_component = null;
                    }
                });

                it('should select a success indicator if passed a "true" value', function () {

                    dals_view.createDalPanels();

                    dals_view.queryById('MediaWiki').query('checkbox')[0].setValue(true);

                    view.createDalPanels();

                    expect(view.setDalStatus({}, true, search_component)).toEqual("success");
                });

                it('should select a fail indicator if passed a "false" value', function () {

                    dals_view.createDalPanels();

                    dals_view.queryById('MediaWiki').query('checkbox')[0].setValue(true);

                    view.createDalPanels();

                    expect(view.setDalStatus({}, false, search_component)).toEqual("fail");
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
            sources = null;

        beforeEach(function () {
            component = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: 'test-html' });
            controller = Ext.create('Savanna.search.controller.ResultsComponent');
            panel = component.queryById('resultspanel');
            grid = panel.queryById("resultspanelgrid");
            sources = component.queryById("resultsdals");
        });

        afterEach(function () {
            var teardown = [component, controller, panel, grid, sources];
            for (var i = 0; i < teardown; i++) {
                if (teardown[i]) {
                    teardown[i].destroy();
                    teardown[i] = null;
                }
            }
        });

        it('should have a store behind the grid panel', function () {
            expect(grid.store).toBeTruthy();
        });

        it('should have a store behind the sources panel', function () {
            expect(sources.store).toBeTruthy();
        });
    })
});
