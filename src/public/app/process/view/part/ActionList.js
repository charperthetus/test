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

    inject: ['processActionStore'],

    config: {
        processActionStore: null
    },

    viewConfig: {
        plugins: {
            dragGroup: 'PalleteActionDrag',
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
        this.store = this.getProcessActionStore();
        this.callParent(arguments);
    }
});