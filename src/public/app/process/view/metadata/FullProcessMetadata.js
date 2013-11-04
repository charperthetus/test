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

    overflowY: 'auto',

    items: [
        {
            xtype: 'textfield',
            value: 'Process Title'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Process Description',
            labelAlign: 'top'
        },
        {
            xtype: 'label',
            text: 'image browser'
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Metadata'
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Sources'
        }
    ]
});