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
            itemmouseleave: 'onMouseLeave',
            boxready: 'onBodyScroll'
        }
    },

    onItemDoubleClick: function (view, rec, node, index, e) {
        this.getView().fireEvent("search:grid:itemdblclick", view, rec, node, index, e);
    },

    onItemClick: function (view, rec, node, index, e) {

        this.getView().fireEvent("search:grid:itemclick", view, rec, node, index, e);
        //This is a work-around a Sencha bug.  A fix to the Sencha code would be better but more difficult.
        // This bug is described in SAV-6125... where records "jump around" when they are selected.
        // Records still jump a bit, but this restores them to be under the mouse.
        //If the dom element is out of sync, sync it up.
        var el = this.getView().view.getEl().dom;
        if(el.scrollTop != this.getView().currentScrollTop){
            el.scrollTop = this.getView().currentScrollTop;
        }
    },

    onMouseEnter: function (view, rec, node, index, e) {
        this.getView().fireEvent("search:grid:itemmouseenter", view, rec, node, index, e);
    },

    onMouseLeave: function (view, rec, node, index, e) {
        this.getView().fireEvent("search:grid:itemmouseleave", view, rec, node, index, e);

    },

    init: function () {
        return this.callParent(arguments);
    },

    //catch all the scroll events and store the top of the grid table.
    onBodyScroll:function(grid) {
        var me = this;
        grid.view.getEl().on('scroll', function(e, t) {
            me.getView().currentScrollTop = t.scrollTop;
        });
    }
});
