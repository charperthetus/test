Ext.require('Savanna.Config');
Ext.require('Savanna.model.Dal');

describe('Savanna.model.Dal', function() {
    var fixtures = {};

    beforeEach(function() {
        fixtures = Ext.clone(ThetusTestHelpers.Fixtures);
    });

    afterEach(function() {
        fixtures = null;
    });

    describe('constructor', function() {

        it('should be able to create a model with canonical data', function() {
            var dal = Ext.create('Savanna.model.Dal', fixtures.defaultDal);

            console.log(dal);

            expect(dal instanceof Savanna.model.Dal).toBeTruthy();

            expect(dal.get('inputTypes').length).toBeGreaterThan(0);
        });
    })
});