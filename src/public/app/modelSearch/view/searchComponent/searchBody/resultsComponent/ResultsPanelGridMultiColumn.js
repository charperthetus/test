/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/8/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPanelGridMultiColumn', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.model_search_resultspanelgrid_multi_column',
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
        { text: "Type", dataIndex: 'type', sortable: false, xtype:'actioncolumn', hideable: false, width: 50,
            renderer: function (val, metadata, record) {
                if (val == "Item") {
                    this.items[0].icon = '../../resources/images/searchicon.png';
                } else {
                    this.items[0].icon = '../../resources/images/workspaceicon.png';
                }

                this.items[0].tooltip = val;
                return '';  //don't show any text.
            }
        },
        { text: 'Item Name',  dataIndex: 'label', flex: 1,  hideable: false },
        { text: 'Classification', dataIndex: 'classification', flex: 1,             hideable: false   },
        { text: 'Workflow state', dataIndex: 'workflowState', flex: 1,             hideable: false   },
        { text: 'Modified date', dataIndex: 'lastModifiedDate', flex: 1,           hideable: false,
            renderer: function (value, metaData, record, row, col, store, gridView) {
                var dateTime = parseInt(record.data.modifiedDate, 10);
                var dateValue = new Date(dateTime);
                if( isNaN(dateValue.getTime() ) ){
                    return "--";
                }
                return Ext.Date.format(dateValue, 'F d, Y');

            }

        },
        { text: 'Modified by', dataIndex: 'modifiedBy', flex: 1,      hideable: false   }
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
