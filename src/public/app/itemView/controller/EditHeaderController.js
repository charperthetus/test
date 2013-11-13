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

    control: {
        view: {
            'EditHeader:StoreSet': 'storeSet'
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
        itemNameField: {
            blur: 'updateHeader'
        }
    },

    storeSet: function () {
        var me = this,           
            descriptionComponent = me.getView().queryById('itemDescription');

        // Set the header field
        if (this.getView().store.getById('Label').data.values.length) {
            var header = this.getView().queryById('itemNameField');

            if (!this.getView().store.getById('Label').data.values[0].editable){
                header.disable();
            }
            header.setValue(this.getView().store.getById('Label').data.values[0].value);
        }

        // Setup aliases
        Ext.each(me.getView().store.getById('Aliases').data.values, function(value) {
            me.getView().queryById('addAliasBox').addTag(value.label, value.editable);
        });

        // Setup intended use
        Ext.each(me.getView().store.getById('Intended Use').data.values, function(value) {
            me.getView().queryById('addIntendedUseBox').addTag(value.label, value.editable);
        });

        me.getView().queryById('addIntendedUseBox').store.getProxy().url = SavannaConfig.savannaUrlRoot + 'rest/model/search/keyword/property/' + encodeURI(me.getView().store.getById('Intended Use').data.predicateUri);


        if(me.getView().store.getById('Type').data.values.length)  {
            var parents = '';
            Ext.each(me.getView().store.getById('Type').data.values, function(type)    {
                parents = parents + '<input type="button" name="' + type.value + '" value="' + type.label +  '" id="openParentItem" />' + '>';
            });
            me.getView().queryById('parentsList').update(parents);

        }

        /*
         *  Description Setting
         *
         *  This will set the description fields text and toggle if it's disabled. It does so
         *  by querying the store to see if there is already a value (and if so setting that), then
         *  checking to see if it's user editable (and disabling based on that).
         *
         *  There is a case where there is no description AND the user CANNOT make one. As of now
         *  if there is no description and the item is not deletable, then the user CANNOT make an assertion
         *  on the description. An ugly assumption to be sure, but it's the only thing we can check for now.
         */
        if (me.getView().store.getById('Description').data.values.length)  {

            // Checking if it's editable
            if (!me.getView().store.getById('Description').data.values[0].editable) {
                descriptionComponent.disable();
            }            

            // Setting the text into the textarea
            descriptionComponent.setValue(me.getView().store.getById('Description').data.values[0].value);
        
        // If there is no description there is a chance it's a chebi/non-user editable:
        } else {            

            // This is the case where the item is not deletable and we're assuming that we cannot assert a description.
            if (!this.getView().storeHelper.fetchMainStore().getAt(0).data.deletable) {
                descriptionComponent.disable();
                descriptionComponent.setValue('No Description Provided');
            }
        }

        // Focus on the Title field automatically
        this.getView().queryById('itemNameField').focus(false, 200);
    },

    openParentItem: function() {
        this.getView().fireEvent('ItemView:OpenItem', this.getView().store.getById('Type').data.values[0].label, this.getView().store.getById('Type').data.values[0].value);
    },

    onIntendedUsesSelect:function() {
        var valNameArray = [];
        var disabledNameArray = [];

        Ext.each(this.getView().store.getById('Intended Use').valuesStore.data.items, function(value) {
            valNameArray.push(value.data.label);

            if (!value.data.editable) {
                disabledNameArray.push(value.data.label);
            }
        });

        var vChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            maxHeight: 520,
            selectionStore: this.getView().store.getById("Intended Use").valuesStore,
            valNameArray: valNameArray,
            disabledItemsArray: disabledNameArray,
            uri: encodeURI(this.getView().store.getById('Intended Use').data.predicateUri),
            storeHelper: this.getView().storeHelper
        });

        vChooser.on('close', this.closedVPicker, this);
    },

    closedVPicker: function(view) {
        if (view.updatedStore) {
            Ext.Array.erase(this.getView().store.getById('Intended Use').data.values, 0, this.getView().store.getById('Intended Use').data.values.length);
            this.getView().queryById('addIntendedUseBox').clearTags();

            Ext.each(this.getView().store.getById('Intended Use').valuesStore.data.items, function(value) {
                this.getView().store.getById('Intended Use').data.values.push(value.data);
                this.getView().queryById('addIntendedUseBox').addTag(value.data.label);
            }, this);
        }
    },

    addingAlias: function(tagName, tagData, aView) {
        this.getView().storeHelper.addBotLevItemInStore(tagName, tagData, this.getView().store.getById('Aliases'));
    },

    removingAlias: function(tagName, aView) {
        this.getView().storeHelper.removeBotLevItemInStore(tagName, this.getView().store.getById('Aliases'));
    },

    addingIntendedUse: function(tagName, tagData, aView) {
        this.getView().storeHelper.addBotLevItemInStore(tagName, tagData, this.getView().store.getById('Intended Use'));
    },

    removingIntendedUse: function(tagName, aView) {
        this.getView().storeHelper.removeBotLevItemInStore(tagName, this.getView().store.getById('Intended Use'));
    },

    updateDescription: function(comp, e, eOpts) {
        var value = {label: "Description", comment: null, value: comp.value};
        this.getView().storeHelper.updateBotLevItemInStore(null, value, this.getView().store.getById('Description'));
    },

    updateHeader: function(comp) {
        var value = {label: comp.value, comment: null, value: comp.value};
        this.getView().storeHelper.updateBotLevItemInStore(null, value, this.getView().store.getById('Label'));
        this.getView().storeHelper.fetchMainStore().getAt(0).data.label = comp.value;
    }
});