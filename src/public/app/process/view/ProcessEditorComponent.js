/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 10:16 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.ProcessEditorComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.process_component',

    requires: [
        'Ext.layout.container.Border',
        'Savanna.process.view.part.PaletteWindow',
        'Savanna.process.view.part.Toolbar',
        'Savanna.process.view.part.Canvas',
        'Savanna.process.view.part.MetadataTabPanel',
        'Savanna.process.controller.ProcessController'
    ],

    controller: 'Savanna.process.controller.ProcessController',

    layout: {
        type: 'border'
    },

    tbar: [
        {
            xtype: 'process_toolbar'
        }
    ],
    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype: 'panel',
                region: 'center',
                height: '100%',
                layout: {
                    type: 'absolute'
                },
                items:[
                    {
                        xtype: 'process_canvas',
                        itemId: 'canvas',
                        width: '100%',
                        height: '100%'
                    },
                    {
                        xtype: 'process_palettewindow',
                        autoShow: true,
                        x: 0 //DI needs to position this window correctly
                    }
                ]
            },
            {
                xtype: 'process_metadata', //todo - this should be refactored out for all savanna item components later
                itemId: 'metadata',
                region: 'east',
                layout: 'fit',
                width: '30%', //todo: DI should apply the appropriate styling for the sidebar
                collapsible: true,
                split: true
            }
        ];
    }
});