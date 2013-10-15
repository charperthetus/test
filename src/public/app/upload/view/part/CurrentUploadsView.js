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
                    type: 'hbox'
                },
                defaults:{
                    margin:'0 20 0 0'
                },
                width:'100%',
                items:[{
                    xtype: 'label',
                    text: 'My Uploads',
                    cls: ['h1', 'dark']
                },{
                    xtype: 'label',
                    itemId: 'uploadProgressLabel'
                },{
                   xtype:'tbfill'
                },{
                    xtype: 'button',
                    itemId: 'clearFinishedButton',
                    width: 100,
                    text:'Clear Finished',
                    margin:'0 0 0 0'
                }]
            }
            ,
            {
                xtype: 'grid',
                itemId: 'uploadsDataGrid',
                border: false,
                ignoreHeaderBorderManagement: true,
                store: Ext.create('Savanna.upload.store.UploadGridStore'),
                flex:1,
                width: '100%',
                viewConfig: {
                    preserveScrollOnRefresh: true
                },
                columns: [{
                    text: ' ',
                    dataIndex: 'status',
                    borderWidth: 0,
                    sortable: false,
                    align:'center',
                    resizable:false,
                    hideable: false,
                    width: 75,
                    renderer : function(val) {
                        if (val > 0) {
                            return '<span style="color:' + '#73b51e' + '">' + val + '%</span>';
                        } else if (val < 0) {
                            return '<span style="color:' + '#cf4c35' + ';">' + val + '%</span>';
                        }
                        return val;
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
