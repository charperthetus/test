/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 6/27/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */




Ext.define("Savanna.controller.flexpaper.FlexpaperComponent", {
    extend: "Ext.app.Controller",
    views: [
        "Savanna.view.flexpaper.FlexpaperComponent"
    ],
    stores: [],
    models: [],
    requires: [
        "Savanna.view.flexpaper.FlexpaperToolbar",
        "Savanna.view.flexpaper.FlexpaperBody"
    ],
    fpc: null,
    currentTool: null,
    init: function (app) {

        var me = this;
        me.control({
            "flexpaper_flexpapercomponent": {
                render: function (component, evt) {
                    $.each(component.items.items, function (index, item) {
                        item.ctrl.component = component;
                    });
                    /* fallback if we are forced to use an iframe
                     paper.queryById("flexpaperbody").add({
                     title: "Flexpaper 1",
                     xtype: "uxiframe",
                     src: "flexpaper/iframe.html?img=./docs/" + paper.configs.asset + ".pdf_{page}.png&json=./docs/" + paper.configs.asset + ".js&pdf=./pdf/" + paper.configs.asset + ".pdf&fpc=" + me.el,
                     id: "flexframe1"
                     });
                     */
                }
            }
        });
    }
});

