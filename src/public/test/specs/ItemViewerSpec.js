/* global
 Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
 ThetusTestHelpers: false,
 Savanna: false
 */
Ext.require('Savanna.controller.Factory');
Ext.require('Savanna.itemView.view.ItemViewer');
Ext.require('Ext.grid.Panel');
Ext.require('Savanna.itemView.view.header.EditHeader');
Ext.require('Savanna.itemView.view.header.DisplayLabel');
Ext.require('Savanna.itemView.view.header.ViewHeader');
Ext.require('Savanna.itemView.view.imageBrowser.ImagesGrid');
Ext.require('Savanna.itemView.view.components.AutoCompleteWithTags');
Ext.require('Savanna.itemView.view.imageBrowser.ImageThumbnail');
Ext.require('Savanna.itemView.view.itemQualities.EditItemQualities');
Ext.require('Savanna.itemView.view.components.LabeledFieldWithTags');
Ext.require('Savanna.itemView.view.relatedProcesses.RelatedProcesses');
Ext.require('Savanna.itemView.view.relatedItems.ViewRelatedItems');
Ext.require('Savanna.itemView.view.itemQualities.ViewItemQualities');
Ext.require('Savanna.itemView.controller.AutoCompleteController');
Ext.require('Savanna.itemView.controller.ItemViewController');





describe('Item Viewer', function () {

    var itemviewComponent = null,
        fixtures = null,
        store = null,
        server = null;

    beforeEach(function () {
        ThetusTestHelpers.ExtHelpers.createTestDom();

        itemviewComponent = Ext.create('Savanna.itemView.view.ItemViewer', {
            renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID,
            itemUri: 'x84385f20051847dd70c1874fb17799458db6498e%252FItem'
        });

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.ItemViewer);

        store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.itemView.store.MainItemStore', { autoLoad: false });

        // now set up server to get store data
        server = new ThetusTestHelpers.FakeServer(sinon);

        var readMethod = 'POST',
            testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

        console.log(fixtures.rmItems);

        //server.respondWith(readMethod, testUrl, fixtures.rmItems);

        //store.load();

        server.respond({
            errorOnInvalidRequest: true
        });
    });

    afterEach(function () {

        if(itemviewComponent)   {
            itemviewComponent.destroy();
            itemviewComponent = null;
        }
        server.restore();
        server = null;
        store = null;
        fixtures = null;

        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    it('should instantiate ItemViewer as the correct component class', function()    {
        expect(itemviewComponent instanceof Savanna.itemView.view.ItemViewer).toBeTruthy();
    });

});
