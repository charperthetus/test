/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 6/28/13
 * Time: 2:25 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.view.flexpaper.FlexpaperBody", {
    extend:"Ext.panel.Panel",
    alias:"widget.flexpaper_flexpaperbody",
    region: "center",
    layout: "fit",
    autoScroll: true,
    requires:[],
    border:false,
    ctrl:null,

    initComponent:function()    {
        this.callParent(arguments);
        this.ctrl = Savanna.controller.Factory.getController('flexpaper.FlexpaperBody');
    }
})