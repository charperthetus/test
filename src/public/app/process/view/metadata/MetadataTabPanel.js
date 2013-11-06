/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.metadata.MetadataTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.process_metadata',

    requires: [
        'Ext.tab.Panel',
        'Savanna.metadata.view.Details',
        'Savanna.process.controller.MetadataController',
        'Savanna.process.view.metadata.FullProcessMetadata',
        'Savanna.process.view.metadata.ProcessStepMetadata',
        'Savanna.process.view.metadata.ProcessItemMetadata'
    ],
    header: {
        ui: 'light'
    },
    controller: 'Savanna.process.controller.MetadataController',

    config: {
    },

    enableTabScroll: true,
    items: [
        {
            title:'Details',
            xtype: 'panel',
            layout: 'card',
            itemId:'hiddenPanel',
            width:'100%',
            height:'100%',
            items: [
                {
                    xtype: 'label',
                    itemId: 'nothingHereLabel',
                    text: 'No Process information available'
                },
                {
                    xtype: 'full_process_metadata',
                    itemId: 'fullProcessMetadata'
                },
                {
                    xtype: 'process_step_metadata',
                    itemId: 'stepMetadata'
                },
                {
                    xtype: 'process_item_metadata',
                    itemId: 'itemMetadata'
                }
            ]
        },
        { title: 'JSON',
            xtype:'panel',
            layout:'vbox',
            items: [
                {
                    xtype:'panel',
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Load',
                            itemId: 'loadJSON'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            itemId: 'saveJSON'
                        },
                        {
                            xtype: 'button',
                            text: 'Clear',
                            itemId: 'clearJSON'
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    itemId: 'JSONtextarea',
                    grow: true,
                    width: '100%',
                    maxHeight: '100%'
                }
            ]
        }
    ]
});