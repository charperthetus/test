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
            height: 33,
            width:'100%',
            ui: 'thetus-toolbar',
            hideMode: "display",
            layout:{
                pack: 'start'
            },
            items: [
                { xtype: 'tbspacer', width: 5 },
                {
                    xtype: 'button',
                    paddingLeft: 5,
                    width:25,
                    height:25,
                    cls: 'toolbarButtonFramework',
                    ui: 'icon-dark',
                    glyph: 'cursor',
                    itemId: "selectTool",
                    tooltip: 'Select'
                },
                //divider
                {
                    xtype: 'container',
                    cls: 'toolbarDividerFramework',
                    width:1,
                    height:20
                },{
                    xtype: 'button',
                    width:25,
                    height:25,
                    cls: 'toolbarButtonFramework',
                    ui: 'icon-dark',
                    glyph: 'zoomIn',
                    itemId: "zoomIn",
                    tooltip: "Zoom In"

                },{
                    xtype: 'button',
                    width:25,
                    height:25,
                    cls: 'toolbarButtonFramework',
                    ui: 'icon-dark',
                    glyph: 'zoomOut',
                    itemId: "zoomOut",
                    tooltip: "Zoom Out"
                },{
                    xtype: 'button',
                    width:25,
                    height:25,
                    cls: 'toolbarButtonFramework',
                    ui:'icon-dark',
                    glyph: 'showAll',
                    itemId: "zoomFit",
                    tooltip: "Zoom Fit"
                },{
                    text: "View",
                    itemId: "toolMenu",
                    menu: [
                        {
                            text: "Single Page",
                            itemId: "singlePageView",
                            tooltip: "Single Page"
                        },
                       
                        {
                            text: "Thumbnails",
                            itemId: "thumbView",
                            tooltip: "Thumbnails"

                        }
                    ]
                },
                '->',
                {
                    xtype: 'button',
                    width:25,
                    height:25,
                    ui: 'icon-dark',
                    cls: 'toolbarButtonFramework',
                    glyph: 'arrowNavLeft',
                    itemId: "previousPage",
                    tooltip: 'Previous'
                },
				 {
                        xtype : "textfield",
                        itemId : "currentPage",
                        width : 35,
                        name : "curentPage",
                        ui : 'flat-toolbar-button',
                        enableKeyEvents: true,
                        tooltip : 'Current Page of the document',
                        size : 8
				},
				{
					xtype: 'label',
					text: '/',
					size : 3,
					style: {
						'margin': '5px'
					}
				},
				{
					xtype: 'label',
					itemId: 'totalPages',
					size : 4,
		    		ui: 'flat-toolbar-button',
					tooltip:'Number of pages in the document'
				},
                {
                    xtype: 'label',
                    text: 'Previous Page / Next Page'
                },
                {
                    xtype: 'button',
                    width:25,
                    height:25,
                    cls: 'toolbarButtonFramework',
                    ui: 'icon-dark',
                    glyph: 'arrowNavRight',
                    itemId: "nextPage",
                    tooltip: 'Next'
                },
                '->',
                {
                    xtype: "thetus-searchfield",
                    itemId: "searchText",
                    enableKeyEvents: true,
                    tooltip: 'Search'
                },
                { xtype: 'tbspacer', width: 3 },
                {
                    xtype: 'button',
                    width:25,
                    height:25,
                    cls: 'toolbarButtonFramework',
                    ui: 'icon-dark',
                    glyph: 'export',
                    itemId: "exportDoc",
                    tooltip: 'Export'
                },
                {
                    xtype: 'button',
                    width:25,
                    height:25,
                    cls: 'toolbarButtonFramework',
                    ui: 'icon-dark',
                    glyph: 'print',
                    itemId: "printDoc",
                    tooltip: 'Print'
                }
            ]
        }
    ]
});
