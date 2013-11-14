Ext.define('Savanna.process.view.metadata.ProcessCategoryPanel', {
    extend: 'Ext.tree.Panel',

    requires: [
        'Savanna.process.store.ProcessCategoryStore',
        'Savanna.process.model.ProcessCategoryModel'
    ],

    alias: 'widget.process_category_panel',

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
            this.store.getProxy().url = SavannaConfig.processCategoryPerspective + record.data.id;

            this.up('process_category_window').selectedCategoryUri = record.get('uri');
            this.up('process_category_window').selectedCategoryLabel = record.get('label');
        }
    },

    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            store: new Savanna.process.store.ProcessCategoryStore({
                rootId: me.rootId
            })
        });
        this.callParent();
    }
});
