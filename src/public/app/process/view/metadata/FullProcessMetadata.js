/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:11 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.FullProcessMetadata', {
    extend: 'Ext.form.Panel',
    alias: 'widget.full_process_metadata',

    layout: 'form',

    requires: [
        'Savanna.process.controller.FullProcessMetadataController',
        'Savanna.itemView.view.imageBrowser.ImagesGridEdit',
        'Savanna.sources.view.Sources',
        'Savanna.metadata.view.part.InformationPanel'
    ],

    controller: 'Savanna.process.controller.FullProcessMetadataController',

    overflowY: 'auto',

    ui: 'off-white',

    items: [
        {
            xtype: 'textfield',
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
            xtype: 'informationpanel',
            itemId: 'informationPanel',
            collapsible: true,
            region: 'center',
            split: true
        },

        {
            xtype: 'document_sources',
            editMode: true,
            itemId: 'itemSources',
            itemURI: 'xx%2FItem',
            header: {
                ui: 'off-white'
            },
            ui: 'off-white'
        }
    ]
});