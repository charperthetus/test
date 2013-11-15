/* global Ext: false */
Ext.define('Savanna.upload.view.part.NewUploadView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.upload_part_newupload',

    requires: [
        'Savanna.classification.view.ClassificationButton',
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
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        text: 'Start New Upload',
                        cls: ['dark', 'h1', 'align_top', 'align_bottom'],
                        height: 35
                    },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'label',
                        text: 'Classification:',
                        cls: ['dark', 'align_top', 'align_bottom'],
                        margin: {top:0,left:0,right:5,bottom:0}
                    },
                    {
                        xtype: 'classificationbutton',
                        itemId: 'classificationButton'
                    }
                ]
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
                    text: 'Drag and drop files here',
                    cls: ['sub_font', 'h1', 'bold', 'drag-and-drop', 'drag-and-drop-large', 'align_top']
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
    }
});
