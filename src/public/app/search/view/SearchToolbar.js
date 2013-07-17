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
            text: 'Add to MyStuff'
        },
        {
            text: 'Help'
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        // instantiate the controller for this view
        Savanna.controller.Factory.getController('Savanna.search.controller.SearchToolbar');
    }
});
