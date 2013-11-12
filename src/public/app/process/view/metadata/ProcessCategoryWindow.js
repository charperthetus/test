/**
 * Created with IntelliJ IDEA.
 * Date: 10/24/13
 * Time: 3:26 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.ProcessCategoryWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.process_category_window',

    requires: [
        'Savanna.process.view.metadata.ProcessCategoryPanel',
        'Savanna.process.controller.ProcessCategoryWindowController'
    ],

    controller: 'Savanna.process.controller.ProcessCategoryWindowController',

    title: 'Process Category',

    autoShow: true,

    layout: 'hbox',

    selectedCategoryUri: null,

    selectedCategoryLabel: null,

    ghost: false,

    items: [],

    viewer: null,

    initComponent: function () {
        var me = this;

        Ext.Ajax.request({
            url: SavannaConfig.processCategoryPerspective + ';jsessionid=' + Savanna.jsessionid,
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
                me.add(Ext.create('Savanna.process.view.metadata.ProcessCategoryPanel', {
                    itemId: 'processCategoryPanel',
                    rootId: Ext.JSON.decode(response.responseText).results[0].id
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
