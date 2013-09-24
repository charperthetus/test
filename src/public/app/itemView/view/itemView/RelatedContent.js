Ext.define('Savanna.itemView.view.itemView.RelatedContent', {
    extend: 'Ext.DataView',

    alias: 'widget.itemview_relatedcontent',

    cls: 'item-view-section',

    store: {
        fields: ['displayLabel', 'description']
    },

    emptyText: '<h3 class="item-view">Related Content</h3><p>No related content...</p>',

    deferEmptyText: false,

    itemSelector: 'div.related-content',

    tpl: [
        '<h3 class="item-view">Related Content</h3>',
        '<tpl for=".">',
        '<div class="content">',
        '<p class="{description}">{displayLabel}</p>',
        '<p>{description}</p>',
        '</div>',
        '</tpl>'
    ]
});
