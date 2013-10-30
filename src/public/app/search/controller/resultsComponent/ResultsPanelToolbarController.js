/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.ResultsPanelToolbarController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        view: {
            boxready: "onViewBoxReady"
        },

        resultsPageSizeCombobox: {
            select: 'onPageSizeChange'
        },
        results_listViewButton: {
            click: 'onViewBtnClick',
            toggle: 'onViewBtnToggle'
        },
        results_mapViewButton: {
            click: 'onViewBtnClick',
            toggle: 'onViewBtnToggle'
        }
    },

    onViewBoxReady:function()   {
        this.getView().queryById('results_listViewButton').toggle();
    },


    onPageSizeChange: function (box, record, index) {
        this.getView().fireEvent("Search:PageSizeChanged", record[0].data.count);

    },

    onSortByChange: function (box, record, index) {
        this.getView().fireEvent("Search:SortByChanged", record);

    },

    onViewBtnClick:function(btn)  {
        if(!btn.pressed)    {
            this.getView().queryById('results_listViewButton').toggle();
            this.getView().queryById('results_mapViewButton').toggle();
        }
    },

    onViewBtnToggle:function(btn)  {

        var listBtn = this.getView().queryById('results_listViewButton');
        var mapBtn = this.getView().queryById('results_mapViewButton');


    },

    init: function () {
        return this.callParent(arguments);
    }

});