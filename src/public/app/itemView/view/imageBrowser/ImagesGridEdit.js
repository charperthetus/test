Ext.define('Savanna.itemView.view.imageBrowser.ImagesGridEdit', {
    
    extend: 'Ext.panel.Panel',

    title: 'Signatures and Observables',

    requires: [
        'Savanna.itemView.controller.EditImageBrowserController',
        'Savanna.itemView.view.imageBrowser.ImageUpload'
    ],
    
    controller: 'Savanna.itemView.controller.EditImageBrowserController',
    
    alias: 'widget.itemview_imagesgrid_edit',
    
    items: [{

        // The expanded image
        xtype: 'panel',
        itemId: 'imagePrimary',
        layout: 'border',
        height: 300,
        width: 450,

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
        height: 100,
        margin: 10,
        overflowX: 'auto',
        
        // Controls and gallery
        items: [{
            xtype: 'button',
            itemId: 'navLeft',
            height: 100,
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
            height: 100
        }]
    }, {

        // TODO: Remove this grid and refactor as it's only good for holding a store.
        xtype: 'grid',
        itemId: 'uploadStatus',
        store: Ext.create('Savanna.upload.store.UploadGridStore'),
        flex:1,
        width: '100%',
        borderWidth: 0,
        viewConfig: {
            preserveScrollOnRefresh: true
        },
        hideHeaders: true,
        columns: []

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