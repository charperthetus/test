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

    tbar: [],
    items: [],

    overview: null,

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
                tbar: [
                    {
                        xtype: 'process_toolbar',
                        height: 33
                    }
                ],
                items:[
                    {
                        xtype: 'process_canvas',
                        itemId: 'canvas',
                        width: '100%',
                        height: '100%'
                    },
                    {
                        xtype: 'process_palettewindow',
                        itemId: 'palette',
                        autoShow: true,
                        x: 15, //DI needs to position this window correctly
                        y: 15
                    }
                ]
            },
            {
                xtype: 'process_metadata',
                itemId: 'metadata',
                region: 'east',
                layout: 'fit',
                width: '30%', //todo: DI should apply the appropriate styling for the sidebar
                collapsible: true,
                headerPosition: 'left',
                collapseMode: 'header',
                split: true
            }
        ];
    }
});