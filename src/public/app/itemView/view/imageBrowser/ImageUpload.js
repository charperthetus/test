/**
 * @class Savanna.itemView.view.imageBrowser.ImageUpload
 * @extends extendsClass
 * Description
 */
Ext.define('Savanna.itemView.view.imageBrowser.ImageUpload', {

    alias: 'widget.itemview_image_upload',
    extend: 'Ext.panel.Panel',
    
    requires: [
        'Ext.container.Container'
    ],

    layout: 'hbox',

    style: {
        border: '5px dotted #ccc'
    },

    items: [{
        xtype: 'label',
        text: 'Drop Images Here',
        flex: 2
    }, {
        xtype: 'label',
        text: 'OR',
        flex: 1
    }, {
        xtype: 'button',
        text: 'Upload',
        flex: 2
    }]
});