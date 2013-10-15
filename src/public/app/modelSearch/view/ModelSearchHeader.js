Ext.define('Savanna.modelSearch.view.ModelSearchHeader', {
    extend: 'Ext.Panel',
    alias: 'widget.modelsearch_searchHeader',
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    ui: 'search',
    items:[
        {
            xtype: 'textfield',
            itemId: 'searchInput',
            emptyText: 'New Search',
            tooltip: 'Search'
        },
        {
            xtype: 'button',
            itemId: 'gobutton',
            margin: '0 0 0 -3',
            glyph: 61442
        }
    ]
});
