Ext.define("Savanna.document.view.DocumentComponent", {
    extend: "Savanna.component.ClassificationPanel",
    alias: "widget.documentcomponent",
    layout: "vbox",
    border: false,
    itemUri: null,
    docViewId: null,
    requires: [
        "Savanna.document.view.DocumentToolbar",
        "Savanna.document.view.DocumentBody",
        'Savanna.document.controller.DocumentController'
    ],

    controller: 'Savanna.document.controller.DocumentController',
    afterRender: function () {
        this.callParent(arguments);

        //This div needs an explicit id
        this.docViewId = Ext.id();
        var domElement = Ext.DomHelper.insertHtml("afterBegin", this.down('#docBody').getEl().dom, "<div id='" + this.docViewId + "' class='flexpaper_viewer' style='width: 100%; height: 100%;'></div>");

        jQuery(domElement).FlexPaperViewer(
            {
                config: {
                    PDFFile: SavannaConfig.documentUrl + this.itemUri + ';jsessionid=' + Savanna.jsessionid,
                    key: "@86cf4d402afdbe0b389$f6de2e67f473111c51e",
                    ZoomTransition: 'easeOut',
                    ZoomTime: 0.5,
                    ZoomInterval: 0.2,
                    FitPageOnLoad: false,
                    FitWidthOnLoad: false,
                    FullScreenAsMaxWindow: true,
                    ProgressiveLoading: false,
                    MinZoomSize: 0.2,
                    MaxZoomSize: 5,
                    SearchMatchAll: false,
                    BottomToolbar: 'none',
                    Toolbar: 'none',
                    InitViewMode: 'Portrait',
                    RenderingOrder: 'html5',
                    StartAtPage: '',
                    WMode: 'window',
                    localeChain: 'en_US',
                    localeDirectory: 'resources/flexpaper/locale/'
                }
            }
        );
    },
    items: [
        {
            xtype: "document_body",
            itemId: "docBody",
            width: '100%',
            flex: 1
        }
    ],
    tbar: [
        {
            xtype: "document_toolbar",
            itemId: "docToolbar"
        }
    ]
});
