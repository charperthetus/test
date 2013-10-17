Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Ext.Panel',

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
        'Savanna.itemView.view.relatedItems.ViewRelatedItems'
    ],

    controller: 'Savanna.itemView.controller.ItemViewController',

    config: {
        itemUri: null
    },

    tbar: [
        {
            xtype: 'splitbutton',
            text: 'Options',
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
    ],

    layout:{
        type: 'hbox',
        align: 'stretch'
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
                cls: 'BoilerPlatePropertyGrid',
                flex: 1,
                items: [
                    {
                        xtype: 'itemview_edit_header',
                        itemId: 'itemEditHeader'
                    },
                    {
                        xtype: 'itemview_view_header',
                        itemId: 'itemViewHeader'
                    },
                    {
                        //ToDo: create related processes component here
                        xtype: 'itemview_related_processes',
                        itemId: 'relatedProcesses',
                        collapsible: true,
                        title: 'Participated in Process (#)',
                        store: null,
                        header:{
                            ui:'light-blue'
                        }
                    },
                    {
                        //Todo: create related items component here
                        xtype: 'itemview_view_related_items',
                        itemId: 'relatedItems',
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
                    {
                        xtype: 'itemview_imagesgrid',
                        itemId: 'imagesGrid'
                    },
                    {
                        xtype: 'item_edit_qualities',
                        itemId: 'itemProperties',
                        width: '100%',
                        collapsible: true,
                        title: 'Qualities (#)',
                        header:{
                            ui:'light-blue'
                        }
                    }
                ]
            }
        ];
    }
});
