/* global Ext: false */
Ext.define('Savanna.image.view.ImageComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.image_component',

    requires: [
        'Ext.layout.container.VBox',
        'Savanna.image.view.part.ImageViewer'
    ],

    layout: {
        type: 'vbox'
    },

    overview: null,

    initComponent: function() {
        this.setImageUri('SolrJdbc%2FImage%2F61b06128-361a-419a-a316-cb6460a94053'); //TODO: Don't fake this.
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
                src: SavannaConfig.documentUrl + imageUri + '/original'
            }
        ]
    }
});
