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
    bubbleEvents: [
        'search:grid:itemdblclick',
        'search:grid:itemclick',
        'search:grid:itemmouseenter',
        'search:grid:itemmouseleave'
    ],
    controller: 'Savanna.search.controller.resultsComponent.ResultsPanelGridController',

    requires: [
        'Savanna.search.controller.resultsComponent.ResultsPanelGridController',
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
                '<div id="hoverDiv" style="visibility: hidden; right: 0;  top: 5px; position: absolute;" ><button id="resultGridHoverOpenButton" class="openButtonClass">Open</button></div>',

                '<!-- column one -->',

                '<div style="float: left; height: 102px; width: 202px;outline: solid 1px #cccccc;" >',
                '{[this.conditionallyRenderImage(values.documentSource)]}',
                '</div>',

                '<!-- column two todo: leave room for open button, limit title to one line, military format date -->',
                '<div style="margin-left: 216px; line-height: 1.2" >',
                '<strong>{title}</strong>',
                 '<br>({composite}) - {[this.parseDate(new Date(values.publishedDate))]} - {documentFileName}<br />',
                '<div style="width: 100%;height: 50px;white-space: normal;line-break: normal" >{previewString}</div>',
                '</div>',
                '</div>',

                {
                    parseDate: function (v) {
                        return Ext.Date.format(new Date(v), 'F d, Y');
                    },

                    conditionallyRenderImage: function (url) {
                        if (url && url.length > 0) {
                            return '<div  style="background-image: url(\'' + url + '\');width:200px;height:100px;background-position:center;background-size:cover;left: 1;top: 1;" ></div>';
                        }
                        return '<div style="width: 100%; height: 100%;text-align:center;line-height: 100px;background-color:  #eeeeee;left: 1px;top: 1px;" >No Image</div>';
                    }

                }

            )
        }
    ],

    header: false,
    forceFit: true,

    initComponent: function () {
        this.callParent(arguments);
    },

    onStoreLoad: function () {

        var controller = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent'),
            component = this.findParentByType('search_resultscomponent'),
            metadataArray = [];

        if (component.currentResultSet) {

            Ext.each(component.currentResultSet.store.data.items, function (record) {
                metadataArray.push(record.get('uri'));
            });

            controller.getDocumentMetadata(component.currentResultSet, metadataArray);
        }
    }
});