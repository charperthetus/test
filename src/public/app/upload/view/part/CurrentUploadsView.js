/* global Ext: false */
Ext.define('Savanna.upload.view.part.CurrentUploadsView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.upload_part_currentuploads',

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
                    type:'hbox'
                },
                defaults:{
                    margin:'0 20 0 0'
                },
                width:'100%',
                items:[{
                    xtype: 'label',
                    text: 'My Uploads'
                },{
                    xtype: 'label',
                    text: '@'
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
                store: Ext.create('Savanna.upload.store.UploadGridStore'),
                flex:1,
                width: '100%',
                columns: [{
                    text: ' ',
                    dataIndex: 'status',
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
                    dataIndex: 'fileName',
                    sortable: false,
                    hideable: false,
                    flex: 1
                },{
                    text: 'Size',
                    dataIndex: 'fileSize',
                    resizable:false,
                    sortable: false,
                    hideable: false,
                    width: 60,
                    renderer : function(val) {
                        return (val < 1000000) ? val/1000 + ' KB' : val/1000000 + ' MB'; //TODO: make these values right.
                    }
                },{
                    text: 'Progress',
                    dataIndex: 'progress',
                    sortable: false,
                    hideable: false,
                    flex: 2
                }]
            }
        ];
    }
});
