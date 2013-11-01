/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 3:26 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.createItem.CreateItem', {
    extend: 'Ext.window.Window',

    alias: 'widget.itemview_create_item',

    requires: [
        'Savanna.itemView.view.createItem.ParentDetails',
        'Savanna.itemView.view.createItem.ParentItems',
        'Savanna.itemView.controller.CreateItemController'
    ],

    controller: 'Savanna.itemView.controller.CreateItemController',

    title: 'Create Item',

    autoShow: true,

    layout: 'hbox',

    selectedParentUri: null,

    items:[],

    setupItems:function()  {
        var content = [
            {
                xtype: 'itemview_parenttree',
                itemId:'parentItemsTreePanel',
                flex:1
            },
            {
                xtype: 'itemview_parentdetails',
                itemId:'parentItemsDetailsPanel',
                flex:2
            }
        ];

        return content;
    },

    initComponent: function () {

        this.items = this.setupItems();

        this.buttons = this.setupButtons();

        this.callParent(arguments);
    },

    setupButtons:function() {
        var btns = [
            {
                text: 'OK',
                itemId: 'commitBtn'
            },
            {
                text: 'CANCEL',
                itemId:'cancelBtn'
            }
        ];
        return btns;
    }
});
