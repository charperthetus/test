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
                    '<div id="hoverDiv" class="x-btn-basic-small openButtonClass" style="visibility: hidden; right: 0;  top: 5; position: absolute; z-index: 5" >Open</div>',
                    '<div class="resultDiv">',
                        '<div class="sourceDiv"><img src="{documentSource}"/></div>',
                        '<div class="grid-cell-title"><strong>{title}</strong></div>',
                        '<div class="contentDiv">({composite}) - {[this.parseDate(new Date(values.publishedDate))]} - {documentFileName}<br />{previewString}</div>',
                    '</div>',
                '</div>',
                {
                    parseDate: function (v) {
                        return Ext.Date.format(new Date(v), 'F d, Y');
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