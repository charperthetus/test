/* global
 Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
 ThetusTestHelpers: false,
 Savanna: false
 */
Ext.require('Savanna.Config');
Ext.require('Savanna.itemView.view.ItemViewer');
Ext.require('Savanna.itemView.view.header.ViewHeader');
Ext.require('Savanna.itemView.view.header.EditHeader');
Ext.require('Savanna.itemView.view.relatedProcesses.RelatedProcesses');
Ext.require('Savanna.itemView.view.relatedItems.ViewRelatedItems');
Ext.require('Savanna.itemView.view.relatedItems.EditRelatedItems');
Ext.require('Savanna.itemView.view.itemQualities.ViewItemQualities');
Ext.require('Savanna.itemView.view.itemQualities.EditItemQualities');
Ext.require('Savanna.itemView.view.header.DisplayLabel');
Ext.require('Savanna.itemView.view.components.AutoCompleteWithTags');
Ext.require('Ext.tab.Panel');

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

    // TODO: Test image browser component view when it's built

    describe('Main Controller', function() {
        // TODO: Update this when edit mode is in place
        // it('should set the display label', function(){
        //     itemviewController.setupDisplayLabel('Title', itemviewComponent.down('itemview_view_header'));
        //     expect(itemviewComponent.down('#itemDisplayLabel').data.displayLabel).toEqual('Title');
        // });
        var relatedItems = null;

        beforeEach(function() {
            relatedItems = itemviewController.getView().queryById('relatedItemsView');
            spyOn(relatedItems, 'add');
            itemviewController.handleRecordDataRequestSuccess(store.data.items, 'read', true);
        });

        afterEach(function() {
            relatedItems = null;
        });

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

        describe('Loads in Header Data in Controller', function() {
            it('should load in data to the header component', function() {
                expect(itemviewComponent.down('itemview_view_header').title).toEqual(store.data.items[0].data.label);
            });
        });

        describe('Loads data into the Related Processes component', function() {
            it('should load in the number of related processes into the component', function(){
                expect(itemviewComponent.down('itemview_related_processes').title).toEqual('Participated in Process (' + store.data.items[0].kvPairGroupsStore.getAt(0).pairsStore.data.length + ')');
            });
        });

        describe('Loads data into the Qualities component', function() {
            it('should load in the number of related qualities into the component', function(){
                expect(itemviewComponent.down('itemview_view_qualities').title).toEqual('Qualities (' + store.data.items[0].propertyGroupsStore.getAt(3).valuesStore.data.length + ')');
            });
        });

        describe('Builds a grid component for each relationship, type, and data', function() {
            it('should call add for each element in the values store', function() {
                var expected = store.data.items[0].propertyGroupsStore.getAt(2).valuesStore.data.items.length;
                expect(relatedItems.add.callCount).toBe(expected);
            });

            it('should fire an "open" event when clicking a related item', function() {
                var clickEvent = { target: { value: 'title', name: 'uristring', id: 'openRelatedItem' } };
                spyOn(EventHub, 'fireEvent');
                itemviewController.onRelatedItemClick(null, null, null, null, clickEvent);
                expect(EventHub.fireEvent).toHaveBeenCalled();
            });
        });
    });

    describe('Header View Controller', function() {
        it('should fire an "open" event when clicking a parent item', function() {
            var clickEvent = { target: { value: 'title', name: 'uristring', id: 'openParentItem' } };
            spyOn(EventHub, 'fireEvent');
            itemviewComponent.down('itemview_view_header').getController().openParentItem(null, null, null, null, clickEvent);
            expect(EventHub.fireEvent).toHaveBeenCalled();
        });
    });

    describe('Related Processes Controller', function() {
        it('should fire an "open" event when clicking a process', function() {
            var clickEvent = { target: { value: 'title', name: 'uristring', id: 'openProcess' } };
            spyOn(EventHub, 'fireEvent');
            itemviewComponent.down('itemview_related_processes').getController().openRelatedProcesses(null, null, null, null, clickEvent);
            expect(EventHub.fireEvent).toHaveBeenCalled();
        });

    });
});