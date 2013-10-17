/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:14 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.header.EditHeader', {
    extend: 'Ext.Panel',

    alias: 'widget.itemview_edit_header',

    cls: 'itemview',

    layout: 'vbox',

    margin: 10,

    items: [
        {
            xtype: 'itemview_displaylabel',
            itemId: 'itemDisplayLabel'
        },
        {
            xtype: 'container',
            itemId: 'itemAlias',
            width: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'label',
                    text: 'Alias'
                },
                {
                    xtype: 'auto_complete_with_tags',
                    labelType: 'Click to add an Alias'
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'itemUse',
            width: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'label',
                    text: 'Intended Use'
                },
                {
                    xtype: 'auto_complete_with_tags',
                    labelType: 'Click to add an Intended Use'
                }
            ]
        },
        {
            xtype: 'textarea',
            itemId: 'itemDescription',
            name: 'description',
            fieldLabel: 'Description',
            value: 'Hello World.  This is an Rnrm Item Description',
            grow: false
        }
    ]
});
