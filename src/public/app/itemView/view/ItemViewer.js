Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Ext.Panel',

    alias: 'widget.itemview_itemviewer',

    cls: 'itemview',

    require: [
        'Ext.grid.property.Grid',
        'Savanna.itemView.view.itemView.Toolbar'
    ],

    tbar: [
        {
            xtype: 'itemview_toolbar'
        }
    ],

    layout: 'hbox',
    overflowY: 'auto',
    autoScroll: true,

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
                        xtype: 'itemview_header',
                        itemId: 'itemHeader'
                    },
                    {
                        //ToDo: create related processes component here
                        xtype: 'itemview_related_processes',
                        itemId: 'relatedProcesses',
                        collapsible: true,
                        title: 'Participated in Process (#)',
                        store: null
                    },
                    {
                        //Todo: create related items component here
                        xtype: 'itemview_related_items',
                        itemId: 'relatedItems',
                        collapsible: true,
                        title: 'Related Items (#)'
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
                        xtype: 'item_properties',
                        itemId: 'itemProperties',
                        width: '100%',
                        collapsible: true,
                        title: 'Qualities (#)'
                    }
                ]
            }
        ];
    }
});
