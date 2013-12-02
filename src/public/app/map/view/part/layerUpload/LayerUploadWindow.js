Ext.define('Savanna.map.view.part.layerUpload.LayerUploadWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.layeruploadwindow',
    requires: ['Savanna.map.controller.LayerUploadController'],

    controller: 'Savanna.map.controller.LayerUploadController',

    title: 'Upload Layer',

    layout: 'fit',
    width: 480,
    height: 480,
    padding: 15,
    ghost: false,
    constrain: true,

    items: [{
        xtype: 'panel',
        itemId: 'fileDropZone',
        ui: 'dropzone',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [
            {
                xtype: 'label',
                text: 'Drag and drop file here',
                cls: ['sub_font', 'h1', 'bold', 'drag-and-drop', 'drag-and-drop-large', 'align_top']
            },
            {
                xtype: 'label',
                text: 'or',
                height: 30,
                cls: ['sub_font', 'h1', 'align_top', 'align_bottom']
            },
            {
                xtype: 'button',
                ui: 'commit',
                itemId: 'chooseFileButton',
                text:'Choose File'
            },
            {
                xtype: 'filebutton',
                itemId: 'fileBrowserButton',
                style: {
                    display: 'none'
                }
            }
        ]
    }]
});
