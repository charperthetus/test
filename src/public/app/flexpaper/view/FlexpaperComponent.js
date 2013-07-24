/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 6/27/13
 * Time: 10:41 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.flexpaper.view.FlexpaperComponent", {
    extend: "Ext.panel.Panel",
    alias: "widget.flexpaper_flexpapercomponent",
    layout:"fit",
    border:false,
    currentTool: null,
    requires: [
        "Savanna.flexpaper.view.FlexpaperToolbar",
        "Savanna.flexpaper.view.FlexpaperBody"
    ],
    initComponent:function()    {
        this.ctrl = Savanna.controller.Factory.getController('Savanna.flexpaper.controller.FlexpaperComponent');
        this.callParent(arguments);
    },
    items:  [
        {
            xtype:"flexpaper_flexpaperbody",
            itemId:"fpbody"
        }
    ],
    dockedItems:    [
        {
            xtype:"flexpaper_flexpapertoolbar",
            itemId:"fptoolbar"
        }
    ]
});

/*

 getFlexpaper: function (div, asset, tgt, title) {
 var guid = Ext.id();
 var fp = Ext.create("Ext.panel.Panel", {
 title: title,
 closable: true,
 layout: "border"
 });
 var fpc = Ext.create("Savanna.flexpaper.view.FlexpaperComponent", {
 itemId: "flexcomponent",
 layout: "fit",
 region: "center",
 configs: {
 asset: asset,
 guid: guid
 }
 });
 fp.add(fpc);
 this.queryById(tgt).add(fp);
 this.queryById(tgt).setActiveTab(fp);
 },

 app.viewport.queryById("main").getFlexpaper("documentViewer", "http://localhost/flexpaper/pdf/Paper.pdf", "mainsearchoptions_tabs", "Flexpaper");

 */