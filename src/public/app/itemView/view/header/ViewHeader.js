/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:14 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.header.ViewHeader', {
    extend: 'Ext.grid.Panel',

    require: ['Savanna.itemView.controller.ViewHeaderController'],

    alias: 'widget.itemview_view_header',

    title: 'Header',

    store: 'Savanna.itemView.store.MainItemStore',

    controller: 'Savanna.itemView.controller.ViewHeaderController',

    hideHeaders: true,

    columns: [
        {
            xtype: 'templatecolumn',
            dataIndex: 'values',
            itemId: 'headerColumn',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl if="label == \'Parent\'">',
                    '<b>{label}:&nbsp;&nbsp;</b>',
                    '<tpl for="values">',
                        '<input type="button" name="{value}" value="{label}" id="openParentItem" />',
                    '</tpl>',
                '<tpl elseif="label == \'Description\'">',
                    '<tpl for="values">',
                        '{value}',
                    '</tpl>',
                '<tpl else>',
                    '<b>{label}:&nbsp;&nbsp;</b>',
                    '<tpl for="values" between=",&nbsp;&nbsp;">',
                        '{value}',
                    '</tpl>',
                '</tpl>'),
            flex: 1,
            rowLines: false,
            sortable: false
        }
    ]
});
