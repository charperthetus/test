Ext.define('Savanna.itemView.controller.ViewHeaderController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.header.ViewHeader'
    ],
    control: {
        view: {
            itemclick: 'openParentItem'
        }
    },

    openParentItem: function( grid, record, item, index, e, eOpts) {
        if (e.target.id == "openParentItem") {
            this.getView().fireEvent('ItemView:OpenItem', e.target.value, e.target.name);
        }
    }
});