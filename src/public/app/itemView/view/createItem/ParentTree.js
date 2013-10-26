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

Ext.define('Savanna.itemView.view.createItem.ParentTree', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_parenttree',

    requires: [
        'Ext.data.TreeStore',
        'Ext.tree.Panel',
        'Savanna.components.autoComplete.AutoComplete'
    ],

    title: 'Item Types',

    items:[],

    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {

        var store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [
                    { text: "Yellow Palm Oil Container"}
                ]
            }
        });

        var content = [
            {
                xtype:'auto_complete',
                itemId:'parenttype_autocomplete',
                width:'100%'
            },
            {
                xtype: 'treepanel',
                title: 'Simple Tree',
                width: '100%',
                height: '100%',
                store: store,
                rootVisible: false
            }

        ];
        return content;
    }
});

