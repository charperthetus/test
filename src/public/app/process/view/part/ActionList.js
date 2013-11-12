/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/21/13
 * Time: 9:10 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.ActionList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.process_actionlist',
    requires: [
        'Ext.grid.plugin.DragDrop',
        'Savanna.process.model.Node'
    ],

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'RNRM-ITEMS',
            dropGroup: 'RNRM-ITEMS',
            enableDrop: true,
            enableDrag: true
        },
        copy: true
    },

    title: 'Actions',
    titleAlign: 'left',
    emptyText: 'Drop actions here for use in process steps or search the model to find new actions',
    style: {
        backgroundColor: '#F2F2F2'
    },
    hideHeaders: true,
    cls: 'draggable-hover-select',
    columns: [
        {
            dataIndex: 'label',
            width: 180
        }
    ],

    tbar:
    {
        itemId: 'actionTools',
        height: 47,
        border: 1,
        padding: 10,
        margin: 10,
        backgroundColor: '#F2F2F2',
        ui: 'drop-zone-toolbar',
        style: {
            borderStyle: 'dashed',
            borderColor: '#999999',
            backgroundColor: '#F2F2F2'
        },
        items: [
            {   xtype: 'tbspacer', width: 15 },
            {
                xtype: 'label',
                text: 'Actions',
                cls: ['drag-and-drop', 'drag-and-drop-small'],
                tooltip: 'Drop actions'
            },
            '->',
            {
                xtype: 'label',
                text: 'OR'
            },
            '->',
            {
                xtype: 'button',
                itemId: 'searchItems',
                text: 'Search',
                ui: 'commit',
                tooltip: 'Click to search for Red Nodal Model actions.'
            },
            {   xtype: 'tbspacer', width: 15 }
        ]},

    initComponent: function() {
        //each instance of this grid needs its own store otherwise, a change to the store will result in ALL palettes changing
        this.store = Ext.create('Ext.data.Store', {
            model: 'Savanna.process.model.Node',
            sorters: [
                {
                    property: 'label',
                    direction: 'ASC'
                }
            ]
        });
        this.callParent(arguments);
    }
});