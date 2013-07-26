Ext.require("Savanna.flexpaper.controller.FlexpaperComponent");
Ext.require("Savanna.flexpaper.view.FlexpaperBody");
Ext.require("Savanna.flexpaper.view.FlexpaperComponent");
Ext.require("Savanna.flexpaper.view.FlexpaperToolbar");

describe("Flexpaper Component", function () {
    var controller = null, fixtures = {};

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);

        createTestDom();
    });

    afterEach(function () {
        fixtures = null;
        if (controller) controller.destroy();
        controller = null;

        cleanTestDom();
    });

    describe('Component View', function () {
        var server = null;
        var compView = null;

        beforeEach(function () {
            server = new ThetusTestHelpers.FakeServer(sinon);
            compView = Ext.create("Savanna.flexpaper.view.FlexpaperComponent", { renderTo: 'test-html' });
        });

        afterEach(function () {
            if (server) server.restore();
            server = null;

            if (compView) compView.destroy();
            compView = null;
        });

        it('view should be of the correct type', function () {
            expect(compView instanceof Savanna.flexpaper.view.FlexpaperComponent).toBeTruthy();
        });

        it('view should have a controller of the correct type', function () {
            expect(compView.ctrl instanceof Savanna.flexpaper.controller.FlexpaperComponent).toBeTruthy();
        });
    });

    describe('Component Controller', function () {
        var server = null;
        var compView = null;
        var compController = null;

        beforeEach(function () {
            server = new ThetusTestHelpers.FakeServer(sinon);
            compController = Ext.create("Savanna.flexpaper.controller.FlexpaperComponent");

            compView = Ext.create("Savanna.flexpaper.view.FlexpaperComponent", { renderTo: 'test-html' });

            compView.add = function(){};
            compView.remove = function(){};
            compView.items = {
                items:[
                    {
                        ctrl: {}
                    },
                    {
                        ctrl: {}
                    }
                ]
            };

            compView.fireEvent("render", compView);
        });

        afterEach(function () {
            if (server) server.restore();
            server = null;

            if (compController) compController.destroy();
            compController = null;
        });

        it('controller should be of the correct type', function () {
            expect(compController instanceof Savanna.flexpaper.controller.FlexpaperComponent).toBeTruthy();
        });
    });
});
