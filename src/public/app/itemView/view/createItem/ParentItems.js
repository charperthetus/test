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

    typeaheadDelay: 300,

    filtering: false,

    taInt: null,

    header: {
        xtype: 'header',
        cls: 'item-header-font',
        style: {
            "background": '#FFFFFF'
        }
    },

    layout: {
        type: 'card',
        align: 'stretch'
    },

    configs: {
        typeaheadStore: null
    },

    constructor: function (configs) {
        this.callParent(arguments);
        this.initConfig(configs);
    },

    initComponent: function () {

        var me = this;

        Ext.Ajax.request({
            url: SavannaConfig.itemViewPerspective + ';jsessionid=' + Savanna.jsessionid,
            method: 'GET',
            cors: true,
            headers: {
                'Accept': 'application/json'
            },
            disableCaching: false,
            proxy: {
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json'
                }
            },
            success: function (response) {

                /*
                add the tree panel with the root id passed from the server
                 */
                me.add(Ext.create('Savanna.itemView.view.createItem.ParentItemsTreePanel', {
                    itemId: 'parentitems_treepanel',
                    rootId: Ext.JSON.decode(response.responseText).results[0].id
                }));

                /*
                add the typeahead results panel
                 */
                me.add(Ext.create('Savanna.itemView.view.createItem.TypeAheadResults', {
                    itemId: 'parentitems_results',
                    store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                        urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/typeahead/',
                        paramsObj: { pageStart: 0, pageSize: 20, alphabetical: true, type: 'Item' }
                    })
                }));

            },

            failure: function (response) {
                Ext.Error.raise({
                    msg: 'Error getting root perspective id.'
                });
            }
        });

        this.callParent(arguments);
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
                    text: 'X',
                    itemId: 'clearParentItemsBtn'
                }
            ]
        }
    ]
});

