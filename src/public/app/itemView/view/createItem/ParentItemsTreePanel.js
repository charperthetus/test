Ext.define('Savanna.itemView.view.createItem.ParentItemsTreePanel', {
    extend: 'Ext.tree.Panel',

    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Savanna.itemView.store.ParentItemsStore',
        'Savanna.itemView.model.ParentItemsTreeModel'
    ],

    alias: 'widget.itemview_treepanel',

    useArrows: true,
    titleCollapse: true,
    rootVisible: false,
    width: '100%',
    height: '100%',
    margin: 7,
    padding: 0,
    frame: true,
    cls: 'tree_wrap',
    forceFit: true,
    displayField: 'label',
    config: {
        rootId: null
    },

    listeners: {
        beforeitemclick: function (view, record, item, index, e, eOpts) {
            this.store.getProxy().url = SavannaConfig.itemViewPerspective + record.data.id;

            this.up('itemview_create_item').selectedParentUri = record.get('uri');
            this.up('itemview_create_item').selectedParentLabel = record.get('label');
            //TODO - this needs to be done a different way, can't fire on app (or eventhub)
            Savanna.app.fireEvent('itemview:treepanel:itemclick', view, record, item, index, e, eOpts);
        }
    },

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            store: new Savanna.itemView.store.ParentItemsStore({
                rootId: me.rootId
            })
        });
        this.callParent();
    }
});
