Ext.require('Savanna.Config');
Ext.require('Savanna.search.model.DalSource');
Ext.require('Savanna.search.store.DalSources');
Ext.require('Savanna.search.view.SearchBody');
Ext.require('Savanna.search.view.SearchComponent');
Ext.require('Savanna.search.view.searchDals.CustomGroup');
Ext.require('Savanna.search.view.searchDals.CustomSearchGroupForm');
Ext.require('Savanna.search.view.searchDals.SearchOptions');

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
		cleanTestDom();
    });

    describe('Savanna.search.model.DalSource', function() {

        describe('constructor', function() {

            it('should be able to create a model with canonical data', function() {
                var dal = Ext.create('Savanna.search.model.DalSource', fixtures.groupedDal);

                expect(dal instanceof Savanna.search.model.DalSource).toBeTruthy();

                expect(dal.get('inputTypes').length).toBeGreaterThan(0);
            });

            it('should correctly create an empty store for "CustomSearchGroup" when null passed for that value', function() {
                var dal = Ext.create('Savanna.search.model.DalSource', fixtures.legacyDal);

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
            spyOn(Savanna.controller.Factory, 'getController');
            view = Ext.create('Savanna.search.view.SearchBody', { renderTo: 'test-html' });
        });

        afterEach(function() {
            if (view && view.destroy) view.destroy();

            view = null;
        });

        it('initComponent should ask for a controller', function() {
            expect(Savanna.controller.Factory.getController).toHaveBeenCalledWith('Savanna.search.controller.SearchBody');
        });
    });

    describe('Savanna.search.view.SearchDals', function() {
        var view = null;

        beforeEach(function() {
            spyOn(Savanna.controller.Factory, 'getController');
            view = Ext.create('Savanna.search.view.SearchDals', { renderTo: 'test-html' });
        });

        afterEach(function() {
            if (view && view.destroy) view.destroy();

            view = null;
        });

        it('initComponent should ask for a controller', function() {
            expect(Savanna.controller.Factory.getController).toHaveBeenCalledWith('Savanna.search.controller.SearchDals');
        });
    });

    describe('Savanna.search.controller.SearchDals', function() {
        var controller = null;

        beforeEach(function() {
            controller = Ext.create('Savanna.search.controller.SearchDals');
        });

        afterEach(function() {
            if (controller && controller.destroy) controller.destroy();

            controller = null;
        });

        describe('createPanel', function() {
            it('should create an instance of the SearchOptions panel', function() {
                var model = new Savanna.search.model.DalSource(fixtures.legacyDal);

                var view = controller.createPanel(model);

                expect(view instanceof Savanna.search.view.searchDals.SearchOptions).toBeTruthy();
            });
        });
        describe('createCustomSearchGroupPanel', function() {
            it('should create an instance of the Savanna.search.view.searchDals.CustomSearchGroupForm', function() {
                var store = Ext.create('Savanna.search.store.DalSources', {
                    autoload: false
                });
                store.loadData(fixtures.allDals);
                var view = controller.createCustomSearchGroupPanel(store);

                expect(view instanceof Savanna.search.view.searchDals.CustomSearchGroupForm).toBeTruthy();
            });
        });

        describe('createDalPanels', function() {
            it('should create a Paenl for every record in the store', function() {
                var view = Ext.create('Savanna.search.view.SearchDals', { renderTo: 'test-html' });
                spyOn(view, 'add');

                controller.createDalPanels(view);

                expect(view.add.callCount).toBe(controller.getStore('Savanna.search.store.DalSources').count());
            });
        });

        describe('renderCustomOptions', function() {
            var view = null,
                button = null;

            beforeEach(function() {
                var uberParent = Ext.create('Savanna.search.view.SearchDals', { renderTo: 'test-html' });

                view = uberParent.down('search_searchDals_searchoptions:last');
                button = view.down('#searchOptionsToggle');

                spyOn(view, 'add').andCallThrough();
                spyOn(view, 'doLayout'); // don't necessarily need to redo the layout...
                spyOn(button, 'setText').andCallThrough();
            });

            afterEach(function() {
                if (view && view.destroy) view.destroy();

                view = null;
                button = null;
            });

            it('should render a group form if it has not been built yet', function() {
                controller.renderCustomOptions(button);

                expect(view.add).toHaveBeenCalled();
                expect(button.setText).toHaveBeenCalledWith('Hide Search Options');
                expect(view.doLayout).toHaveBeenCalled();

                // "click" the button again to validate that we change the button text to "show"
                button.setText.reset();
                view.add.reset();
                view.doLayout.reset();

                controller.renderCustomOptions(button);

                expect(view.add).not.toHaveBeenCalled();
                expect(button.setText).toHaveBeenCalledWith('Show Search Options');
                expect(view.doLayout).toHaveBeenCalled();
            });
        });
    });
});
