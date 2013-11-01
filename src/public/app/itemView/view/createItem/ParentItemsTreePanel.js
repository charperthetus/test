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
    height: 400,
    style: "line-height: 21;",
    forceFit: true,
    displayField: 'label',
    rootId: '183710',

    listeners: {
        beforeitemclick: function(view, record, item, index, e, eOpts)    {
            this.store.getProxy().url = SavannaConfig.itemViewPerspective + record.data.id;

            this.up('itemview_create_item').selectedParentUri = record.get('uri');

            Savanna.app.fireEvent('itemview:treepanel:itemclick', view, record, item, index, e, eOpts);
        }
    },

    initComponent: function () {
        Ext.apply(this, {
            store: new Savanna.itemView.store.ParentItemsStore({})
        });
        this.callParent();
    }
});
