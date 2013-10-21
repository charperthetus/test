/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.modelSearch.controller.resultsComponent.ResultsPanelToolbarController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        resultsPageSizeCombobox: {
            select: 'onPageSizeChange'
        },
        resultsSortByCombobox: {
            select: 'onSortByChange'
        }


    },


    onPageSizeChange: function (box, record, index) {
        this.getView().fireEvent("Search:PageSizeChanged", record[0].data.count);

    },

    onSortByChange: function (box, record, index) {
        this.getView().fireEvent("Search:SortByChanged", record);

    },


    init: function () {
        return this.callParent(arguments);
    }

});
