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
        selectionStore: null
    },

    store: 'Savanna.itemView.store.AutoCompleteStore',

    autoShow: true,

    padding: '30 30 0 30',

    width: '100%',

    layout: 'vbox',

    items: [
        {
            xtype: 'label',
            text: 'Available Quality'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype: 'textfield',
                    flex: 1,
                    emptyText: 'Find a Quality'
                },
                {
                    xtype: 'button',
                    text: 'Search'
                },
                {
                    xtype: 'button',
                    text: 'Clear'
                }
            ]
        },
        {
            xtype: 'grid',
            title: '',
            padding: '0 0 15 0',
            itemId: 'availableQualitiesGroup',
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
                        '<input type="checkbox" value="{label}"/>&nbsp;&nbsp;&nbsp;&nbsp;{label}')
                }
            ]
        },
        {
            xtype: 'grid',
            title: 'Selected Quality',
            itemId: 'selectedQualitiesGroup',
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
                            '{value}',
                        '</tpl>')
                },
                {
                    xtype: 'templatecolumn',
                    dataIndex: 'label',
                    tpl: '<input type="button" value="x">'
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'OK'
        },
        {
            text: 'cancel'
        }
    ],

    constructor: function(configs) {
        this.callParent(arguments);
        this.initConfig(configs);
    },

    afterRender: function () {
        this.callParent(arguments);
        this.store = Ext.create(this.store, {
            urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/mockModelSearch/keyword/qualities',
            paramsObj: {excludeUri:'', pageStart:0, pageLimit:10, keyword: ''}
        });

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {
        if (success) {
            var qualitiesSelectStore = Ext.create('Ext.data.JsonStore', {
                recordType: this.getSelectionStore().recordType
            });

            qualitiesSelectStore.add(this.getSelectionStore().getRange());
            this.queryById('selectedQualitiesGroup').reconfigure(qualitiesSelectStore);
            this.queryById('availableQualitiesGroup').reconfigure(this.store);
        }
    }
});