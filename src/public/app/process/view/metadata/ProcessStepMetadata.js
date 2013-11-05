/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:12 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.ProcessStepMetadata', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.process_step_metadata',

    controller: 'Savanna.process.controller.ProcessStepMetadataController',

    overflowY: 'auto',

    items: [
        {
            xtype: 'textfield',
            value: 'Step Title',
            itemId: 'stepTitle'
        },
        {
            xtype: 'label',
            text: 'Duration',
            itemId: 'durationLabel'
        },
        {
            xtype: 'label',
            text: '1h 15m',
            itemId: 'tempLabel'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Description',
            labelAlign: 'top',
            text: 'Far far away, behind the word mountains',
            itemId: 'stepDescription'
        },
        {
            xtype: 'itemview_imagesgrid_edit',
            header: false,
            itemId: 'stepImageBrowser'
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Actions',
            itemId: 'stepActions'
        }
    ]
});