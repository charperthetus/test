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
    layout:"border",
    border:false,
    ctrl:null,
    requires: [
        "Savanna.view.flexpaper.FlexpaperToolbar",
        "Savanna.view.flexpaper.FlexpaperBody"
        /* "Ext.ux.IFrame"  // fallback if we are forced to use an iframe */
    ],
    initComponent:function()    {
        this.callParent(arguments);
        this.ctrl = Savanna.controller.Factory.getController('Savanna.controller.flexpaper.FlexpaperComponent');
    },
    items:  [
        {
            xtype:"flexpaper_flexpapertoolbar",
            itemId:"fptoolbar",
            region:"north"
        },
        {
            xtype:"flexpaper_flexpaperbody",
            itemId:"fpbody",
            region:"center"
        }
    ]
})