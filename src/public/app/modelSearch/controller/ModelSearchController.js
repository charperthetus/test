/**
 * Created with IntelliJ IDEA.
 * User: amartin
 * Date: 9/24/13
 * Time: 9:22 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.controller.ModelSearchController', {
    extend: 'Ext.app.Controller',

    stores: [
        'Savanna.modelSearch.store.ModelSearchStore'
    ],
    models:[
        'Savanna.modelSearch.model.ModelSearchModel'
    ],
    views: [
        'Savanna.modelSearch.view.ModelSearch',
        'Savanna.modelSearch.view.ResultsGrid',
        'Savanna.modelSearch.view.ModelSearchHeader',
        'Savanna.modelSearch.view.ModelSearchPagingToolbar'
    ],
    init: function() {

        this.control({
            'modelsearch_searchHeader #gobutton': {
                click: this.handleModelSearch
            },
            'modelsearch_searchHeader #resetbutton': {
                click: this.clearModelSearch
            },
            'modelsearch_resultsGrid': {
                itemclick: this.handleModelClick
            }
        });
    },
    handleModelSearch: function(button) {
        // Get the grid and clear the data, then call the runSearch function passing the text from the text field.
        var header = button.up('modelSearchHeader'),
            searchInput = header.queryById('modelSearchInput'),
            store = Ext.StoreManager.lookup('modelSearchStore');

        if (store) store.removeAll();
        store.searchText = searchInput.value;
        store.loadPage(1);
    },
    clearModelSearch: function(button) {
        // Get the grid and clear the data, then call the runSearch function passing the text from the text field.
        var header = button.up('searchheader'),
            searchInput = header.queryById('searchInput'),
            store = Ext.StoreManager.lookup('SearchStore');

        searchInput.setValue('');
        store.searchText = '';
        store.loadPage(1);        
    },
    handleModelClick: function(grid, record, item) {
        var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
            title: record.data.referenceName,
            itemUri: record.data.uri,
            closable: true,
            autoScroll: true,
            tabConfig: {
                ui: 'dark'
            }
        });

        this.getApplication().fireEvent('search:itemSelected', itemView);
    }
});
