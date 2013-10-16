/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:27 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.controller.MetadataViewController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        metadata_edit_button: {
            click: 'handleEditMode'
        },
        metadata_save_button: {
            click: 'handleSave'
        },
        metadata_cancel_button: {
            click: 'handleCancel'
        }


    },

    handleEditMode: function (button) {
        this.getView().setEditMode(true);
    },

    handleCancel: function (button) {
        this.getView().setEditMode(false);
    },

    handleSave: function (button) {
        var me = this;
        var theStore = this.getView().getStore();
        Ext.Array.each(me.getView().items.items, function(metadata) {
            var key = metadata.key;
            var thing = theStore.data.get(key); // if this would work (we have an actual key set on the store data items) then we wouldn't need the loop below.
            Ext.Array.each(theStore.data.items, function(storeData) {
                if(storeData.data.key == key) {
                    thing = storeData.data;
                    return false; // terminate this inner loop
                }
            });
            thing.value = metadata.value;
            //console.log('thing',thing);
        });

        theStore.sync();

        this.getView().setEditMode(false); // this causes the view to be rebuilt in view mode with the new data.
    },

    init: function () {
        return this.callParent(arguments);
    }


});