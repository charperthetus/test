/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/27/13
 * Time: 2:00 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false,
          describe: false, beforeEach: false, afterEach: false, expect: false, it: false,
          sinon: false, spyOn: false,
          ThetusTestHelpers: false,
          Savanna: false
 */
Ext.require('Savanna.Config');

Ext.require('Savanna.metadata.view.Details');
Ext.require('Savanna.metadata.view.String');
Ext.require('Savanna.metadata.view.Date');
Ext.require('Savanna.metadata.view.Uri');
Ext.require('Savanna.metadata.view.Integer');
Ext.require('Savanna.metadata.view.Boolean');
Ext.require('Savanna.metadata.view.Double');
Ext.require('Savanna.metadata.view.StringList');
Ext.require('Savanna.metadata.view.BooleanList');
Ext.require('Savanna.metadata.view.DateList');
Ext.require('Savanna.metadata.view.IntegerList');
Ext.require('Savanna.metadata.view.DoubleList');
Ext.require('Savanna.metadata.view.UriList');
Ext.require('Savanna.metadata.controller.MetadataViewController');
Ext.require('Savanna.metadata.store.Metadata');


describe('Metadata field generator', function() {
    var detailsComponent = null,
        detailsController = null,
        fixtures = null,
        store = null,
        server = null,
        readMethod = null,
        testUrl = null;

    beforeEach(function () {
        ThetusTestHelpers.ExtHelpers.createTestDom();

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Metadata);

        store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.metadata.store.Metadata', { autoLoad: false });

        // now set up server to get store data
        server = new ThetusTestHelpers.FakeServer(sinon);

        readMethod = 'GET';

        testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

        server.respondWith(readMethod, testUrl, fixtures.metadataResponse);

        store.load();

        server.respond({
            errorOnInvalidRequest: true
        });

        detailsComponent = Ext.create('Savanna.metadata.view.Details', {
            renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID,
            itemURI: 'SolrJdbc%252FText%252F9d62ad60-f453-4215-b8bc-c4c1398b84a4'
        });

        detailsController = detailsComponent.getController();
    });

    afterEach(function () {

        if(detailsComponent)   {
            detailsComponent.destroy();
            detailsComponent = null;
            detailsController.destroy();
            detailsController = null;
        }
        server.restore();
        server = null;
        store = null;
        fixtures = null;
        readMethod = null;
        testUrl = null;

        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

//    it('should instantiate Details as the correct component class', function()    {
//        expect(detailsComponent instanceof Savanna.metadata.view.Details).toBeTruthy();
//    });


});