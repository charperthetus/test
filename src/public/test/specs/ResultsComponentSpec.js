/* global Ext: false,
          describe: false, beforeEach: false, afterEach: false, it: false, expect: false,
          ThetusTestHelpers: false, Savanna: false
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

describe('Search Results', function () {

    var fixtures = {};

    beforeEach(function () {
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

            // test panels here, etc

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
                expect(grid.queryById('gridtoolbar') instanceof Ext.toolbar.Paging).toBeTruthy();
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
            component = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            controller = Ext.create('Savanna.search.controller.ResultsComponent');
            panel = component.queryById('resultspanel');
            grid = panel.queryById('resultspanelgrid');
            sources = component.queryById('resultsdals');
        });

        afterEach(function()    {
            var teardown = [component, controller, panel, grid, sources];

            for (var i = 0; i < teardown; i++)   {
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
    });
});
