/**
 * @class Savanna.itemView.view.imageBrowser.ImageUpload
 * @extends extendsClass
 * Description
 */
Ext.define('Savanna.itemView.view.imageBrowser.ImageUpload', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_image_upload',

    itemId: 'imageDropZone',
    
    requires: [
        'Ext.container.Container'
    ],

    cls:'image-browser-edit-drop-zone',

  layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'
  },
    width:275,
    height:79,
    items: [{
        xtype: 'label',
        text: 'Drop Images Here',
        cls:'drag-and-drop',
        flex: 2
    }, {
        xtype: 'label',
        text: 'OR',
        flex: 1
    }, {
        xtype: 'button',
        text: 'Upload',
//        width:25,
        ui:'commit',
        itemId: 'uploadImagesButton'
//        flex: 2
    }, {
        xtype: 'filebutton',
        itemId: 'fileBrowserButton',
        style: {
            display: 'none'
        }
    }]
});