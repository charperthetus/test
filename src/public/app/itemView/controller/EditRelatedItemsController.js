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
        },
        'addRelationshipType': {
            click: 'addRelationshipType'
        }
    },

    relationshipNameArray: [],

    storeHelper: null,

    init: function() {
        this.callParent(arguments);
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
    },

    setupData: function (items) {
        this.storeHelper.init();

        Ext.each(items, function (relatedItemsGroup) {
            this.relationshipNameArray.push(relatedItemsGroup.get('label'));

            this.getView().add(
                {
                    xtype: 'label',
                    text: relatedItemsGroup.get('label'),
                    cls:'h2'
                },{
                    xtype: 'panel',
                    value: relatedItemsGroup.get('predicateUri'),
                    name: relatedItemsGroup.get('label'),
                    border: 5,
                    style: {
                        borderColor: 'gray',
                        borderStyle: 'dashed'
                    },
//                    layout: {
//                        type:'hbox',
//                        align:'center'
//                    },
//                    height: 70,
                    width: '75%',

                    items: [
                        {
                            xtype: 'label',
                            text: 'Drop items here',
                            cls:['drag-and-drop', 'related-items-control'],
                            height: 40
                        },
                        {
                            xtype: 'auto_complete',
                            labelType: 'Find items',
                            showTags: false,
                            itemId: 'addRelatedItem',
                            cls:'related-items-control',
                            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                                urlEndPoint: 'http://c2devsav1:8080/c2is2/rest/mockModelSearch/keyword/property/propUri',
                                paramsObj: {excludeUri:'asdf', pageStart:0, pageLimit:10, keyword: 'asdf'}
                            }),
                            flex: 0,
                            width:200,
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
                var myPanel = this.getView().down('[myId=' + relatedItemsGroup.get('predicateUri') + ']');
                myPanel.add(this.buildAddItem(item, relatedItemsGroup.get('label')));
            }, this);
        }, this);
    },

    addRelationshipType: function(btn) {
        var addNewRelationship = Ext.create('Savanna.itemView.view.relatedItems.RelationshipPicker', {
            width: 500,
            height: 600,
            selectionStore: this.getView().store,
            relationshipNameArray: this.relationshipNameArray
        });

        Savanna.app.fireEvent('ItemView:SaveEnable');

        addNewRelationship.on('close', this.closedRPicker, this);
    },

    closedRPicker: function(view) {
        if (view.updatedStore) {
            this.getView().removeAll();
            this.relationshipNameArray = [];
            this.storeHelper.updateMainStore(this.getView().store.data.items, "Related Items");
            this.setupData(this.getView().store.data.items);
//            this.updateTitle();
            Savanna.app.fireEvent('ItemView:SaveEnable');
        }
    },

    buildAddItem: function(item, itemGroupName) {
        return {
            xtype: 'container',
            myGroupName: itemGroupName,
            cls: 'itemDropZone',
            value: itemGroupName,
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
                    handler: Ext.bind(this.onRemoveRelatedItem, this),
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
        this.removeItem(btn.value, btn.up('container').myGroupName);
        btn.up().up().remove(btn.up('container'));
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    addRelatedItem: function(label, itemRecord, autoCompleteView) {
        var item = {};
        var addRelatedItemPanel = autoCompleteView.up('panel');
        var relatedItemGroupUri = addRelatedItemPanel.value;
        var relatedItemGroupName = addRelatedItemPanel.name;
        var itemLabel = itemRecord.label;
        var itemUri = itemRecord.uri;
        var myPanel = this.getView().down('[myId=' + relatedItemGroupUri + ']');
        item.label = itemLabel;
        item.value = itemUri;
        myPanel.add(this.buildAddItem(item, relatedItemGroupName));
        this.storeHelper.addBotLevItemInStore(itemLabel, itemRecord, this.getView().store.getById(relatedItemGroupName));
        Savanna.app.fireEvent('ItemView:SaveEnable');
    },

    // Removing the tag from the store on a child auto-complete
    removeItem: function(itemName, groupName) {
        this.storeHelper.removeBotLevItemInStore(itemName, this.getView().store.getById(groupName));
        Savanna.app.fireEvent('ItemView:SaveEnable');
    }

});