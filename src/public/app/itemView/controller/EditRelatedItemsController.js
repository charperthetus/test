/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/25/13
 * Time: 8:41 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.controller.EditRelatedItemsController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.relatedItems.EditRelatedItems'
    ],

    control: {
        view: {
            'EditRelatedItems:SetupData': 'setupData'
        }
    },

    setupData: function (items) {
        var me = this;

        Ext.each(items, function (relatedItemsGroup) {

            me.getView().add(
                {
                    xtype: 'label',
                    text: relatedItemsGroup.get('label')
                },{
                    xtype: 'panel',
                    border: 5,
                    style: {
                        borderColor: 'gray',
                        borderStyle: 'dashed'
                    },
                    layout: 'hbox',

                    height: 50,
                    width: '100%',

                    items: [
                        {
                            xtype: 'container',
                            width: 80,
                            height: 80,
                            layout: 'vbox',

                            items: [
                                {
                                    xtype: 'image',
                                    glyph: 61777
                                },
                                {
                                    xtype: 'label',
                                    text: 'Drop items here',
                                    height: 30,
                                    width: 70
                                }
                            ]

                        },
{
                            xtype: 'auto_complete'
                        }

                    ]

                }

            );
            console.log('relatedItemsGroup', relatedItemsGroup.data.values[0].label);
            Ext.each(relatedItemsGroup.data.values, function(item) {
                me.getView().add(
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                text: item.label

                            },
                            {
                                xtype: 'button',
                                text: 'X'
                            }
                        ]
                    }
                );
            });

//            var grid = Ext.create('Ext.grid.Panel', {
//                store: relatedItemsGroup.valuesStore,
//                columns: [
//                    {
//                        xtype: 'templatecolumn',
//                        tpl: Ext.create('Ext.XTemplate',
//                            '<input type="button" name="{value}" value="{label}" id="openRelatedItem" />'
//                        ),
//                        text: relatedItemsGroup.get('label'),
//                        flex: 1,
//                        sortable: false
//                    }
//                ],
//                listeners: {
//                    itemclick: me.onRelatedItemClick
//                }
//            });
//
//            me.getView().add(grid);
        });
    }

//    onRelatedItemClick: function (grid, record, item, index, e, eOpts) {
//        if (e.target.id == "openRelatedItem") {
//            grid.up('itemview_view_related_items').fireEvent('ItemView:OpenItem', e.target.value, e.target.name);
//        }
//    }
});