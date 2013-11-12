/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.metadata.MetadataTabPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.process_metadata',

    requires: [
        'Savanna.process.controller.MetadataController',
        'Savanna.process.view.metadata.FullProcessMetadata',
        'Savanna.process.view.metadata.ProcessItemMetadata'
    ],

    controller: 'Savanna.process.controller.MetadataController',

    header: {
        ui: 'light-blue'
    },
    collapseMode : 'header',
    headerPosition: 'left',
    collapsedCls : 'light-blue',

    layout: 'fit',

    items: [
        {
            title:'Information',
            xtype: 'form',
            layout: 'card',
            itemId:'hiddenPanel',
            header: {
                ui: 'off-white'
            },
            ui: 'off-white',
            width:'100%',
            height:'100%',
            items: [
                {
                    xtype: 'label',
                    itemId: 'nothingHereLabel',
                    text: 'Loading Information'
                },
                {
                    xtype: 'full_process_metadata',
                    itemId: 'fullProcessMetadata'
                },
                {
                    xtype: 'process_item_metadata',
                    itemId: 'itemMetadata'
                }
            ]
        }
    ]
});