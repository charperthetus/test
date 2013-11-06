/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/31/13
 * Time: 12:45 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.sources.controller.Sources', {
    extend: 'Deft.mvc.ViewController',

    control: {
//        supportingResourcesDrop: {
//            boxready: 'onDropItemReady'
//        }
    },

    init: function() {
        this.onDropItemReady(this.getView().queryById('supportingResourcesDrop'));
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
        //only create a new palette item if the dragged data does not already exist in the palette

        //too bad we can't use the itemListHasDupes() function, but if the drag data has multiple records, then we
        //need to do the dupe check for each one and add it if we can (unless we want to abort the whole drag if just
        //one drag item is invalid)
        data.records.forEach(function(rec) {
            var obj = rec.data;
            var documentTitle = 'Document';
            if (obj.title){
                documentTitle = obj.title;
            }
            var documentSource = decodeURI(obj.documentSource);
                if (obj.contentType === 'Rich' || obj.contentType === 'Text') {
                    var test = container.up('itemview_itemviewer').query('document_sources');
                    Ext.each(test, function(container){
                        container.add({
                            xtype: 'button',
                            text: documentTitle,
                            handler: function() {
                                EventHub.fireEvent('open', {uri: obj.uri, type: obj.contentType, label: obj.title});
                            }
                        })
                    })
                }
        }, this);
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
