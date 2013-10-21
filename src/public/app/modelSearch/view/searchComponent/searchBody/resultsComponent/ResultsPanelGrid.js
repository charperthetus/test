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
                '<div id="hoverDiv" style="visibility: hidden; right: 0;  top: 5; position: absolute;" ><button class="openButtonClass">Open</button></div>',

                '<!-- column one -->',

                '<div style="float: left; height: 102px; width: 202px;outline: solid 1px #cccccc;" >',
                '{[this.conditionallyRenderImage(values.primaryImageUrl)]}',
                '</div>',

                '<!-- column two values.modifiedDate-->',
                '<div style="margin-left: 216px" >',
                '<b>{label}</b><br>Modified: {[this.formatDate(new Date(1382071008238))]},&nbsp;&nbsp;{modifiedBy}',
                '<br>Workflow state: {workflowState}&nbsp;&nbsp;Classification: {classification}',
                '<br>',
                '<div style="width: 100%;height: 70px;white-space: normal;line-break: normal" >{preview}</div>',
                '</div>',
                '</div>',

                {
                    formatDate: function (v) {
                        return Ext.Date.format(v, 'F d, Y');
                    },

                    conditionallyRenderImage: function (url) {
                        if(url && url.length > 0){
                            return '<div  style="background-image: url(\'' + url + '\');width:200px;height:100px;background-position:center;background-size:cover;left: 1;top: 1;" ></div>';
                        }
                        return '<div style="width: 100%; height: 100%;text-align:center;line-height: 100px;background-color:  #eeeeee;left: 1;top: 1;" >No Image</div>';
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

            controller.getDocumentMetadata(component.currentResultSet, metadataArray);
        }
    }
});
