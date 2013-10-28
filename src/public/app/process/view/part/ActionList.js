/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/21/13
 * Time: 9:10 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/20/13
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.ActionList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.process_actionlist',
    requires: [
        'Savanna.process.store.ProcessActionStore',
        'Ext.grid.plugin.DragDrop'
    ],

    store: 'Savanna.process.store.ProcessActionStore',
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

    title: 'Actions',
    titleAlign: 'center',
    emptyText: 'No Actions',

    hideHeaders: true,
    columns: [
        {
            dataIndex: 'label'
        }
    ],

    tbar: [
        {
            xtype: 'textfield',
            itemId: 'actiontext',
            emptyText: 'Find and Add Actions',
            width: '100%'
        }
    ],

    initComponent: function() {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    }
});