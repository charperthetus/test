/*

This is definitely not ready for usage - just adding
it as a starting point for testing the Flexpaper Component

 */

Ext.require("Savanna.controller.flexpaper.FlexpaperComponent");

Ext.require("Savanna.view.flexpaper.FlexpaperBody");
Ext.require("Savanna.view.flexpaper.FlexpaperComponent");
Ext.require("Savanna.view.flexpaper.FlexpaperToolbar");



describe("Flexpaper Component", function () {
    var controller = null, fixtures = {};

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);
    });

    afterEach(function () {
        fixtures = null;
        if (controller) controller.destroy();
        controller = null;
    });

    describe('Component View', function () {
        var server = null;
        var compView = null;
        beforeEach(function () {
            server = new ThetusTestHelpers.FakeServer(sinon);
            compView = Ext.create("Savanna.view.flexpaper.FlexpaperComponent");
        });

        afterEach(function () {
            if (server) server.restore();
            server = null;
            if (compView) compView.destroy();
            compView = null;
        });
        it('view should be of the correct type', function () {
            expect(compView instanceof Savanna.view.flexpaper.FlexpaperComponent).toBeTruthy();
        });
        it('view should have a controller of the correct type', function () {
            expect(compView.ctrl instanceof Savanna.controller.flexpaper.FlexpaperComponent).toBeTruthy();
        });
    });

    describe('Component Controller', function () {
        var server = null;
        var compView = null;
        var compController = null;
        beforeEach(function () {
            server = new ThetusTestHelpers.FakeServer(sinon);
            compController = Ext.create("Savanna.controller.flexpaper.FlexpaperComponent");

            compView = Ext.create("Savanna.view.flexpaper.FlexpaperComponent");
            compView.add = function(){};
            compView.remove = function(){};
            compView.items = {
                items:[
                    {
                        ctrl:   {

                        }
                    },
                    {
                        ctrl:   {

                        }
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
            expect(compController instanceof Savanna.controller.flexpaper.FlexpaperComponent).toBeTruthy();
        });

    });
});
