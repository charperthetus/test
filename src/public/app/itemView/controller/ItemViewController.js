Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.ItemViewer'
    ],

    requires: [
        'Savanna.itemView.store.MainItemStore'
    ],

    store: 'Savanna.itemView.store.MainItemStore',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },
    control: {
        editModeButton: {
            click: 'toggleEditMode'
        }
    },

    constructor: function (options) {
        this.opts = options || {};
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    init: function (app) {
        this.getItemViewData();
        return this.callParent(arguments);
    },

    toggleEditMode: function (btn) {
        if (!this.getView().getEditMode()) {
            this.getView().setActiveTab(1);
            btn.setText('View');
        } else {
            this.getView().setActiveTab(0);
            btn.setText('Edit');
        }

        this.getView().setEditMode(!this.getView().getEditMode());
    },

    getItemViewData: function () {
        var tmpStore = Ext.data.StoreManager.lookup(this.store);
        tmpStore.getProxy().url = this.buildItemDataFetchUrl(this.getView().itemUri);
        tmpStore.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {

        if (success) {

            var me = this;

            /*
            Header View
             */
            Ext.each(['itemViewHeaderView', 'itemViewHeaderEdit'], function (id) {
                var headerComponent = me.getView().queryById(id);
                headerComponent.setTitle(record[0].data.label);
                if (me.getView().getEditMode()) {
                    headerComponent.reconfigure(record[0].propertyGroupsStore.getAt(0).valuesStore);
                }
            });

            /*
            Process View
             */
            var processComponent = me.getView().queryById('relatedProcessesView');
            processComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getAt(0).pairsStore.data.length + ')');
            processComponent.reconfigure(record[0].kvPairGroupsStore.getAt(0).pairsStore);

            /*
            Properties View
             */
            Ext.each(['itemViewPropertiesView', 'itemViewPropertiesEdit'], function (id) {
                var qualitiesComponent = me.getView().queryById(id);
                qualitiesComponent.setTitle('Qualities (' + record[0].propertyGroupsStore.getAt(3).valuesStore.data.length + ')');
                if (me.getView().getEditMode()) {
                    qualitiesComponent.reconfigure(record[0].propertyGroupsStore.getAt(3).valuesStore);
                }
            });

            /*
            Related Items View
             */
            Ext.each(['relatedItemsView', 'relatedItemsEdit'], function (id) {
                var relatedItemView = me.getView().queryById(id);

                Ext.each(record[0].propertyGroupsStore.getAt(2).valuesStore.data.items, function (relatedItemsGroup) {

                    var grid = Ext.create('Ext.grid.Panel', {
                        store: relatedItemsGroup.valuesStore,
                        columns: [
                            {
                                xtype: 'templatecolumn',
                                tpl: Ext.create('Ext.XTemplate',
                                    '<input type="button" name="{value}" value="{label}" id="openRelatedItem" />'
                                ),
                                text: relatedItemsGroup.get('label'),
                                flex: 1,
                                sortable: false
                            }
                        ],
                        listeners: {
                            itemclick: me.onRelatedItemClick
                        }
                    });

                    relatedItemView.add(grid);

                });

            });
        } else {
            /*
            Server down..?
             */
            Ext.Error.raise({
                msg: 'No record return for item URI.'
            })
        }
    },

    onRelatedItemClick: function (grid, record, item, index, e, eOpts) {

        if (e.target.id == "openRelatedItem") {

            var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                title: e.target.value,
                itemUri: e.target.name,
                closable: true,
                autoScroll: true,
                tabConfig: {
                    ui: 'dark'
                }
            });

            Savanna.app.fireEvent('search:itemSelected', itemView);

        }
    },

    // TODO: Keeping for now in order to pull later into own controller
    setupDisplayLabel: function (displayLabel, view) {
        var displayLabelComponent = view.queryById('itemDisplayLabelView');
        displayLabelComponent.update({displayLabel: displayLabel});
    },

    // TODO: Keeping for now in order to pull later into own controller
    setupAliases: function (aliasList, view) {
        if (aliasList != null && aliasList.length > 0) {
            var aliasTags = view.down('#itemAlias > auto_complete_with_tags');

            for (var i = 0; i < aliasList.length; i++) {
                aliasTags.addTerm(aliasList[i]);
            }
        }
    },

    buildItemDataFetchUrl: function (uri) {
        //uri = Ext.JSON.decode(uri);
        uri = encodeURI(uri);
        return SavannaConfig.itemViewUrl + uri + ';jsessionid=' + Savanna.jsessionid;
    },

    // TODO: Move to it's own controller for Edit Qualities along with it's handler above
    handleAddChosenProperty: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {
            if (field.getValue().trim().length) {
                var valArray = new Array();
                valArray[0] = "Red";
                valArray[1] = "Blue";
                field.up('item_edit_qualities').addProp({propName: field.getValue(), propValue: valArray});
                field.reset();
            }
        }
    }
});
