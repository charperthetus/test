Ext.require('Savanna.controller.Factory');

describe('Savanna.controller.Factory', function() {

    beforeEach(function() {
        this.addMatchers(ExtSpec.Jasmine.Matchers);
    });

    it('should be a globally available singleton', function() {
        expect(Savanna.controller.Factory).not.toBeNull();
    });

    describe('getController', function() {

        it('should be able to retrieve an defined controller', function() {
            var controller = Savanna.controller.Factory.getController('search.SearchBody');

            expect(controller).not.toBeNull();
            expect(controller instanceof Savanna.controller.search.SearchBody).toBeTruthy();
        });

        it('should return the same instance regardless of whether called with a full package path or partial', function() {
            var fullPathController = Savanna.controller.Factory.getController('Savanna.controller.search.SearchBody');
            var partialPathController = Savanna.controller.Factory.getController('search.SearchBody');

            expect(fullPathController).toBe(partialPathController);
        });
    });
});