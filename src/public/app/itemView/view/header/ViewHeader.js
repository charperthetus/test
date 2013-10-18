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

    columns: [
        {
            dataIndex: 'label',
            sortable: false
        },
        {
            xtype: 'templatecolumn',
            dataIndex: 'values',
            flex: 1,
            tpl: '',
            renderer: function(value, metaData, record, row, col, store, gridView) {
                return this.renderValues(value, record);
            },
            sortable: false
        }
    ],

    renderValues: function(value, record) {
        var returnStr = '';

        if (record.data.label == 'Parent') {
            returnStr = value[0].label;
        }
        else {
            Ext.each(value, function(val) {
                returnStr += val.value + ', ';
            });
        }

        return returnStr.replace(/,\s$/, '');
    }
});
