/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:11 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.FullProcessMetadata', {
    extend: 'Ext.container.Container',
    alias: 'widget.full_process_metadata',

    requires: [
        'Savanna.process.controller.FullProcessMetadataController',
        'Savanna.itemView.view.imageBrowser.ImagesGridEdit',
        'Savanna.sources.view.Sources',
        'Savanna.metadata.view.part.InformationPanel',
        'Ext.form.Panel'
    ],

    controller: 'Savanna.process.controller.FullProcessMetadataController',

    overflowY: 'auto',

    ui: 'off-white',
    cls:['white-grid-view-panel-edit', 'item-view-column'],
    
    items: [
        {
            xtype: 'form',
            collapsible: true,
            title: 'Process Summary',
            ui: 'off-white',
            defaults: {
                padding: '0 5',
            },
            items: [
                {
                    fieldLabel: 'Title',
                    labelAlign: 'left',
                    labelWidth: 30,
                    xtype: 'textfield',
                    itemId: 'processTitle',
                    enableKeyEvents: true
                },
                {
                    xtype: 'fieldset',
                    layout: 'hbox',
                    width: '100%',
                    title: 'Category',
                    border: false,
                    items: [
                        {
                            xtype: 'label',
                            itemId: 'categoryValue',
                            text: 'Uncategorized',
                            width: '90%'
                        },
                        {
                            xtype: 'button',
                            itemId: 'categoryChooserButton',
                            glyph: 'searchBinoculars',
                            margin: '10 0 0 0'
                        }
                    ]
                },

                {
                    xtype: 'textarea',
                    fieldLabel: 'Description',
                    labelAlign: 'top',
                    itemId: 'processDescription',
                    width: '97%',
                    enableKeyEvents: true
                },

                {
                    xtype: 'itemview_imagesgrid_edit',
                    itemId: 'imageBrowser',
                    header: false
                }
            ]
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