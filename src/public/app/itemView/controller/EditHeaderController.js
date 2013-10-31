/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/23/13
 * Time: 8:25 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.EditHeaderController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.header.EditHeader'
    ],

    valNameArray: [],

    storeHelper: null,

    control: {
        view: {
            'EditHeader:StoreSet': 'storeSet'
        },
        parentBtn: {
            click: 'openParentItem'
        },
        parentChooser: {
            click: 'openParentChooser'
        },
        intendedUseChooserBtn: {
            click: 'onIntendedUsesSelect'
        },
        addAliasBox: {
            'AutoComplete:ItemSelected': 'addingAlias',
            'AutoComplete:TagRemoved': 'removingAlias'
        },
        addIntendedUseBox: {
            'AutoComplete:ItemSelected': 'addingIntendedUse',
            'AutoComplete:TagRemoved': 'removingIntendedUse'
        },
        itemDescription: {
            blur: 'updateDescription',
            change: 'saveEnable'
        }
    },

    init: function() {
        this.callParent(arguments);
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
    },

    storeSet: function (itemName) {
        var me = this;
        this.storeHelper.init();

        Ext.each(me.getView().store.getById('Aliases').data.values, function(value) {
            me.getView().queryById('addAliasBox').addTag(value.label);
        });

        Ext.each(me.getView().store.getById('Intended Use').data.values, function(value) {
            me.getView().queryById('addIntendedUseBox').addTag(value.label);
            me.valNameArray.push(value.label);
        });
        if(me.getView().store.getById('Type').data.values.length)  {
            me.getView().queryById('parentBtn').setText(me.getView().store.getById('Type').data.values[0].label);
        }

        if(me.getView().store.getById('Description').data.values.length)  {
            me.getView().queryById('itemDescription').setValue(me.getView().store.getById('Description').data.values[0].value);
        }
    },

    openParentItem: function() {
        this.getView().fireEvent('ItemView:OpenItem', this.getView().store.getById('Type').data.values[0].label, this.getView().store.getById('Type').data.values[0].value);
    },

    openParentChooser: function() {
        //ToDo: build and connect the chooser
        console.log('open a chooser for a parent here');
    },

    onIntendedUsesSelect:function() {
        console.log('here');
        var vChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.getView().store.getById("Intended Use").valuesStore,
            valNameArray: this.valNameArray
        });

        vChooser.on('close', this.closedVPicker, this);
    },

    closedVPicker: function(view) {
        if (view.updatedStore) {
            this.valNameArray = [];
            Ext.Array.erase(this.getView().store.getById('Intended Use').data.values, 0, this.getView().store.getById('Intended Use').data.values.length);
            this.getView().queryById('addIntendedUseBox').clearTags();

            Ext.each(this.getView().store.getById('Intended Use').valuesStore.data.items, function(value) {
                this.getView().store.getById('Intended Use').data.values.push(value.data);
                this.valNameArray.push(value.data.label);
                this.getView().queryById('addIntendedUseBox').addTag(value.data.label);
            }, this);

            Savanna.app.fireEvent('ItemView:SaveEnable');
        }
    },

    addingAlias: function(tagName, tagData, aView) {
        this.storeHelper.addBotLevItemInStore(tagName, tagData, this.getView().store.getById('Aliases'));
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    removingAlias: function(tagName, aView) {
        this.storeHelper.removeBotLevItemInStore(tagName, this.getView().store.getById('Aliases'));
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    addingIntendedUse: function(tagName, tagData, aView) {
        this.storeHelper.addBotLevItemInStore(tagName, tagData, this.getView().store.getById('Intended Use'));
        this.valNameArray.push(tagName);
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    removingIntendedUse: function(tagName, aView) {
        this.storeHelper.removeBotLevItemInStore(tagName, this.getView().store.getById('Intended Use'));
        Ext.Array.remove(this.valNameArray, tagName);
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    updateDescription: function(comp, e, eOpts) {
        var myStore = this.getView().store;
        myStore.getById('Description').data.values[0].value = comp.value;
    },

    saveEnable:function()   {
        Savanna.app.fireEvent('ItemView:SaveEnable');
    }
});