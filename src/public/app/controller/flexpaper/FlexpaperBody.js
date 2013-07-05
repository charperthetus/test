/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 6/28/13
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.controller.flexpaper.FlexpaperBody", {

    extend: "Ext.app.Controller",
    views: [
        "flexpaper.FlexpaperBody"
    ],
    stores: [],
    models: [],
    requires: [],
    fpc: null,
    mouseCoords: [],
    init: function (app) {
        var me = this;
        me.control({
            "flexpaper_flexpaperbody": {
                render: function (body, evt) {
                    Ext.DomHelper.insertHtml('afterBegin', body.getEl().dom, "<div id='" + body.ctrl.component.configs.div_id + "' class='flexpaper_viewer' style='height:100%'></div>");
                    me.loadPaper(body.ctrl.component.configs.div_id, body.ctrl.component.configs.asset, me, body);
                }
            }
        });
    },
    loadPaper: function (viewer, asset, ctrl, view) {
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
                    InitViewMode: 'Portrait',
                    RenderingOrder: 'html5',
                    StartAtPage: '',
                    ViewModeToolsVisible: false,
                    ZoomToolsVisible: false,
                    NavToolsVisible: false,
                    CursorToolsVisible: false,
                    SearchToolsVisible: false,
                    WMode: 'window'
                }
            }
        );

        $("#" + viewer).bind('onMarkCreated onMarkClicked onMarkDeleted', function (e, mark) {
            console.log(e);
            console.log(mark);
            // Show a pop-up to specify an entity type - this should eventually be a controller/view
            if (mark.type == "highlight" && ctrl.component.ctrl.currentTool == "entity") {
                var entity_opts = Ext.create("Ext.window.Window", {
                    x: ctrl.mouseCoords[0],
                    y: ctrl.mouseCoords[1],
                    autoShow:true,
                    align:"stretchmax",
                    title: 'Entity Types',
                    minWidth:120,
                    items:[
                        {
                            xtype:"form",
                            itemID:"entity_form",
                            minWidth:120,
                            items:[
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel:"",
                                    layout:"vbox",
                                    width:'100%',
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
            ctrl.fpc = $FlexPaper(viewer);
            $("#toolbar_documentViewer_annotations_container").css({"display": "none"});
            Ext.defer(function () {
                view.on("resize", function (evt) {
                    $("#" + this.ctrl.component.configs.div_id).css(
                        {
                            "width": this.getEl().dom.style["width"],
                            "height": this.getEl().dom.style["height"]
                        }
                    );
                    $("#" + this.ctrl.component.configs.div_id).find("#pagesContainer_documentViewer").css(
                        {
                            "width": this.getEl().dom.style["width"],
                            "height": this.getEl().dom.style["height"]
                        }
                    );
                });
                view.fireEvent("resize")
            }, 500);
            Ext.getDoc().on('mousemove', function (e) {
                ctrl.mouseCoords = e.getXY();
            });
        });
    }
})