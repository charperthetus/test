/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:13 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.ProcessItemMetadata', {
    extend: 'Ext.form.Panel',
    alias: 'widget.process_item_metadata',

    requires: [
        'Savanna.process.controller.ProcessItemMetadataController',
        'Savanna.itemView.view.itemQualities.EditItemQualities'
    ],

    controller: 'Savanna.process.controller.ProcessItemMetadataController',

    overflowY: 'auto',

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    value: 'RNRM Item Name',
                    itemId: 'itemTitle'
                },
                {
                    xtype: 'button',
                    text: 'Open',
                    itemId: 'openBtn'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textarea',
                    text: 'Body Paragraph Closed.  Content far far away.',
                    itemId: 'itemDescription'
                },
                {
                    xtype: 'image',
                    itemId: 'itemPrimeImage',
                    alt: 'No Primary Image'
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
                    value: 'Individual Title',
                    itemId: 'itemInstanceTitle'
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
                }/*,
                {
                    xtype: 'textarea',
                    fieldLabel: 'Description',
                    labelAlign: 'top',
                    text: 'Far far away, behind the word mountains',
                    itemId: 'itemInstanceDescription'
                }*/
            ]
        },
        {
            xtype: 'itemview_edit_qualities',
            collapsible: true,
            title: 'Properties',
            itemId: 'itemQualities'
        }
    ]
});