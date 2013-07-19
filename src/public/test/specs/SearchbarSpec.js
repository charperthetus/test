/*

 This is definitely not ready for usage - just adding
 it as a starting point for testing the Flexpaper Component

 */

Ext.require("Savanna.search.controller.SearchBar");



describe("Searchbar", function () {

    var fixtures;

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);
    });
    afterEach(function()    {
        fixtures = null;
		cleanTestDom();
    })


    describe('View', function () {

    });

    describe('Stores', function () {

    });


    describe('Models', function () {

    });


    describe('Controller', function () {
        var controller = null, fixtures = {};

        beforeEach(function()   {
            controller = Ext.create("Savanna.search.controller.SearchBar");
        });

        afterEach(function () {
            if (controller) controller.destroy();
            controller = null;
        });

        it("should have a controller instance", function()  {
            expect(controller instanceof Savanna.search.controller.SearchBar).toBeTruthy()
        });

        describe("handleSearchTermKeyUp", function()    {
            beforeEach(function()   {
                spyOn(controller, 'doSearch');
            });

             it("should call do search on keypress 'Enter'", function() {
                 controller.handleSearchTermKeyUp(null, {"keyCode":13});
                 expect(controller.doSearch).toHaveBeenCalled();
             });

            it("should not do search if not 'Enter'", function() {
                controller.handleSearchTermKeyUp(null, {"keyCode":0});
                expect(controller.doSearch).not.toHaveBeenCalled();
            })
        });

        describe('hideMenu', function() {
            var searchbar = null;

            beforeEach(function()   {
                searchbar = Ext.create("Savanna.search.view.SearchBar", { renderTo: "test-html" });
            });

            afterEach(function()    {
                if (searchbar) searchbar.destroy();
                searchbar = null;
            });

            it('it hides the menu', function() {
                controller.hideMenu(searchbar.items.first());
                expect(searchbar.queryById("searchadvanced_menu").isVisible()).toBeFalsy()
            })
        });

        describe('alignMenuWithTextfield', function() {
            var searchbar = null;

            beforeEach(function()   {
                searchbar = Ext.create("Savanna.search.view.SearchBar",     {
                    renderTo:"test-html"
                });
                searchbar.doLayout();
            });

            afterEach(function()    {
                if (searchbar) searchbar.destroy();
                searchbar = null;
            });

            it('should align the advanced menu below the simple search textfield', function() {
                var button = controller.getAdvancedButton();
                var menu = button.menu;
                spyOn(menu, 'alignTo');
                controller.alignMenuWithTextfield(button);
                expect(menu.alignTo).toHaveBeenCalled()
            });
        });

        describe('doSearch calls buildSearchString', function()  {
            var searchbar = null;

            beforeEach(function()   {
                searchbar = Ext.create("Savanna.search.view.SearchBar");
            });

            afterEach(function()    {
                if (searchbar) searchbar.destroy();
                searchbar = null;
            });

            it("should build the search string", function() {
                spyOn(searchbar, 'buildSearchString');
                controller.doSearch(searchbar.items.first(), {});
                expect(searchbar.buildSearchString).toHaveBeenCalled();
            })
        });

        describe('buildSearchString', function() {
            var searchbar = null;

            beforeEach(function()   {
                searchbar = Ext.create("Savanna.search.view.SearchBar",     {
                    renderTo:"test-html"
                });

                searchbar.queryById("search_terms").setValue("search bar terms");
                searchbar.queryById("all_words").setValue("some text");
                searchbar.queryById("exact_phrase").setValue("other text");
                searchbar.queryById("any_words").setValue("more and more text");
                searchbar.queryById("none_words").setValue("bad terms");
                searchbar.doLayout();
            });

            afterEach(function()    {
                if (searchbar) searchbar.destroy();
                searchbar = null;
            });

            it('should correctly assemble a search string from form fields', function() {
                var result = searchbar.buildSearchString();
                var expected = 'search bar terms AND some AND text AND "other text" AND more OR and OR more OR text NOT bad NOT terms';
                expect(result).toEqual(expected)
            });

            it("should call getBooleanValue on each field", function()    {
                spyOn(searchbar.queryById("all_words"), 'getBooleanValue');
                spyOn(searchbar.queryById("exact_phrase"), 'getBooleanValue');
                spyOn(searchbar.queryById("any_words"), 'getBooleanValue');
                spyOn(searchbar.queryById("none_words"), 'getBooleanValue');
                searchbar.buildSearchString();
                expect(searchbar.queryById("all_words").getBooleanValue).toHaveBeenCalled();
                expect(searchbar.queryById("exact_phrase").getBooleanValue).toHaveBeenCalled();
                expect(searchbar.queryById("any_words").getBooleanValue).toHaveBeenCalled();
                expect(searchbar.queryById("none_words").getBooleanValue).toHaveBeenCalled();
            })
        });
    });
});
