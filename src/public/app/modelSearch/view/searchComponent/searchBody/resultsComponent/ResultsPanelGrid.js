/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/8/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.model_search_resultspanelgrid',
    bubbleEvents: [
        'search:grid:itemdblclick',
        'search:grid:itemclick',
        'search:grid:itemmouseenter',
        'search:grid:itemmouseleave'
    ],
    controller: 'Savanna.modelSearch.controller.resultsComponent.ResultsPanelGridController',

    requires: [
        'Savanna.modelSearch.controller.resultsComponent.ResultsPanelGridController',
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
            hideable: false,
            hidden: false,
            text: ' ',
            xtype: 'templatecolumn',
            tpl: new Ext.XTemplate(
                '<div style="position: relative" >',
                '<div class="resultDiv">',
                '{[this.conditionallyRenderImage(values.primaryImageUrl)]}',
                '<div class="grid-cell-title"><strong>{label}</strong></div>',
                '<div class="contentDiv">',
                'Modified: {[this.formatDate(values.modifiedDate)]}<br>{preview}',

                // ,&nbsp;&nbsp;{modifiedBy}<br>'
                //      'Workflow state: {workflowState}&nbsp;&nbsp;Classification: {classification}',

                '</div>',
                '</div>{[this.conditionallyRenderOpenButton(values.type)]}',

                {
                    formatDate: function (dateTime) {
                        var dateValue = new Date(parseInt(dateTime, 10));
                        return Ext.Date.format(dateValue, 'F d, Y');
                    },

                    conditionallyRenderImage: function (url) {
                        if (url && url.length > 0) {
                            return '<div class="sourceDiv"><div style="background-image: url(\'' + url + '\');" ></div></div>';
                        }
                        return '<div class="no-image"></div>';
                    },

                    conditionallyRenderOpenButton: function (type) {
                        if (type === "Process" || type === "Item") {
                            return '<div id="hoverDiv" class="x-btn-basic-small openButtonClass" style="visibility: hidden; right: 0;  top: 5px; position: absolute;" >Open</div>';
                        }
                        return '';
                    }

                }
            )
        }
    ],

    viewConfig: {
        plugins: {
            dragGroup: 'RNRM-ITEMS',
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

        var controller = Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ResultsComponent'),
            component = this.findParentByType('model_search_resultscomponent'),
            metadataArray = [];

        if (component.currentResultSet) {

            Ext.each(component.currentResultSet.store.data.items, function (record) {
                metadataArray.push(record.get('uri'));
            });

            // We don't need metadata in this release.  Uncomment to get some.
            // controller.getDocumentMetadata(component.currentResultSet, metadataArray);
        }
    }
});
