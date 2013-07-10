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
        "Savanna.view.flexpaper.FlexpaperComponent",
        "Savanna.view.flexpaper.FlexpaperBody",
        "Savanna.view.flexpaper.FlexpaperToolbar"
    ],
    stores: [/* coming soon */],
    models: [/* coming soon */],
    requires: [/* coming soon */],
    init: function (app) {
        var me = this;
        me.control({
            "flexpaper_flexpapercomponent": {
                render: function (component, evt) {
                    // do something
                }
            },
            "flexpaper_flexpaperbody": {
                render: function (paper, evt) {
                    var fpid = "documentViewer" + paper.up("#flexcomponent").configs.guid;
                    Ext.DomHelper.insertHtml("afterBegin", paper.getEl().dom, "<div id='" + fpid + "' class='flexpaper_viewer'></div>");
                    paper.up("#flexcomponent").ctrl.loadPaper(fpid, paper.up("#flexcomponent").configs.asset, me, paper, me)
                }
            },
            "flexpaper_flexpapertoolbar > #tools button": {
                click: function (btn, evt) {
                    var viewer = "documentViewer" + btn.up("#flexcomponent").configs.guid;
                    if (btn.itemId == "handtool")
                    {
                        // coming soon
                    }
                    else if (btn.itemId == "selecttool")
                    {
                        $FlexPaper(viewer).enableHighlighter();
                        me.currentTool = "select";
                    }
                    else if (btn.itemId == "penciltool")
                    {
                        $FlexPaper(viewer).enableDrawMode();
                        me.currentTool = "pencil";
                    }
                    else if (btn.itemId == "commenttool")
                    {
                        $FlexPaper(viewer).addNote();
                        me.currentTool = "comment";
                    }
                    else if (btn.itemId == "entitytool")
                    {
                        $FlexPaper(viewer).enableStrikeout();
                        me.currentTool = "entity";
                    }
                    else if (btn.itemId == "zoomintool")
                    {
                        $FlexPaper(viewer).setZoom($FlexPaper(viewer).scale + .2);
                    }
                    else if (btn.itemId == "zoomouttool")
                    {
                        $FlexPaper(viewer).setZoom($FlexPaper(viewer).scale - .2);
                    }
                    else if (btn.itemId == "zoomfittool")
                    {
                        $FlexPaper(viewer).fitHeight();
                    }
                    else if (btn.itemId == "toolmenu")
                    {
                        $.each(btn.menu.items.items, function (index, item)
                        {
                            item.on("click", function (e)
                            {
                                if (this.itemId == "singlepageview")
                                {
                                    $FlexPaper(viewer).switchMode("Portrait");
                                }
                                else if (this.itemId == "twopageview")
                                {
                                    $FlexPaper(viewer).switchMode("TwoPage");
                                }
                                else if (this.itemId == "thumbview")
                                {
                                    $FlexPaper(viewer).switchMode("Tile");
                                }
                                else if (this.itemId == "entitiesview")
                                {
                                    // coming soon
                                }
                                else if (this.itemId == "mycommentsview")
                                {
                                    // coming soon
                                }
                                else if (this.itemId == "othercommentsview")
                                {
                                    // coming soon
                                }
                                else if (this.itemId == "legendview")
                                {
                                    // coming soon
                                }
                            })
                        })
                    } else {
                        //console.log("unexpected itemID")
                    }
                }
            }
        });
    },
    loadPaper: function (viewer, asset, ctrl, view, comp) {
        $("#" + viewer).FlexPaperViewer(
            {
                config: {
                    PDFFile: asset,
                    Scale: 0.6,
                    ZoomTransition: 'easeOut',
                    ZoomTime: 0.5,
                    ZoomInterval: 0.2,
                    FitPageOnLoad: false,
                    FitWidthOnLoad: true,
                    FullScreenAsMaxWindow: true,
                    ProgressiveLoading: false,
                    MinZoomSize: 0.2,
                    MaxZoomSize: 5,
                    SearchMatchAll: false,
                    Toolbar: 'none',
                    BottomToolbar: 'UI_flexpaper_annotations.html',
                    InitViewMode: 'Portrait',
                    RenderingOrder: 'html5',
                    StartAtPage: '',
                    ViewModeToolsVisible: false,
                    ZoomToolsVisible: false,
                    NavToolsVisible: false,
                    CursorToolsVisible: false,
                    SearchToolsVisible: false,
                    WMode: 'window',
                    localeChain: 'en_US'
                }
            }
        );

        $("#" + viewer).bind('onMarkCreated onMarkClicked onMarkDeleted', function (e, mark) {
            //console.log(e);
            //console.log(mark);
            // Show a pop-up to specify an entity type - this should eventually be a view
            if (mark.type == "highlight" && comp.currentTool == "entity") {
                var entity_opts = Ext.create("Ext.window.Window", {
                    x: ctrl.mouseCoords[0],
                    y: ctrl.mouseCoords[1],
                    autoShow: true,
                    align: "stretchmax",
                    title: 'Entity Types',
                    minWidth: 120,
                    items: [
                        {
                            xtype: "form",
                            itemID: "entity_form",
                            minWidth: 120,
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: "",
                                    layout: "vbox",
                                    width: '100%',
                                    padding: '10 10 10 10',
                                    items: [
                                        { boxLabel: 'Person', name: 'ent', inputValue: 'person' },
                                        { boxLabel: 'Place', name: 'ent', inputValue: 'place' },
                                        { boxLabel: 'Thing', name: 'ent', inputValue: 'thing' }
                                    ]
                                }
                            ]
                        }
                    ]
                });
            }
        });

        $("#" + viewer).bind('onDocumentLoaded', function (e) {
            $("#toolbar_" + viewer + "_annotations_container").css({"display": "none"});
            view.on("resize", function (evt) {
                $("#" + viewer).css(
                    {
                        "width": this.getEl().dom.style["width"],
                        "height": this.getEl().dom.style["height"]
                    }
                );
                $("#" + viewer).find("#pagesContainer_" + viewer).css(
                    {
                        "width": this.getEl().dom.style["width"],
                        "height": this.getEl().dom.style["height"]
                    }
                );
            });

            Ext.defer(function () {
                view.fireEvent("resize")
            }, 1200);

            Ext.getDoc().on('mousemove', function (e) {
                ctrl.mouseCoords = e.getXY();
            });
        });
    }
});