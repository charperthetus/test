/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 6/28/13
 * Time: 2:25 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.view.flexpaper.FlexpaperBody", {
    extend:"Ext.container.Container",
    alias:"widget.flexpaper_flexpaperbody",
    layout: "fit",
    autoScroll: false,
    requires:[],
    border:false,

    initComponent:function()    {
        this.callParent();
        Savanna.controller.Factory.getController('flexpaper.FlexpaperComponent');
    }
});



