Ext.define('Savanna.itemView.view.itemView.ImagesGrid', {
    extend: 'Ext.view.View',

    alias: 'widget.itemview_imagesgrid',

    cls: 'item-view-section',

    tpl: [
        [
            '<h3 class="item-view">Images</h3>',
            '<tpl for=".">',
            '<div class="dataview-multisort-item">',
            '<img src="{url}"/>',
            '</div>',
            '</tpl>'
        ]
    ],

    itemSelector: 'div.dataview-multisort-item',

    // TODO: get a real store buddy...
    store: {
        fields: ['url']
    }
});
