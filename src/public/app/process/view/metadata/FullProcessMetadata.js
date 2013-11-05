/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:11 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.FullProcessMetadata', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.full_process_metadata',

    requires: ['Savanna.process.controller.FullProcessMetadataController'],

    controller: 'Savanna.process.controller.FullProcessMetadataController',

    overflowY: 'auto',

    items: [
        {
            xtype: 'textfield',
            value: 'Process Title',
            itemId: 'processTitle'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Process Description',
            labelAlign: 'top',
            itemId: 'processDescription'
        },
        {
            xtype: 'label',
            text: 'image browser',
            itemId: 'imageBrowser'
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Metadata',
            itemId: 'detailsPanel'
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Sources',
            itemId: 'sourcesPanel'
        }
    ]
});