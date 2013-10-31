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

Ext.define('Savanna.itemView.view.createItem.ParentItems', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_parenttree',

    requires: [
        'Ext.data.*',
        'Ext.tree.*',
        'Ext.grid.*',
        'Savanna.itemView.view.createItem.ParentItemsAutoComplete',
        'Savanna.itemView.view.createItem.ParentItemsTreePanel'
    ],

    title: 'Item Types',

    items: [],

    bodyPadding:8,

    layout: 'fit',

    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {

        var content = [
            {
                xtype:'itemview_treepanel',
                itemId:'parentitems_treepanel'
            }
        ];
        return content;
    },
    tbar: [
        {
            xtype: 'parentitems_auto_complete',
            itemId: 'parentItemAutoChooser',
            width: '100%',
            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/mockModelSearch/keyword/item',
                paramsObj: {
                    excludeUri:'asdf',
                    pageStart:0,
                    pageSize:500
                }
            })
        }
    ]
});

