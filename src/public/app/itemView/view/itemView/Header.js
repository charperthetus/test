/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:14 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.Header', {
    extend: 'Ext.Panel',

    alias: 'widget.itemview_header',

    require: [
        'Savanna.itemView.view.itemView.header.ItemDescription'
    ],

    cls: 'itemview',

    layout: 'vbox',

    items: [
        {
            xtype: 'itemview_displaylabel',
            itemId: 'itemDisplayLabel'
        },
        {
            xtype: 'itemview_alias',
            itemId: 'itemAlias'
        },
        {
            xtype: 'itemview_use',
            itemId: 'itemUse'
        },
        {
            xtype: 'itemview_description',
            itemId: 'itemDescription'
        }
    ]
});
