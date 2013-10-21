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
        },
        multiColumnGridView: {
            click: 'onMultiColumnGridViewClicked'
        },
        singleColumnGridView: {
            click: 'onSingleColumnGridViewClicked'
        }


    },



    onMultiColumnGridViewClicked: function (button) {
        button.pressed = true;
        this.getView().fireEvent("search:multiColumnGridView", button );
        this.getSingleColumnGridView().pressed = false;
    },

    onSingleColumnGridViewClicked: function (button) {
        button.pressed = true;
        this.getView().fireEvent("search:singleColumnGridView", button );
        this.getMultiColumnGridView().pressed = false;
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
