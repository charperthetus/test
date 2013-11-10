/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/23/13
 * Time: 1:11 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.view.relatedItems.RelationshipPicker', {
    extend: 'Ext.window.Window',

    alias: 'widget.itemview_relationship_picker',

    title: 'Add Relationships',

    requires: [
        'Savanna.itemView.store.AutoCompleteStore',
        'Savanna.itemView.controller.RelationshipPickerController'
    ],

    controller: 'Savanna.itemView.controller.RelationshipPickerController',

    config: {
        selectionStore: null,
        relationshipNameArray: [],
        storeHelper: null
    },

    relationshipSelectStore: null,

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
            title: 'Available Relationships',
            padding: '0 0 15 0',
            itemId: 'availableRelationshipGroup',
            cls:'value-picker-row',
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
                        '<input type="checkbox" id="relationshipCheck" checked/>&nbsp;&nbsp;&nbsp;&nbsp;{label}',
                        '<tpl else>',
                        '<input type="checkbox" id="relationshipCheck"/>&nbsp;&nbsp;&nbsp;&nbsp;{label}',
                        '</tpl>')
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'Add',
            itemId: 'okBtn',
            ui:'commit',
            margin:'0 0 10 0'
        },
        {
            text: 'Cancel',
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
            urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/typeahead',
            paramsObj: {pageStart:0, pageSize:100, alphabetical: true, userAssertableOnly: true, type: 'Relationship'}
        });

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {
        if (success) {
            var me = this;
            this.relationshipSelectStore = Ext.create('Ext.data.JsonStore', {
                recordType: this.getSelectionStore().recordType,
                model: this.getSelectionStore().model
            });

            Ext.each(this.store.data.items, function(value) {
                if (Ext.Array.contains(me.getRelationshipNameArray(), value.data.label)) {
                    value.data.selected = true;
                }
            });

            this.relationshipSelectStore.add(this.getSelectionStore().getRange());
            this.queryById('availableRelationshipGroup').reconfigure(this.store);
        }
    }
});