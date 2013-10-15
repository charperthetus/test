Ext.define('Savanna.itemView.view.itemView.Annotations', {
    extend: 'Ext.DataView',

    alias: 'widget.itemview_annotations',

    cls: 'item-view-section',

    emptyText: '<h3 class="item-view">Annotation</h3><p>No annotations...</p>',

    deferEmptyText: false,

    tpl: ['<h3 class="item-view">Annotations TEST</h3>',
        '<tpl for=".">',
        '<div class="dataview-multisort-item content">',
        '<p>{createdByUsername}</p>',
        '{text}',
        '</div>',
        '</tpl>'],

    itemSelector: 'div.dataview-multisort-item',

    store: {
        fields: ['createdByUsername', 'text']
    }
});
