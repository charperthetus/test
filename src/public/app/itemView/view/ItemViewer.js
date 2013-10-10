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
                    },
                    {
                        //Todo: create related items component here
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
                        xtype: 'button',
                        text: 'Add Property',
                        renderTo: Ext.getBody(),
                        itemId: 'addPropBtn'
                    },
                    {
                        xtype: 'item_properties',
                        itemId: 'itemProperties',
                        width: '100%'
                    }
                ]
            }
        ];
    }
});
