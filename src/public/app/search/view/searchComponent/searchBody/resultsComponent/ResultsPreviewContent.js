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
    bubbleEvents: ['search:previewNextButton', 'search:previewPrevButton'],

    currentRecord: null,

    requires: [
        'Savanna.search.controller.resultsComponent.ResultsPreviewContentController'
    ],

    overflowY: 'auto',

    items: [
        {
            xtype: 'panel',
            itemId: 'previewcontent',
            html: ''
        }
    ],

    tbar: [
        {
            width: '100%',
            height: 54,
            xtype: 'container',
            border: false,
            items: [
                {
                    width: '100%',
                    xtype: 'toolbar',
                    border: false,
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Open',
                            itemId: 'openResult'
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

    isVisibleValue: function (value) {
        if(null == value){
            return false;
        }
        if( typeof value == "String"){
            return value.length > 0; //later trim first
        }
        return true;
    } ,

    formatItemValue: function (item ){
        var value = item.data.value;

        //HANDLE DATES
        if (item.data.key.toLowerCase().indexOf('date') !== -1) {
            value = Ext.Date.format(new Date(value), 'F d, Y');
            return value;
        }

        //HANDLE ARRAYS (this only handles string arrays there may be other types).
        if (item.data.type.toLowerCase().indexOf('array') !== -1) {
            var arrayVal = "";
            Ext.each( value, function( val ){
                arrayVal += val;
            } );
            return arrayVal;
        }

        return value;
    },

    conditionallyRenderImage: function (url) {
        if (url && url.length > 0) {
            return '<div  style="background-image: url(\'' + url + '\');width:200px;height:100px;background-position:center;background-size:cover;left: 1;top: 1;" ></div>';
        }
        return '';
    },

    populate: function (record, metadata, index, totalResultsCount) {
        this.currentRecord = record;

        var    metaHTML = "<b>" + record.title + "</b>";
        metaHTML +=  this.conditionallyRenderImage(record.documentSource);
        var row;

        metaHTML +=  '<table>';

        var primaryKeys = [
            'docTitle',
            'uri_DEBUG',
            'classification',
            'authors',
            'abstract',
            'document-description',
            'published-date',
            'publisher',
            'pubName',
            'producer',
            'producer-category',
            'distributor',
            'document-organization',
            'document-language',
            'document-country',
            'pageCount',
            'ingest-date',
            'modifiedDate',
            'document-original-name',
            'document-type',
            'retrieval-url',
            'relatedDocs',
            'document_comments',
            'ingest-state',
            'keyCitationPlain',
            'keyCitationHtml'
        ];

        var added = {};
        var value;
        /*
         primary attributes display first
         */
        var me = this;
        Ext.each(primaryKeys, function (key) {
            Ext.each(metadata.data.items, function (item) {
                value = me.formatItemValue(item);

                if (item.data.key === key) {
                    if(key === 'docTitle')    {
                       // we handled this above...
                       row = ''; //'<tr style="line-height: 1.2"><td colspan="2" class="doctitle-meta-value">' + value + '</td></tr>';
                    } else  {
                        row = '<tr>' +
                            '<td class="meta-displaylabel" style="width: 100px">' + item.data.displayLabel + '</td>' +
                            '<td class="meta-value">' + value + '</td>' +
                        '</tr>';
                    }
                    if( me.isVisibleValue(value) ){
                        metaHTML += row;
                        added[item.data.key] = item.data.value;
                    }

                }
            });
        });

        /*
         other dynamic attributes display below the primary attributes
         */
        Ext.each(metadata.data.items, function (item) {
            value = me.formatItemValue(item);
            if (!added[item.data.key]) {
                if (item.data.key.toLowerCase().indexOf('date') !== -1) {
                    value = Ext.Date.format(new Date(value), 'F d, Y');
                }
                row = '<tr>' +
                    '<td class="meta-displaylabel">' + item.data.displayLabel + '</td>' +
                    '<td class="meta-value">' + value + '</td>' +
                    "</td>" +
                '</tr>';
                if(me.isVisibleValue(value)){
                    metaHTML += row;
                }
            }
        });

        metaHTML += '</table>';

        this.queryById('previewcontent').update(metaHTML);

        //check is only for unit testing
        if(this.ownerCt){
            this.ownerCt.setTitle ( 'Preview Result ' + (index + 1) + ' of ' + totalResultsCount );
        }

    }
});