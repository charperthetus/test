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

    constrain: true,

    autoShow: true,

    layout: 'hbox',

    selectedParentUri: null,

    selectedParentLabel: null,

    ghost: false,

    items: [],

    creating: true,

    viewer: null,

    setupItems: function () {
        var content = [
            {
                xtype: 'itemview_parenttree',
                itemId: 'parentItemsTreePanel',
                cls: 'create-item-coloumn',
                width: 300
            },
            {
                xtype: 'itemview_parentdetails',
                itemId: 'parentItemsDetailsPanel',
                cls: 'create-item-coloumn',
                flex: 1
            }
        ];

        return content;
    },

    initComponent: function () {

        this.items = this.setupItems();

        this.dockedItems = this.setupDockedItems();

        this.callParent(arguments);
    },

    setupDockedItems: function () {

        return [
            {
                xtype: 'toolbar',

                dock: 'top',
                itemId: 'createItemDockedItemsTop',
                items: [
                    {
                        xtype: 'label',
                        width: '100%',
                        padding:10,
                        html: 'Select an Item type that best represents the kind of Item you want to create. The new Item will inherit the qualities and relationships of the selected type.'
                    }
                ]
            }
        ];
    },

    buttons: [

        {
            text: 'OK',
            itemId: 'commitBtn',
            ui: 'commit',
            margin: '0 0 10 0'
        },
        {
            text: 'Cancel',
            itemId: 'cancelBtn'
        }
    ]
});
