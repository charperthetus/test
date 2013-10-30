/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/28/13
 * Time: 11:06 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.store.ItemViewStoreHelper', {
    mainStore: null,

    init: function() {
        this.mainStore = Ext.data.StoreManager.lookup('Savanna.itemView.store.MainItemStore').getAt(0).data.propertyGroups;
    },

    updateMainStore: function(localStore, componentName) {
        for (var i = 0; i < this.mainStore.length; i++) {
            if (this.mainStore[i].label === componentName) {
                this.mainStore[i].values = [];

                for (var j = 0; j < localStore.length; j++) {
                    this.mainStore[i].values.push(localStore[j].raw);
                }

                break;
            }
        }
    },

    removeFromMainStore: function(componentName, predicateName) {
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

    addToMainStore: function(componentName, predicateModel) {
        for (var i = 0; i < this.mainStore.length; i++) {
            if (this.mainStore[i].label === "Properties") {
                this.mainStore[i].values.push(predicateModel);
                break;
            }
        }
    }
});