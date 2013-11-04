Ext.define("Savanna.document.view.DocumentComponent", {
    extend: "Savanna.component.ClassificationPanel",
    alias: "widget.documentcomponent",
    layout: "hbox",
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
        this.down('#imageDetails').setItemURI(this.itemUri);
    },
    items: [
        {
            xtype: "document_body",
            itemId: "docBody",
            width: '100%',
            flex: 1
        },
        {
            xtype: 'metadata_details',
            itemId: 'imageDetails',
            collapsible: true,
            region: 'east',
            split: true,
            width: '30%'
        }
    ],
    tbar: [
        {
            xtype: "document_toolbar",
            itemId: "docToolbar",
            width: '100%'
        }
    ]
});
