/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/26/13
 * Time: 5:46 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.QualitiesPickerController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.itemQualities.QualitiesPicker'
    ],
    control: {
        availableQualitiesGroup: {
            itemclick: 'qualityChecked'
        },
        selectedQualitiesGroup: {
            itemclick: 'qualityRemoved'
        },
        okBtn: {
            click: 'saveQualitySelections'
        },
        cancelBtn: {
            click: 'cancelQualitySelections'
        }
    },

    qualityChecked: function (grid, record, item, index, e, eOpts) {
        if (e.target.checked) {
            // Create a new model for the store, mapping the data to fit the model
            var newQualitiesModel = {
                id: record.data.label,
                label: record.data.label,
                predicateUri: record.data.uri,
                values: []
            };

            // Add a new model into the store
            this.getView().queryById('selectedQualitiesGroup').store.add(newQualitiesModel);
            this.getView().getPropNameArray().push(record.data.label);
        }
        else if (e.target.id === "qualityCheck") {
            Ext.Array.remove(this.getView().getPropNameArray(), record.data.label);

            //remove from store
            var store = this.getView().queryById('selectedQualitiesGroup').store;
            store.remove(store.getById(record.data.label));
        }
    },

    qualityRemoved: function (grid, record, item, index, e, eOpts) {
        if (e.target.id === "removeSelectedQuality") {
            var me = this;
            Ext.Array.remove(this.getView().getPropNameArray() , record.data.label);

            Ext.each(this.getView().store.data.items, function(value) {
                if (Ext.Array.contains(me.getView().getPropNameArray(), value.data.label)) {
                    value.data.selected = true;
                }
                else {
                    value.data.selected = false;
                }
            });

            this.getView().queryById('availableQualitiesGroup').reconfigure(this.getView().store);
            grid.store.remove(grid.store.getById(record.data.label));
        }
    },

    saveQualitySelections: function () {
        this.getView().getSelectionStore().removeAll();
        this.getView().getSelectionStore().add(this.getView().queryById('selectedQualitiesGroup').store.getRange());
        this.getView().updatedStore = true;
        this.getView().close();
    },

    cancelQualitySelections: function () {
        this.getView().close();
    }
});