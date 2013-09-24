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

    init: function(app) {
        this.control({
            'searchheader > #gobutton': {
                click: function(button, event) {
                    // Get the grid and clear the data, then call the runSearch function passing the text from the text field.

                    var header = button.up('searchheader'),
                        searchInput = header.queryById('searchInput'),
                        store = Ext.StoreManager.lookup('SearchStore');

                    store.removeAll();
                    store.searchText = searchInput.value;
                    store.loadPage(1);
                }
            },
            'searchheader > #resetbutton': {
                click: function(button, event) {
                    // Get the grid and clear the data, then call the runSearch function passing the text from the text field.

                    var header = button.up('searchheader'),
                        searchInput = header.queryById('searchInput'),
                        store = Ext.StoreManager.lookup('SearchStore');

                    searchInput.setValue('');
                    store.searchText = '';
                    store.loadPage(1);
                }
            },
            'resultsgrid': {
                'itemclick': function(grid, record, item) {
                    app.fireEvent('search:itemSelected', grid, record, item);

                }
            },
            'viewport > #itemviewmain #maintabs': {
                'add': function(me, container, pos, eOpts) {
                    me.setActiveTab(pos);
                }
            }
        });
    }
});
