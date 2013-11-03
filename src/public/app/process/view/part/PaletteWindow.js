/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.PaletteWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.process_palettewindow',

    requires: [
        'Ext.layout.container.Accordion',
        'Savanna.process.view.part.ItemList',
        'Savanna.process.view.part.ActionList',
        'Savanna.process.controller.PaletteController'
    ],

    controller: 'Savanna.process.controller.PaletteController',

    layout: {
        type: 'accordion',
        titleCollapse: true,
        multi: false //do we want to allow multiple sections open at the same time?
    },
    modal: false,
    closable: false,
    constrain: true, //limit this window to the parent container
    width: 200,
    height: 300,
    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },
    
    floating: {
        shadow: false
    },

    setupItems: function() {
        return [
            {
                xtype: 'process_itemlist',
                itemId: 'itemList'
            },
            {
                xtype: 'process_actionlist',
                itemId: 'actionList'
            }
        ];
    }

});