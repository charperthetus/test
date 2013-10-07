/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsPreviewContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultspreviewcontent',
    header: false,
    requires: [

    ],
    overflowY: 'auto',

    items: [
        {
            xtype: 'panel',

            height:'100%',
            itemId: 'previewcontent',
            tpl: new Ext.XTemplate(
                '<table>',
                '<tr><td>{classification}</td></tr>',
                '<tr><td><b>{docTitle}</b></td></tr>',
                '<tr><td><b>Classification:</b><br>{classification}</td></tr>',
                '<tr><td><b>Authors:</b><br>{authors}</td></tr>',
                '<tr><td><b>Abstract:</b><br>{abstract}</td></tr>',
                '<tr><td><b>Description:</b><br>{description}</td></tr>',
                '<tr><td><b>Publication Date:</b><br>{published-date}</td></tr>',
                '<tr><td><b>Publisher:</b><br>{publisher}</td></tr>',
                '<tr><td><b>Publication Name:</b><br>{pubName}</td></tr>',
                '<tr><td><b>Producer:</b><br>{producer}</td></tr>',
                '<tr><td><b>Producer Category:</b><br>{producer-category}</td></tr>',
                '<tr><b>Source Organization:</b><br>{document-organization}</td></tr>',
                '<tr><td><b>Source Language:</b><br>{document-language}</td></tr>',
                '<tr><td><b>Source Country:</b><br>{document-country}</td></tr>',
                '<tr><td><b>Pages:</b><br>{pageCount}</td></tr>',
                '<tr><td><b>Ingest Date:</b><br>{ingest-date}</td></tr>',
                '<tr><td><b>Last Edited Date:</b><br>{modifiedDate}</td></tr>',
                '<tr><td><b>Original File Name:</b><br>{document-original-name}</td></tr>',
                '<tr><td><b>File Format:</b><br>{document-type}</td></tr>',
                '<tr><td><b>URL:</b><br>{retrieval-url}</td></tr>',
                '<tr><td><b>Related Content:</b><br>{relatedDocs}</td></tr>',
                '</table>'
            )
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
            items: [
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
                            repeat: true
                        },
                        {
                            xtype: 'button',
                            text: 'next',
                            itemId: 'previewNextButton',
                            repeat: true
                        }
                    ]
                },
                {
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
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
    },


    populate: function (record, metadata, index, totalResultsCount) {

        var capco = {'U':'UNCLASSIFIED'};

        var metadataObject = {};

        Ext.each(metadata.data.items, function(item)    {
            if(item.data.key.toLowerCase().indexOf('date') !== -1)  {
                metadataObject[item.data.key] = Ext.Date.format(new Date(item.data.value), 'F d, Y');
            }  else {
                metadataObject[item.data.key] = item.data.value;
            }
        });

        metadataObject.classification = capco[metadataObject.classification];

        this.queryById('previewcontent').update(metadataObject);

        if (record && record.title) {
            var win = this.findParentByType('search_resultspreviewwindow');
            win.setTitle(record.title);
        }
        var label = this.getComponent('itemIndexAndTotalLabel');
        if (label) {
            label.text = 'Preview Results ' + index + ' of ' + totalResultsCount;
        }

    }

});