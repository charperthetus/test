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
        searchitems: {
            click: 'onItemSearchClick'
        },
        itemlist: {
            boxready: 'onItemListReady'
        },
        actionlist: {
            filterchange: 'onFilterChange'
        },
        actiontext: {
            change: 'onActionTextChange'
        },
        createaction: {
            click: 'onCreateActionClick'
        },
        itemtools: {
            boxready: 'onItemToolbarReady'
        }
    },

    init: function() {
        this.callParent(arguments);
    },

    onItemToolbarReady: function() {
        var me = this;
        var listElement = me.getItemtools().getEl();
        if (listElement) {
            me.getItemlist().dropTarget = Ext.create('Ext.dd.DropTarget', listElement.dom, {
                ddGroup: 'RNRM-ITEMS',
                notifyOver: Ext.Function.bind(me.notifyItemPaletteOverTarget, me),
                notifyDrop: Ext.Function.bind(me.notifyItemPaletteDropTarget, me)
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

    notifyItemPaletteDropTarget: function(ddSource, e, data) {
        //only create a new palette item if the dragged data does not already exist in the palette

        //too bad we can't use the itemListHasDupes() function, but if the drag data has multiple records, then we
        //need to do the dupe check for each one and add it if we can (unless we want to abort the whole drag if just
        //one drag item is invalid)
        var me = this;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (me.getItemlist().store.findRecord('label', obj.label)) { //todo: this should be uri when it is available
                //already exists...don't do anything
            } else {
                me.addNewPaletteItem(obj.label, obj.type);
            }
        });
    },

    onItemSearchClick: function() {
        //have the app fire the event so it can be caught by the controller that handles showing the model search dialog
        Savanna.app.fireEvent('initModelSearch');
    },

    onActionTextChange: function(field, newValue) {
        var list = this.getActionlist();
        list.getSelectionModel().deselectAll(); //necessary to do here and in onFilterChange for some reason
        list.store.clearFilter();
        list.store.filter([{
            property: 'text', //in the future possible filter on alias/description
            anyMatch: true,
            value   : newValue
        } ]);
    },

    onFilterChange: function(/*store, filters, eOpts*/) {
        this.getActionlist().getSelectionModel().deselectAll();
        //show the create Action button when the user has entered text but no filtered results are found
        if (this.getActionlist().store.getCount() == 0 && this.getActiontext().getValue() != '') {
            this.getCreateaction().show();
        } else {
            this.getCreateaction().hide();
        }
    },

    onCreateActionClick: function() {
        //create a new Model instance for an Action with the user typed text
        var titleText = this.getActiontext().getValue();
        this.addNewPaletteAction(titleText);
        this.getActiontext().setValue(''); //clear the text which will fire a filter change and toggle the create btn
    },

    //create and add a new Action to the palette
    addNewPaletteAction: function(titleText, categoryText) {
        if (categoryText === null) {
            categoryText = 'ProcessAction';
        }
        categoryText = (categoryText === "Action") ? 'ProcessAction' : categoryText; //is there a better JS way to do this?
        this.getActionlist().store.add(this.createPaletteNode(categoryText, titleText));
    },

    //create and add a new Item to the palette
    addNewPaletteItem: function(titleText, categoryText) {
        if (categoryText === null || categoryText === "Item") {
            categoryText = 'ProcessItem';
        }
        if (categoryText === 'ProcessItem') { //make sure no other non-item type was passed in here
            this.getItemlist().store.add(this.createPaletteNode(categoryText, titleText));
        }
    },

    createPaletteNode: function(categoryText, labelText) {
        return Ext.create('Savanna.process.model.Node', {
            uri:                '',
            label:              labelText,
            type:               categoryText,
            modifiedBy:         '',
            modifiedDate:       '',
            preview:            '',
            primaryImageUrl:    '',
            workflowState:      '',
            classification:     '',
            key:                Savanna.process.utils.ProcessUtils.getURI(categoryText) //todo: should we create a key here?
        });
    },

    onItemListReady: function() {
        //listen for beforedrop on the item grid view (to prevent user from reordering rows and to prevent dupes)
        this.getItemlist().getView().on('beforedrop', this.beforeItemDrop, this);
    },

    beforeItemDrop: function(node, data) {
        //check to see if the user is dragging an item in the same grid view (i.e. reordering rows).
        //if so, disallow it
        var itemList = this.getItemlist()
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

    itemListHasDupes: function(data) {
        var itemList = this.getItemlist(),
            returnVal = false;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (itemList.store.findRecord('label', obj.label)) { //todo: this should be uri when it is available
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
    }
});