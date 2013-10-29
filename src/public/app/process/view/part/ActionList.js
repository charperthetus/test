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
        'Ext.grid.plugin.DragDrop',
        'Savanna.process.model.Node'
    ],

    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragGroup: 'RNRM-ITEMS',
            dropGroup: 'RNRM-ACTIONS', //change to RNRM-ITEMS if we ever want to drag Actions from ModelSearch
            enableDrop: true,
            enableDrag: true
        },
        copy: true
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
            emptyText: 'Find and Add Actions'
        },
        {
            //todo: design has this over the grid, I couldn't get that to happen so it is next to the filter text horizontally
            xtype: 'button',
            itemId: 'createaction',
            text: 'Create',
            hidden: true
        }
    ],

    initComponent: function() {
        //each instance of this grid needs its own store otherwise, a change to the store will result in ALL palettes changing
        this.store = Ext.create('Ext.data.Store', {
            model: 'Savanna.process.model.Node',
            sorters: [
                {
                    property: 'label',
                    direction: 'ASC'
                }
            ],
            data: [

                {
                    'uri': '',
                    'label': 'Filter',
                    'type': 'Action',
                    'modifiedBy': '',
                    'modifiedDate': '',
                    'preview': '',
                    'primaryImageUrl': '',
                    'workflowState': '',
                    'classification': '',
                    'key': ''
                },
                {
                    'uri': '',
                    'label': 'Dissolve',
                    'type': 'Action',
                    'modifiedBy': '',
                    'modifiedDate': '',
                    'preview': '',
                    'primaryImageUrl': '',
                    'workflowState': '',
                    'classification': '',
                    'key': ''
                },
                {
                    'uri': '',
                    'label': 'Mix',
                    'type': 'Action',
                    'modifiedBy': '',
                    'modifiedDate': '',
                    'preview': '',
                    'primaryImageUrl': '',
                    'workflowState': '',
                    'classification': '',
                    'key': ''
                },
                {
                    'uri': '',
                    'label': 'Dry',
                    'type': 'Action',
                    'modifiedBy': '',
                    'modifiedDate': '',
                    'preview': '',
                    'primaryImageUrl': '',
                    'workflowState': '',
                    'classification': '',
                    'key': ''
                }
            ]
        });
        this.callParent(arguments);
    }
});