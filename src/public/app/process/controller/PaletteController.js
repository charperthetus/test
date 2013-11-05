/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/21/13
 * Time: 9:44 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.controller.PaletteController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.process.utils.ProcessUtils'
    ],

    config: {
        application: null
    },

    control: {
        searchItems: {
            click: 'onItemSearchClick'
        },
        itemList: {
            boxready: 'onItemListReady'
        },
        actionList: {
            boxready: 'onActionListReady'
        },
        itemTools: {
            boxready: 'onItemToolbarReady'
        },
        actionTools: {
            boxready: 'onActionToolbarReady'
        }
    },

    init: function() {
        this.callParent(arguments);
    },

    onItemToolbarReady: function() {
        var me = this;
        var listElement = me.getItemTools().getEl();
        if (listElement) {
            me.getItemList().dropTarget = Ext.create('Ext.dd.DropTarget', listElement.dom, {
                ddGroup: 'RNRM-ITEMS',
                notifyOver: Ext.Function.bind(me.notifyItemPaletteOverTarget, me),
                notifyDrop: Ext.Function.bind(me.notifyItemPaletteDropTarget, me)
            });
        }
    },

    onActionToolbarReady: function() {
        var listElement = this.getActionTools().getEl();
        if (listElement) {
            this.getActionList().dropTarget = Ext.create('Ext.dd.DropTarget', listElement.dom, {
                ddGroup: 'RNRM-ITEMS',
                notifyOver: Ext.Function.bind(this.notifyActionPaletteOverTarget, this),
                notifyDrop: Ext.Function.bind(this.notifyActionPaletteDropTarget, this)
            });
        }
    },

    notifyItemPaletteOverTarget: function(ddSource, e, data) {
        //don't allow anything other than an Item to be dropped into the item palette
        if (this.dragDataIsItem(data)) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    notifyActionPaletteOverTarget: function(ddSource, e, data) {
        //don't allow anything other than an action to be dropped into the action palette
        if (this.dragDataIsAction(data)) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    notifyItemPaletteDropTarget: function(ddSource, e, data) {
        //only create a new palette item if the dragged data does not already exist in the palette

        //too bad we can't use the itemListHasDupes() function, but if the drag data has multiple records, then we
        //need to do the dupe check for each one and add it if we can (unless we want to abort the whole drag if just
        //one drag item is invalid)
        var me = this;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            var store = me.getItemList().store;
            if (store.findRecord('uri', obj.uri) || store.findRecord('label', obj.label)) {
                //already exists...don't do anything
            } else {
                me.addNewPaletteItem(obj.label, obj.type, obj.uri);
            }
        });
    },

    notifyActionPaletteDropTarget: function(ddSource, e, data) {
        //only create a new palette action if the dragged data does not already exist in the palette

        //too bad we can't use the actionList HasDupes() function, but if the drag data has multiple records, then we
        //need to do the dupe check for each one and add it if we can (unless we want to abort the whole drag if just
        //one drag action is invalid)
        var me = this;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            var store = me.getActionList().store;
            if (store.findRecord('uri', obj.uri) || store.findRecord('label', obj.label)) {
                //already exists...don't do anything
            } else {
                me.addNewPaletteAction(obj.label, obj.type, obj.uri);
            }
        });
    },

    onItemSearchClick: function() {
        //have the app fire the event so it can be caught by the controller that handles showing the model search dialog
        Savanna.app.fireEvent('initModelSearch');
    },

    //create and add a new Action to the palette
    addNewPaletteAction: function(titleText, categoryText, uri) {
        if (categoryText === "Action") {
            this.getActionList().store.add(this.createPaletteNode(categoryText, titleText, uri));
        }
    },

    //create and add a new Item to the palette
    addNewPaletteItem: function(titleText, categoryText, uri) {
        if (categoryText === 'Item') {
            this.getItemList().store.add(this.createPaletteNode(categoryText, titleText, uri));
        }
    },

    createPaletteNode: function(categoryText, labelText, uri) {
        return Ext.create('Savanna.process.model.Node', {
            uri:                uri,
            label:              labelText,
            type:               categoryText,
            modifiedBy:         '',
            modifiedDate:       '',
            preview:            '',
            primaryImageUrl:    '',
            workflowState:      '',
            classification:     ''
        });
    },

    onItemListReady: function() {
        //listen for beforedrop on the item grid view (to prevent user from reordering rows and to prevent dupes)
        this.getItemList().getView().on('beforedrop', this.beforeItemDrop, this);
    },

    onActionListReady: function() {
        //listen for beforedrop on the action grid view (to prevent user from reordering rows and to prevent dupes)
        this.getActionList().getView().on('beforedrop', this.beforeActionDrop, this);
    },

    beforeItemDrop: function(node, data) {
        //check to see if the user is dragging an item in the same grid view (i.e. reordering rows).
        //if so, disallow it
        var itemList = this.getItemList(),
            returnVal = true;

        if (itemList.view === data.view) {
            returnVal = false;
        } else if (this.itemListHasDupes(data)) {
            //if the dragged data already exists in the item list, disallow it to prevent duplicate records
            //(note - in the case of multiple drag items then this will prevent drop if even just one is a dupe)
            returnVal = false;
        } else if (!this.dragDataIsItem(data)) {
            //if the dragged data is not an Item then don't allow it to be dropped on the Item palette
            returnVal = false;
        }
        return returnVal;
    },

    beforeActionDrop: function(node, data) {
        //check to see if the user is dragging an action in the same grid view (i.e. reordering rows).
        //if so, disallow it
        var actionList = this.getActionList(),
            returnVal = true;

        if (actionList.view === data.view) {
            returnVal = false;
        } else if (this.actionListHasDupes(data)) {
            //if the dragged data already exists in the action list, disallow it to prevent duplicate records
            //(note - in the case of multiple drag actions then this will prevent drop if even just one is a dupe)
            returnVal = false;
        } else if (!this.dragDataIsAction(data)) {
            //if the dragged data is not an Action then don't allow it to be dropped on the Action palette
            returnVal = false;
        }
        return returnVal;
    },

    itemListHasDupes: function(data) {
        var store = this.getItemList().store,
            returnVal = false;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (store.findRecord('label', obj.label) || store.findRecord('uri', obj.uri)) {
                //already exists...don't do anything
                returnVal = true;
            }
        });
        return returnVal;
    },

    actionListHasDupes: function(data) {
        var store = this.getActionList().store,
            returnVal = false;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (store.findRecord('label', obj.label) || store.findRecord('uri', obj.uri)) {
                //already exists...don't do anything
                returnVal = true;
            }
        });
        return returnVal;
    },

    dragDataIsItem: function(data) {
        var returnVal = true;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (obj.type !== 'Item' && obj.type !== 'ProcessItem') {
                returnVal = false
            }
        });
        return returnVal;
    },

    dragDataIsAction: function(data) {
        var returnVal = true;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (obj.type !== 'Action' && obj.type !== 'ProcessAction') {
                returnVal = false
            }
        });
        return returnVal;
    }
});