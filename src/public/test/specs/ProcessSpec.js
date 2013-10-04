/* global Ext: false, describe: false,
 beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
 ThetusTestHelpers: false, Savanna: false,
 go: false */
Ext.require('Savanna.process.store.Templates');

describe('Savanna.process', function() {
    var fixtures = {};

    beforeEach(function() {
        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Process);

        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function() {
        fixtures = null;
        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('Store', function() {
        var server = null,
            store = null;

        beforeEach(function() {
            // NOTE: this has to happen BEFORE your create a FakeServer,
            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.process.store.Templates');

            server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function() {
            server.restore();

            server = null;
            store = null;
        });

        describe('default data loading', function() {

            it('should load data', function() {
                var readMethod = 'GET';

                expect(store.getTotalCount()).toBe(0);

                var testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.defaultPaletteTemplateResponse);

                store.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                expect(store.getTotalCount()).not.toBe(0);
                expect(store.data.items[0].data.templates).not.toBeNull();
            });
        });
    });

});