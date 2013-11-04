Ext.define('Savanna.itemView.view.imageBrowser.ImagesGridEdit', {
    
    extend: 'Ext.panel.Panel',

    title: 'Signatures and Observables',

    requires: [
        'Savanna.itemView.controller.EditImageBrowserController',
        'Savanna.itemView.view.imageBrowser.ImageUpload'
    ],
    
    controller: 'Savanna.itemView.controller.EditImageBrowserController',
    
    alias: 'widget.itemview_imagesgrid_edit',

    storeHelper: null,
    
    items: [{

        // The expanded image
        xtype: 'panel',
        itemId: 'imagePrimary',
        layout: 'border',
        height: 300,
        width: '100%',
        padding:'10',
        bodyCls:'image-grid-inner-main',

        // Image Description Item
        items: [{
            xtype: 'panel',
            region: 'south',
            itemId: 'imageText'
        }]
    }, {

        // Thumbnail browser
        xtype: 'panel',
        itemId: 'thumbnailGallery',
        layout: 'hbox',
        hidden: true,
        height: 100,
        margin: 10,
        overflowX: 'auto',
        padding:'10',
        bodyCls:'image-grid-inner-nav',

        // Controls and gallery
        items: [{
            xtype: 'button',
            itemId: 'navLeft',
            height: 80,
            glyph: 'arrowNavLeft',
            cls:'image-browser-control'
        }, {
            
            // Thumbnails get put here
            xtype: 'panel',
            itemId: 'thumbnailList',
            layout: 'hbox',
            flex: 1,
            overflowX: 'auto'
        }, {
            xtype: 'button',
            glyph: 'arrowNavRight',
            cls:'image-browser-control',
            itemId: 'navRight',
            height: 80
        }]
    }, {
        xtype: 'label',
        flex: 1,
        itemId: 'uploadStatusMessage',
        hidden: true
    
    }, {
        // Upload drop zones
        xtype: 'itemview_image_upload',
        itemId: 'itemViewUploadImages'
    }]
});