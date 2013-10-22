/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.modelSearch.controller.resultsComponent.ResultsPanelToolbarController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        view: {
            boxready: "onViewBoxReady"
        },

        resultsPageSizeCombobox: {
            select: 'onPageSizeChange'
        },
        resultsSortByCombobox: {
            select: 'onSortByChange'
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
        this.getView().queryById('results_listViewButton').toggle();
        this.getView().queryById('results_mapViewButton').toggle();
    },

    onViewBtnToggle:function()  {
        var listBtn = this.getView().queryById('results_listViewButton');
        var mapBtn = this.getView().queryById('results_mapViewButton');

        if(listBtn.pressed) {
            listBtn.setGlyph(61786);
            mapBtn.setGlyph(61746);
        } else  {
            listBtn.setGlyph(61746);
            mapBtn.setGlyph(61786);
        }
    },


    init: function () {
        return this.callParent(arguments);
    }

});
