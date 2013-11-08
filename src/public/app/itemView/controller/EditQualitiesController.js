/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/23/13
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.EditQualitiesController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.itemQualities.EditItemQualities'
    ],

    propNameArray: [],

    // NOTE: There are multiple auto-complete forms on this controller, 
    //       so be careful when listening for events, you might capture
    //       more than you bargained for.
    control: {
        // On load, set the main store
        view: {
            'EditQualities:StoreSet': 'storeSet'
        },
        // This is the auto-complete that is static
        addPropAutoChooser: {
            'AutoComplete:ItemSelected': 'addNewQualityForm'
        },
        // When a tag is added, removed, or the predicate is destroyed
        autocompleteEvents: {
            live: true,
            selector: '',
            listeners: {                
                'AutoComplete:TagRemoved': 'removeTag',
                'AutoComplete:ItemSelected': 'addTag',
                'AutoComplete:Destroyed': 'removePredicate'
            }
        },
        // launch qualities chooser
        qualitiesChooser: {
            click: 'launchPredicatesChooser'
        }
    },

    // This is for the main (static) auto-complete form.
    storeSet: function() {
        var me = this,
            newProp;

        // Generate a new form control for each predicate in the store
        Ext.each(me.getView().store.data.items, function(item) {
            newProp = me.createNewAutoComplete(item.data);

            // Generate the assertions (tags in this case) for the predicate
            Ext.each(item.data.values, function(value) {
                newProp.addTag(value.label, value.editable);
            });
            me.getView().add(newProp);
        });
        this.updateTitle();
    },

    // Control responsible for adding a new auto-complete form (dynamic)
    addNewQualityForm: function (propName, propData, aView) {
        if (this.getView().queryById('prop_' + propName.replace(/[\s'"]/g, "_")) === null) {
            var newProp = this.createNewAutoComplete(propData);
            this.getView().add(newProp);
            this.propNameArray.push(propName);
            this.getView().storeHelper.addGroupItemInStore("Properties", propName, propData.uri, this.getView().store);
            this.updateTitle();
        }
    },

    // Convenience handler to generate a new auto-complete
    createNewAutoComplete: function(data) {
        var me = this,
            predicateUri = data.predicateUri ? encodeURI(data.predicateUri): encodeURI(data.uri),

            picker = Ext.create('Ext.button.Button', {
                glyph:'searchBinoculars',
                itemId: 'valuesChooser',
                height:43,
                cls:'edit-qualities-button',
                listeners: {
                    click: me.launchValuesChooser.bind(me, data.label)
                }
            }),
            newProp =  Ext.create('Savanna.components.autoComplete.AutoComplete', {
                itemId: 'prop_' + data.label.replace(/[\s'"]/g, '_'),
                showTags: true,
                preLabel: data.label,
                hasControls: true,
                isClosable: true,
                store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                    urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/keyword/property/' + predicateUri,
                    paramsObj: { pageStart:0, pageSize:20, alphabetical: true }
                })
            });
        this.propNameArray.push(data.label);
        newProp.child('container').insert(1, picker);
//        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');

        return newProp;
    },

    // When a new tag is added on a child auto-complete
    // add the tag to the store
    addTag: function(tagName, tagData, aView) {
        this.getView().storeHelper.addBotLevItemInStore(tagName, tagData, this.getView().store.getById(aView.preLabel));
        this.updateTitle();
//        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
    },

    // When a tag is removed on a child auto-complete
    // remove the tag from the store
    removeTag: function(tagName, aView) {
        this.getView().storeHelper.removeBotLevItemInStore(tagName, this.getView().store.getById(aView.preLabel));
        this.updateTitle();
//        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
    },

    launchValuesChooser: function(storeName) {
        var valNameArray = [];

        Ext.each(this.getView().store.getById(storeName).valuesStore.data.items, function(value) {
            valNameArray.push(value.data.label);
        });

        var vChooser = Ext.create('Savanna.itemView.view.itemQualities.ValuesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.getView().store.getById(storeName).valuesStore,
            valNameArray: valNameArray,
            uri: encodeURI(this.getView().store.getById(storeName).data.predicateUri),
            storeHelper: this.getView().storeHelper
        });

        vChooser.on('close', this.closedVPicker, this, storeName);
    },

    closedVPicker: function(view, propName) {
        if (view.updatedStore) {
            Ext.Array.erase(this.getView().store.getById(propName).data.values, 0, this.getView().store.getById(propName).data.values.length);
            this.getView().queryById('prop_' + propName.replace(/[\s'"]/g, "_")).clearTags();

            Ext.each(this.getView().store.getById(propName).valuesStore.data.items, function(value) {
                this.getView().store.getById(propName).data.values.push(value.data);
                this.getView().queryById('prop_' + propName.replace(/[\s'"]/g, "_")).addTag(value.data.label);
            }, this);

//            this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
        }
    },

    launchPredicatesChooser: function() {
        var qChooser = Ext.create('Savanna.itemView.view.itemQualities.QualitiesPicker', {
            width: 500,
            height: 600,
            selectionStore: this.getView().store,
            propNameArray: this.propNameArray,
            storeHelper: this.getView().storeHelper
        });
        qChooser.on('close', this.closedQPicker, this);
    },

    closedQPicker: function(view) {
        if (view.updatedStore) {
            this.getView().removeAll();
            this.propNameArray = [];
            this.getView().storeHelper.updateMainStore(this.getView().store.data.items, "Properties");
            this.storeSet();
            this.updateTitle();
        }
    },

    removePredicate: function(view) {
        this.getView().storeHelper.removeGroupItemInStore("Properties", view.preLabel, this.getView().store);
        Ext.Array.remove(this.propNameArray, view.preLabel);
        this.updateTitle();
    },

    /*
     *  Update Title
     *
     *  Iterates over all the quality values and updates the Qualities header with the count
     *  of asserted values.
     *
     *  @param none {none}
     *  @return none {none}
     */
    updateTitle: function() {
        var titlePre = 'Qualities (',
            values = this.getView().storeHelper.getBotLevItemInStore(this.getView().store).length,
            titlePost = ')';

        this.getView().setTitle(titlePre + values + titlePost);
    }
});