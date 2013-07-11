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
        var comp_view = null;
        beforeEach(function () {
            server = new ThetusTestHelpers.FakeServer(sinon);
            comp_view = Ext.create("Savanna.view.flexpaper.FlexpaperComponent");
        });

        afterEach(function () {
            if (server) server.restore();
            server = null;
            if (comp_view) comp_view.destroy();
            comp_view = null;
        });
        it('view should be of the correct type', function () {
            expect(comp_view instanceof Savanna.view.flexpaper.FlexpaperComponent).toBeTruthy();
        });
        it('view should have a controller of the correct type', function () {
            expect(comp_view.ctrl instanceof Savanna.controller.flexpaper.FlexpaperComponent).toBeTruthy();
        });
    });

    describe('Component Controller', function () {
        var server = null;
        var comp_view = null;
        var comp_controller = null;
        beforeEach(function () {
            server = new ThetusTestHelpers.FakeServer(sinon);
            comp_controller = Ext.create("Savanna.controller.flexpaper.FlexpaperComponent");

            comp_view = Ext.create("Savanna.view.flexpaper.FlexpaperComponent");
            comp_view.add = function(){};
            comp_view.remove = function(){};
            comp_view.items = {
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
            comp_view.fireEvent("render", comp_view);
        });

        afterEach(function () {
            if (server) server.restore();
            server = null;
            if (comp_controller) comp_controller.destroy();
            comp_controller = null;
        });
        it('controller should be of the correct type', function () {
            expect(comp_controller instanceof Savanna.controller.flexpaper.FlexpaperComponent).toBeTruthy();
        });

    });
});
