/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/25/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.ParentTreeController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.createItem.ParentTree'
    ],

    control:    {
        parentitems_treepanel: {
            celldblclick: 'onItemDoubleClick',
            cellclick: 'onItemClick'
        }
    },

    onItemDoubleClick:function()    {
        Savanna.app.fireEvent('itemview:treepanel:itemdblclick', view, td, cellIndex, record, tr, rowIndex, e, eOpts);
    },

    onItemClick:function(view, td, cellIndex, record, tr, rowIndex, e, eOpts)    {
        Savanna.app.fireEvent('itemview:treepanel:itemclick', view, td, cellIndex, record, tr, rowIndex, e, eOpts);
    }
});

