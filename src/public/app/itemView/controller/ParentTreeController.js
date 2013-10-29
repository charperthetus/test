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
            cellclick: 'onItemClick'
        }
    },


    onItemClick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        console.log(record);
        Savanna.app.fireEvent('itemview:treepanel:itemclick', view, td, cellIndex, record, tr, rowIndex, e, eOpts);

        this.fetchChildItems(view, td, cellIndex, record, tr, rowIndex, e, eOpts);
    },

    fetchChildItems: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this,
            tree = me.getView().queryById('parentitems_treepanel'),
            selectedNode = tree.getSelectionModel().getSelection()[0] || tree.getRootNode(),
            uri, myStore;

        if(record.get('hasChildren') && selectedNode.childNodes.length === 0) {
        uri = SavannaConfig.itemViewPerspective + '/' + record.get('id');
        myStore = Ext.create('Savanna.itemView.store.ParentItemsStore', {
            storeId: 'itemview_' + record.get('id')
        })
        myStore.getProxy().url = uri;

        myStore.load({
            callback: Ext.bind(this.onChildItemsFetched, this, [selectedNode, tree], true)
        });
        }   else    {
            console.log('already loaded?')
        }
    },
    onChildItemsFetched: function (records, operation, success, selectedNode) {
        console.log(selectedNode);

        Ext.each(records, function (record) {
            record.set('leaf', !record.get('hasChildren'));

            if (selectedNode.isLeaf()) {
                //insert the node in the parent node
                selectedNode.parentNode.insertChild(0, record);
            } else {
                //inserting as a child
                selectedNode.insertChild(0, record);
            }
            selectedNode.expand();
        });
    }
});

