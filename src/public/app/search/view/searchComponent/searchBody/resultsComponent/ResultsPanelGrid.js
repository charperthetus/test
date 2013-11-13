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
    controller: 'Savanna.search.controller.resultsComponent.ResultsPanelGridController',

    requires: [
        'Savanna.search.controller.resultsComponent.ResultsPanelGridController',
        'Ext.grid.plugin.DragDrop',
        'Ext.grid.column.Template',
        'Ext.XTemplate'
    ],

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    sortableColumns: false,

    columns: [
        {
            text: ' ',
            hideable: false, //No hide menu for a single column
            xtype: 'templatecolumn',
            tpl: new Ext.XTemplate(
                '<div style="position: relative" >',
                '<div class="resultDiv">',
                //Pulling thumbnails for this release
//                '{[this.getImgDiv(values)]}',
                '<div class="grid-cell-title"><strong>{title}</strong></div>',
                '<div class="contentDiv">({composite}) - {[this.parseDate(new Date(values.publishedDate))]} - {documentFileName}<br />{previewString}</div>',
                '</div>',
                '<div id="hoverDiv" class="x-btn-basic-small openButtonClass" style="visibility: hidden; right: 0;  top: 5; position: absolute;" >Open</div>',
                '</div>',
                {
                    parseDate: function (v) {
                        return Ext.Date.format(new Date(v), 'F d, Y');
                    },
                    getImgDiv: function(record){
                        if (record.contentType === 'Image'){
                            return '<div class="sourceDiv" ><img src="' + record.documentSource + '"/></div>';
                        }
                    }
                }
            )
        }
    ],

    viewConfig: {
        plugins: {
            dragGroup: 'SEARCH-ITEMS',
            ptype: 'gridviewdragdrop',
            enableDrop: false,
            enableDrag: true
        }
    },
    hideHeaders: true,
    header: false,
    forceFit: true

});