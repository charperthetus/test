Ext.require("Savanna.flexpaper.controller.FlexpaperComponent");
Ext.require("Savanna.flexpaper.view.FlexpaperComponent");
Ext.require("Savanna.flexpaper.view.FlexpaperBody");
Ext.require("Savanna.flexpaper.view.FlexpaperToolbar");
Ext.require("Savanna.flexpaper.view.FlexpaperEntityWindow");

describe("Flexpaper", function () {

    var fixtures;
    var guid = Ext.id(), fp, fpc;

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);
        createTestDom();

        fp = Ext.create("Ext.panel.Panel", {
            title: "unit test",
            closable: true,
            layout: "border",
            renderTo:"test-html"
        });
        fpc = Ext.create("Savanna.flexpaper.view.FlexpaperComponent", {
            itemId: "flexcomponent",
            configs: {
                asset: "http://localhost/flexpaper/pdf/Paper.pdf",
                guid: guid
            }
        });
        spyOn(fpc.ctrl, 'loadPaper');
        fp.add(fpc);
    });

    afterEach(function () {
        fixtures = null;
        cleanTestDom();
    });


    describe('View', function () {

        beforeEach(function()   {


        });
        afterEach(function()    {

        });

        it("should render the flexpaper instance", function()    {
            expect(fpc instanceof Savanna.flexpaper.view.FlexpaperComponent).toBeTruthy();
        });


    });

    describe('Stores', function () {

    });

    describe('Models', function () {

    });

    describe('Controller', function () {
        beforeEach(function()   {


        });
        afterEach(function()    {

        });
        it("should call the loadPaper method", function()  {
            expect(fpc.ctrl.loadPaper).toHaveBeenCalled();
        });
    });
});
