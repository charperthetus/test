/* global Ext: false, Savanna: false */
Ext.define('Savanna.search.view.searchComponent.SearchToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.search_searchtoolbar',

    requires: [
        'Savanna.mixin.Storeable'
    ],

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store:'Savanna.search.store.SearchHistory',

    border: false,
    frame: false,
    docked: 'top',

    items: [
        {
            text: 'Recent Searches',
            itemId: 'historybutton',
            ui: 'flat-toolbar-button',
            menu: {
                ui: 'flat-menu',
                itemId: 'historymenu',
                items: [
                    // TODO: remove these in place of real data...
                    { text: 'Cats' },
                    { text: 'Dogs' },
                    { text: 'Evil-Doers' }
                ]
            }
        }
        //todo: uncomment if we still want search toolbar buttons for save/help
//        ,{
//            xtype: 'tbfill'
//        },
//        {
//            glyph: 61786,
//            ui: 'flat-toolbar-button'
//        },
//        {
//            glyph: 61746,
//            ui: 'flat-toolbar-button'
//        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        this.mixins.storeable.initStore.call(this);
    },

    onStoreChanged: function() {
        var historyMenu = this.down('#historymenu');
        historyMenu.removeAll();
        //TODO: look for dupes and do not include them - or, remove at store level
        this.getStore().each(function (search) {
            historyMenu.add({
                text: search.get('query')
            });
        });
    }
});
