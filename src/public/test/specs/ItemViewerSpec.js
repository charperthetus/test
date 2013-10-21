/* global
 Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
 ThetusTestHelpers: false,
 Savanna: false
 */
Ext.require('Savanna.controller.Factory');
Ext.require('Savanna.itemView.view.ItemViewer');
Ext.require('Savanna.proxy.Cors');
Ext.require('Savanna.itemView.store.MainItemStore');
Ext.require('Ext.grid.Panel');
Ext.require('Savanna.mixin.Storeable');
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

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.ItemViewer);

        store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.itemView.store.MainItemStore', { autoLoad: false });

        // now set up server to get store data
        server = new ThetusTestHelpers.FakeServer(sinon);

        var testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

        server.respondWith('GET', testUrl, fixtures.itemsData);

        store.load();

        console.log(testUrl);

        server.respond({
            errorOnInvalidRequest: true
        });

        itemviewComponent = Ext.create('Savanna.itemView.view.ItemViewer', {
            renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID,
            itemUri: 'x84385f20051847dd70c1874fb17799458db6498e%252FItem'
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

    it('should have a header instance', function() {
        expect(itemviewComponent.down('itemview_view_header') instanceof Savanna.itemView.view.header.ViewHeader).toBeTruthy();
    });

    it('should have a related processes instance', function() {
        expect(itemviewComponent.down('itemview_related_processes') instanceof Savanna.itemView.view.relatedProcesses.RelatedProcesses).toBeTruthy();
    });

    it('should have a related items instance', function() {
        expect(itemviewComponent.down('itemview_view_related_items') instanceof Savanna.itemView.view.relatedItems.ViewRelatedItems).toBeTruthy();
    });

    it('should have a item qualities instance', function() {
        expect(itemviewComponent.down('itemview_view_qualities') instanceof Savanna.itemView.view.itemQualities.ViewItemQualities).toBeTruthy();
    });

    // TODO: Test image browser component
});