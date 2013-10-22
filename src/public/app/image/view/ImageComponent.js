/* global Ext: false */
Ext.define('Savanna.image.view.ImageComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.image_component',

    requires: [
        'Ext.layout.container.VBox',
        'Savanna.image.view.part.ImageViewer'
    ],

    controller : 'Savanna.image.controller.ImageController',

    layout: {
        type: 'vbox'
    },

    overview: null,

    initComponent: function() {
        this.setImageUri('SolrJdbc%252FImage%252Fc6649d14-8e31-4e82-9ca3-e94e45f422ed'); //TODO: Don't fake this.
        this.width = '100%';
        this.height = '100%';
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setImageUri : function(imageUri){
        this.items = [
            {
                xtype: 'image_part_imageviewer',
                itemId: 'imageViewer',
                flex:1,
                width: '100%',
                src: SavannaConfig.documentUrl + imageUri + '/original'  //c2devsav uri
            }
        ]
    }
});
