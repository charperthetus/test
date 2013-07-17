Ext.require('Savanna.crumbnet.controller.GoGraph');

describe('Savanna.crumbnet', function() {

    describe('Controller', function() {
        var controller = null;

        beforeEach(function() {
            controller = Ext.create('Savanna.crumbnet.controller.GoGraph');
        });

        afterEach(function() {
            controller = null;
        });

        it('should have a controller instance', function() {
            expect(controller instanceof Savanna.crumbnet.controller.GoGraph).toBeTruthy();
        });
    });

    describe('Model', function() {

    });

    describe('Store', function() {

    });

    describe('Views', function() {

    });
});