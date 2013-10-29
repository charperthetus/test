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
        //todo: should we put in logic here to disallow drop from our own grid? it shouldn't do anything anyways
        return Ext.dd.DropZone.prototype.dropAllowed;
    },

    notifyItemPaletteDropTarget: function(ddSource, e, data) {
        var me = this;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            //todo: check for duplicates here before adding??
            me.addNewPaletteItem(obj.label, obj.type);
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
        console.log(categoryText);
        if (categoryText === null) {
            categoryText = 'ProcessItem';
        }
        categoryText = (categoryText === "Item") ? 'ProcessItem' : categoryText; //is there a better JS way to do this?
        console.log(categoryText);
        this.getItemlist().store.add(this.createPaletteNode(categoryText, titleText));
    },

    createPaletteNode: function(categoryText, labelText) {
        return Ext.create('Savanna.process.model.Node', {
            uri:                Savanna.process.utils.ProcessUtils.getURI(categoryText),
            label:              labelText,
            type:               categoryText,
            modifiedBy:         '',
            modifiedDate:       '',
            preview:            '',
            primaryImageUrl:    '',
            workflowState:      '',
            classification:     ''
        });
    }
});