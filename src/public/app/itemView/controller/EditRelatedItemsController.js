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

    requires: ['Savanna.itemView.view.relatedItems.RelationshipPicker'],

    control: {
        view: {
            'EditRelatedItems:SetupData': 'setupData'
        },
        'addRelationshipType': {
            click: 'addRelationshipType'
        }
    },

    relationshipNameArray: [],

    setupData: function (items) {
        Ext.each(items, function (relatedItemsGroup) {
            this.relationshipNameArray.push(relatedItemsGroup.get('label'));

            this.getView().add(
                {
                    xtype: 'label',
                    text: relatedItemsGroup.get('label'),
                    cls:['h2', 'related-item-edit-header'],
                    width:'100%'
                },{
                    xtype: 'panel',
                    value: relatedItemsGroup.get('predicateUri'),
                    name: relatedItemsGroup.get('label'),
                    margin:'0 0 10 0',
                    listeners: {
                        boxready: Ext.bind(this.onDropItemReady, this)
                    },
                    height: 130,
                    width: '100%',
                    margin:'0 10 10 10',
                    cls:'related-item-edit-drop-zone',
//                    bodyStyle:'width:100%;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Drop items here',
                            cls:['drag-and-drop', 'related-items-control'],
                            height: 25
                        },
                        {
                            xtype: 'label',
                            text: 'OR',
                            cls:['h2'],
                            height: 20
                        },
                        {
                            xtype: 'auto_complete',
                            labelType: 'Find items',
                            showTags: false,
                            itemId: 'addRelatedItem',
                            cls:'related-items-control',
                            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                                urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/keyword/property/' + encodeURI(relatedItemsGroup.get('predicateUri')),
                                paramsObj: { pageStart:0, pageSize:20, alphabetical: true }
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
            relationshipNameArray: this.relationshipNameArray,
            storeHelper: this.getView().storeHelper
        });

        addNewRelationship.on('close', this.closedRPicker, this);
    },

    closedRPicker: function(view) {
        if (view.updatedStore) {
            this.getView().removeAll();
            this.relationshipNameArray = [];
            this.getView().storeHelper.updateMainStore(this.getView().store.data.items, "Related Items");
            this.setupData(this.getView().store.data.items);
//            this.updateTitle();
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
    onDropItemReady: function(container){
        var myDropBox = container.getEl();
        if (myDropBox){
            container.dropTarget = Ext.create('Ext.dd.DropTarget', myDropBox.dom, {
                ddGroup: 'RNRM-ITEMS',
                notifyOver: Ext.bind(this.notifyItemOverTarget, this),
                notifyDrop: Ext.bind(this.notifyItemDropTarget, this, container, true)
            });
        }
    },

    notifyItemOverTarget: function(ddSource, e, data) {
        //don't allow anything other than an Item to be dropped into the item palette
        if (this.dragDataIsItem(data)) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    notifyItemDropTarget: function(ddSource, e, data, container) {
        //only create a new palette item if the dragged data does not already exist in the palette

        //too bad we can't use the itemListHasDupes() function, but if the drag data has multiple records, then we
        //need to do the dupe check for each one and add it if we can (unless we want to abort the whole drag if just
        //one drag item is invalid)
        data.records.forEach(function(rec) {
            var obj = rec.data;
            // TODO check to make sure item doesn't already exist
            this.addRelatedItem(obj.label, obj, container.down('#addRelatedItem'))
        }, this);
    },
    dragDataIsItem: function(data) {
        var returnVal = true;
        data.records.forEach(function(rec) {
            var obj = rec.data;
            if (obj.type !== 'Item') {
                returnVal = false
            }
        });
        return returnVal;
    },

    onRelatedItemClick: function (btn) {
        btn.up('itemview_edit_related_items').fireEvent('ItemView:OpenItem', btn.text, btn.name);
    },

    onRemoveRelatedItem: function(btn)  {
        this.removeItem(btn.value, btn.up('container').myGroupName);
        btn.up().up().remove(btn.up('container'));
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
        this.getView().storeHelper.addBotLevItemInStore(itemLabel, itemRecord, this.getView().store.getById(relatedItemGroupName))
    },

    // Removing the tag from the store on a child auto-complete
    removeItem: function(itemName, groupName) {
        this.getView().storeHelper.removeBotLevItemInStore(itemName, this.getView().store.getById(groupName));
    }

});