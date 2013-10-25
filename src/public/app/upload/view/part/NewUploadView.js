/* global Ext: false */
Ext.define('Savanna.upload.view.part.NewUploadView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.upload_part_newupload',

    requires: [
        'Ext.layout.container.VBox',
        'Ext.form.field.FileButton',
        'Ext.form.field.File'
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
                xtype: 'label',
                text: 'Start New Upload',
                cls: ['dark', 'h1', 'align_top', 'align_bottom'],
                height: 35
            },
            {
                xtype: 'panel',
                alias:'widget.upload_part_newupload_filedropzone',
                itemId: 'fileDropZone',
                ui: 'dropzone',
                flex:1,
                width: '100%',
                layout: {
                    type: 'vbox',
                    align:'center',
                    pack:'center'
                },
                items:[{
                    xtype: 'label',
                    text: 'Drag & Drop Files Here',
                    cls: ['sub_font', 'h1', 'bold', 'drag-and-drop', 'align_top']
                },{
                    xtype: 'label',
                    text: 'or',
                    height: 30,
                    cls: ['sub_font', 'h1', 'align_top', 'align_bottom']
                },{
                    xtype: 'button',
                    ui: 'commit',
                    itemId: 'chooseFilesButton',
                    text:'Choose Files'
                },{
                    xtype: 'filebutton',
                    itemId: 'fileBrowserButton',
                    style: {
                        display: 'none'
                    }
                }]
            }
        ];
//    },
//    ondragover: function(){
//        return[
//            {xtype: 'label',
//                                text: 'Drag & Drop Files Here',
//                                cls: ['sub', 'h1', 'bold', 'drag-and-drop']}
//        ]
//    },
//    ondrop: function(){
//        return[
//            {cls: 'dropzone'}
//        ]
    }
});
