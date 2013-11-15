/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 10:16 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.ProcessEditorComponent', {
    extend: 'Savanna.component.ClassificationPanel',
    alias: 'widget.process_component',

    requires: [
        'Savanna.component.ClassificationPanel',
        'Ext.layout.container.Border',
        'Savanna.process.view.part.PaletteWindow',
        'Savanna.process.view.part.Toolbar',
        'Savanna.process.view.part.Canvas',
        'Savanna.process.view.metadata.MetadataTabPanel',
        'Savanna.process.controller.ProcessController'
    ],

    controller: 'Savanna.process.controller.ProcessController',

    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region: 'center',
            height: '100%',
            layout: 'absolute',
            tbar: {
                ui: 'thetus-toolbar',
                xtype: 'process_toolbar',
                height: 33
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
                    itemId: 'palette',
                    autoShow: true,
                    x: 15,
                    y: 15
                }
            ]
        },
        {
            xtype: 'process_metadata',
            itemId: 'processSidepanel',
            region: 'east',
            collapsible: true,
            headerPosition: 'left',
            collapseMode: 'header',
            overflowY: 'auto',
            autoScroll: true,
            split: true,
            height:'100%',
            width: '30%'
        }
    ]
});