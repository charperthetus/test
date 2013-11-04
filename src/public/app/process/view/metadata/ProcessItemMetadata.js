/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:13 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.ProcessItemMetadata', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.process_item_metadata',

    overflowY: 'auto',

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    value: 'RNRM Item Name'
                },
                {
                    xtype: 'button',
                    label: 'Open'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textarea',
                    text: 'Body Paragraph Closed.  Content far far away.'
                },
                {
                    xtype: 'label',
                    text: 'Image'
                }
            ]
        },
        {
            xtype: 'panel',
            layout: 'vbox',
            border: 3,
            items: [
                {
                    xtype: 'textfield',
                    value: 'Individual Title'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Role',
                    labelAlign: 'top'
                },
                {
                    xtype: 'label',
                    text: 'Quantity'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield'
                        },
                        {
                            xtype: 'combo'
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Description',
                    labelAlign: 'top',
                    text: 'Far far away, behind the word mountains'
                }
            ]
        },
        {
            xtype: 'panel',
            collapsible: true,
            title: 'Properties'
        }
    ]
});