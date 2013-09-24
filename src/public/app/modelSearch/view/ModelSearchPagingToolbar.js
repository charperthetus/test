Ext.define('Savanna.modelSearch.view.ModelSearchPagingToolbar', {
    extend: 'Ext.toolbar.Paging',

    alias: 'widget.modelsearch_pagingToolbar',

    store: 'Savanna.modelSearch.store.ModelSearchStore',

    displayInfo: true,

    displayMsg: '{2} Results',

    emptyMsg: 'No items to display',

    initComponent: function() {

        this.store=Ext.create('Savanna.modelSearch.store.ModelSearchStore')
        this.callParent(arguments);


    }
});
