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

    selectedItemExpanded: false,

    fetching: false,

    clickDisabled: false,

    onItemDblClick: function (view, record) {
        record.isExpandingOrCollapsing = false;
        return false;
    },

    onBeforeMouseDown: function (view, record) {
        this.selectedItemExpanded = record.data.expanded;
    },

    clickEnable:function()  {
        if(!this.fetching)  {
            this.clickDisabled = false;
            this.getView().queryById('parentitems_treepanel').getEl().setOpacity(1, true);
        }
    },

    onItemClick: function (view, record, item, index, e, eOpts) {

        if (!this.clickDisabled) {
            /*
            slow down, chief - you're literally freaking me out
             */
            this.clickDisabled = true;

            Ext.defer(this.clickEnable, 800, this);

            var tree = this.getView().queryById('parentitems_treepanel'),
                selectedNode = tree.getSelectionModel().getSelection()[0] || tree.getRootNode();

            if (record.data.hasChildren) {
                /*
                 record can be expanded or collapsed
                 */
                if (record.childNodes.length === 0) {
                    /*
                     record has not loaded children yet
                     */
                    if (!this.selectedItemExpanded) {
                        /*
                         record is not expanded, else do nothing
                         */
                        if (!this.fetching) {
                            /*
                             there isn't a request already active
                             */
                            this.fetching = true;
                            tree.getEl().setOpacity(.7, true);
                            this.fetchChildItems(record, selectedNode);
                        }
                    }

                } else {
                    /*
                     record has children, and they are already loaded
                     */
                    if (!this.selectedItemExpanded) {
                        /*
                         record is not expanded
                         */
                        record.expand();
                    } else {
                        /*
                         record is expanded
                         */
                        record.collapse();
                    }
                }
            } else {
                /*
                 this must be a leaf
                 */
            }
            /*
             always show details on the left
             */
            this.getView().up('itemview_create_item').selectedParentUri = record.get('uri');
            Savanna.app.fireEvent('itemview:treepanel:itemclick', view, record, item, index, e, eOpts);
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
            });
            myStore.getProxy().url = uri;

            myStore.load({
                callback: Ext.bind(this.onChildItemsFetched, this, [selectedNode, tree], true)
            });
        }
    },
    onChildItemsFetched: function (records, operation, success, selectedNode) {

        selectedNode.removeAll();

        Ext.each(records, function (record) {
            record.set('leaf', !record.get('hasChildren'));
            /*
            inserting as a child
             */
            selectedNode.insertChild(0, record);
        });

        selectedNode.expand();

        this.fetching = false;

        this.clickEnable();
    }
});

