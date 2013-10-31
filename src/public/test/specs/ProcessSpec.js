/* global Ext: false, describe: false,
 beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
 ThetusTestHelpers: false, Savanna: false,
 go: false */
Ext.require('Savanna.process.view.ProcessEditorComponent');
Ext.require('Savanna.process.controller.ProcessController');

describe('Savanna.process', function() {
    var fixtures = {};

    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('ProcessController', function() {
        var controller = null,
            componentView = null;

        beforeEach(function() {
            componentView = Ext.create('Savanna.process.view.ProcessEditorComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            controller = componentView.getController();
        });

        afterEach(function() {
            if (controller) {
                controller.destroy();
                controller = null;
            }

            if (componentView) {
                componentView.destroy();
                componentView = null;
            }
        });

        it('controller should not be null', function() {
            expect(controller).not.toBeNull();
        });
        it('the controller should be of the correct type instantiated', function() {
            expect(controller instanceof Savanna.process.controller.ProcessController).toBeTruthy();
        });
    });

});