/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/28/13
 * Time: 11:06 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.store.ItemViewStoreHelper', {
    store: null,
    mainStore: null,

    requires: [
        'Ext.data.IdGenerator',
        'Ext.data.UuidGenerator'
    ],

    init: function(store) {
        this.store = store;
        this.mainStore = store.getAt(0).data.propertyGroups;
    },

    itemUri: function() {
        return this.store.getAt(0).data.uri;
    },

    fetchMainStore: function() {
        return this.store;
    },

    updateMainStore: function(store, componentName) {
        for (var i = 0; i < this.mainStore.length; i++) {
            if (this.mainStore[i].label === componentName) {
                Ext.Array.erase(this.mainStore[i].values, 0, this.mainStore[i].values.length);

                for (var j = 0; j < store.length; j++) {
                    this.mainStore[i].values.push(store[j].data);
                }

                break;
            }
        }
    },

    addGroupItemInStore: function(componentName, modelName, uri, store) {
        var newModel = this.createNewModelInstance(modelName, uri);
        store.add(newModel);

        for (var i = 0; i < this.mainStore.length; i++) {
            if (this.mainStore[i].label === componentName) {
                this.mainStore[i].values.push(newModel.data);
                break;
            }
        }
    },

    removeGroupItemInStore: function(componentName, predicateName, store) {
        store.remove(store.getById(predicateName));

        for (var i = 0; i < this.mainStore.length; i++) {
            if (this.mainStore[i].label === componentName) {
                for (var j = 0; j < this.mainStore[i].values.length; j++) {
                    if (this.mainStore[i].values[j].label === predicateName) {
                        Ext.Array.remove(this.mainStore[i].values, this.mainStore[i].values[j]);
                        break;
                    }
                }

                break;
            }
        }
    },

    /*
     *  Get Bottom Leaf Store
     *
     *  Returns a collection of "leafs" from a store. This iterates three levels
     *  deep and returns an Array of values.
     *
     *  @param {store} The store object to iterate over
     */
    getBotLevItemInStore: function(store) {
        var results = [];
        Ext.Array.each(store, function(model) {
            Ext.Array.each(model.data.items, function(values) {
                Ext.Array.each(values.data.values, function(leaf) {
                    results.push(leaf);
                });
            });
        });
        return results;
    },

    addBotLevItemInStore: function(tagName, tagData, store) {
        var tagUri = tagData ? tagData.uri : null;
        var tagModel = this.createNewBottomLevelModelInstance(tagName, tagUri);
        store.data.values.push(tagModel.data);
        store.valuesStore.add(tagModel);
    },

    removeBotLevItemInStore: function(tagName, store) {
        for (var i = 0; i < store.data.values.length; i++) {
            if (store.data.values[i].label === tagName) {
                Ext.Array.remove(store.data.values, store.data.values[i]);
                break;
            }
        }

        store.valuesStore.remove(store.valuesStore.getById(tagName));
    },

    removeBotLevItemInStoreByUri: function(uri, store) {
        for (var i = 0; i < store.data.values.length; i++) {
            if (store.data.values[i].value === uri) {
                Ext.Array.remove(store.data.values, store.data.values[i]);
                store.valuesStore.remove(store.valuesStore.getAt(i));
                break;
            }
        }
    },

    createNewModelInstance: function(label, uri) {
        var mod = Ext.create('Savanna.itemView.model.PropertyGroupValueModel');
        mod.data.id = label;
        mod.data.label = label;
        mod.data.predicateUri = uri;
        mod.data.values = [];
        mod.valuesStore = Ext.create('Ext.data.JsonStore', {
            model: 'Savanna.itemView.model.PropertyGroupValueValueModel'
        });

        return mod;
    },

    createNewBottomLevelModelInstance: function(label, uri) {
        var mod = Ext.create('Savanna.itemView.model.PropertyGroupValueValueModel');
        mod.data.id = label;
        mod.data.label = label;
        mod.data.uri = this.getUUID();
        mod.data.value = uri ? uri : label;
        mod.data.editable = true;
        mod.data.version = 0;
        mod.data.inheritedFrom = null;
        return mod;
    },

    getUUID: function() {
        var uuid = Ext.data.IdGenerator.get('uuid').generate();
        return 'x' + uuid  + '/' + "ModelProperty";
    }
});