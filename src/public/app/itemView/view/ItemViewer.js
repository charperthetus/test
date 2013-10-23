Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_itemviewer',

    cls: 'itemview',

    require: [
        'Ext.grid.Panel',
        'Savanna.itemView.controller.ItemViewController',
        'Savanna.itemView.view.header.EditHeader',
        'Savanna.itemView.view.header.DisplayLabel',
        'Savanna.itemView.view.header.ViewHeader',
        'Savanna.itemView.view.imageBrowser.ImagesGrid',
        'Savanna.itemView.view.components.AutoCompleteWithTags',
        'Savanna.itemView.view.imageBrowser.ImageThumbnail',
        'Savanna.itemView.view.itemQualities.EditItemQualities',
        'Savanna.itemView.view.components.LabeledFieldWithTags',
        'Savanna.itemView.view.relatedProcesses.RelatedProcesses',
        'Savanna.itemView.view.relatedItems.ViewRelatedItems',
        'Savanna.itemView.view.itemQualities.ViewItemQualities'
    ],

    controller: 'Savanna.itemView.controller.ItemViewController',

    config: {
        itemUri: null
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            '->',
            {
                xtype: 'label',
                text: 'CLASSIFICATION'
            },
            '->'
        ]
    }],

    tbar:{
        ui:'item-view',
        items:[
        {
            xtype: 'button',
            text: 'Options',
            ui:'basic',
            menu: [
                {
                    text: 'New Item...'
                },
                {
                    text: 'Delete'
                },
                {
                    xtype: 'menuseparator'
                },
                {
                    text: 'Workflow'
                },
                {
                    xtype: 'menuseparator'
                },
                {
                    text: 'Search Intell'
                }
            ]
        },
        '->',
        {
            xtype: 'button',
            text: 'Edit'
        }
        ]
    },

    layout:{
        type: 'hbox'
    },
    overflowY: 'auto',
    autoScroll: true,

    constructor: function(configs) {
        this.initConfig(configs);  //initializes configs passed in constructor
        this.callParent(arguments);
    },

    initComponent: function() {

        this.items = this.buildItems();
        this.callParent(arguments);
    },

    buildItems: function() {
        return [
            {
                xtype: 'panel',
                cls: 'item-view-left-column',
                flex: 1,
                items: [
//                    {
//                        xtype: 'itemview_edit_header',
//                        itemId: 'itemEditHeader'
//                    },
                    {
                        xtype: 'itemview_view_header',
                        itemId: 'itemViewHeader',
                        cls:'white-grid-view-panel',
                        header:{
                            ui:'item-view',
                            height:48
                        }
                    },
                    {
                        //ToDo: create related processes component here
                        xtype: 'itemview_related_processes',
                        itemId: 'relatedProcesses',
                        cls:'white-grid-view-panel',
                        collapsible: true,
                        header:{
                            ui:'light-blue'
                        }
                    },
                    {
                        //Todo: create related items component here
                        xtype: 'itemview_view_related_items',
                        itemId: 'relatedItems',
                        cls:'white-grid-view-panel',
                        collapsible: true,
                        title: 'Related Items (#)',
                        header:{
                            ui:'light-blue'
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                flex: 1,
                items: [
//                    {
//                        xtype: 'itemview_imagesgrid',
//                        itemId: 'imagesGrid'
//                    },
//                    {
//                        xtype: 'itemview_edit_qualities',
//                        itemId: 'itemEditProperties',
//                        width: '100%',
//                        collapsible: true,
//                        title: 'Qualities (#)',
//                        header:{
//                            ui:'light-blue'
//                        }
//                    }
                    {
                        xtype: 'itemview_view_qualities',
                        itemId: 'itemViewProperties',
                        cls:'white-grid-view-panel',
                        collapsible: true,
                        header:{
                            ui:'light-blue'
                        }
                    }
                ]
            }
        ];
    }
});
