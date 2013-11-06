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
                hidden: true,
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
                        xtype: 'box',
                        itemId: 'statusIcon'
                    },

                    {
                        //help!  word wrapping of some kind needed
                        xtype:'text',
                        itemId: 'errorLabel',
                        text: ''
                    }

                ]
            }
        ];
    },

    /*
     tried to give this a more intuitive name - it swaps the store assigned to our grid
     based on whichever DAL the user selects from the left-hand panel, pages to the current
     page, and re-binds the paging toolbar.
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



    setErrorText: function (text) {
        var grid = this.queryById('resultspanelgrid');
        var messageArea = this.queryById('model_search_error_message');
        var label = this.queryById('errorLabel');
        if(text && text.length > 0){
            messageArea.show();
            grid.hide();
            label.setText(text);

            var    loadingEl = messageArea.down('#statusIcon');
            loadingEl.removeCls('icon-success icon-alert icon-pending loadNone');
            loadingEl.addCls('icon-alert');
        } else {
            messageArea.hide();
            grid.show();
            label.text = "";
        }
    },

    dockedItems: [
        {
            xtype: 'model_search_resultspaneltoolbar',
            itemId: 'resultspaneltoolbar'
        }
    ]
});
