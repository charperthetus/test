/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 6/27/13
 * Time: 10:41 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.view.flexpaper.FlexpaperComponent", {
    extend: "Ext.panel.Panel",
    alias: "widget.flexpaper_flexpapercomponent",
    layout:"fit",
    border:false,
    currentTool: null,
    requires: [
        "Savanna.view.flexpaper.FlexpaperToolbar",
        "Savanna.view.flexpaper.FlexpaperBody"
    ],
    initComponent:function()    {
        this.callParent();
        Savanna.controller.Factory.getController('flexpaper.FlexpaperComponent');
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
 var fpc = Ext.create("Savanna.view.flexpaper.FlexpaperComponent", {
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

 app.viewport.queryById("main").getFlexpaper("documentViewer", "flexpaper/pdf/Paper.pdf", "maintabs", "Flexpaper");

 */