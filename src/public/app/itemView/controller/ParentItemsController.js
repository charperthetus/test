
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
        if(!this.getView().filtering)   {
            this.getView().filtering = true;
            var me = this;
            me.getView().taInt = setInterval(me.checkFiltering, 200);
            Ext.defer(function(){this.getView().filtering = false;}, this.getView().typeaheadDelay);
        }
    },

    checkFiltering:function()   {
        if(!this.getView().filtering)   {
            clearInterval(me.getView().taInt);
            this.filterQualities();
        }
    },

    filterQualities: function () {
        if(!this.getView().filtering)   {
            this.getView().getLayout().setActiveItem(1);
            this.getView().queryById('parentitems_results').store.getProxy().extraParams.q = this.getView().queryById('filterParentItemsField').getValue();
            this.getView().queryById('parentitems_results').store.reload();
        }
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
        EventHub.fireEvent('open', {uri: records[0].data.uri, label: records[0].data.label, type: 'item'}, {editMode:true});
    }
});

