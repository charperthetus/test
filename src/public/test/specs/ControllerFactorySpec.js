/* global Ext: false, Savanna: false,
         describe: false, it: false, expect: false */
Ext.require('Savanna.controller.Factory');

describe('Savanna.controller.Factory', function() {

    it('should be a globally available singleton', function() {
        expect(Savanna.controller.Factory).not.toBeNull();
    });

    describe('getController', function() {

        it('should be able to retrieve an defined controller', function() {
            var controller = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            expect(controller).not.toBeNull();
            expect(controller instanceof Savanna.search.controller.SearchComponent).toBeTruthy();
        });

        it('should return the same instance regardless of whether called with a full package path or partial', function() {
            var fullPathController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
            var partialPathController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            expect(fullPathController).toBe(partialPathController);
        });
    });
});