/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 8/15/13
 * Time: 10:37 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.FindLocation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_findLocation',

    requires: [
        'Savanna.controller.Factory'
    ],

    layout: 'fit',

    items: [
        {
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            itemId: 'searchLocationDockedItems',
            border: false,
            width: '100%',
            dock: 'top',
            layout: 'vbox',
            items: [
                {
                    xtype: 'label',
                    html: '53 Results'
                }
            ]
        }
    ]
});