/* global
        Ext: false, ExtSpec: false,
        describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
        createTestDom: false, cleanTestDom: false, ThetusTestHelpers: false, setupNoCacheNoPagingStore: false,
        Savanna: false
 */
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

describe("Search Component", function () {

    var fixtures;
    var SEARCH_RESULTS_URL = '';
    var HISTORY_RESULTS_URL = '';

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

    describe('Component View', function () {
        var component = null;

        beforeEach(function () {
            component = Ext.create("Savanna.search.view.SearchComponent", { renderTo: "test-html" });
        });

        afterEach(function () {
            if (component) {
                component.destroy();
            }
            component = null;
        });

        // toolbar view
        describe('Component Toolbar View', function () {
            it("search component should have a toolbar instance", function () {
                expect(component.queryById("searchtoolbar") instanceof Savanna.search.view.SearchToolbar).toBeTruthy();
            });
        });

        // searchbar view
        describe('Component Searchbar View', function () {
            describe('buildSearchString', function () {
                var searchbar = null;

                beforeEach(function () {
                    searchbar = component.queryById("searchbar");
                    searchbar.queryById("search_terms").setValue("search bar terms");
                    searchbar.queryById("all_words").setValue("some text");
                    searchbar.queryById("exact_phrase").setValue("other text");
                    searchbar.queryById("any_words").setValue("more and more text");
                    searchbar.queryById("none_words").setValue("bad terms");
                });

                it('should correctly assemble a search string from form fields', function () {
                    var result = searchbar.buildSearchString();
                    var expected = 'search bar terms AND some AND text AND "other text" AND more OR and OR more OR text NOT bad NOT terms';

                    expect(result).toEqual(expected);
                });

                it("search component should have a searchbar instance", function () {
                    expect(component.queryById("searchbar") instanceof Savanna.search.view.SearchBar).toBeTruthy();
                });

                it("should call getBooleanValue on each field", function () {
                    spyOn(searchbar.queryById("all_words"), 'getBooleanValue');
                    spyOn(searchbar.queryById("exact_phrase"), 'getBooleanValue');
                    spyOn(searchbar.queryById("any_words"), 'getBooleanValue');
                    spyOn(searchbar.queryById("none_words"), 'getBooleanValue');

                    searchbar.buildSearchString();

                    expect(searchbar.queryById("all_words").getBooleanValue).toHaveBeenCalled();
                    expect(searchbar.queryById("exact_phrase").getBooleanValue).toHaveBeenCalled();
                    expect(searchbar.queryById("any_words").getBooleanValue).toHaveBeenCalled();
                    expect(searchbar.queryById("none_words").getBooleanValue).toHaveBeenCalled();
                });
            });
        });

        // searchbody view
        describe('Component Searchbody View', function () {
            it("search component should have a searchbody instance", function () {
                expect(component.queryById("searchbody") instanceof Savanna.search.view.SearchBody).toBeTruthy();
            });
        });
    });

    describe('Component Controller', function () {
        var component = null;
        var toolbar = null;
        var controller = null;

        beforeEach(function () {
            component = Ext.create("Savanna.search.view.SearchComponent", { renderTo: "test-html" });
            controller = Ext.create("Savanna.search.controller.SearchComponent");
            toolbar = component.queryById("searchtoolbar");
            spyOn(controller, 'onHistoryItemClick');
            spyOn(controller, 'logHistory');
        });

        afterEach(function () {
            if (controller) {
                controller.destroy();
            }
            controller = null;

            if (component) {
                component.destroy();
            }
            component = null;
        });

        it("onHistoryItemClick takes a simple button/event", function () {
            controller.onHistoryItemClick(Ext.create("Ext.button.Button", {
                text: "Dogs"
            }), null);
            expect(controller.onHistoryItemClick).toHaveBeenCalled();
        });

        it("logHistory takes an array of searches and the toolbar view", function () {
            controller.logHistory([
                {query: "Apples", date: 1375746974564},
                {query: "Oranges", date: 1375746974565}
            ], toolbar);
            expect(controller.logHistory).toHaveBeenCalled();
        });

        describe("handleSearchTermKeyUp", function () {
            beforeEach(function () {
                spyOn(controller, 'doSearch');
            });

            it("should call do search on keypress 'Enter'", function () {
                controller.handleSearchTermKeyUp(null, {keyCode: 13 });

                expect(controller.doSearch).toHaveBeenCalled();
            });

            it("should not do search if not 'Enter'", function () {
                controller.handleSearchTermKeyUp(null, { keyCode: 0 });

                expect(controller.doSearch).not.toHaveBeenCalled();
            });
        });

        describe('searchbar', function () {
            var searchbar = null;

            beforeEach(function () {
                searchbar = Ext.create("Savanna.search.view.SearchBar", { renderTo: "test-html" });
                searchbar.queryById("search_terms").setValue("search bar terms");
                searchbar.queryById("all_words").setValue("some text");
                searchbar.queryById("exact_phrase").setValue("other text");
                searchbar.queryById("any_words").setValue("more and more text");
                searchbar.queryById("none_words").setValue("bad terms");
                searchbar.doLayout();
            });

            afterEach(function () {
                if (searchbar) {
                    searchbar.destroy();
                }

                searchbar = null;
            });

            it('it hides the menu', function () {
                controller.hideMenu(searchbar.items.first());

                expect(searchbar.queryById("searchadvanced_menu").isVisible()).toBeFalsy();
            });

            it('should align the advanced menu below the simple search textfield', function () {
                var button = controller.getAdvancedButton();
                var menu = button.menu;

                spyOn(menu, 'alignTo');

                controller.alignMenuWithTextfield(button);

                expect(menu.alignTo).toHaveBeenCalled();
            });

            it("should build the search string", function () {
                spyOn(component.queryById("searchbar"), 'buildSearchString').andCallThrough();
                controller.doSearch(component.queryById("searchbar").items.first(), {});
                expect(component.queryById("searchbar").buildSearchString).toHaveBeenCalled();
            });

            it("should create the store", function () {
                controller.doSearch(searchbar.items.first(), {});
                expect(searchbar.store instanceof Savanna.search.store.SearchResults).toBeTruthy();
            });
        });

        describe('SearchAdvancedTextfield', function()  {
            var field = null;

            beforeEach(function () {

            });

            afterEach(function () {
                if (field) {
                    field.destroy();
                }
                field = null;
            });

            it( "getBooleanValue returns expected string for booleanType 'all'", function() {
                field = Ext.create("Savanna.search.view.SearchAdvancedTextfield", {
                    configs:{"join":"", booleanType:"all"},
                    renderTo:"test-html"
                });
                field.setValue("some   text");
                var expected = "some AND text";
                var result = field.getBooleanValue();
                expect(result).toEqual(expected);
            });

            it( "getBooleanValue returns expected string for booleanType 'exact'", function() {
                field = Ext.create("Savanna.search.view.SearchAdvancedTextfield", {
                    configs:{"join":"", booleanType:"exact"},
                    renderTo:"test-html"
                });
                field.setValue("some   text");
                var expected = '"some   text"';
                var result = field.getBooleanValue();
                expect(result).toEqual(expected);
            });

            it( "getBooleanValue returns expected string for booleanType 'any'", function() {
                field = Ext.create("Savanna.search.view.SearchAdvancedTextfield", {
                    configs:{"join":"", booleanType:"any"},
                    renderTo:"test-html"
                });
                field.setValue("some   text");
                var expected = "some OR text";
                var result = field.getBooleanValue();
                expect(result).toEqual(expected);
            });

            it( "getBooleanValue returns expected string for booleanType 'none'", function() {
                field = Ext.create("Savanna.search.view.SearchAdvancedTextfield", {
                    configs:{"join":"", booleanType:"none"},
                    renderTo:"test-html"
                });
                field.setValue("some   text");
                var expected = "some NOT text";
                var result = field.getBooleanValue();
                expect(result).toEqual(expected);
            });
        });

        describe('onCallback', function () {

            beforeEach(function () {
                spyOn(controller, "showResultsPage");
                fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
            });

            afterEach(function () {
                fixtures = null;
            });

            it(" calls showResultsPage", function () {
                controller.onCallback(fixtures.searchResults, {}, true);
                expect(controller.showResultsPage).toHaveBeenCalled();
            });

        });

        describe('should call logHistory', function () {

            it("logHistory called", function () {
                controller.doSearch(component.queryById("searchbar").items.first(), {});
                expect(controller.logHistory).toHaveBeenCalled();
            });
        });

        describe('Component Toolbar Controller', function () {

            describe("onBodyToolbarClick", function () {
                it("should set currentPanel to 'results' when 'Results' is clicked", function () {
                    var resbutton = controller.getResultsButton();
                    component.queryById("searchbody").currentPanel = "searchoptions";
                    spyOn(controller, "onBodyToolbarClick");
                    resbutton.fireEvent("click", resbutton);
                });

                it("should set currentPanel to 'searchoptions' when 'Search Options' is clicked", function () {
                    var optsbutton = controller.getOptionsButton();
                    component.queryById("searchbody").currentPanel = "results";
                    spyOn(controller, "onBodyToolbarClick");
                    optsbutton.fireEvent("click", optsbutton);
                });
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

        describe('constructor', function () {
            it('should be able to create a model with canonical data', function () {
                var result = Ext.create('Savanna.search.model.SearchResult', fixtures.searchResults);
                expect(result instanceof Savanna.search.model.SearchResult).toBeTruthy();
            });
        });
    });

    describe('SearchResults Store', function () {
        var server = null,
            store = null,
            searchObj = null;

        beforeEach(function () {
            fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);

            // NOTE: this has to happen BEFORE your create a FakeServer,
            searchObj = Ext.create("Savanna.search.model.SearchRequest", {
                "textInputString": "dogs",
                "displayLabel": "dogs"
            });
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
                };

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

    describe('SearchHistory Store', function () {
        var server = null,
            store = null,
            mdl = null;

        describe('posting a history event', function () {
            beforeEach(function () {
                fixtures = Ext.clone(ThetusTestHelpers.Fixtures.HistoryResults);
                store = setupNoCacheNoPagingStore('Savanna.search.store.SearchHistory');
                store.searches = fixtures.historyResults;
                server = new ThetusTestHelpers.FakeServer(sinon);
                mdl = Ext.create("Savanna.search.model.SearchHistory", {
                    query: "cherries",
                    date: 1375825806864
                });
            });

            afterEach(function () {
                store = null;
                mdl = null;
            });

            it('onHistory adds passed history models', function () {
                var expected = [{"query": "apples","date": 1375825806861},{"query": "oranges","date": 1375825806862},{"query": "bananas","date": 1375825806863},{query:"cherries", date:1375825806864}];
                store.searches.push(mdl.data);
                expect(store.searches).toEqual(expected);
            });

            it('onHistory posts data', function () {
                this.onCallback = function(success)  {
                    expect(success).toBeTruthy();
                };

                server.respondWith('POST', HISTORY_RESULTS_URL, fixtures.historyResults);

                store.searches.push(mdl.data);
                store.load({
                    callback: this.onCallback
                });

                server.respond({
                    errorOnInvalidRequest: true
                });
            });
        });

    });
});
