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
    ctrl:null,
    currentTool: null,
    requires: [
        "Savanna.view.flexpaper.FlexpaperToolbar",
        "Savanna.view.flexpaper.FlexpaperBody"
    ],
    initComponent:function()    {
        this.callParent();
        this.ctrl = Savanna.controller.Factory.getController('flexpaper.FlexpaperComponent');
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
 var guid = this.guid();
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
 s4: function () {
 return Math.floor((1 + Math.random()) * 0x10000)
 .toString(16)
 .substring(1);
 },
 guid: function () {
 return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
 this.s4() + '-' + this.s4() + this.s4() + this.s4();
 }

 app.viewport.queryById("main").getFlexpaper("documentViewer", "flexpaper/pdf/Paper.pdf", "maintabs", "Flexpaper");

 */