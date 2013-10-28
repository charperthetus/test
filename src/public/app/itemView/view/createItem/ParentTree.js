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
        'Savanna.components.autoComplete.AutoComplete',
        'Savanna.itemView.controller.ParentTreeController'
    ],

    controller: 'Savanna.itemView.controller.ParentTreeController',

    title: 'Item Types',

    items:[],

    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {

        var parentsArray = [];

        Ext.each(this.store.data.items, function(item)  {
            parentsArray.push({text: item.raw.label});
        });

        var store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: parentsArray
            }
        });

        var content = [
            {
                xtype: 'treepanel',
                itemId:'parentitems_treepanel',
                titleCollapse: true,
                width: '100%',
                height:400,
                forceFit:true,
                store: store,
                rootVisible: false
            }

        ];
        return content;
    },
    tbar:   [
        {
            xtype:'auto_complete',
            itemId:'parenttype_autocomplete',
            width:'100%'
        }
    ]
});

