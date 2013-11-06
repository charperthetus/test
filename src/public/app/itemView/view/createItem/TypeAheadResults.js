/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 11/5/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 *
 */

Ext.define('Savanna.itemView.view.createItem.TypeAheadResults', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.itemview_typeahead_results',

    store: null,

    hideHeaders: true,

    autoScroll: true,

    sortableColumns: false,

    columns: [

        {
            xtype: 'templatecolumn',
            dataIndex: 'values',
            flex: 2,
            sortable: false,
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '{label}',
                '</tpl>')
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
    }
});
