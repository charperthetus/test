Ext.require("Savanna.search.controller.SearchBar");
Ext.require("Savanna.search.controller.SearchBody");
Ext.require("Savanna.search.controller.SearchComponent");
Ext.require("Savanna.search.controller.SearchResults");
Ext.require("Savanna.search.controller.SearchToolbar");

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

describe("Searchbar", function () {

    var fixtures;
    var SEARCH_RESULTS_URL = '';

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);
        SEARCH_RESULTS_URL = SEARCH_RESULTS_URL || (Savanna.Config.savannaUrlRoot + "rest/search;jsessionid=" + Savanna.jsessionid);
        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
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
            if (component) component.destroy();
            component = null;
        });
        it("search component should have a searchbar instance", function () {
            expect(component.queryById("searchbar") instanceof Savanna.search.view.SearchBar).toBeTruthy()
        });
        it("search component should have a searchbody instance", function () {
            expect(component.queryById("searchbody") instanceof Savanna.search.view.SearchBody).toBeTruthy()
        });
        it("search component should have a toolbar instance", function () {
            expect(component.queryById("searchtoolbar") instanceof Savanna.search.view.SearchToolbar).toBeTruthy()
        });

        // toolbar view
        describe('Component Toolbar View', function() {
            it("toolbar should have a history button", function () {
                expect(component.queryById("searchtoolbar").queryById("historybutton")).toBeTruthy()
            });
        });

        // searchbar view
        describe('Component Searchbar View', function() {
            describe('buildSearchString', function () {
                var searchbar = null;

                beforeEach(function () {
                    searchbar = component.queryById("searchbar");

                    searchbar.queryById("search_terms").setValue("search bar terms");
                    searchbar.queryById("all_words").setValue("some text");
                    searchbar.queryById("exact_phrase").setValue("other text");
                    searchbar.queryById("any_words").setValue("more and more text");
                    searchbar.queryById("none_words").setValue("bad terms");
                    searchbar.doLayout();
                    ;
                });

                it('should correctly assemble a search string from form fields', function () {
                    var result = searchbar.buildSearchString();
                    var expected = 'search bar terms AND some AND text AND "other text" AND more OR and OR more OR text NOT bad NOT terms';

                    expect(result).toEqual(expected)
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
    });

    describe('Component Controller', function() {
        var component = null;

        beforeEach(function()   {
            component = Ext.create("Savanna.search.view.SearchComponent", { renderTo: "test-html" });
        });
        afterEach(function () {
            if (component) component.destroy();
            component = null;
        });
        it("search component should have a controller instance", function () {
            expect(component.ctrl instanceof Savanna.search.controller.SearchComponent).toBeTruthy()
        });

        // toolbar controller
        describe('Component Toolbar Controller', function() {
            var toolbar = null;
            beforeEach(function () {
                toolbar = component.queryById("searchtoolbar");
                spyOn(toolbar.ctrl, 'onHistoryItemClick');
                spyOn(toolbar.ctrl, 'logHistory');
            });
            it("onHistoryItemClick takes a simple button/event", function () {
                toolbar.ctrl.onHistoryItemClick(Ext.create("Ext.button.Button", {
                    text:"Dogs"
                }), null);
                expect(toolbar.ctrl.onHistoryItemClick).toHaveBeenCalled();
            });
            it("logHistory takes an array of searches and the toolbar view", function () {
                toolbar.ctrl.logHistory([{query:"Apples", date:1375746974564},{query:"Oranges", date:1375746974565}], toolbar);
                expect(toolbar.ctrl.logHistory).toHaveBeenCalled();
            });
        });
    });

    describe('Models', function() {

        describe('constructor', function() {

            it('should be able to create a model with canonical data', function() {
                var dal = Ext.create('Savanna.search.model.SearchResult', fixtures.searchResults);

                expect(dal instanceof Savanna.search.model.SearchResult).toBeTruthy();
            });
        });
    });
    /*
    describe('Controller', function () {
        var controller = null;

        beforeEach(function () {
            controller = Ext.create("Savanna.search.controller.SearchBar");
        });

        afterEach(function () {
            if (controller) controller.destroy();

            controller = null;
        });

        it("should have a controller instance", function () {
            expect(controller instanceof Savanna.search.controller.SearchBar).toBeTruthy()
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
            })
        });

        describe('hideMenu', function () {
            var searchbar = null;

            beforeEach(function () {
                searchbar = Ext.create("Savanna.search.view.SearchBar", { renderTo: "test-html" });
            });

            afterEach(function () {
                if (searchbar) searchbar.destroy();

                searchbar = null;
            });

            it('it hides the menu', function () {
                controller.hideMenu(searchbar.items.first());

                expect(searchbar.queryById("searchadvanced_menu").isVisible()).toBeFalsy()
            })
        });

        describe('alignMenuWithTextfield', function () {
            var searchbar = null;

            beforeEach(function () {
                searchbar = Ext.create("Savanna.search.view.SearchBar", {
                    renderTo: "test-html"
                });

                searchbar.doLayout();
            });

            afterEach(function () {
                if (searchbar) searchbar.destroy();

                searchbar = null;
            });

            it('should align the advanced menu below the simple search textfield', function () {
                var button = controller.getAdvancedButton();
                var menu = button.menu;

                spyOn(menu, 'alignTo');

                controller.alignMenuWithTextfield(button);

                expect(menu.alignTo).toHaveBeenCalled()
            });
        });

        describe('doSearch calls buildSearchString', function () {
            var searchbar = null;
            var searchcomponent = null;
            beforeEach(function () {
                searchbar = Ext.create("Savanna.search.view.SearchBar", { renderTo: 'test-html' });
                searchcomponent = Ext.create("Savanna.search.view.SearchComponent", { renderTo: 'test-html' });
            });

            afterEach(function () {
                if (searchbar) searchbar.destroy();
                searchbar = null;

                if (searchcomponent) searchcomponent.destroy();
                searchcomponent = null;
            });

            it("should build the search string", function () {
                spyOn(searchbar, 'buildSearchString');

                controller.doSearch(searchbar.items.first(), {});

                expect(searchbar.buildSearchString).toHaveBeenCalled();
            });
        });
    });
    */
});
