Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Ext.tab.Panel',

    alias: 'widget.itemview_itemviewer',

    cls: 'itemview',

    requires: [
        'Ext.grid.Panel',
        'Savanna.itemView.controller.ItemViewController',
        'Savanna.itemView.view.header.ViewHeader',
        'Savanna.itemView.view.header.EditHeader',
        'Savanna.itemView.view.itemQualities.EditItemQualities',
        'Savanna.itemView.view.itemQualities.EditItemQualities',
        'Savanna.itemView.view.header.DisplayLabelView',
        'Savanna.itemView.view.relatedProcesses.ViewRelatedProcesses',
        'Savanna.itemView.view.relatedItems.ViewRelatedItems',
        'Savanna.itemView.view.relatedItems.EditRelatedItems',
        'Savanna.itemView.view.itemQualities.ViewItemQualities',
        'Savanna.itemView.view.itemQualities.EditItemQualities',
        'Savanna.itemView.view.imageBrowser.ImagesGrid',
        'Savanna.itemView.view.components.AutoCompleteWithTags',
        'Savanna.itemView.view.imageBrowser.ImageThumbnail',
        'Savanna.itemView.view.components.LabeledFieldWithTags',
        'Savanna.components.boxSelect.AutoCompleteBox'
    ],

    controller: 'Savanna.itemView.controller.ItemViewController',

    config: {
        itemUri: null,
        editMode:false
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
            itemId: 'editModeButton',
            text: 'Edit'
        }
    ],



    constructor: function(configs) {
        this.initConfig(configs);  //initializes configs passed in constructor
        this.callParent(arguments);
    },

    initComponent: function() {

        this.items = this.buildItems();

        this.callParent(arguments);

        this.tabBar.hide();
        this.componentLayout.childrenChanged = true;
        this.doComponentLayout();
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
                items:  [
                    {
                        xtype: 'panel',
                        cls: 'BoilerPlatePropertyGrid',
                        flex: 1,
                        items: [
                            {
                                xtype: 'itemview_view_header',
                                itemId: 'itemViewHeaderView',
                                header:{
                                    ui:'white'
                                }
                            },
                            {
                                xtype: 'itemview_view_related_processes',
                                itemId: 'relatedProcessesView',
                                collapsible: true,
                                header:{
                                    ui:'light-blue'
                                }
                            },
                            {
                                //Todo: create related items component here
                                xtype: 'itemview_view_related_items',
                                itemId: 'relatedItemsView',
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
                                xtype: 'itemview_view_qualities',
                                itemId: 'itemViewPropertiesView',
                                collapsible: true,
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
                    type: 'hbox'
                },
                overflowY: 'auto',
                autoScroll: true,
                items:  [
                    {
                        xtype: 'panel',
                        cls: 'BoilerPlatePropertyGrid',
                        flex: 1,
                        items: [
                            {
                                xtype: 'itemview_edit_header',
                                itemId: 'itemViewHeaderEdit',
                                header:{
                                    ui:'white'
                                }
                            },
                            {
                                xtype: 'itemview_view_related_processes',
                                itemId: 'relatedProcessesView',
                                collapsible: true,
                                header:{
                                    ui:'light-blue'
                                }
                            },
                            {
                                //Todo: create related items component here
                                xtype: 'itemview_edit_related_items',
                                itemId: 'relatedItemsEdit',
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
                                xtype: 'itemview_edit_qualities',
                                itemId: 'itemViewPropertiesEdit',
                                collapsible: true,
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
