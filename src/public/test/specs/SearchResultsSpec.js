Ext.require('Savanna.Config');
Ext.require("Savanna.search.controller.SearchComponent");
Ext.require("Savanna.search.model.SearchHistory");
Ext.require("Savanna.search.model.SearchRequest");
Ext.require("Savanna.search.model.SearchResult");
Ext.require("Savanna.search.store.SearchHistory");
Ext.require("Savanna.search.store.SearchResults");
Ext.require("Savanna.search.view.SearchAdvancedTextfield");
Ext.require("Savanna.search.view.SearchBar");
Ext.require("Savanna.search.view.SearchBarTools");
Ext.require("Savanna.search.view.SearchBody");
Ext.require("Savanna.search.view.SearchComponent");
Ext.require("Savanna.search.view.SearchResults");
Ext.require("Savanna.search.view.SearchToolbar");

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

    describe('Results View', function () {
        var component = null;

        beforeEach(function () {
            component = Ext.create("Savanna.search.view.SearchComponent", { renderTo: "test-html" });
        });

        afterEach(function () {
            if (component) component.destroy();
            component = null;
        });


        describe('Something', function () {
            it("does this", function () {

            });
        });
    });

    describe('Results Controller', function () {
        var component = null;
        var controller = null;

        beforeEach(function () {
            component = Ext.create("Savanna.search.view.SearchComponent", { renderTo: "test-html" });
            controller = Ext.create("Savanna.search.controller.SearchComponent");

        });
        afterEach(function () {
            if (controller) controller.destroy();
            controller = null;

            if (component) component.destroy();
            component = null;
        });

        describe('Something', function () {
            it("does this", function () {

            });
        });
    });

    describe('Models', function () {
        beforeEach(function () {
            fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
        });
        afterEach(function () {
            fixtures = null;
        });
        describe('Something', function () {
            it("does this", function () {

            });
        });
    });

    describe('Stores', function () {

        var server = null,
            store = null;

        beforeEach(function () {
            fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
            store = setupNoCacheNoPagingStore('Savanna.search.store.SearchResults');
            server = new ThetusTestHelpers.FakeServer(sinon);
        });
        afterEach(function () {
            fixtures = null;
            store = null;
            searchObj = null;
        });
        describe('default data loading', function () {

            it('should load data', function () {
                expect(store.getTotalCount()).toBe(0);
                server.respondWith('POST', SEARCH_RESULTS_URL, fixtures.searchResults);

                store.proxy.jsonData = Ext.JSON.encode(searchObj.data);
                var me = this;
                me.onCallback = function(success)  {
                    expect(success).toBeTruthy();
                }
                store.load({
                    callback: function(records, operation, success) {
                        me.onCallback(success);
                    }
                });
                server.respond({
                    errorOnInvalidRequest: true
                });
            });

        });
    });
});
