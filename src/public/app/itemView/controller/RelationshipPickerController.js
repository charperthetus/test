/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/23/13
 * Time: 1:21 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.controller.RelationshipPickerController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.relatedItems.RelationshipPicker'
    ],

    control: {
        availableRelationshipGroup: {
            itemclick: 'relationshipChecked'
        },
        okBtn: {
            click: 'saveRelationshipSelections'
        },
        cancelBtn: {
            click: 'cancelRelationshipSelections'
        }
    },

    relationshipChecked: function (grid, record, item, index, e, eOpts) {
        if (e.target.checked) {
            // Create a new model for the store, mapping the data to fit the model
            var newRelationshipModel = this.getView().getStoreHelper().createNewModelInstance(record.data.label, record.data.uri);

            // Add a new model into the store
            this.getView().relationshipSelectStore.add(newRelationshipModel);
            this.getView().getRelationshipNameArray().push(record.data.label);
        }
        else if (e.target.id === "relationshipCheck") {
            Ext.Array.remove(this.getView().getRelationshipNameArray(), record.data.label);

            //remove from store
            var store = this.getView().relationshipSelectStore;
            store.remove(store.getById(record.data.label));
        }

        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    saveRelationshipSelections: function () {
        this.getView().getSelectionStore().removeAll();
        this.getView().getSelectionStore().add(this.getView().relationshipSelectStore.getRange());
        this.getView().updatedStore = true;
        this.getView().close();
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    cancelRelationshipSelections: function () {
        this.getView().close();
    }
});
