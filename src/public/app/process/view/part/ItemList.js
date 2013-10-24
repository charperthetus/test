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

    inject: ['processItemStore'],

    config: {
        processItemStore: null
    },

    viewConfig: {
        plugins: {
            dragGroup: 'PaletteItemDrag',
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
        this.store = this.getProcessItemStore();
        this.callParent(arguments);
    }
});