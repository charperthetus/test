/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/25/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.CreateItemController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.createItem.CreateItem'
    ],

    control: {
        commitBtn: {
            click: 'onParentItemCommit'
        },
        cancelBtn: {
            click: 'onParentItemCancel'
        }
    },

    itemStore: null,

    requires: [
        'Savanna.itemView.store.MainItemStore'
    ],

    onParentItemCommit: function () {

        this.itemStore = Ext.create('Savanna.itemView.store.MainItemStore');

        this.itemStore.getProxy().url = SavannaConfig.itemCreateUrl;
        this.itemStore.getProxy().setExtraParam("parentUri", this.getView().selectedParentUri);

        this.itemStore.load({
            scope: this,
            callback: this.handleCreateSuccess
        });
    },

    onParentItemCancel: function () {
        this.getView().close();
    },

    handleCreateSuccess: function (records, operation, success) {
        var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
            title: records[0].data.label,
            itemUri: records[0].data.uri,
            itemStore: this.itemStore,
            editMode: true,
            closable: true,
            autoScroll: true,
            tabConfig: {
                ui: 'dark'
            }
        });
        Savanna.app.fireEvent('search:itemSelected', itemView);

        this.getView().close();

    }
});