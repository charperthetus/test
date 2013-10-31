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
    resizeHandles :'n s e w nw se sw',
    resizable: true,
    layout: {
        type: 'accordion',
        titleCollapse: true,
        multi: false //do we want to allow multiple sections open at the same time?
    },
    bodyStyle: {
        "background":'#F2F2F2'
    },
    header: {
        xtype: 'header',
        height: 20,
        style: {
            "background": '#5c5c5c'
        }
    },
    modal: false,
    closable: false,
    constrain: true, //limit this window to the parent container
    width: 200,

    // Spec says this should be 300px tall but there isn't enough content currently in to make this height look ok, so for now this is 290.
    height: 290,
    ghost: false,
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
                itemId: 'itemlist',
                header: {
                    xtype: 'header',
                    cls: 'process-header-font',
                    style: {
                        "background": '#F2F2F2',
                        "padding": '5px'
                    }
                },
                bodyStyle: {
                    "background": '#F2F2F2',
                    "padding": '10px'
                }
            },

            {
                xtype: 'process_actionlist',
                itemId: 'actionlist',
                header: {
                    xtype: 'header',
                    cls: 'process-header-font',
                    style: {
                        "background": '#F2F2F2',
                        "padding": '5px'
                    }
                },
                bodyStyle: {
                    "background": '#F2F2F2',
                    "padding": '10px'
                }
            }
        ];
    }

});