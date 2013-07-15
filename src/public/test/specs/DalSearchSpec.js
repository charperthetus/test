Ext.require('Savanna.Config');
Ext.require('Savanna.search.model.DalSource');
Ext.require('Savanna.search.store.DalSources');

describe('Dal Search', function() {
    var DAL_SOURCES_URL = '',
        fixtures = {};

    beforeEach(function() {
        this.addMatchers(ExtSpec.Jasmine.Matchers);

        DAL_SOURCES_URL = DAL_SOURCES_URL || (Savanna.Config.savannaUrlRoot + Savanna.Config.dalSourcesUrl + ';jsessionid=undefined?page=1&start=0&limit=50');

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);
    });

    afterEach(function() {
        fixtures = null;
    });

    describe('Savanna.search.model.DalSource', function() {

        describe('constructor', function() {

            it('should be able to create a model with canonical data', function() {
                var dal = Ext.create('Savanna.search.model.DalSource', fixtures.groupedDal);

                expect(dal instanceof Savanna.search.model.DalSource).toBeTruthy();

                expect(dal.get('inputTypes').length).toBeGreaterThan(0);
            });

            it('should correctly create an empty store for "CustomSearchGroup" when null passed for that value', function() {
                var dal = Ext.create('Savanna.model.DalSource', fixtures.legacyDal);

                expect(dal.customSearchGroups().count()).toBe(0);
            })
        });
    });

    describe('Savanna.search.store.DalSources', function() {
        var server = null,
            store = null;

        beforeEach(function() {
            // NOTE: this has to happen BEFORE your create a FakeServer,
            store = Ext.create('Savanna.search.store.DalSources', { autoLoad: false });

            server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function() {
            server.restore();

            server = null;
            store = null;
        });

        describe('default data loading', function() {

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

    describe('Savanna.search.view.SearchBody', function() {
        var view = null;

        beforeEach(function() {
            view = Ext.create('Savanna.search.view.SearchBody');
            spyOn(Savanna.controller.Factory, 'getController');
        });

        afterEach(function() {
            if (view && view.destroy) view.destroy();

            view = null;
        });

        it('initComponent should ask for a controller', function() {

            view.initComponent();

            expect(Savanna.controller.Factory.getController).toHaveBeenCalledWith('Savanna.search.controller.SearchBody');
        });
    });

    describe('Savanna.view.search.SearchDals', function() {
        var view = null;

        beforeEach(function() {
            view = Ext.create('Savanna.view.search.SearchDals');
            spyOn(Savanna.controller.Factory, 'getController');
        });

        afterEach(function() {
            if (view && view.destroy) view.destroy();

            view = null;
        });

        it('initComponent should ask for a controller', function() {

            view.initComponent();

            expect(Savanna.controller.Factory.getController).toHaveBeenCalledWith('search.SearchDals');
        });
    });

    describe('Savanna.controller.search.SearchDals', function() {
        var controller = null;

        beforeEach(function() {
            controller = Ext.create('Savanna.controller.search.SearchDals');
        });

        afterEach(function() {
            if (controller && controller.destroy) controller.destroy();

            controller = null;
        });

        describe('createPanel', function() {
            it('should create an instance of the SearchOptions panel', function() {
                var model = new Savanna.model.DalSource(fixtures.legacyDal);

                var view = controller.createPanel(model);

                expect(view instanceof Savanna.view.search.searchDals.SearchOptions).toBeTruthy();
            });
        });
        describe('createCustomSearchGroupPanel', function() {
            it('should create an instance of the Savanna.view.search.searchDals.CustomSearchGroupForm', function() {
                var store = Ext.create('Savanna.store.DalSources', {
                    autoload: false
                });
                store.loadData(fixtures.allDals);
                var view = controller.createCustomSearchGroupPanel(store);

                expect(view instanceof Savanna.view.search.searchDals.CustomSearchGroupForm).toBeTruthy();
            });
        });

        describe('createDalPanels', function() {
            it('should create a Paenl for every record in the store', function() {
                var view = Ext.create('Savanna.view.search.SearchDals');
                spyOn(view, 'add');

                controller.createDalPanels(view);

                expect(view.add.callCount).toBe(controller.getDalSourcesStore().count());
            });
        });
    });
});