/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:14 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.header.ViewHeader', {
    extend: 'Ext.grid.Panel',

    requires: ['Savanna.itemView.controller.ViewHeaderController'],

    alias: 'widget.itemview_view_header',

    title: 'Header',

    store: null,

    controller: 'Savanna.itemView.controller.ViewHeaderController',

    hideHeaders: true,

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
            dataIndex: 'values',
            itemId: 'headerColumn',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl if="label == \'Type\'">',
                    '<b>{label}&nbsp;&nbsp;</b>',
                    '<tpl for="values">',
                        '<input type="button" name="{value}" value="{label}" id="openParentItem" />',
                    '</tpl>',
                '<tpl elseif="label == \'Description\'">',
                    '<b>{label}&nbsp;&nbsp</b>',
                    '<tpl for="values">',
                        '{value}',
                    '</tpl>',
                '<tpl else>',
                    '<b>{label}&nbsp;&nbsp;</b>',
                    '<tpl for="values" between=",&nbsp;&nbsp;">',
                        '{label}',
                    '</tpl>',
                '</tpl>'),
            flex: 1,
            rowLines: false,
            sortable: false
        }
    ],

    recalculateHeight: function() {
        if ( this.getEl().dom.lastChild.lastChild.firstChild && this.getEl().dom.lastChild.lastChild.firstChild.clientHeight !== 0) {
            var headerHeight = this.getEl().dom.firstChild.clientHeight,
                tableHeight = this.getEl().dom.lastChild.lastChild.firstChild.clientHeight;

            this.setHeight(headerHeight + tableHeight);                
        }
    }
});
