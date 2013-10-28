/* global Ext: false */
Ext.define('Savanna.image.view.ImageComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.image_component',
    imageUri: null,

    requires: [
        'Ext.layout.container.VBox',
        'Savanna.image.view.part.ImageViewer'
    ],

    layout: {
        type: 'vbox'
    },

    overview: null,

    initComponent: function() {
        if (this.imageUri){
            this.loadImage(this.imageUri);
        }
        this.width = '100%';
        this.height = '100%';
        this.callParent(arguments);
    },

    loadImage: function(imageUri){
        this.items = [
            {
                xtype: 'image_part_imageviewer',
                itemId: 'imageViewer',
                flex:1,
                width: '100%',
                src: SavannaConfig.documentUrl + imageUri + '/original'
            }
        ]
    }
});
