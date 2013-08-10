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
Ext.require('Savanna.search.view.ResultsSources');

describe("Search Results", function () {

    var fixtures;
    var SEARCH_RESULTS_URL = '';
    var HISTORY_RESULTS_URL = '';
    var TEST_SESSION_ID = 'TEST_SESSION_ID';

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);

        //SEARCH_RESULTS_URL = SEARCH_RESULTS_URL || (Savanna.Config.savannaUrlRoot + "rest/search;jsessionid=" + TEST_SESSION_ID);
        SEARCH_RESULTS_URL = SEARCH_RESULTS_URL || 'app/assets/data/testSearchResults.json';

        //HISTORY_RESULTS_URL = HISTORY_RESULTS_URL || (Savanna.Config.savannaUrlRoot + "rest/search/history;jsessionid=" + TEST_SESSION_ID);
        HISTORY_RESULTS_URL = 'app/assets/data/testSearchHistory.json';

        createTestDom();
    });

    afterEach(function () {
        fixtures = null;

        cleanTestDom();
    });

    describe('View', function () {
        var component = null;

        beforeEach(function () {
            Ext.create('Savanna.search.view.SearchComponent', { renderTo: 'test-html' });
            component = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: 'test-html' });
        });

        afterEach(function () {
            if (component) {
                component.destroy();
                component = null;
            }
        });

        it('should have a sources panel instance', function () {
            expect(component.queryById('resultssources') instanceof Savanna.search.view.ResultsSources).toBeTruthy();
        });

        it('should have a main results panel instance', function () {
            expect(component.queryById('resultspanel') instanceof Savanna.search.view.ResultsPanel).toBeTruthy();
        });
    });

    describe('Controller', function()   {
        var component = null,
            controller = null,
            panel = null,
            grid = null;

        beforeEach(function()   {
            component = Ext.create('Savanna.search.view.ResultsComponent', { renderTo: 'test-html' });
            controller = Ext.create('Savanna.search.controller.ResultsComponent');
            panel = component.queryById('resultspanel');
            grid = panel.queryById("resultspanelgrid");
        });

        it('should have a store', function () {
            expect(grid.store).toBeTruthy();
        });
    })
});
