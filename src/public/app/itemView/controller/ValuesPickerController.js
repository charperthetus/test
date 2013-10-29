/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/28/13
 * Time: 3:21 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.ValuesPickerController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.itemQualities.ValuesPicker'
    ],
    control: {
        availableValuesGroup: {
            itemclick: 'valueChecked'
        },
        selectedValuesGroup: {
            itemclick: 'valueRemoved'
        },
        okBtn: {
            click: 'saveValueSelections'
        },
        cancelBtn: {
            click: 'cancelValueSelections'
        }
    },

    valueChecked: function (grid, record, item, index, e, eOpts) {
        if (e.target.checked) {
            // Create a new model for the store, mapping the data to fit the model
            var newValuesModel = {
                id: record.data.label,
                label: record.data.label,
                predicateUri: record.data.uri,
                values: []
            };

            // Add a new model into the store
            this.getView().queryById('selectedValuesGroup').store.add(newValuesModel);
            this.getView().getValNameArray().push(record.data.label);
        }
        else if (e.target.id === "valueCheck") {
            Ext.Array.remove(this.getView().getValNameArray(), record.data.label);

            //remove from store
            var store = this.getView().queryById('selectedValuesGroup').store;
            store.remove(store.getById(record.data.label));
        }
    },

    valueRemoved: function (grid, record, item, index, e, eOpts) {
        if (e.target.id === "removeSelectedValue") {
            var me = this;
            Ext.Array.remove(this.getView().getValNameArray() , record.data.label);

            Ext.each(this.getView().store.data.items, function(value) {
                if (Ext.Array.contains(me.getView().getValNameArray(), value.data.label)) {
                    value.data.selected = true;
                }
                else {
                    value.data.selected = false;
                }
            });

            this.getView().queryById('availableValuesGroup').reconfigure(this.getView().store);
            grid.store.remove(grid.store.getById(record.data.label));
        }
    },

    saveValueSelections: function () {
        this.getView().getSelectionStore().removeAll();
        this.getView().getSelectionStore().add(this.getView().queryById('selectedValuesGroup').store.getRange());
        this.getView().updatedStore = true;
        this.getView().close();
    },

    cancelValueSelections: function () {
        this.getView().close();
    }
});