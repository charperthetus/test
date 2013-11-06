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
    titleAlign: 'left',
    emptyText: 'Drop items here for use in process steps or search the model to find new items',
    hideHeaders: true,
    style: {
        backgroundColor: '#F2F2F2'
    },
    columns: [
        {
            dataIndex: 'label',
            width: 178
        }
    ],

    tbar: {
        itemId: 'itemTools',
        height: 37,
        border: 2,
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
            '->',
            {
                xtype: 'label',
                text: 'Items',
                cls: ['drag-and-drop', 'drag-and-drop-small'],
                tooltip: 'Drop items'
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
                glyph: 'modelSearch',
                ui: 'dark-icon',
                tooltip: 'Click to search the model.',
                height: 16,
                width: 16
            },
            '->'
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
                    'classification': ''
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
                    'classification': ''
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
                    'classification': ''
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
                    'classification': ''
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
                    'classification': ''
                }
            ]
        });
        this.callParent(arguments);
    }
});