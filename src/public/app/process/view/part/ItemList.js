/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/20/13
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.ItemList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.process_itemlist',
    requires: [
        'Savanna.process.store.ProcessItemStore'
    ],

    store: 'Savanna.process.store.ProcessItemStore',
    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    viewConfig: {
        plugins: {
            dragGroup: 'RNRM-ITEMS',
            dropGroup: 'RNRM-ITEMS',
            ptype: 'gridviewdragdrop',
            enableDrop: true,
            enableDrag: true
        }
    },

    title: 'Items',
    titleAlign: 'center',

    hideHeaders: true,
    columns: [
        {
            dataIndex: 'label'
        }
    ],

    tbar: [
        {
            //todo: need drop icon here...
            xtype: 'label',
            text: 'Drop Items'
        },
        '->',
        {
            xtype: 'label',
            text: 'OR'
        },
        '->',
        {
            xtype: 'button',
            itemId: 'searchitems',
            text: 'Search'
        }
    ],

    initComponent: function() {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    onStoreLoad: function() {
        console.log(this.store);
    }
});