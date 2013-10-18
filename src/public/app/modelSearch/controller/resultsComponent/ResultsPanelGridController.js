/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.modelSearch.controller.resultsComponent.ResultsPanelGridController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        view: {
            itemdblclick: 'onItemDoubleClick',
            itemclick: 'onItemClick',
            itemmouseenter: 'onMouseEnter',
            itemmouseleave: 'onMouseLeave'
        }
    },


    onItemDoubleClick: function (view, rec, node, index, e) {
        this.getView().fireEvent("search:grid:itemdblclick", view, rec, node, index, e);

    },

    onItemClick: function (view, rec, node, index, e) {
        this.getView().fireEvent("search:grid:itemclick", view, rec, node, index, e);

    },

    onMouseEnter: function (view, rec, node, index, e) {
        this.getView().fireEvent("search:grid:itemmouseenter", view, rec, node, index, e);

    },

    onMouseLeave: function (view, rec, node, index, e) {
        this.getView().fireEvent("search:grid:itemmouseleave", view, rec, node, index, e);

    },




    init: function () {
        return this.callParent(arguments);
    }

});
