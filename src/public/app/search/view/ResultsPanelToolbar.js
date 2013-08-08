/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/8/13
 * Time: 12:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.search.view.ResultsPanelToolbar", {
    extend: "Ext.toolbar.Toolbar",
    alias: "widget.search_resultspaneltoolbar",
    requires:[
        'Savanna.controller.Factory'
    ],
    models:[],
    stores:[],
    initComponent:function()    {
        Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        this.callParent(arguments);
    },
    items:  [
        {
            xtype:"tbtext",
            text:"Sort by:",
            itemId:"sortby_combobox_label"
        },
        {
            xtype: "combobox",
            itemId:"resultsSortByCombobox"
        },
        {
            xtype:"tbtext",
            text:"Results Per Page:",
            itemId:"pagesize_combobox_label"
        },
        {
            xtype: "combobox",
            itemId:"resultsPageSizeCombobox"
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
        },
        {
            glyph: 61786,
            ui: 'flat-toolbar-button'
        }
    ]
})
