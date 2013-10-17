/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:14 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.header.HeaderView', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.itemview_view_header',

    title: 'Header',

    store: 'Savanna.itemView.store.MainItemStore',

    parentItem: null,

    hideHeaders: true,

    columnTpl: Ext.create('Ext.XTemplate',
        '<tpl if="label == \"Parent\"">',
            '<b>{label}</b><p>{value[0].label}</p>',
        '<tpl else>',
            '<b>{label}</b>',
            '<tpl for="values">',
                '<p>{value}</p>',
            '</tpl>',
        '</tpl>'),

    columns: [
//        {
//            dataIndex: 'label',
//            sortable: false
//        },
        {
            xtype: 'templatecolumn',
            dataIndex: 'values',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl if="label == \'Parent\'">',
                    '<b>{label}&nbsp;&nbsp;</b>',
                    '<tpl for="values">',
                        '{label}',
                    '</tpl>',
                '<tpl elseif="label == \'Description\'">',
                    '<tpl for="values">',
                        '{value}',
                    '</tpl>',
                '<tpl else>',
                    '<b>{label}&nbsp;&nbsp;</b>',
                    '<tpl for="values">',
                        '{value},&nbsp;&nbsp;',
                    '</tpl>',
                '</tpl>'),
            flex: 1,
            rowLines: false,
//            renderer: function(value, metaData, record, row, col, store, gridView) {
//                return this.renderValues(value, record);
//            },
            sortable: false
        }
    ],

    renderValues: function(value, record) {
        var returnStr = '';

        if (record.data.label == 'Parent') {
            returnStr = record.data.label + '\t' + value[0].label;
        }
        else if (record.data.label == 'Description') {
            returnStr = value[0].value;
        }
        else {
            returnStr = record.data.label + "          ";

            Ext.each(value, function(val) {
                returnStr += val.value + ', ';
            });
        }

        return returnStr.replace(/,\s$/, '');
    }
});
