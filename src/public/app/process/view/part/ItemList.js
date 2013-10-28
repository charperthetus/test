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

    title: 'Items',
    titleAlign: 'center',
    emptyText: 'Drop items here for use in process steps or search the model to find new items',

    hideHeaders: true,
    columns: [
        {
            dataIndex: 'label'
        }
    ],

    tbar: {
        itemId: 'itemtools',
        border: 2,
        style: {
            borderStyle: 'dashed'
        },
        items: [
            {
                //todo: need drop icon here...
                xtype: 'label',
                text: 'Drop Items',
                cls: ['sub', 'h4', 'bold', 'drag-and-drop']
            },
            '->',
            {
                xtype: 'label',
                text: 'OR',
                cls: ['bold']
            },
            '->',
            {
                xtype: 'button',
                itemId: 'searchitems',
                text: 'Search'
            }
        ]
    },

    initComponent: function() {

        //each instance of this grid needs its own store, otherwise, a change to the store will result in ALL palettes changing
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
                    'label': 'Urea Ammonium Nitrate',
                    'type': 'Item',
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
                    'label': 'Strong Acid',
                    'type': 'Item',
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
                    'label': 'Urea Nitrate Solution',
                    'type': 'Item',
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
                    'label': 'Heat Source',
                    'type': 'Item',
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
                    'label': 'Urea Solution',
                    'type': 'Item',
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