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

    propNameArray: [],

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
            blur: 'updateDescription'
        }
    },

    storeSet: function () {
        var me = this;

        Ext.each(me.getView().store.getById('Aliases').data.values, function(value) {
            me.getView().queryById('addAliasBox').addTag(value.label);
        });

        Ext.each(me.getView().store.getById('Intended Use').data.values, function(value) {
            me.getView().queryById('addIntendedUseBox').addTag(value.label);
            me.propNameArray.push(value.label);
        });

        me.getView().queryById('parentBtn').setText(me.getView().store.getById('Type').data.values[0].label);

        me.getView().queryById('itemDescription').setValue(me.getView().store.getById('Description').data.values[0].value);
    },

    openParentItem: function() {
        this.getView().fireEvent('ItemView:OpenItem', this.getView().store.getById('Type').data.values[0].label, this.getView().store.getById('Type').data.values[0].value);
    },

    openParentChooser: function() {
        //ToDo: build and connect the chooser
        console.log('open a chooser for a parent here');
    },

    onIntendedUsesSelect:function() {
        var vChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.getView().store.getById("Intended Use").valuesStore,
            valNameArray: this.propNameArray
        });

        vChooser.on('close', this.closedVPicker, this);
    },

    closedVPicker: function(view) {
//        if (view.updatedStore) {
//            this.getView().removeAll();
//            this.propNameArray = [];
//            this.storeHelper.updateMainStore(this.getView().store.data.items, "Properties");
//            this.storeSet();
//        }
    },

    addingAlias: function(tagName, tagData, aView) {
        this.addingTag(tagName, tagData, this.getView().store.getById('Aliases').data.values);
    },

    removingAlias: function(tagName, aView) {
        this.removingTag(tagName, this.getView().store.getById('Aliases').data.values);
    },

    addingIntendedUse: function(tagName, tagData, aView) {
        this.addingTag(tagName, tagData, this.getView().store.getById('Intended Use').data.values);
        this.propNameArray.push(tagName);
    },

    removingIntendedUse: function(tagName, aView) {
        this.removingTag(tagName, this.getView().store.getById('Intended Use').data.values);
        Ext.Array.remove(this.propNameArray, tagName);
    },

    addingTag: function(tagName, tagData, tagArray) {
        var tagUri = tagData ? tagData.uri : null;
        var newTag = {editable: true, inheritedFrom: null, label: tagName, uri: tagUri, value: tagName, version: 0};
        tagArray.push(newTag);
    },

    removingTag: function(tagName, tagArray) {
        for (var i = 0; i < tagArray.length; i++) {
            if (tagArray[i].label === tagName) {
                Ext.Array.remove(tagArray, tagArray[i]);
                break;
            }
        }
    },

    updateDescription: function(comp, e, eOpts) {
        var myStore = this.getView().store;
        myStore.getById('Description').data.values[0].value = comp.value;
    }
});