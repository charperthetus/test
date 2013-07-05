/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 6/27/13
 * Time: 9:32 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.controller.flexpaper.FlexpaperToolbar", {
    extend: "Ext.app.Controller",
    views: [
        "flexpaper.FlexpaperToolbar"
    ],
    stores: [
    ],
    models: [
    ],
    init: function (app) {
        var me = this;
        console.log(me);
        me.control({
            "flexpaper_flexpapertoolbar > #tools button": {
                click: function (btn, evt) {
                    var body_control;
                    $.each(me.component.items.items, function(index, item){
                        if(item.itemId == "fpbody") {
                            body_control = item.ctrl;
                        }
                    });
                    if (btn.itemId == "handtool") {

                    } else if (btn.itemId == "selecttool") {
                        body_control.fpc.enableHighlighter();
                        me.component.ctrl.currentTool = "select";
                    } else if (btn.itemId == "penciltool") {
                        body_control.fpc.enableDrawMode();
                        me.component.ctrl.currentTool = "pencil";
                    } else if (btn.itemId == "commenttool") {
                        body_control.fpc.addNote();
                        me.component.ctrl.currentTool = "comment";
                    } else if (btn.itemId == "entitytool") {
                        body_control.fpc.enableStrikeout();
                        me.component.ctrl.currentTool = "entity";
                    } else if (btn.itemId == "zoomintool") {
                        body_control.fpc.setZoom(body_control.fpc.scale +.2);
                    } else if (btn.itemId == "zoomouttool") {
                        body_control.fpc.setZoom(body_control.fpc.scale -.2);
                    } else if (btn.itemId == "zoomfittool") {
                        body_control.fpc.fitHeight();
                    } else if (btn.itemId == "toolmenu") {
                        $.each(btn.menu.items.items, function (index, item) {
                            item.on("click", function (e) {
                                if (this.itemId == "singlepageview") {
                                    body_control.fpc.switchMode("Portrait");
                                } else if (this.itemId == "twopageview") {
                                    body_control.fpc.switchMode("TwoPage");
                                } else if (this.itemId == "thumbview") {
                                    body_control.fpc.switchMode("Tile");
                                } else if (this.itemId == "entitiesview") {

                                } else if (this.itemId == "mycommentsview") {

                                } else if (this.itemId == "othercommentsview") {

                                } else if (this.itemId == "legendview") {

                                }
                            })
                        })
                    } else {
                        console.log("unexpected itemId")
                    }
                }
            }
        });
    }
});