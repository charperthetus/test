/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultspanel',
    bubbleEvents: ['Search:PageSizeChanged', "Search:SortByChanged"],
    requires: [
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelToolbar',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelGrid',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelGridMultiColumn',
        'Savanna.controller.Factory'
    ],

    region: 'center',
    header: false,
    layout:'fit',


    initComponent: function () {
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ResultsComponent');
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {
        return [
            {
                xtype: 'model_search_resultspanelgrid',
                itemId: 'resultspanelgrid'

            },
            {
                hidden:true,
                xtype: 'model_search_resultspanelgrid_multi_column',
                itemId: 'resultspanelgrid_multi_column',
                dockedItems:[
                    {
                        xtype: 'pagingtoolbar',
                        itemId: 'gridtoolbar',
                        dock: 'top',
                        displayInfo: true
                    }
                ]
            },
            {
                itemId: 'model_search_error_message',
                xtype: "panel",
                width: '100%',
                height: '100%',
                layout : {
                    type  : 'hbox',
                    pack  : 'center',
                    align : 'middle'
                },
                defaults: {margin: 4},
                items: [
                    {
                        xtype:'displayfield',
                        itemId: 'errorLabel',
                        text: ''
                    }

                ]
            }
        ];
    },

    /*
     swaps the store assigned to our grids
     based on whichever DAL the user selects from the left-hand panel, , and re-binds the paging toolbar.
     */
    updateGridStore: function (store) {

        var pagingToolbar = this.queryById('gridtoolbar');
        pagingToolbar.bindStore(store);

        var grid = this.queryById('resultspanelgrid');
        grid.reconfigure(store);
        this.queryById('gridtoolbar').bindStore(store);

        var gridMulti = this.queryById('resultspanelgrid_multi_column');
        gridMulti.reconfigure(store);
        gridMulti.queryById('gridtoolbar').bindStore(store);
    },

    //When we set the error text we hide the grid(s) and show an error message.
    //When we clear the text, we show the grid(s) and not the error message.
    //  In the "alert" style we show an icon.
    //  When not using the "alert" style, we hide the icon.
    setErrorText: function (text, useAlertStyleForTextAndIcon) {
        var grid = this.queryById('resultspanelgrid');
        var label = this.queryById('errorLabel');

        if(text && text.length > 0){
            grid.hide();
            label.show();
            label.setValue(text);   //xtype was changed for styling, setText is no longer available
            label.removeCls('icon-alert');
            if(useAlertStyleForTextAndIcon){
                label.addCls("icon-alert");
            }

        } else {
            label.hide();
            grid.show();
        }
    },

    dockedItems: [
        {
            xtype: 'model_search_resultspaneltoolbar',
            itemId: 'resultspaneltoolbar'
        }
    ]
});
