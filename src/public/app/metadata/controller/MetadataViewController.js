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
        this.getMetadata_save_button().show();
        this.getMetadata_cancel_button().show();
        this.getMetadata_edit_button().hide();
        this.getView().setEditMode(true);
    },

    handleCancel: function (button) {
        this.getMetadata_save_button().hide();
        this.getMetadata_cancel_button().hide();
        this.getMetadata_edit_button().show();
        this.getView().setEditMode(false);
    },

    handleSave: function (button) {
        this.getMetadata_save_button().hide();
        this.getMetadata_cancel_button().hide();
        this.getMetadata_edit_button().show();

        var me = this;
        var theStore = this.getView().getStore();
        var  stuffChanged = false;
        //console.log('Saving metadata Store');
        Ext.Array.each(me.getView().items.items, function(metadata) {
            var key = metadata.key;
            var thing = theStore.data.get(key); // if this would work (we have an actual key set on the store data items) then we wouldn't need the loop below.
            Ext.Array.each(theStore.data.items, function(storeData) {
                if(storeData.get('key') == key) {
                    if(storeData.get('value') !== metadata.value) {
                        storeData.set('value', metadata.value);
                        stuffChanged = true;
                    }
                    return false; // terminate this inner loop
                }
            });
        });
        if(stuffChanged)
            theStore.sync();

        this.getView().setEditMode(false); // this causes the view to be rebuilt in view mode with the new data.
    },

    init: function () {
        if(this.getView().getEditMode()) {
            this.getMetadata_save_button().show();
            this.getMetadata_cancel_button().show();
            this.getMetadata_edit_button().hide();
        } else {
            this.getMetadata_save_button().hide();
            this.getMetadata_cancel_button().hide();
            this.getMetadata_edit_button().show();
        }
        return this.callParent(arguments);
    }


});