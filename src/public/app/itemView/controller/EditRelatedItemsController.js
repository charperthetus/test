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
                    value: relatedItemsGroup.get('predicateUri'),
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
                            xtype: 'auto_complete',
                            labelType: 'Find items',
                            showTags: true,
                            itemId: 'addRelatedItem',
                            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                                urlEndPoint: 'http://c2devsav1:8080/c2is2/rest/mockModelSearch/keyword/property/propUri',
                                paramsObj: {excludeUri:'asdf', pageStart:0, pageLimit:10}
                            }),
                            flex: 1,
                            listeners: {
                                'AutoComplete:ItemSelected': me.addRelatedItem
                            }

                        }

                    ]

                }

            );
            Ext.each(relatedItemsGroup.data.values, function(item) {
                me.getView().add(
                    {
                        xtype: 'container',
                        cls: 'itemDropZone',
                        value: relatedItemsGroup.get('predicateUri'),
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                text: item.label,
                                handler: me.onRelatedItemClick,
                                name: item.value


                            },
                            {
                                xtype: 'button',
                                text: 'X',
                                handler: me.onRemoveRelatedItem,
                                name: item.value,
                                value: item.label
                            }
                        ]
                    }
                );
            });
        });
    },

    onRelatedItemClick: function (btn) {
        btn.up('itemview_edit_related_items').fireEvent('ItemView:OpenItem', btn.text, btn.name);
    },

    onRemoveRelatedItem: function(btn)  {
        btn.up('itemview_edit_related_items').fireEvent('ItemView:DeleteRelatedItem', btn.value, btn.name);
        btn.up('itemview_edit_related_items').remove(btn.up('container'));
    },

    addRelatedItem: function(label, itemRecord, autoCompleteView) {
        console.log(autoCompleteView.up('panel'));
    }
});