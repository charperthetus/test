/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/31/13
 * Time: 12:45 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.sources.controller.Sources', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.sources.view.Sources'
    ],

    control: {
        listOfSources: {
            live: true,
            listeners: {
                itemclick: 'openSourceDocument'
            }
//        },
//        supportingResourcesDrop: {
//              boxready: 'onDropItemReady'
        }
    },

    init: function() {
        this.onDropItemReady(this.getView().queryById('supportingResourcesDrop'));
        this.callParent(arguments);
    },
    
    openSourceDocument: function( grid, record, item, index, e, eOpts) {
        if (e.target.id === "openResourceDoc") {
            EventHub.fireEvent('open', {uri: e.target.name, type: 'Rich', label: e.target.label});
        } else if (e.target.id === "delResourceDoc") {
            this.getView().storeHelper.removeBotLevItemInStoreByUri(e.target.name, this.getView().store.getById('Source Document'));
            this.updateStore();
            this.getView().queryById('listOfSources').reconfigure(this.getView().store.getById('Source Document').valuesStore);
        }
    },
    
    onDropItemReady: function(container){
        var myDropBox = container.getEl();
        if (myDropBox){
            container.dropTarget = Ext.create('Ext.dd.DropTarget', myDropBox.dom, {
                ddGroup: 'SEARCH-ITEMS',
                notifyOver: Ext.bind(this.notifyItemOverTarget, this),
                notifyDrop: Ext.bind(this.notifyItemDropTarget, this, container, true)
            });
        }
    },

    notifyItemOverTarget: function(ddSource, e, data) {
        //don't allow anything other than an Item to be dropped into the item palette
        if (this.dragDataIsItem(data)) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    notifyItemDropTarget: function(ddSource, e, data, container) {
        data.records.forEach(function(rec) {
            this.getView().storeHelper.addBotLevItemInStore(rec.data.title, rec.data, this.getView().store.getById('Source Document'));
        }, this);
        this.updateStore();
        this.getView().addSourcesGrid(this.getView().store.getById('Source Document').valuesStore);

    },

    updateStore: function() {
        this.getView().storeHelper.fetchMainStore().getAt(0).setDirty();
        this.getView().storeHelper.fetchMainStore().sync({
            callback: Ext.bind(this.onEditDoneCallback, this, [], true)
        });
    },

    onEditDoneCallback: function (records, operation, success) {
        if (!success) {
            // TODO handle error
        }
    },

    dragDataIsItem: function(data) {
        var returnVal = true;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (obj.contentType !== 'Rich' && obj.contentType !== 'Text') {
                returnVal = false
            }
        });
        return returnVal;
    }
});
