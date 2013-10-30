/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/25/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.ParentTreeController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.createItem.ParentTree'
    ],
    stores: [
        'Savanna.itemView.store.ParentItemsStore'
    ],

    control: {
        parentitems_treepanel: {
            beforeitemmousedown: 'onBeforeMouseDown',
            itemclick: 'onItemClick',
            beforeitemdblclick: 'onItemDblClick'
        }
    },

    selectedItemExpanded:false,

    onItemDblClick: function (view, record) {
        record.isExpandingOrCollapsing = false;
        return false;
    },

    onBeforeMouseDown:function(view, record, item, index, e, eOpts) {

        this.selectedItemExpanded = record.data.expanded;
    },

    onItemClick: function (view, record, item, index, e, eOpts) {

        this.getView().up('itemview_create_item').selectedParentUri = record.get('uri');

        Savanna.app.fireEvent('itemview:treepanel:itemclick', view, record, item, index, e, eOpts);

        var tree = this.getView().queryById('parentitems_treepanel');

        var selectedNode = tree.getSelectionModel().getSelection()[0] || tree.getRootNode();

        if (this.selectedItemExpanded) {
            selectedNode.collapse();
        } else {
            this.fetchChildItems(record, selectedNode);
        }
    },

    fetchChildItems: function (record, selectedNode) {

        var me = this,
            tree = me.getView().queryById('parentitems_treepanel'),
            uri, myStore;

        if (record.get('hasChildren') && selectedNode.childNodes.length === 0) {

            uri = SavannaConfig.itemViewPerspective + '/' + record.get('id');

            myStore = Ext.create('Savanna.itemView.store.ParentItemsStore', {
                storeId: 'itemview_' + record.get('id')
            })
            myStore.getProxy().url = uri;

            myStore.load({
                callback: Ext.bind(this.onChildItemsFetched, this, [selectedNode, tree], true)
            });
        } else {

            if(selectedNode.childNodes.length > 0)  {
                selectedNode.expand();
            }
        }
    },
    onChildItemsFetched: function (records, operation, success, selectedNode) {

        Ext.each(records, function (record) {
            record.set('leaf', !record.get('hasChildren'));

            if (selectedNode.isLeaf()) {
                //insert the node in the parent node
                selectedNode.parentNode.insertChild(0, record);
            } else {
                //inserting as a child
                selectedNode.insertChild(0, record);
            }
        });

        if (!selectedNode.isExpanded()) {
            selectedNode.expand();
        }
    }
});

