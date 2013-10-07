Ext.define('Savanna.itemView.view.ItemViewer', {
    extend: 'Ext.Panel',

    alias: 'widget.itemview_itemviewer',

    cls: 'itemview',

    require: [
        'Ext.grid.property.Grid'
    ],

    layout: 'hbox',
    overflowY: 'auto',
    autoScroll: true,

    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
    },

    buildItems: function() {
        console.log(this.height);
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
                        //Todo: modify this to become related items
                        xtype: 'itemview_relatedcontent',
                        itemId: 'relatedContent'
                    },

                    //ToDo: none of this is present in the current design so remove them
                    {
                        xtype: 'itemview_boilerplate',
                        itemId: 'boilerplate'
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
                        //ToDo: switch this out for Joel's image browser
                        xtype: 'itemview_imagesgrid',
                        itemId: 'imagesGrid'
                    },
                    {
                        //ToDo: modify this to become the properties component
                        xtype: 'propertygrid',
                        itemId: 'propGrid',
                        hideHeaders: true,
                        width: '100%',
                        source: {
                        }
                    },

                    //ToDo: not present in current design so remove it
                    {
                        xtype: 'itemview_confusers',
                        itemId: 'confusers'
                    }
                ]
            }
        ];
    }
});
