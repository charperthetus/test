/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/7/13
 * Time: 10:10 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.relatedProcesses.RelatedProcesses', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.itemview_related_processes',

    store: 'Savanna.itemView.store.MainItemStore',

    title: 'Participated in Process (#)',

    listeners: {
        'itemclick': function( grid, record, item, index, e, eOpts) {
            if (e.target.id == "openProcess") {
                var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                    title: e.target.value,
                    itemUri: e.target.name,
                    closable: true,
                    autoScroll: true,
                    tabConfig: {
                        ui: 'dark'
                    }
                });

                Savanna.app.fireEvent('search:itemSelected', itemView);
            }
        }
    },
    cls:'item-view-panel',
    columns: [
        {
            xtype: 'templatecolumn',
            dataIndex: 'key',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for="key">',
                '<input type="button" name="{uri}" value="{label}" id="openProcess" />',
                '</tpl>'),
            flex: 1,
            sortable: false,
            text: "Process Name"
        },
        {
            xtype: 'templatecolumn',
            dataIndex: 'value',
            flex: 1,
            sortable: false,
            tpl: '',
            text: "Role",
            renderer: function(value, metaData, record, row, col, store, gridView) {
                return this.renderValues(value);
            }
        }
    ],

    renderValues: function(value) {
        var returnStr = '';
        Ext.each(value, function(val) {
            returnStr += val.label + ', ';
        });

        return returnStr.replace(/,\s$/, '');
    }
});