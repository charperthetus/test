/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/26/13
 * Time: 9:55 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.createItem.ParentItems', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_parenttree',

    controller: 'Savanna.itemView.controller.ParentItemsController',

    requires: [
        'Ext.data.*',
        'Ext.tree.*',
        'Ext.grid.*',
        'Savanna.itemView.controller.ParentItemsController',
        'Savanna.itemView.view.createItem.ParentItemsTreePanel',
        'Savanna.itemView.view.createItem.TypeAheadResults'
    ],

    title: 'Item Types',

    items: [],

    bodyPadding: 8,

    height: '100%',

    autoScroll: true,

    header: {
        xtype: 'header',
        cls: 'item-header-font',
        style: {
            "background": '#FFFFFF'
        }
    },

    layout: {
        type: 'card',
        align:'stretch'
    },

    configs: {
        typeaheadStore: null
    },

    constructor: function (configs) {
        this.callParent(arguments);
        this.initConfig(configs);
    },

    initComponent: function () {
        this.items = this.setupItems(this.typeaheadStore);
        this.callParent(arguments);
    },

    setupItems: function (typeaheadStore) {

        var content = [
            {
                xtype: 'itemview_treepanel',
                itemId: 'parentitems_treepanel'
            },
            {
                xtype: 'itemview_typeahead_results',
                itemId: 'parentitems_results',
                store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                    urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/typeahead/',
                    paramsObj: { pageStart: 0, pageSize: 20, alphabetical: true, type: 'Item' }
                })
            }
        ];
        return content;
    },
    tbar: [
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'filterParentItemsField',
                    flex: 1,
                    emptyText: 'Find a Parent Item',
                    enableKeyEvents: true
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    itemId: 'searchParentItemsBtn'
                },
                {
                    xtype: 'button',
                    text: 'X',
                    itemId: 'clearParentItemsBtn'
                }
            ]
        }
    ]
});

