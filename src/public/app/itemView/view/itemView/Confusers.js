Ext.define('Savanna.itemView.view.itemView.Confusers', {
    extend: 'Ext.view.View',

    alias: 'widget.itemview_confusers',

    cls: 'item-view-section',

    // TODO: get a real store...
    store: {
        fields: ['displayLabel', 'description']
    },

    itemSelector: 'div.itemview-confuser',

    emptyText: '<h3 class="item-view">Confusers</h3><p>No confusers...</p>',

    deferEmptyText: false,

    tpl: [ '<h3 class="item-view">Confusers</h3>',
            '<tpl for=".">',
            '<div class="itemview-confuser">',
                '<p>{displayLabel}</p>',
                '<p>{description}</p>',
            '</div>',
            '</tpl>'
    ]
});
