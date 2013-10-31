/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/28/13
 * Time: 12:59 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemQualities.ValuesPicker', {
    extend: 'Ext.window.Window',

    alias: 'widget.itemview_values_picker',

    title: 'Add Values',

    requires: [
        'Savanna.itemView.store.AutoCompleteStore',
        'Savanna.itemView.controller.ValuesPickerController'
    ],

    controller: 'Savanna.itemView.controller.ValuesPickerController',

    config: {
        selectionStore: null,
        valNameArray: [],
        uri : ""
    },

    updatedStore: false,

    store: 'Savanna.itemView.store.AutoCompleteStore',

    autoShow: true,

    padding: '30 30 0 30',

    width: '100%',

    layout: 'vbox',

    cls:'value-picker-window',

    items: [
        {
            xtype: 'grid',
            title: 'Available Values',
            padding: '0 0 15 0',
            itemId: 'availableValuesGroup',
            height: 285,
            width: '100%',
            hideHeaders: true,
            store: this.store,
            renderTo: Ext.getBody(),
            columns: [
                {
                    xtype: 'templatecolumn',
                    dataIndex: 'label',
                    flex: 1,
                    tpl: Ext.create('Ext.XTemplate',
                        '<tpl if="selected">',
                            '<input type="checkbox" id="valueCheck" checked/>&nbsp;&nbsp;&nbsp;&nbsp;{label}',
                        '<tpl else>',
                            '<input type="checkbox" id="valueCheck"/>&nbsp;&nbsp;&nbsp;&nbsp;{label}',
                        '</tpl>')
                }
            ]
        },
        {
            xtype: 'grid',
            title: 'Selected Values',
            itemId: 'selectedValuesGroup',
            height: 150,
            width: '100%',
            hideHeaders: true,
            store: this.store,
            renderTo: Ext.getBody(),
            columns: [
                {
                    dataIndex: 'label',
                    flex: 1
                },
                {
                    xtype: 'templatecolumn',
                    dataIndex: 'label',
                    tpl: '<i type="button" value="x" id="removeSelectedValue"></i>'
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'OK',
            itemId: 'okBtn',
            ui:'commit'
        },
        {
            text: 'cancel',
            itemId: 'cancelBtn'
        }
    ],

    constructor: function(configs) {
        this.callParent(arguments);
        this.initConfig(configs);
    },

    afterRender: function () {
        this.callParent(arguments);
        this.store = Ext.create(this.store, {
            urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/keyword/property/' + this.uri,
            paramsObj: {pageStart:0, pageSize:10}
        });

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {
        if (success) {
            var me = this;
            var valuesSelectStore = Ext.create('Ext.data.JsonStore', {
                recordType: this.getSelectionStore().recordType,
                model: this.getSelectionStore().model
            });

            Ext.each(this.store.data.items, function(value) {
                if (Ext.Array.contains(me.getValNameArray(), value.data.label)) {
                    value.data.selected = true;
                }
            });

            valuesSelectStore.add(this.getSelectionStore().getRange());
            this.queryById('selectedValuesGroup').reconfigure(valuesSelectStore);
            this.queryById('availableValuesGroup').reconfigure(this.store);
        }
    }
});