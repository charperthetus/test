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
                height:30
            },
            {
                xtype: 'panel',
                alias:'widget.upload_part_newupload_filedropzone',
                itemId: 'fileDropZone',
                flex:1,
                width: '100%',
                layout: {
                    type: 'vbox',
                    align:'center',
                    pack:'center'
                },
                items:[{
                    xtype: 'label',
                    text: 'DRAG AND DROP FILES HERE'
                },{
                    xtype: 'label',
                    text: 'or'
                },{
                    xtype: 'button',
                    itemId: 'chooseFilesButton',
                    text:'Choose Files'
                },{
                    xtype: 'fileuploadfield',
                    itemId: 'fileUploadButton',
                    buttonOnly: true,
                    hideLabel: true,
                    text:'Choose Files',
                    style: {
                        display: 'none'
                    }
                },{
                    xtype: 'filebutton',
                    itemId: 'fileBrowserButton',
                    style: {
                        display: 'none'
                    }
//                        onRender:function(){
//                            console.log(this.getEl().dom);
//                        }
//                        xtype: 'button',
//                        alias:'widget.upload_part_newupload_choosefilesButton',
//                        itemId:'chooseFilesButton',
//                        text: 'Choose Files'
                }]
            }
        ];
    }
});
