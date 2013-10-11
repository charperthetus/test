/* global Ext: false */
Ext.define('Savanna.image.view.ImageComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.image_imagecomponent',

    requires: [
        'Ext.layout.container.VBox',
        'Savanna.image.view.part.ImageViewer'
    ],

    controller : 'Savanna.image.controller.ImageController',

    imageSource: '',

//    config : {
//        imageSource : ''
//    },

    layout: {
        type: 'vbox'
    },

    overview: null,

    initComponent: function() {
        this.items = this.setupItems();
        this.width = '100%';
        this.height = '100%';
        this.callParent(arguments);

    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype: 'image_part_imageviewer',
                itemId: 'imageViewer',
                flex:1,
                width: '100%',
                src: 'White-458.jpg'
            }
        ];
    },

    setImageSource : function(imageSource){
//        this.down('#imageViewer');
        // might want to create the imageViewer and add it to items here.
    }
});
