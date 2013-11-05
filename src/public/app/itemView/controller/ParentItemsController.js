
Ext.define('Savanna.itemView.controller.ParentItemsController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.createItem.ParentItems'
    ],

    control: {
        filterParentItemsField: {
            keydown: 'filterKeydown'
        },
        searchParentItemsBtn: {
            click: 'filterQualities'
        },
        clearParentItemsBtn:    {
            click: 'closeTypeAhead'
        },
        parentitems_results:    {
            itemclick: 'selectParentItemUri',
            itemdblclick: 'getParentItemResult'
        }
    },

    requires: [

    ],

    filterKeydown: function(field, e, eOpts) {
        if (e.keyCode === Ext.EventObject.ENTER) {

            if (field.getValue().trim().length) {
                this.filterQualities();
            }
        }
    },

    filterQualities: function () {
        this.getView().getLayout().setActiveItem(1);
        this.getView().queryById('parentitems_results').store.getProxy().extraParams.q = this.getView().queryById('filterParentItemsField').getValue();
        this.getView().queryById('parentitems_results').store.reload();
    },

    closeTypeAhead: function()  {
        this.getView().queryById('filterParentItemsField').setValue('');
        this.getView().getLayout().setActiveItem(0);
    },

    selectParentItemUri:function(grid, record, item, index, e, eOpts)  {
        this.getView().up('itemview_create_item').selectedParentUri = record.get('uri');
    },

    getParentItemResult: function (grid, record, item, index, e, eOpts) {



        var itemStore = Ext.create('Savanna.itemView.store.MainItemStore');

        itemStore.getProxy().url = SavannaConfig.itemCreateUrl;
        itemStore.getProxy().setExtraParam("parentUri", record.get('uri'));

        itemStore.load({
            scope: this,
            callback: this.handleCreateSuccess
        });

        this.getView().up('itemview_create_item').close();
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

    }
});

