/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/17/13
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemQualities.ViewItemQualities', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.itemview_view_qualities',

    store: null,

    title: 'Qualities (#)',

    hideHeaders: true,

    style: {
        'overflowY' : 'hidden !important'
    },

    /*
     *  Addresses an issue in the ExtJS framework where height
     *  isn't being properly set.
     */
    listeners: {
        reconfigure: 'recalculateHeight'
    },

    columns: [
        {
            xtype: 'templatecolumn',
            dataIndex: 'label',
            tpl: '<b>{label}</b>',
            flex: 1,
            sortable: false
        },
        {
            xtype: 'templatecolumn',
            dataIndex: 'values',
            flex: 2,
            sortable: false,
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for="values" between=",&nbsp;&nbsp;">',
                    '{label}',
                '</tpl>')
        }
    ],

    recalculateHeight: function() {
        if( this.getEl().dom.lastChild.lastChild.clientHeight !== 0) {
            this.setHeight(this.getEl().dom.lastChild.lastChild.clientHeight + 30);                
        }
    }
});