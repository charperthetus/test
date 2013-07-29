Ext.require("Savanna.search.controller.SearchBody");

describe("Searchbody", function () {

    var fixtures;
    var searchbody = null;
    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);
        createTestDom();
        searchbody = Ext.create("Savanna.search.view.SearchBody", {
            renderTo: "test-html"
        });
    });

    afterEach(function () {
        fixtures = null;
        if (searchbody) searchbody.destroy();
        searchbody = null;
        cleanTestDom();

    });

    describe('View', function () {
        it("should have a view instance", function () {
            expect(searchbody instanceof Savanna.search.view.SearchBody).toBeTruthy()
        });
    });

    describe('Stores', function () {
        // NOTE: no tests (see DalSearchSpec for store tests)
    });

    describe('Models', function () {
        // NOTE: no tests (see DalSearchSpec for model tests)
    });

    describe('Controller', function () {

        var controller = null;

        beforeEach(function () {
            controller = Ext.create("Savanna.search.controller.SearchBody");
        });

        afterEach(function () {
            if (controller) controller.destroy();
            controller = null;
        });

        it("should have a controller instance", function () {
            expect(controller instanceof Savanna.search.controller.SearchBody).toBeTruthy()
        });

        describe("onButtonClick", function () {
            it("should set currentPanel to 'results' when 'Results' is clicked", function () {
                var resbutton = controller.getResultsButton();
                controller.currentPanel = "searchoptions";
                spyOn(controller, "onButtonClick");
                resbutton.fireEvent("click", resbutton)
            });

            it("should set currentPanel to 'searchoptions' when 'Search Options' is clicked", function () {
                var optsbutton = controller.getOptionsButton();
                controller.currentPanel = "results";
                spyOn(controller, "onButtonClick");
                optsbutton.fireEvent("click", optsbutton)
            });
        });

    });
});
