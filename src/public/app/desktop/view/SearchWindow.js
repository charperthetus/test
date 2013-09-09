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

    title: 'Search',
    height: 600,
    width: 900,
    layout: 'fit',

    items: [{
        xtype: "search_searchcomponent",
        itemId: "searchcomponent"
    }]
});
