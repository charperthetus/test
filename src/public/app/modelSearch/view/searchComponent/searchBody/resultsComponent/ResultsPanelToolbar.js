Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.model_search_resultspaneltoolbar',
    controller: 'Savanna.modelSearch.controller.resultsComponent.ResultsPanelToolbarController',
    bubbleEvents: ['Search:PageSizeChanged', "Search:SortByChanged", 'search:multiColumnGridView', 'search:singleColumnGridView'],
    requires: [
        'Savanna.controller.Factory',
        'Ext.form.field.ComboBox',
        'Ext.data.Store',
        'Savanna.modelSearch.controller.resultsComponent.ResultsPanelToolbarController'
    ],

    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent');
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems:function()   {

        var sortStore = Ext.create('Ext.data.Store', {
            fields: ['sortby', 'name'],
            data: [
                {'sortby': 'relevance', 'name': 'Sort by Relevance'}
            ]
        });

        var countStore = Ext.create('Ext.data.Store', {
            fields: ['count', 'name'],
            data: [
                {'count': 20, 'name': '20 results per page'},
                 {'count': 50, 'name': '50 results per page'},
                 {'count': 100, 'name': '100 results per page'}
            ]
        });

        return [

            {
                xtype: 'combobox',
                itemId: 'resultsSortByCombobox',
                store: sortStore,
                displayField: 'name',
                valueField: 'sortby',
                value: 'relevance',
                ui: 'combo-button'

            },

            {
                xtype: 'combobox',
                itemId: 'resultsPageSizeCombobox',
                store: countStore,
                editable: false,
                displayField: 'name',
                valueField: 'count',
                value: '20',
                ui: 'combo-button'

            },
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',    //thumb
                enableToggle: true,
                pressed: true,
                ui: 'basic',
                glyph: 61442,
                itemId: 'singleColumnGridView'
            },
            {
                xtype: 'button',    //grid
                enableToggle: true,
                ui: 'basic',
                glyph: 61808,
                itemId: 'multiColumnGridView'
            }


        ]
    }

});
