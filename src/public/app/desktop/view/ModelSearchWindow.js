/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 8/29/13
 * Time: 8:33 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.ModelSearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.model_desktop_searchwindow',

    requires: [
        'Savanna.modelSearch.view.SearchComponent'
    ],

    header: {
        titlePosition: 1,
        title: 'Model Search'
    },

    ghost: false,
    layout: 'fit',
    height: 600,
    width: 680,
    minWidth: 200,
    minHeight: 100,
    items: [{
        xtype: 'model_search_searchcomponent',
        itemId: 'searchcomponent'
    }]
});
