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
            this.getView().add(
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
                            showTags: false,
                            itemId: 'addRelatedItem',
                            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                                urlEndPoint: 'http://c2devsav1:8080/c2is2/rest/mockModelSearch/keyword/property/propUri',
                                paramsObj: {excludeUri:'asdf', pageStart:0, pageLimit:10}
                            }),
                            flex: 1,
                            listeners: {
                                'AutoComplete:ItemSelected': Ext.bind(this.addRelatedItem, this)
                            }

                        }

                    ]

                },{
                    xtype: 'panel',
                    layout: 'vbox',
                    width: '100%',
                    myId: relatedItemsGroup.get('predicateUri')

                }

            );
            Ext.each(relatedItemsGroup.data.values, function(item) {
                var myPanel = this.getView().down('[myId=' + relatedItemsGroup.get('predicateUri') + ']')
                myPanel.add(this.buildAddItem(item, relatedItemsGroup.get('predicateUri'))

                );
            }, this);
        }, this);
    },

    buildAddItem: function(item, itemGroupUri) {
        return {
            xtype: 'container',
            cls: 'itemDropZone',
            value: itemGroupUri,
            layout: 'hbox',
            items: [
                {
                    xtype: 'button',
                    text: item.label,
                    handler: this.onRelatedItemClick,
                    name: item.value


                },
                {
                    xtype: 'button',
                    text: 'X',
                    handler: this.onRemoveRelatedItem,
                    name: item.value,
                    value: item.label
                }
            ]
        }
    },
    onRelatedItemClick: function (btn) {
        btn.up('itemview_edit_related_items').fireEvent('ItemView:OpenItem', btn.text, btn.name);
    },

    onRemoveRelatedItem: function(btn)  {
        btn.up('itemview_edit_related_items').fireEvent('ItemView:DeleteRelatedItem', btn.value, btn.name);
        btn.up('itemview_edit_related_items').remove(btn.up('container'));
    },

    addRelatedItem: function(label, itemRecord, autoCompleteView) {
        var item = {};
        var addRelatedItemPanel = autoCompleteView.up('panel');
        var relatedItemGroupUri = addRelatedItemPanel.value;
        var itemLabel = itemRecord.label;
        var itemUri = itemRecord.uri;
        var myPanel = this.getView().down('[myId=' + relatedItemGroupUri + ']')
        item.label = itemLabel;
        item.value = itemUri;
        myPanel.add(this.buildAddItem(item, relatedItemGroupUri));
    }

});