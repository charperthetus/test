/* global Ext: false, describe: false,
          beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
          ThetusTestHelpers: false, Savanna: false,
          go: false */
Ext.require('Savanna.Config');
Ext.require('Savanna.image.view.part.ImageViewer');

describe('Savanna.image', function() {

    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('View', function() {
        var errorRaised = false,
            origErrorHandleFn = null,
            view = null;

        beforeEach(function() {
            view = Ext.create('Savanna.image.view.part.ImageViewer', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID, width: 500, height: 500 });
            origErrorHandleFn = Ext.Error.handle;
            Ext.Error.handle = function() {
                errorRaised = true;
                return true;
            };
        });

        afterEach(function() {
            errorRaised = false;
            Ext.Error.handle = origErrorHandleFn;
            if (view) {
                view.destroy();
            }
            view = null;
        });

        it('should exist', function() {
            expect(view instanceof Savanna.image.view.part.ImageViewer).toBeTruthy();
        });



        describe('mouse handlers exist', function(){
            var imageContainerElement;

            beforeEach(function() {
                imageContainerElement = view.getImageContainer().getEl();
            });

            afterEach(function() {
                imageContainerElement = null;
            });

            it('should add a mouse down handler to image container', function () {
                expect(imageContainerElement.mousedown).not.toBeNull();
            });
            it('should add a mouse up handler to image container', function () {
                expect(imageContainerElement.mouseup).not.toBeNull();
            });
            it('should add a mouse move handler to image container', function () {
                expect(imageContainerElement.mousemove).not.toBeNull();
            });
            it('should add a mouse wheel handler to image container', function () {
                expect(imageContainerElement.mousewheel).not.toBeNull();
            });

        });

        describe('image rotates', function(){

            beforeEach(function() {
                spyOn(view,'rotateImage')
            });

            it('should rotate image clockwise', function () {
                view.rotateClockwise();
                expect(view.rotateImage).toHaveBeenCalled();
                expect(view.getRotation()).toEqual(90);
            });
            it('should rotate image counter-clockwise', function () {
                view.rotateAntiClockwise();
                expect(view.rotateImage).toHaveBeenCalled();
                expect(view.getRotation()).toEqual(270);
            });
        });
    });
});