/**
 * TODO: Document what events we may emit...
 */

Ext.define('Savanna.search.view.SearchToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.search_searchtoolbar',

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
                itemId:"historymenu",
                items: [
                    {text: 'Cats'},
                    {text: 'Dogs'},
                    {text: 'Evil-Doers'}
                ]
            }
        },
        {
            xtype: 'tbfill'
        },
        {
            glyph: 61786,
            ui: 'flat-toolbar-button'
        },
        {
            glyph: 61746,
            ui: 'flat-toolbar-button'
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        // instantiate the controller for this view
        // this.ctrl used for unit tests
        this.ctrl = Savanna.controller.Factory.getController('Savanna.search.controller.SearchToolbar');
    }
});
