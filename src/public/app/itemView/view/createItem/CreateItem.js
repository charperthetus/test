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
        'Savanna.itemView.controller.CreateItemController',
        'Savanna.itemView.store.ParentItemStore'
    ],

    store: 'Savanna.itemView.store.ParentItemStore',

    controller: 'Savanna.itemView.controller.CreateItemController',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    title: 'Create Item',

    autoShow: true,

    layout: 'hbox',

    selectedParentUri: null,

    items:[],

    onStoreLoad:function()  {


        this.add(
            Ext.create('Savanna.itemView.view.createItem.ParentItems', {
                itemId:'create_leftPanel',
                store:this.store,
                flex:1
            })
        );

        this.add(
            Ext.create('Savanna.itemView.view.createItem.ParentDetails', {
                itemId:'create_rightPanel',
                store:this.store,
                flex:2
            })
        );



    },

    initComponent: function () {

        this.buttons = this.setupButtons();

        this.mixins.storeable.initStore.call(this);

        this.store.load();

        this.callParent(arguments);
    },

    setupButtons:function() {
        var btns = [
            {
                text: 'OK',
                listeners: {
                    'click': this.onParentItemCommit
                }
            },
            {
                text: 'CANCEL',
                listeners: {
                    'click': this.onParentItemCancel
                }
            }
        ];
        return btns;
    },

    onParentItemCommit:function()   {

        if(this.up('itemview_create_item').selectedParentUri)  {
            var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                title: 'Model Item',
                itemUri: this.up('itemview_create_item').selectedParentUri,
                editMode: true,
                createMode:true,
                closable: true,
                autoScroll: true,
                tabConfig: {
                    ui: 'dark'
                }
            });
            Savanna.app.fireEvent('search:itemSelected', itemView);
        }   else    {
            console.log('no uri for parent item');
        }


        this.up('itemview_create_item').close();
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {

    },

    onParentItemCancel:function()   {
        this.up('itemview_create_item').close();
    }
});
