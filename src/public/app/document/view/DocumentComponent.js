Ext.define("Savanna.document.view.DocumentComponent", {
    extend: "Savanna.component.ClassificationPanel",
    alias: "widget.documentcomponent",
    layout: "border",
    border: false,
    docViewId: null,
    requires: [
        "Savanna.document.view.DocumentToolbar",
        "Savanna.document.view.DocumentBody",
        'Savanna.document.controller.DocumentController'
    ],

    controller: 'Savanna.document.controller.DocumentController',
    afterRender: function () {
        this.callParent(arguments);
        this.down('#imageDetails').setItemURI(this.itemUri);
    },
    items: [
        {
            xtype: "document_body",
            itemId: "docBody",
            width: '70%',
			height: '100%',
            flex: 1
        },
        {
            xtype: 'metadata_details',
            itemId: 'imageDetails',
            collapsible: true,
            collapsed: true,
            region: 'east',
            split: true,
            width: '30%',
			height: '100%'
        }
    ],
    tbar: {
        ui: 'thetus-toolbar',
        width: '100%',
        items:
            [{
                xtype: "document_toolbar",
                itemId: "docToolbar",
                width: '100%',
                height: 33
            }
        ]}
});
