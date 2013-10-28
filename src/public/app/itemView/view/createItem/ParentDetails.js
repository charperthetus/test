/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/26/13
 * Time: 9:55 AM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 3:26 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.createItem.ParentDetails', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_parentdetails',

    requires: [
        'Ext.Img'
    ],

    title: 'Selection',

    layout: 'hbox',

    items: [],

    initComponent: function () {
        this.items = this.setupItems();

        this.callParent(arguments);

        Savanna.app.on('itemview:treepanel:itemclick', this.onTreeItemClick, this);
        Savanna.app.on('itemview:treepanel:itemdblclick', this.onTreeItemDblClick, this);
    },

    onTreeItemClick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        this.queryById('item_title').setText(this.store.getAt(rowIndex).raw.label);
        this.queryById('item_imagethumbnail').setSrc(this.store.getAt(rowIndex).raw.primaryImageUrl);
        this.queryById('parentdetails_textpanel').update(this.store.getAt(rowIndex).raw);
    },

    onTreeItemDblClick: function () {
        console.log(arguments);
    },

    setupItems: function () {

        var content = [
            {
                xtype: 'image',
                itemId: 'item_imagethumbnail',
                flex: 1,
                height: 300
            },
            {
                xtype: 'panel',
                itemId: 'parentdetails_textpanel',
                flex: 2,
                padding:    {
                    left:10
                },
                height:'100%',
                tpl: Ext.create('Ext.XTemplate',
                    '<b>{label}</b>'
                )
            }

        ];
        return content;
    },

    tbar: [
        {
            xtype: 'tbtext',
            itemId: 'item_title',
            text: ''
        }
    ]
});

