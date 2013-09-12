/* global Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false,
 Savanna: false, ThetusTestHelpers: false
 */
Ext.require('Savanna.desktop.controller.DesktopController');
Ext.require('Savanna.desktop.view.SavannaDesktop');

describe('Desktop Component', function () {

    var server = null;
    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();
        server = new ThetusTestHelpers.FakeServer(sinon);
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();
        server.restore();

        server = null;
    });

    describe('Desktop View', function() {
        var componentView = null;

        beforeEach(function() {
            componentView = Ext.create('Savanna.desktop.view.SavannaDesktop', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
        });

        afterEach(function() {
            if (componentView) {
                componentView.destroy();
                componentView = null;
            }
        });

        it('should have a toolbar instance', function () {
            console.log(componentView);
//            expect(view.down('savannatoolbar') instanceof Savanna.desktop.view.SavannaToolbar).toBeTruthy();
        });
    });
//    describe('Desktop Controller', function() {
//        var controller = null,
//            view = null;
//
//        beforeEach(function() {
//            controller = Savanna.controller.Factory.getController('Savanna.desktop.controller.DesktopController');
//            console.log(controller);
//            view = Ext.create('Savanna.desktop.view.SavannaDesktop', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
//        });
//
//        afterEach(function() {
//            if (controller) {
//                controller.destroy();
//                controller = null;
//            }
//            if (view) {
//                view.destroy();
//                view = null;
//            }
//        });
//
//        it('should have a controller instance', function() {
//            expect(controller).not.toBeNull();
////            expect(controller instanceof Savanna.desktop.controller.DesktopController).toBeTruthy();
//        });
//
////        it('desktop should render successfully', function() {
////
////        })
//    });

});
