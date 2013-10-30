/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPreviewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.model_search_resultspreviewwindow',
    requires: [
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsPreviewContent'
    ],
    layout: 'fit',
    floating: true,
        hideCollapseTool: true,
    closeAction: 'hide',
    width:640,
    height:500,
    header:true,
    items: [
        {
            xtype: 'model_search_resultspreviewcontent',
            itemId: 'resultspreviewcontent'
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ResultsComponent');
    },

    displayPreview:function(record, metadata, index, totalCount)   {
        if(metadata.data)    {
            this.show();
            this.queryById('resultspreviewcontent').populate(record, metadata, index, totalCount);
        }   else    {
            Ext.Error.raise({
                msg: 'No document metadata to display.'
            });
        }
    }
});
