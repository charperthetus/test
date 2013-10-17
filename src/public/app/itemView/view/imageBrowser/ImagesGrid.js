Ext.define('Savanna.itemView.view.imageBrowser.ImagesGrid', {
    extend: 'Ext.container.Container',
    alias: 'widget.itemview_imagesgrid',
    controller: 'Savanna.itemView.controller.ImageBrowserController',
    items: [{

        // The expanded image
        xtype: 'panel',
        itemId: 'image_primary',
        layout: 'border',
        height: 300,
        width: 450,

        // Image Description Item
        items: [{
            xtype: 'panel',
            region: 'south',
            itemId: 'image_text'
        }]
    }, {

        // Thumbnail browser
        xtype: 'panel',
        layout: 'hbox',
        height: 100,
        margin: 10,
        overflowX: 'auto',
        items: [{
            xtype: 'button',
            itemId: 'nav_left',
            height: 100,
            glyph: 'arrowNavLeft'
        }, {
            
            // Thumbnails get put here
            xtype: 'panel',
            itemId: 'thumbnail_list',
            layout: 'hbox',
            flex: 1,
            overflowX: 'auto'
        }, {
            xtype: 'button',
            glyph:"arrowNavRight",
            itemId: 'nav_right',
            height: 100
        }]
    }]
});
