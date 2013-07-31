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
            itemId: 'startbutton',
            ui: 'flat-toolbar-button',
            menu: [
                {text: 'Cats'},
                {text: 'Dogs'},
                {text: 'Evil-Doers'},
                {
                    xtype: 'panel',
                    title: 'test',
                    html: 'test'
                }
            ]
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
        Savanna.controller.Factory.getController('Savanna.search.controller.SearchToolbar');
    }
});
