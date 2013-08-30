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
            xtype: 'templatecolumn',
            tpl: [
                '<table>',
                '<tr><td colspan="2"><b>{title}</b></td></tr>',
                '<td><img src="{documentSource}" width="80px" height="60px" /></td>',
                '<td>({composite}) - {publishedDate} - {documentFileName}<br />{previewString}</td>',
                '</table>',
                {
                    parseDate: function (v) {
                        console.log(v); //epoch
                        console.log(Ext.Date.format(new Date(v), 'Y-m-d')); //show 2012-09-13
                        return Ext.Date.format(new Date(v), 'Y-m-d');
                    }
                }
            ]
        }
    ],

    header: false,
    forceFit: true,

    initComponent: function () {
        this.callParent(arguments);
    }
});
