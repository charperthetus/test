Ext.require('Savanna.Config');
Ext.require('Savanna.model.DalSource');
Ext.require('Savanna.store.DalSources');

describe('Dal Search', function() {
    var DAL_SOURCES_URL = '',
        fixtures = {};

    beforeEach(function() {
        DAL_SOURCES_URL = DAL_SOURCES_URL || (Savanna.Config.savannaUrlRoot + Savanna.Config.dalSourcesUrl + ';jsessionid=undefined?page=1&start=0&limit=50');
        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);
    });

    afterEach(function() {
        fixtures = null;
    });

    describe('Savanna.model.DalSource', function() {

        describe('constructor', function() {

            it('should be able to create a model with canonical data', function() {
                var dal = Ext.create('Savanna.model.DalSource', fixtures.groupedDal);

                console.log(dal);

                expect(dal instanceof Savanna.model.DalSource).toBeTruthy();

                expect(dal.get('inputTypes').length).toBeGreaterThan(0);
            });
        });
    });

    describe('Savanna.store.DalSources', function() {
        var server = null,
            store = null;

        beforeEach(function() {
            // NOTE: this has to happen BEFORE your create a FakeServer,
            store = Ext.create('Savanna.store.DalSources', { autoLoad: false });

            server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function() {
            server.restore();

            server = null;
            store = null;
        });

        describe('default data loading', function() {

            beforeEach(function() {
            });

            afterEach(function() {
            });

            it('should load data', function() {
                expect(store.getTotalCount()).toBe(0);

                server.respondWith('GET', DAL_SOURCES_URL, fixtures.allDals);

                store.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                expect(store.getTotalCount()).toBe(8);
                expect(store.defaultId).toBe('mockDAL');
            });
        });
    });
});