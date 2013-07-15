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
        "Savanna.view.flexpaper.FlexpaperToolbar",
        "Savanna.view.flexpaper.FlexpaperEntityWindow"
    ],
    stores: [/* coming soon */],
    models: [/* coming soon */],
    requires: [/* coming soon */],
    load_delay:1200,
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
                    me.loadPaper(fpid, paper.up("#flexcomponent").configs.asset, paper)
                }
            },
            "flexpaper_flexpapertoolbar > #tools button": {
                click: function (btn, evt) {
                    var viewer = "documentViewer" + btn.up("#flexcomponent").configs.guid;
                    if (btn.itemId == "toolmenu")   {
                        $.each(btn.menu.items.items, function (index, item)
                        {
                            try {
                                item.on("click", function (e)   {
                                    me["onToolSelect_" + btn.itemId](viewer);
                                });
                            }   catch(e)    {
                                console.log("FlexpaperComponent.js, error calling method: " + btn.itemId)
                            }
                        });
                    } else {
                        try {
                            me["onToolSelect_" + btn.itemId](viewer);
                        }   catch(e)    {
                            console.log("FlexpaperComponent, error calling method: " + btn.itemId)
                        }
                    }
                }
            }
        });
    },
    loadPaper: function (viewer, asset, view) {
        jQuery("#" + viewer).FlexPaperViewer(
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
        var ctrl = this;
        jQuery("#" + viewer).bind('onMarkCreated onMarkClicked onMarkDeleted', function (e, mark) {
            //console.log(e);
            //console.log(mark);
            // Show a pop-up to specify an entity type - this should eventually be a view
            if (mark.type == "highlight" && comp.currentTool == "entity") {
                var entity_opts = Ext.create("Savanna.view.flexpaper.FlexpaperEntityWindow", {
                    x:ctrl.mouseCoords[0],
                    y:ctrl.mouseCoords[1]
                })
            }
        });

        jQuery("#" + viewer).bind('onDocumentLoaded', function (e) {
            jQuery("#toolbar_" + viewer + "_annotations_container").css({"display": "none"});
            view.on("resize", function (evt) {
                var elem = this.getEl();
                jQuery("#" + viewer).css(
                    {
                        "width": elem.dom.style["width"],
                        "height": elem.dom.style["height"]
                    }
                );
                jQuery("#" + viewer).find("#pagesContainer_" + viewer).css(
                    {
                        "width": elem.dom.style["width"],
                        "height": elem.dom.style["height"]
                    }
                );
            });

            Ext.defer(function () {
                view.fireEvent("resize")
            }, ctrl.load_delay);

            Ext.getDoc().on('mousemove', function (e) {
                ctrl.mouseCoords = e.getXY();
            });
        });
    },

    /*
    Tool selection handlers
    */

    onToolSelect_handtool:function(viewer) {
        // coming soon
    },
    onToolSelect_selecttool:function(viewer)   {
        $FlexPaper(viewer).enableHighlighter();
        this.currentTool = "select";
    },
    onToolSelect_penciltool:function(viewer)   {
        $FlexPaper(viewer).enableDrawMode();
        this.currentTool = "pencil";
    },
    onToolSelect_commenttool:function(viewer)  {
        $FlexPaper(viewer).addNote();
        this.currentTool = "comment";
    },
    onToolSelect_entitytool:function(viewer)   {
        $FlexPaper(viewer).enableStrikeout();
        this.currentTool = "entity";
    },
    onToolSelect_zoomintool:function(viewer)   {
        $FlexPaper(viewer).setZoom($FlexPaper(viewer).scale + .2);
    },
    onToolSelect_zoomouttool:function(viewer)  {
        $FlexPaper(viewer).setZoom($FlexPaper(viewer).scale - .2);
    },
    onToolSelect_zoomfittool:function(viewer)  {
        $FlexPaper(viewer).fitHeight();
    },
    onToolSelect_singlepageview:function(viewer)   {
        $FlexPaper(viewer).switchMode("Portrait");
    },
    onToolSelect_twopageview:function(viewer)  {
        $FlexPaper(viewer).switchMode("TwoPage");
    },
    onToolSelect_thumbview:function(viewer)    {
        $FlexPaper(viewer).switchMode("Tile");
    },
    onToolSelect_entitiesview:function(viewer)   {
        // coming soon
    },
    onToolSelect_mycommentsview:function(viewer)   {
        // coming soon
    },
    onToolSelect_othercommentsview:function(viewer)    {
        // coming soon
    },
    onToolSelect_legendview:function(viewer)   {
        // coming soon
    }
});