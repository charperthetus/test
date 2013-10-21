/* global
 Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
 ThetusTestHelpers: false,
 Savanna: false
 */
Ext.require('Savanna.controller.Factory');
Ext.require('Savanna.itemView.view.ItemViewer');
Ext.require('Savanna.proxy.Cors');
Ext.require('Savanna.Config');
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
        itemviewController = null,
        fixtures = null,
        store = null,
        server = null,
        readMethod = null,
        testUrl = null;

    beforeEach(function () {
        ThetusTestHelpers.ExtHelpers.createTestDom();

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.ItemViewer);

        store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.itemView.store.MainItemStore', { autoLoad: false });

        // now set up server to get store data
        server = new ThetusTestHelpers.FakeServer(sinon);

        readMethod = 'GET';
        testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

        server.respondWith(readMethod, testUrl, fixtures.itemsData);

        store.load();

        server.respond({
            errorOnInvalidRequest: true
        });

        itemviewComponent = Ext.create('Savanna.itemView.view.ItemViewer', {
            renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID,
            itemUri: 'x84385f20051847dd70c1874fb17799458db6498e%2FItem'
        });

        itemviewController = itemviewComponent.getController();
    });

    afterEach(function () {

        if(itemviewComponent)   {
            itemviewComponent.destroy();
            itemviewComponent = null;
            itemviewController.destroy();
            itemviewController = null;
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

    // TODO: Test image browser component view

    describe('Controllers', function() {
        // TODO: Update this when edit mode is in place
        // it('should set the display label', function(){
        //     itemviewController.setupDisplayLabel('Title', itemviewComponent.down('itemview_view_header'));
        //     expect(itemviewComponent.down('#itemDisplayLabel').data.displayLabel).toEqual('Title');
        // });

        it('should build a properly formatted item view URL', function() {
            var expected = SavannaConfig.itemViewUrl + 'x84385f20051847dd70c1874fb17799458db6498e%252FItem' + ';jsessionid=' + Savanna.jsessionid;
            expect(itemviewController.buildItemDataFetchUrl(itemviewComponent.itemUri)).toEqual(expected);
        });

        it('should instantiate data from the service', function() {
            var tmpStore = Ext.data.StoreManager.lookup(itemviewController.store);
            spyOn(tmpStore, 'load');
            itemviewController.getItemViewData();
            expect(tmpStore.load).toHaveBeenCalled();
        });

        it('should push our data into the view', function() {
            itemviewController.handleRecordDataRequestSuccess(store.data.items, 'read', true);
        });
    });
});