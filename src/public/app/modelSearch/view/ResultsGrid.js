Ext.define('Savanna.modelSearch.view.ResultsGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.modelsearch_resultsGrid',

    title: 'Results',

    store: 'Savanna.modelSearch.store.ModelSearchStore',

    columns: [
            { text: 'Item Name',  dataIndex: 'referenceName', flex: 1 },
            { text: 'Classification', dataIndex: 'classification', flex: 1 },
            { text: 'Workflow state', dataIndex: 'workflowState', flex: 1 },
            { text: 'Modified date', dataIndex: 'lastModifiedDate', flex: 1 },
            { text: 'Modified by', dataIndex: 'lastModifiedByUser', flex: 1 }
    ],

    tbar: {
        xtype: 'modelsearch_pagingToolbar',
        dock: 'top',
        width: 100
    },

   initComponent: function() {

       this.store=Ext.create('Savanna.modelSearch.store.ModelSearchStore')
        this.callParent(arguments);

        this.getStore().loadPage(1);
    }

});
