Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Ext.Panel',

    alias: 'widget.itemview_itemviewer',

    cls: 'itemview',

    require: [
        'Ext.grid.property.Grid'
    ],

    layout: 'hbox',

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
                        xtype: 'itemview_displaylabel',
                        itemId: 'itemDisplayLabel'
                    },
                    {
                        xtype: 'itemview_boilerplate',
                        itemId: 'boilerplate'
                    },
                    {
                        xtype: 'itemview_relatedcontent',
                        itemId: 'relatedContent'
                    },
                    {
                        xtype: 'itemview_annotations',
                        itemId: 'annotationGrid'
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
                        xtype: 'component',
                        html: '<h3 class="item-view">Properties</h3>'
                    },
                    {
                        xtype: 'propertygrid',
                        itemId: 'propGrid',
                        hideHeaders: true,
                        width: '100%',
                        source: {
                        }
                    },
                    {
                        xtype: 'itemview_confusers',
                        itemId: 'confusers'
                    }
                ]
            }
        ];
    }
});
