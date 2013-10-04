/* global Ext: false, describe: false,
 beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
 ThetusTestHelpers: false, Savanna: false,
 go: false */
Ext.require('Savanna.process.controller.ProcessController');

describe('Savanna.process', function() {
    var fixtures = {},
        server = null;

    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Process);
        server = new ThetusTestHelpers.FakeServer(sinon);

        SavannaConfig.resourcesPathPrefix = '/';
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();

        fixtures = {};
        server.restore();

        server = null;
    });

    describe('Controller', function() {
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
    });

    describe('Store', function() {

        describe('Templates', function() {
            var store = null;

            beforeEach(function() {
                store = setupPaletteTemplateStore(server, fixtures.defaultPaletteTemplateResponse);
            });

            afterEach(function() {
                Ext.data.StoreManager.remove(store);
                store = null;
            });

            it('should load with temporary data', function() {
                expect(store.getCount()).not.toBe(0);
                expect(store.getAt(0) instanceof Savanna.process.model.TemplateGroup).toBeTruthy();
            });
        });
    });

    function setupPaletteTemplateStore(server, fixture) {
        var readMethod = 'GET',
            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.process.store.Templates'),
            testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

        server.respondWith(readMethod, testUrl, fixture);

        store.load();

        server.respond({
            errorOnInvalidRequest: true
        });

        Ext.data.StoreManager.add('Savanna.process.store.Templates', store);

        return store;
    }
});