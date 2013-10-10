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
        'Ext.grid.column.Template',
        'Ext.XTemplate'
    ],

    sortableColumns: false,

    columns: [
        {
            text: ' ',
            xtype: 'templatecolumn',
            tpl: new Ext.XTemplate(

                '<div style="position: relative" >',
                '<div id="hoverDiv" style="visibility: hidden; right: 0;  top: 5; position: absolute;" ><button class="openButtonClass">Open</button></div>',
                '<table>',
                '<tr><td colspan="2" class="grid-cell-title"><strong>{title}</strong></td></tr>',
                '<td><img src="{documentSource}" width="80px" height="60px" /></td>',
                '<td>({composite}) - {[this.parseDate(new Date(values.publishedDate))]} - {documentFileName}<br />{previewString}</td>',
                '</table>',
                '</div>',
                {
                    parseDate: function (v) {
                        return Ext.Date.format(new Date(v), 'F d, Y');
                    }

                }
            )
        }
    ],

    header: false,
    forceFit: true,

    initComponent: function () {
        this.callParent(arguments);
    }
});