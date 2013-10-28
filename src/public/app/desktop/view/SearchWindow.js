/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 8/29/13
 * Time: 8:33 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.SearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.desktop_searchwindow',

    requires: [
        'Savanna.search.view.SearchComponent'
    ],

    layout: 'fit',
    maximizable: true,
    height: 500,
    width: 640,
    minWidth: 200,
    minHeight: 100,
    ghost: false,

    header: {
        titlePosition: 1,
        title: 'Search'
    },

    items: [{
        xtype: 'search_searchcomponent',
        itemId: 'searchcomponent'
    }]
});
