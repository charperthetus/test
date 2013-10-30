Ext.define('Savanna.itemView.view.imageBrowser.ImagesGridEdit', {
    
    extend: 'Ext.container.Container',

    requires: [
        'Savanna.itemView.controller.ImageBrowserController',
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
    }, {
        xtype: 'grid',
        itemId: 'uploadStatus',
        store: Ext.create('Savanna.upload.store.UploadGridStore'),
        flex:1,
        width: '100%',
        borderWidth: 0,
        viewConfig: {
            preserveScrollOnRefresh: true
        },
        columns: [{
            text: '',
            dataIndex: 'status',
            borderWidth: 0,
            sortable: false,
            align:'center',
            resizable:false,
            hideable: true,
            width: 36,
            renderer : function(val) {
                if (val === 'completed') {
                    return '<div class="icon-success">' + '</div>';
                } else if (val === 'pending') {
                    return '<div class="icon-pending">' + '</div>';
                } else if (val === 'failed') {
                    return '<div class="icon-alert">' + '</div>';
                } else {
                    return val;
                }
            }

        },{
            text: '',
            borderWidth: 0,
            dataIndex: 'progress',
            sortable: false,
            hideable: false,
            flex: 2
        }]
    }, {
        xtype: 'itemview_image_upload',
        itemId: 'itemViewUploadImages'
    }]
});