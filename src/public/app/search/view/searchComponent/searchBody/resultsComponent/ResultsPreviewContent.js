/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPreviewContent', {
    extend: 'Ext.panel.Panel',
    controller: 'Savanna.search.controller.resultsComponent.ResultsPreviewContentController',
    alias: 'widget.search_resultspreviewcontent',
    header: false,
    requires: [

    ],
    overflowY:'auto',

    items:  [
        {
            xtype:'panel',
            itemId: 'previewcontent'
        }
    ],

    tbar: [
        {
            height: 54,
            layout: 'anchor',
            xtype: 'container',
            border: false,
            defaults: {
                anchor: '100%',
                height: 27
            },
            items : [
                {
                    xtype: 'toolbar',
                    width: 440,
                    border: false,
                    itemId: 'results_preview_nav_text',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Preview Results {currentIndex} of {totalResults}',
                            itemId: 'itemIndexAndTotalLabel'
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'prev',
                            itemId: 'previewPrevButton',
                            repeat  : true
                        },
                        {
                            xtype: 'button',
                            text: 'next',
                            itemId: 'previewNextButton',
                            repeat  : true
                        }
                    ]
                },{
                    xtype: 'toolbar',
                    width: 440,
                    border: false,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add to MyStuff'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: 'Open Result'
                        },
                        {
                            xtype: 'button',
                            text: 'Close',
                            itemId: 'previewclosebutton'
                        }
                    ]
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        this.getController();
        //Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
    },


    populate: function (record, index, totalResultsCount) {
        /*
        console.log(this);
        console.log(record);
        console.log('Preview index: ' + index);
        console.log('Total results count: ' + totalResultsCount);
        */

        if(record && record.title){
            var win = this.findParentByType('search_resultspreviewwindow');
            win.setTitle(record.title);
            //this.setTitle(record.title);
        }
        var label =  this.getComponent('itemIndexAndTotalLabel');
        if(label){
            label.text = 'Preview Results ' + index + ' of ' + totalResultsCount;
        }

    }

});