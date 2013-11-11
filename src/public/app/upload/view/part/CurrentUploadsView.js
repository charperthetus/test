/* global Ext: false */
Ext.define('Savanna.upload.view.part.CurrentUploadsView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.upload_part_currentuploads',
    itemId: 'currentUploadsView',

    requires: [
        'Savanna.upload.store.UploadGridStore',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox'
    ],

    layout: {
        type: 'vbox'
    },

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype:'panel',
                layout:{
                    type: 'hbox',
                    pack: 'center'
                },
                defaults:{
                    margin:'0 20 0 0'
                },
                width:'100%',
                items:[{
                    xtype: 'label',
                    text: 'My Uploads',
                    style: 'line-height:37px;',
                    width: 115,
                    cls: ['h1', 'dark']
                },{
                    xtype: 'label',
                    itemId: 'uploadProgressLabel',
                    minWidth: 330,
                    style: 'line-height:40px;text-align:center'
                },{
                    xtype:'tbfill'
                },{
                    xtype: 'button',
                    itemId: 'clearFinishedButton',
                    width: 100,
                    text:'Clear Completed',
                    height: 40,
                    margin:'0 0 0 0'
                }]
            }
            ,
            {
                xtype: 'grid',
                itemId: 'uploadsDataGrid',
                store: Ext.create('Savanna.upload.store.UploadGridStore'),
                flex:1,
                width: '100%',
                borderWidth: 0,
                viewConfig: {
                    preserveScrollOnRefresh: true,
                    getRowClass: function(record, rowIndex, rowParams, store){
                        return 'uploadGridRow';
                    }
                },
                columns: [{
                    text: ' ',
                    dataIndex: 'status',
                    borderWidth: 0,
                    sortable: false,
                    align:'center',
                    resizable:false,
                    hideable: false,
                    width: 36,
                    renderer : function(val) {


                        if (val === 'completed') {
                            return '<div class="icon-success">' + '</div>';
                        } else if (val === 'pending') {
                            return '<div class="icon-pending">' + '</div>';
                        } else if (val === 'failed') {
                            return '<div class="icon-alert">' + '</div>';
                        } else {
                            return val;
                        }
                    }

                },{
                    text: 'File Name',
                    borderWidth: 0,
                    dataIndex: 'fileName',
                    sortable: false,
                    hideable: false,
                    flex: 1
                },{
                    text: 'Size',
                    borderWidth: 0,
                    dataIndex: 'fileSize',
                    resizable:false,
                    sortable: false,
                    hideable: false,
                    width: 60,
                    renderer : Savanna.upload.controller.UploadController.formatFileSize
                },{
                    text: 'Classification',
                    borderWidth: 0,
                    dataIndex: 'classification',
                    resizable: false,
                    sortable: false,
                    hideable: false,
                    flex: 1,
                    renderer: function(value, metadata) {
                        var background, color;
                        switch(value) {
                            case 'TOP SECRET':
                                background = "#FFFA53";
                                color = "#000000";
                                break;
                            case 'SECRET':
                                background = "#ED1C24";
                                color = "#FFFFFF";
                            case 'CONFIDENTIAL':
                                background = "#235FAC";
                                color = "#FFFFFF";
                            case 'UNCLASSIFIED':
                                background = "#4CB748";
                                color = "#FFFFFF";
                            default:
                                background = "#878787";
                                color = "#FFFFFF";
                                break;
                        }
                        metaData.style = 'background-color:' + background +
                                         ';color:' + color +
                                         ';text-align:center;';
                        return value;
                    }
                },{
                    text: 'Progress',
                    borderWidth: 0,
                    dataIndex: 'progress',
                    sortable: false,
                    hideable: false,
                    flex: 2
                }]
            }
        ];
    }
});
