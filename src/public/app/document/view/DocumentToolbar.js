Ext.define("Savanna.document.view.DocumentToolbar", {
    extend: "Ext.panel.Panel",
    alias: "widget.document_toolbar",
    requires: [
        "Ext.toolbar.Toolbar"
    ],
    border: false,
    initComponent: function () {
        this.callParent();
    },
    items: [
        {
            xtype: "toolbar",
            itemId: "tools",
            hideMode: "display",
            items: [
                {
                    text: "Hand",
                    width: 55,
                    itemId: "handTool",
                    ui: 'flat-toolbar-button',
                    tooltip: 'Hand'
                },
                {
                    text: "Select",
                    width: 60,
                    itemId: "selectTool",
                    ui: 'flat-toolbar-button',
                    tooltip: 'Select'
                },
                {
                    text: "Zoom In",
                    width: 65,
                    itemId: "zoomIn",
                    ui: 'flat-toolbar-button',
                    tooltip: "Zoom In"

                },
                {
                    text: "Zoom Out",
                    width: 75,
                    itemId: "zoomOut",
                    ui: 'flat-toolbar-button',
                    tooltip: "Zoom Out"
                },
                {
                    text: "Zoom Fit",
                    width: 70,
                    itemId: "zoomFit",
                    tooltip: "Zoom Fit"
                },
                {
                    text: "View",
                    itemId: "toolMenu",
                    menu: [
                        {
                            text: "Single Page",
                            itemId: "singlePageView",
                            tooltip: "Single Page"
                        },
                        {
                            text: "Two Page",
                            itemId: "twoPageView",
                            tooltip: "Two Page"

                        },
                        {
                            text: "Thumbnails",
                            itemId: "thumbView",
                            tooltip: "Thumbnails"

                        }
                    ]
                },
                {
                    text: "Previous",
                    itemId: "previousPage",
                    width: 50,
                    ui: 'flat-toolbar-button',
                    tooltip: 'Previous'
                },
                {
                    text: "Next",
                    itemId: "nextPage",
                    width: 30,
                    ui: 'flat-toolbar-button',
                    tooltip: 'Next'
                },
                {
                    xtype: "textfield",
                    itemId: "searchText",
                    ui: 'flat-toolbar-button',
                    tooltip: 'Search',
                    size: 15,
                    width: 70
                },
                {
                    text: "Search",
                    itemId: "searchDoc",
                    width: 45,
                    ui: 'flat-toolbar-button',
                    tooltip: 'Search'
                },
                {
                    text: "Print",
                    itemId: "printDoc",
                    ui: 'flat-toolbar-button',
                    tooltip: 'Print'
                },
                {
                    text: "Export",
                    itemId: "exportDoc",
                    ui: 'flat-toolbar-button',
                    tooltip: 'Export'
                }
            ]
        }
    ]
});
