/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/26/13
 * Time: 12:46 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemQualities.QualitiesPicker', {
    extend: 'Ext.window.Window',

    alias: 'widget.itemview_qualities_picker',

    title: 'Add Qualities',

    requires: [
        'Savanna.itemView.store.AutoCompleteStore',
        'Savanna.itemView.controller.QualitiesPickerController'
    ],

    controller: 'Savanna.itemView.controller.QualitiesPickerController',

    config: {
        selectionStore: null,
        propNameArray: [],
        storeHelper: null
    },

    updatedStore: false,

    store: null,

    autoShow: true,

    padding: '30 30 0 30',

    width: '100%',

    layout: 'vbox',

    cls: 'value-picker-window',

    items: [
        {
            xtype: 'label',
            text: 'AVAILABLE QUALITY',
            cls: 'h3'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'filterQualitiesField',
                    flex: 1,
                    emptyText: 'Find a Quality',
                    enableKeyEvents: true
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    itemId: 'searchQualitiesBtn'
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    itemId: 'clearQualitiesFilter'
                }
            ]
        },
        {
            xtype: 'grid',
            title: '',
            padding: '0 0 15 0',
            itemId: 'availableQualitiesGroup',
            cls: 'value-picker-row',
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
                            '<input type="checkbox" id="qualityCheck" checked/>&nbsp;&nbsp;&nbsp;&nbsp;{label}',
                        '<tpl else>',
                            '<input type="checkbox" id="qualityCheck"/>&nbsp;&nbsp;&nbsp;&nbsp;{label}',
                        '</tpl>')
                }
            ]
        },
        {
            xtype: 'grid',
            title: 'Selected Quality',
            itemId: 'selectedQualitiesGroup',
            cls: 'value-picker-row-hover',
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
                    flex: 1,
                    tpl: Ext.create('Ext.XTemplate',
                        '<tpl for="values" between=", ">',
                        '{label}',
                        '</tpl>')
                },
                {
                    xtype: 'templatecolumn',
                    dataIndex: 'label',
                    tpl: '<i type="button" value="x" id="removeSelectedQuality"></i>'
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'Add',
            itemId: 'okBtn',
            ui: 'commit',
            margin: '0 0 10 0'
        },
        {
            text: 'Cancel',
            itemId: 'cancelBtn'
        }
    ],

    constructor: function (configs) {

        this.callParent(arguments);
        this.initConfig(configs);
    },

    afterRender: function () {

        this.callParent(arguments);

        this.store = Ext.create('Savanna.itemView.store.AutoCompleteStore', {
            urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/' + encodeURI(this.getStoreHelper().itemUri()) + '/qualities',
            paramsObj: {pageStart: 0, pageSize: 100, alphabetical: true}
        });


        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {

        if (success) {
            var me = this;
            var qualitiesSelectStore = Ext.create('Ext.data.JsonStore', {
                recordType: this.getSelectionStore().recordType,
                model: this.getSelectionStore().model
            });

            Ext.each(this.store.data.items, function (value) {
                if (Ext.Array.contains(me.getPropNameArray(), value.data.label)) {

                    value.data.selected = true;
                }
            });

            qualitiesSelectStore.add(this.getSelectionStore().getRange());
            this.queryById('selectedQualitiesGroup').reconfigure(qualitiesSelectStore);
            this.queryById('availableQualitiesGroup').reconfigure(this.store);
        }
    }
});