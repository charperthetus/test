/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:55 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.header.ItemUse', {
    extend: 'Ext.Component',

    alias: 'widget.itemview_use',

    margin: 10,

    width: '100%',

    layout: 'vbox',

    items: [
        {
            xtype: 'label',
            text: 'Intended Use'
        },
        {
            xtype: 'textfield',
            width: '100%'
        },
        {
            xtype: 'container',
            layout: 'column',
            width: '100%',
            items: [
                {
                    xtype: 'button',
                    text: 'button 1'
                },
                {
                    xtype: 'button',
                    text: 'button 2'
                },
                {
                    xtype: 'button',
                    text: 'button 3'
                },
                {
                    xtype: 'button',
                    text: 'button 4'
                },
                {
                    xtype: 'button',
                    text: 'button 5'
                },
                {
                    xtype: 'button',
                    text: 'button 6'
                },
                {
                    xtype: 'button',
                    text: 'button 7'
                }
            ]
        }
    ]
});
