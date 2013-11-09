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
        title: 'Model Search'
    },

    layout: 'fit',
    height: 700,
    width: 720,
    minWidth: 380,
    minHeight: 270,
    ghost: false,
    resizeHandles: 'nw ne sw se s',

    constrainHeader: true,
    items: [{
        xtype: 'model_search_searchcomponent',
        itemId: 'searchcomponent'
    }]
});
