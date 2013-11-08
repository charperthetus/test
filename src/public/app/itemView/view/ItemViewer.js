Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Savanna.component.ClassificationPanel',

    alias: 'widget.itemview_itemviewer',

    cls: 'itemview',

    requires: [
        'Savanna.component.ClassificationPanel',
        'Ext.grid.Panel',
        'Savanna.itemView.controller.ItemViewController',
        'Savanna.itemView.view.header.ViewHeader',
        'Savanna.itemView.view.header.EditHeader',
        'Savanna.itemView.view.itemQualities.EditItemQualities',
        'Savanna.itemView.view.relatedProcesses.RelatedProcesses',
        'Savanna.itemView.view.relatedItems.ViewRelatedItems',
        'Savanna.itemView.view.relatedItems.EditRelatedItems',
        'Savanna.itemView.view.itemQualities.ViewItemQualities',
        'Savanna.itemView.view.imageBrowser.ImagesGrid',
        'Savanna.itemView.view.imageBrowser.ImagesGridEdit',
        'Savanna.components.autoComplete.AutoComplete',
        'Savanna.itemView.view.imageBrowser.ImageThumbnail',
        'Savanna.itemView.view.workflow.WorkflowSelect',
        'Savanna.itemView.view.annotationProperties.AnnotationProperties',
        'Savanna.component.ClassificationPanel',
        'Savanna.itemView.store.AutoCompleteStore',
        'Savanna.itemView.store.ItemViewStoreHelper',
        'Savanna.metadata.view.Details',
        'Savanna.sources.view.Sources'
    ],

    layout: 'card',


    controller: 'Savanna.itemView.controller.ItemViewController',

    config: {
        itemUri: null,
        editMode:false,
        itemStore:null,
        selectedParentUri: null
    },

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
                xtype:'panel',
                itemId:'itemviewer_viewtab',
                layout:{
                    type: 'hbox',
                    pack: 'end',
                    align : 'stretch'
                },
                overflowY: 'auto',
                tbar:{
                    ui:'thetus-toolbar',
                    height: 33,
                    items:[
                        { xtype: 'tbspacer', width: 5 },
                        {
                            xtype: 'button',
                            text: 'Options',
                            menu: [
                                {
                                    text: 'New Item...',
                                    itemId:'newItemButton'
                                },
                                {
                                    xtype: 'menuseparator'
                                },

                                {
                                    text: 'Workflow',
                                    itemId:'workflowButton'
                                }
                            ]
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'editModeButton',
                            width:25,
                            height:25,
                            cls: 'toolbarButtonFramework',
                            ui:'icon-dark',
                            glyph: 'edit',
                            tooltip: "Edit"
                        },
                        { xtype: 'tbspacer', width: 5 }
                    ]
                },
                items:  [
                    {
                        xtype:'panel',
                        flex:1,
                        bodyStyle:{
                            backgroundColor:"#f2f2f2"
                        },
                        layout:{
                            type: 'hbox',
                            pack: 'center',
                            align : 'stretch'
                        },
                        items:[
                            {
                                xtype:'panel',
                                flex:1,
                                maxWidth:1024,
                                minWidth:640,
                                cls: 'itemview',
                                layout:{
                                    type: 'hbox',
                                    pack: 'center',
                                    align : 'stretch'
                                },
                                items:[
                                    {
                                        xtype: 'panel',
                                        cls: 'item-view-column',
                                        flex:1,
                                        layout:'anchor',
                                        autoScroll: true,
                                        items: [
                                            {
                                                xtype: 'itemview_view_header',
                                                itemId: 'itemViewHeaderView',
                                                cls:'white-grid-view-panel',

                                                header:{
                                                    ui:'item-view',
                                                    height:48,
                                                    padding:'0 0 0 10',
                                                    cls:'item-view-header-header'
                                                }
                                            },
                                            {
                                                xtype: 'itemview_related_processes',
                                                itemId: 'relatedProcessesView',
                                                cls:'white-grid-view-panel',
                                                collapsible: true,
                                                header:{
                                                    ui:'light-blue'
                                                }
                                            },
                                            {
                                                //Todo: create related items component here
                                                xtype: 'itemview_view_related_items',
                                                itemId: 'relatedItemsView',
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
                                        cls: 'item-view-column',
                                        margin:'1 0 0 0',
                                        flex:1,
                                        layout:'anchor',
                                        autoScroll: true,
                                        items: [
                                            {
                                                xtype: 'itemview_imagesgrid',
                                                itemId: 'itemViewImagesGrid',
                                                cls:'white-grid-view-panel',
                                                collapsible: true,
                                                header:{
                                                    ui:'light-blue'
                                                }
                                            },
                                            {
                                                xtype: 'itemview_view_qualities',
                                                itemId: 'itemViewPropertiesView',
                                                cls:'white-grid-view-panel',
                                                collapsible: true,
                                                header:{
                                                    ui:'light-blue'
                                                }
                                            },
                                            {
                                                xtype: 'itemview_annotation_properties',
                                                itemId: 'annotationPropertiesView',
                                                cls:'white-grid-view-panel-edit',
                                                collapsible: true,
                                                header: {
                                                    ui:'light-blue'
                                                }
                                            }
                                        ]
                                    }
                                ]

                            }

                        ]
                    },

                    {
                        xtype: 'panel',
                        itemId: 'itemInfoPanel',
                        title: 'Details',
                        cls:['white-grid-view-panel-edit', 'item-view-column'],
                        autoScroll: true,
                        width: '30%',
                        minWidth:345,
                        maxWidth:412,
                        layout: 'vbox',
                        collapsible: true,
                        animCollapse:false,
                        collapseMode:'header',
                        resizable:true,
                        headerPosition:'left',
                        items: [
                            {
                                xtype: 'document_sources',
                                editMode: false,
                                itemId: 'itemSources',
                                header:{
                                    ui:'light-blue'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype:'panel',
                itemId:'itemviewer_edittab',
                layout:{
                    type: 'hbox',
                    pack: 'start',
                    align : 'stretch'
                },
                overflowY: 'auto',
                autoScroll: true,
                tbar:{
                    ui:'thetus-toolbar',
                    height: 33,
                    items:[
                        { xtype: 'tbspacer', width: 5 },
                        {
                            xtype: 'button',
                            text: 'Options',
                            menu: [
                                {
                                    text: 'New Item...',
                                    itemId:'newItemButton'
                                },

                                {
                                    text: 'Workflow',
                                    itemId:'workflowButton'
                                },

                                {
                                    text: 'Delete',
                                    itemId:'deleteItemButton'
                                }
                            ]
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'editCancelButton',
                            width:25,
                            height:25,
                            cls: 'toolbarButtonFramework',
                            ui:'icon-dark',
                            glyph: 'closeRollover',
                            tooltip: "Cancel Changes"
                        },
                        {
                            xtype: 'button',
                            itemId: 'editDeleteButton',
                            width:25,
                            height:25,
                            cls: 'toolbarButtonFramework',
                            ui:'icon-dark',
                            glyph: 'trash',
                            tooltip: "Delete"
                        },
                        {
                            xtype: 'button',
                            itemId: 'editSaveButton',
                            width:25,
                            height:25,
                            cls: 'toolbarButtonFramework',
                            ui:'icon-dark',
                            glyph: 'save',
                            tooltip: "Save"
                        },
                        {
                            xtype: 'button',
                            itemId: 'editDoneButton',
                            width:25,
                            height:25,
                            cls: 'toolbarButtonFramework',
                            ui:'icon-dark',
                            glyph: 'done',
                            tooltip: "Done"
                        },
                        { xtype: 'tbspacer', width: 5 }
                    ]
                },
                items:  [
                    {
                        xtype:'panel',
                        flex:1,
                        bodyStyle:{
                            backgroundColor:"#f2f2f2"
                        },
                        layout:{
                            type: 'hbox',
                            pack: 'center',
                            align : 'stretch'
                        },
                        items:[
                            {
                                xtype:'panel',
                                flex:1,
                                maxWidth:1024,
                                minWidth:640,
                                cls: 'itemview',
                                layout:{
                                    type: 'hbox',
                                    pack: 'center',
                                    align : 'stretch'
                                },
                                items:[
                                    {
                                        xtype: 'panel',
                                        cls: 'item-view-column',
                                        flex:1,
                                        layout:'anchor',
                                        autoScroll: true,
                                        items: [
                                            {
                                                xtype: 'itemview_edit_header',
                                                itemId: 'itemViewHeaderEdit',
                                                cls:'white-grid-view-panel-edit'
                                            },
                                            {
                                                xtype: 'itemview_related_processes',
                                                itemId: 'relatedProcessesViewEdit',
                                                cls:'white-grid-view-panel-edit',
                                                collapsible: true,
                                                header:{
                                                    ui:'light-blue'
                                                }
                                            },
                                            {
                                                xtype: 'itemview_edit_related_items',
                                                itemId: 'relatedItemsEdit',
                                                cls:'white-grid-view-panel-edit',
                                                collapsible: true,
                                                padding:'0 0 10 0',
                                                title: 'Related Items (#)',
                                                header:{
                                                    ui:'light-blue'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'panel',
                                        cls: 'item-view-column',
                                        flex:1,
                                        layout:'anchor',
                                        autoScroll: true,
                                        items: [
                                            {
                                                xtype: 'itemview_imagesgrid_edit',
                                                itemId: 'itemViewImagesEdit',
                                                cls:'white-grid-view-panel-edit',
                                                collapsible: true,
                                                header:{
                                                    ui:'light-blue'
                                                }
                                            },
                                            {
                                                xtype: 'itemview_edit_qualities',
                                                itemId: 'itemViewPropertiesEdit',
                                                cls:['white-grid-view-panel-edit', 'edit-qualities'],
                                                collapsible: true,
                                                header:{
                                                    ui:'light-blue'
                                                }
                                            },
                                            {
                                                xtype: 'itemview_annotation_properties',
                                                itemId: 'annotationPropertiesEdit',
                                                cls:'white-grid-view-panel-edit',
                                                collapsible: true,
                                                header: {
                                                    ui:'light-blue'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }

                        ]
                    },

                    {
                        xtype: 'panel',
                        itemId: 'itemInfoPanel',
                        title: 'Details',
                        width: '30%',
                        minWidth:345,
                        maxWidth:412,
                        cls:['white-grid-view-panel-edit', 'item-view-column'],
                        autoScroll: true,
                        layout: 'vbox',
                        collapsible: true,
                        animCollapse:false,
                        collapseMode:'header',
                        resizable:true,
                        headerPosition:'left',
                        items: [
                            {
                                xtype: 'document_sources',
                                editMode: true,
                                itemId: 'itemSourcesEdit',
                                header:{
                                    ui:'light-blue'
                                }
                            }
                        ]
                    }
                ]
            }
        ];
    }
});
