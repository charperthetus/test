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

    storeHelper: null,

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

    init: function() {
        this.callParent(arguments);
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.storeHelper.init();
    },

    valueChecked: function (grid, record, item, index, e, eOpts) {
        if (e.target.checked) {
            // Create a new model for the store, mapping the data to fit the model
            var newValuesModel = this.storeHelper.createNewBottomLevelModelInstance(record.data.label, record.data.uri);

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

        Savanna.app.fireEvent('ItemView:SaveEnable');
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

            Savanna.app.fireEvent('ItemView:SaveEnable');
        }
    },

    saveValueSelections: function () {
        this.getView().getSelectionStore().removeAll();
        this.getView().getSelectionStore().add(this.getView().queryById('selectedValuesGroup').store.getRange());
        this.getView().updatedStore = true;
        this.getView().close();
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    cancelValueSelections: function () {
        this.getView().close();
    }
});