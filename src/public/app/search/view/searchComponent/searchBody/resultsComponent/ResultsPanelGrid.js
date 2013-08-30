/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/8/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPanelGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.search_resultspanelgrid',

    requires: [
        'Ext.grid.column.Template'
    ],

    columns: [
        {
            text: ' ',
            xtype:'templatecolumn',
            tpl:    [
                '<b>{title}</b><br />',
                '<tpl if="this.isEmpty(documentSource)">',
                '<br />',
                '<tpl else>',
                '<img src="{documentSource}" width="80px" height="60px" /><br />',
                '</tpl>',
                '{documnentFileName}<br />',
                '{previewString}<br /><br />'
            ]
        }
    ],

    header:false,
    forceFit: true,

    initComponent: function () {
        this.callParent(arguments);
    }
});
