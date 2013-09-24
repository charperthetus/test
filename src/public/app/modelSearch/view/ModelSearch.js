Ext.define('Savanna.modelSearch.view.ModelSearch', {
    extend: 'Ext.Panel',
    alias: 'widget.modelsearch',
    cls: 'model-search',
    store: 'Savanna.modelSearch.store.ModelSearchStore',
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
    ]
});
