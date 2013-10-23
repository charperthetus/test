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

    constructor: function (options) {
        this.opts = options || {};
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    init: function (app) {
        this.getItemViewData();
        return this.callParent(arguments);
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
        var headerComponent = this.getView().queryById('itemViewHeader');
        headerComponent.setTitle(record[0].data.label);
        headerComponent.reconfigure(record[0].propertyGroupsStore.getAt(0).valuesStore);

        var processComponent = this.getView().queryById('relatedProcesses');
        processComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getAt(0).pairsStore.data.length + ')');
        processComponent.reconfigure(record[0].kvPairGroupsStore.getAt(0).pairsStore);

        var qualitiesComponent = this.getView().queryById('itemViewProperties');
        qualitiesComponent.setTitle('Qualities (' + record[0].propertyGroupsStore.getAt(3).valuesStore.data.length + ')');
        qualitiesComponent.reconfigure(record[0].propertyGroupsStore.getAt(3).valuesStore);

        var relatedItemView = this.getView().queryById('relatedItems'),
            me = this;

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
        var displayLabelComponent = view.queryById('itemDisplayLabel');
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
