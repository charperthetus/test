/* global Ext: false, describe: false,
 beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
 ThetusTestHelpers: false, Savanna: false,
 go: false */

describe('Savanna.process', function() {
    var fixtures = {},
        server = null;

    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.ProcessEditor);
        server = new ThetusTestHelpers.FakeServer(sinon);
        console.log(fixtures);
        SavannaConfig.resourcesPathPrefix = '/';
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();

        fixtures = {};
        server.restore();

        server = null;
    });

//    describe('Store', function() {
//
//        describe('Templates', function() {
//            var store = null;
//
//            beforeEach(function() {
//                console.log(fixtures);
//                store = setupPaletteTemplateStore(server, fixtures.defaultPaletteTemplateResponse);
//            });
//
//            afterEach(function() {
//                Ext.data.StoreManager.remove(store);
//                store = null;
//            });
//
//            it('should load with temporary data', function() {
//                expect(store.getCount()).not.toBe(0);
//                expect(store.getAt(0) instanceof Savanna.process.model.TemplateGroup).toBeTruthy();
//            });
//        });
//    });
//
//    function setupPaletteTemplateStore(server, fixture) {
//        var readMethod = 'GET',
//            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.process.store.Templates'),
//            testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);
//
//        console.log(fixture);
//        server.respondWith(readMethod, testUrl, fixture);
//
//        store.load();
//
//        server.respond({
//            errorOnInvalidRequest: true
//        });
//
//        Ext.data.StoreManager.add('Savanna.process.store.Templates', store);
//
//        return store;
//    }
});