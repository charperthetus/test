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
    height: 35,
    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent');
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems:function()   {

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
                itemId: 'resultsPageSizeCombobox',
                store: countStore,
                editable: false,
                displayField: 'name',
                valueField: 'count',
                value: '20 results per page'
            },'->',{
                xtype: 'pagingtoolbar',
                itemId: 'gridtoolbar',
                cls: 'paging-toolbar-bg',
                dock: 'top',
                displayInfo: true
            },'->', {
                hidden: true,
                xtype: 'button',    //thumb
                enableToggle: true,
                pressed: true,
                width:25,
                height:25,
                cls: 'toolbarButtonFramework',
                ui:'icon-dark',
                glyph: 'singleView',
                itemId: 'singleColumnGridView'
            },
            {
                hidden: true,
                xtype: 'button',    //grid
                enableToggle: true,
                width:25,
                height:25,
                cls: 'toolbarButtonFramework',
                ui:'icon-dark',
                glyph: 'multiColumn',
                itemId: 'multiColumnGridView'
            }
        ]
    }

});
