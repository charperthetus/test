Ext.define('Savanna.modelSearch.view.ModelSearchPagingToolbar', {
    extend: 'Ext.toolbar.Paging',

    alias: 'widget.modelsearch_pagingToolbar',

    displayInfo: true,

    displayMsg: '{2} Results',

    emptyMsg: 'No items to display',

    initComponent: function() {

        this.store=Ext.data.StoreManager.lookup('modelSearchStore');
        this.callParent(arguments);


    }
});
