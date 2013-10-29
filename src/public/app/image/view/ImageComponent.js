/* global Ext: false */
Ext.define('Savanna.image.view.ImageComponent', {
    extend: 'Savanna.component.ClassificationPanel',
    alias: 'widget.image_component',

    requires: ['Savanna.image.view.part.ImageViewer'],

    layout: 'border',

    initComponent: function() {
        if (this.getItemUri()){
            this.loadImage(this.getItemUri());
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
                region: 'center',
                width: '70%',
                src: SavannaConfig.documentUrl + imageUri + '/original'
            },
            {
                xtype: 'metadata_details',
                itemId: 'imageDetails',
                itemURI: imageUri,
                collapsible: true,
                region: 'east',
                split: true,
                width: '30%'

            }
        ]
    }
});
