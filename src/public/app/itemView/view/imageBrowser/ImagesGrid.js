Ext.define('Savanna.itemView.view.imageBrowser.ImagesGrid', {
    
    extend: 'Ext.panel.Panel',

    title: 'Signatures and Observables',

    requires: 'Savanna.itemView.controller.ImageBrowserController',
    
    controller: 'Savanna.itemView.controller.ImageBrowserController',
    
    alias: 'widget.itemview_imagesgrid',
    
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
        width: '100%',
        overflowX: 'auto',
        padding:'0 10 10 10',
        
        // Controls and gallery
        items: [{
            xtype: 'button',
            itemId: 'navLeft',
            cls:'image-browser-control',
            height: 80,
            glyph: 'arrowNavLeft'
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
    }]
});
