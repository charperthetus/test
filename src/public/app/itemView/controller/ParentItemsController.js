Ext.define('Savanna.itemView.controller.ParentItemsController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.createItem.ParentItems'
    ],

    control: {
        filterParentItemsField: {
            keydown: 'filterKeydown',
            'onclearclick': 'closeTypeAhead'
        },
        parentitems_results: {
            live: true,
            listeners:  {
                itemclick: 'selectParentItemUri',
                itemdblclick: 'getParentItemResult'
            }

        }
    },

    filterKeydown: function (field, e, eOpts) {
        this.getView().filtering = true;
        var me = this;
        if (me.getView().taInt) {
            clearTimeout(me.getView().taInt);
        }
        me.getView().taInt = setTimeout(me.resetFiltering, this.getView().typeaheadDelay, me);
    },

    resetFiltering: function (me) {
        if (me.getView().filtering) {
            me.getView().filtering = false;
            if(me.getView().queryById('filterParentItemsField').getValue() == '') {
                me.closeTypeAhead();
            }   else    {
                me.getView().getLayout().setActiveItem(0);
                me.filterQualities();
            }

        }
    },

    filterQualities: function () {
        this.getView().getLayout().setActiveItem(1);
        this.getView().queryById('parentitems_results').store.getProxy().extraParams.q = this.getView().queryById('filterParentItemsField').getValue();
        this.getView().queryById('parentitems_results').store.reload();
    },

    closeTypeAhead: function () {
        this.getView().queryById('filterParentItemsField').setValue('');
        this.getView().getLayout().setActiveItem(0);
    },

    selectParentItemUri: function (grid, record, item, index, e, eOpts) {
        this.getView().up('itemview_create_item').selectedParentUri = record.get('uri');
        this.getView().up('itemview_create_item').selectedParentLabel = record.get('label');
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
        EventHub.fireEvent('open', {uri: records[0].data.uri, label: records[0].data.label, type: 'item'}, {editMode: true});
    }
});

