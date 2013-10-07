Ext.define('Savanna.modelSearch.view.ModelSearch', {
    extend: 'Ext.Panel',
    alias: 'widget.modelsearch',
    cls: 'model-search',
    title: 'Model Search',
    requires: [
        'Savanna.modelSearch.view.ResultsGrid',
        'Savanna.modelSearch.view.ModelSearchHeader'
    ],
    items: [
        {
            xtype: 'modelsearch_searchHeader',
            flex: 1,
            store:this.store
        },
        {
            xtype: 'modelsearch_resultsGrid',
            flex: 4

        }
    ],
    initComponent: function() {
        this.store=Ext.create('Savanna.modelSearch.store.ModelSearchStore');
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ModelSearchController');


    }
});
