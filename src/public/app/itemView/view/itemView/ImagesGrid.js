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
        margin: '0 auto',

        // Image Description Item
        items: [{
            xtype: 'panel',
            region: 'south',
            collapsible: true,
            collapsed: true,
            itemId: 'image_text',
            width: '100%'
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
            text: '<',
        }, {
            
            // Thumbnails get put here
            xtype: 'panel',
            itemId: 'thumbnail_list',
            layout: 'hbox',
            flex: 1,
            overflowX: 'auto',
        }, {
            xtype: 'button',
            text: '>',
            itemId: 'nav_right',
            height: 100,
        }]
    }]
});
