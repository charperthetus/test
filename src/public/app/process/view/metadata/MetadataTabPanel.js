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
        'Savanna.process.view.metadata.FullProcessSidePanel',
        'Savanna.process.view.metadata.ProcessStepSidePanel',
        'Savanna.process.view.metadata.ProcessItemSidePanel'
    ],
    header: {
        ui: 'dark'
    },
    controller: 'Savanna.process.controller.MetadataController',

    config: {
//        itemUri: ''
    },

//    updateItemUri: function(newUri, oldUri) {
//        if(newUri !== oldUri) {
//            this.fireEvent('uriChange', newUri);
//        }
//    },

    enableTabScroll: true,
    items: [
        {
            title:'Details',
            xtype: 'tabpanel',
            itemId:'hiddenTabPanel',
            width:'100%',
            height:'100%',
            items: [
                {
                    xtype: 'full_process_metadata',
                    itemId: 'processMetadata'
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