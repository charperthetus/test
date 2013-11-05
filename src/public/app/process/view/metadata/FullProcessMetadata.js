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

    requires: [
        'Savanna.process.controller.FullProcessMetadataController',
        'Savanna.itemView.view.imageBrowser.ImagesGridEdit',
        'Savanna.sources.view.Sources'
    ],

    controller: 'Savanna.process.controller.FullProcessMetadataController',

    overflowY: 'auto',

    items: [
        {
            xtype: 'textfield',
            value: 'Process Title',
            itemId: 'processTitle',
            enableKeyEvents: true
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Process Description',
            labelAlign: 'top',
            itemId: 'processDescription',
            width: '100%',
            enableKeyEvents: true
        },
        {
            xtype: 'itemview_imagesgrid_edit',
            itemId: 'imageBrowser',
            header: false
        },
        {
            xtype: 'metadata_details',
            collapsible: true,
            title: 'Metadata',
            itemId: 'detailsPanel'
        },
        {
            xtype: 'document_sources',
            editMode: true,
            itemId: 'sourcesPanel',
            itemURI: 'xx%2FItem'
        }
    ]
});