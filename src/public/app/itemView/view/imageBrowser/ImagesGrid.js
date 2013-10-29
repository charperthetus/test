Ext.define('Savanna.itemView.view.imageBrowser.ImagesGrid', {
    
    extend: 'Ext.container.Container',

    requires: 'Savanna.itemView.controller.ImageBrowserController',
    
    controller: 'Savanna.itemView.controller.ImageBrowserController',
    
    alias: 'widget.itemview_imagesgrid',
    
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
            itemId: 'navRight',
            height: 100
        }]
    }]
});
