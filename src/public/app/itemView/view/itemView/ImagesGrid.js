Ext.define('Savanna.itemView.view.itemView.ImagesGrid', {
    extend: 'Ext.container.Container',
    alias: 'widget.itemview_imagesgrid',
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
            text: '<'
        }, {
            
            // Thumbnails get put here
            xtype: 'panel',
            itemId: 'thumbnail_list',
            layout: 'hbox',
            flex: 1,
            overflowX: 'auto'
        }, {
            xtype: 'button',
            text: '>',
            itemId: 'nav_right',
            height: 100
        }]
    }]
});
