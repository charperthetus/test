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
        pack: 'center',
      width:'75%'
  },
    width:'100%',
    margin:'0 0 10 0',
    padding:'0 10 0 10',
    height:79,
    bodyCls: 'inner-edit-zone',
    items: [{
        xtype: 'label',
        text: 'Drop Images Here',
        cls:'drag-and-drop',
    }, {
        xtype: 'label',
        text: 'OR',
        margin:'0 20 0 20'
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