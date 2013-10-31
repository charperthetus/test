Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_itemviewer',

    cls: 'itemview',

    requires: [
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
        'Savanna.components.autoComplete.AutoComplete',
        'Savanna.itemView.view.imageBrowser.ImageThumbnail',
        'Savanna.itemView.view.workflow.WorkflowSelect',
        'Savanna.itemView.view.annotationProperties.AnnotationProperties',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    layout: 'card',
    margin:'auto',
    maxWidth:720,
    controller: 'Savanna.itemView.controller.ItemViewController',

    config: {
        itemUri: null,
        editMode:false,
        createMode:false
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
                    type: 'hbox'
                },
                overflowY: 'auto',
                autoScroll: true,
                tbar:{
                    ui:'item-view',
                    items:[
                        {
                            xtype: 'button',
                            text: 'Options',
                            ui:'basic',
                            menu: [
                                {
                                    text: 'New Item...',
                                    itemId:'newItemButton'
                                },
                                {
                                    text: 'Delete',
                                    itemId:'deleteItemButton'
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    text: 'Workflow',
                                    itemId:'workflowButton'
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    text: 'Search Intell',
                                    itemId:'searchButton'
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    text: 'Relationship Picker',
                                    itemId:'relationshipButton'
                                }
                            ]
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'editModeButton',
                            text: 'Edit'
                        }
                    ]
                },
                items:  [
                    {
                        xtype: 'panel',
                        cls: 'item-view-left-column',
                        flex: 1,
                        items: [
                            {
                                xtype: 'itemview_view_header',
                                itemId: 'itemViewHeaderView',
                                cls:'white-grid-view-panel',
                                header:{
                                    ui:'item-view',
                                    height:48
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
                        flex: 1,
                        items: [                            
                            {
                                xtype: 'itemview_imagesgrid',
                                itemId: 'itemViewImagesGrid'
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
            },
            {
                xtype:'panel',
                itemId:'itemviewer_edittab',
                layout:{
                    type: 'hbox'
                },
                overflowY: 'auto',
                autoScroll: true,
                tbar:{
                    ui:'item-view',
                    items:[
                        {
                            xtype: 'button',
                            text: 'Options',
                            ui:'basic',
                            menu: [
                                {
                                    text: 'New Item...',
                                    itemId:'newItemButton'
                                },
                                {
                                    text: 'Delete',
                                    itemId:'deleteItemButton'
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    text: 'Workflow',
                                    itemId:'workflowButton'
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    text: 'Search Intell',
                                    itemId:'searchButton'
                                },
                                {
                                    xtype: 'menuseparator'
                                },
                                {
                                    text: 'Relationship Picker',
                                    itemId:'relationshipButton'
                                }
                            ]
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'editCancelButton',
                            text: 'Discard Changes'
                        },
                        {
                            xtype: 'button',
                            itemId: 'editDeleteButton',
                            text: 'Delete'
                        },
                        {
                            xtype: 'button',
                            itemId: 'editSaveButton',
                            text: 'Save'
                        },
                        {
                            xtype: 'button',
                            itemId: 'editDoneButton',
                            text: 'Done'
                        }
                    ]
                },
                items:  [
                    {
                        xtype: 'panel',
                        cls: 'item-view-left-column',
                        flex: 1,
                        items: [
                            {
                                xtype: 'itemview_edit_header',
                                itemId: 'itemViewHeaderEdit',
                                cls:'white-grid-view-panel-edit',
                                header:{
                                    ui:'white'
                                }
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
                                //Todo: create related items component here
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
                        flex: 1,
                        items: [
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
        ];
    }
});
