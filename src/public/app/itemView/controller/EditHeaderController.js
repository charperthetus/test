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

    control: {
        view: {
            'EditHeader:StoreSet': 'storeSet'
        },
        /*
        parentBtn: {
            click: 'openParentItem'
        },
        */
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
        },
        itemNameField:  {
            keyup:  'onItemNameKeyup'
        }
    },

    storeSet: function (itemName) {
        var me = this;

        Ext.each(me.getView().store.getById('Aliases').data.values, function(value) {
            me.getView().queryById('addAliasBox').addTag(value.label, value.editable);
        });

        Ext.each(me.getView().store.getById('Intended Use').data.values, function(value) {
            me.getView().queryById('addIntendedUseBox').addTag(value.label, value.editable);
            me.valNameArray.push(value.label);
        });

        me.getView().queryById('addIntendedUseBox').store.getProxy().url = SavannaConfig.savannaUrlRoot + 'rest/model/search/keyword/property/' + encodeURI(me.getView().store.getById('Intended Use').data.predicateUri);


        if(me.getView().store.getById('Type').data.values.length)  {
            //me.getView().queryById('parentBtn').setText(me.getView().store.getById('Type').data.values[0].label);
            var parents = '';
            Ext.each(me.getView().store.getById('Type').data.values, function(type)    {
                parents = parents + '<input type="button" name="' + type.value + '" value="' + type.label + '" id="openParentItem" />';
            });
            me.getView().queryById('parentsList').update(parents);

        }

        if(me.getView().store.getById('Description').data.values.length)  {
            var description = me.getView().queryById('itemDescription');

            if (!me.getView().store.getById('Description').data.values[0].editable) {
                description.disable();
            }            

            description.setValue(me.getView().store.getById('Description').data.values[0].value);
        }

        /*
        set the parent chooser to enabled or disabled
         */
        Ext.each(me.getView().store.getById('Type').data.values, function(type)    {
            if(!type.inheritedFrom) {
                /*
                this should be the top level parent
                 */
                me.getView().down('#parentChooser').setDisabled(!type.editable);
            }
        });

    },

    openParentItem: function() {
        this.getView().fireEvent('ItemView:OpenItem', this.getView().store.getById('Type').data.values[0].label, this.getView().store.getById('Type').data.values[0].value);
    },

    openParentChooser: function() {

        Ext.create('Savanna.itemView.view.createItem.CreateItem', {
            width: 850,
            height: 500,
            creating:false,
            viewer: this.getView().up('itemview_itemviewer')
        });
    },

    onItemNameKeyup:function()  {
        if (this.getView().up('itemview_itemviewer').queryById('editSaveButton').disabled) {
            this.getView().up('itemview_itemviewer').queryById('editSaveButton').enable();
        }
    },

    onIntendedUsesSelect:function() {
        var vChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.getView().store.getById("Intended Use").valuesStore,
            valNameArray: this.valNameArray,
            uri: encodeURI(this.getView().store.getById('Intended Use').data.predicateUri),
            storeHelper: this.getView().storeHelper
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

            this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
        }
    },

    addingAlias: function(tagName, tagData, aView) {
        this.getView().storeHelper.addBotLevItemInStore(tagName, tagData, this.getView().store.getById('Aliases'));
        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
    },

    removingAlias: function(tagName, aView) {
        this.getView().storeHelper.removeBotLevItemInStore(tagName, this.getView().store.getById('Aliases'));
        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
    },

    addingIntendedUse: function(tagName, tagData, aView) {
        this.getView().storeHelper.addBotLevItemInStore(tagName, tagData, this.getView().store.getById('Intended Use'));
        this.valNameArray.push(tagName);
        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
    },

    removingIntendedUse: function(tagName, aView) {
        this.getView().storeHelper.removeBotLevItemInStore(tagName, this.getView().store.getById('Intended Use'));
        Ext.Array.remove(this.valNameArray, tagName);
        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
    },

    updateDescription: function(comp, e, eOpts) {
        var myStore = this.getView().store;
        myStore.getById('Description').data.values[0].value = comp.value;
        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');  
    }
});