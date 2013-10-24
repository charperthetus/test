Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.ItemViewer'
    ],

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.view.relatedItems.AddRelationships'
    ],

    store: 'Savanna.itemView.store.MainItemStore',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    control: {
        editModeButton: {
            click: 'toggleEditMode'
        },
        editCancelButton: {
            click: 'onEditCancel'
        },
        editDeleteButton: {
            click: 'onEditDelete'
        },
        editSaveButton: {
            click: 'onEditSave'
        },
        editDoneButton: {
            click: 'onEditDone'
        },
        newItemButton:  {
            click: 'onNewItemClick'
        },
        deleteItemButton:  {
            click: 'onEditDelete'
        },
        workflowButton:  {
            click: 'onWorkflowSelect'
        },
        searchButton:  {
            click: 'onSearchSelect'
        },
        relationshipButton:  {
            click: 'onRelationshipSelect'
        },
        relatedItemsView: {
            'ItemView:OpenItem': 'openItem'
        },
        itemViewHeaderView: {
            'ItemView:OpenItem': 'openItem'
        },
        itemViewHeaderEdit: {
            'ItemView:OpenItem': 'openItem'
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
            this.getView().getLayout().setActiveItem(1);
        } else {
            this.getView().getLayout().setActiveItem(0);
        }

        this.getView().setEditMode(!this.getView().getEditMode());
    },

    onEditCancel:function() {
        this.getView().getLayout().setActiveItem(0);
        this.getView().setEditMode(!this.getView().getEditMode());
    },

    onEditDelete:function() {
       console.log('delete item method');
    },

    onEditSave:function() {
        console.log('save item method');
    },

    onEditDone:function() {
        this.getView().getLayout().setActiveItem(0);
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
            var headerComponent = me.getView().queryById('itemViewHeaderView');
            headerComponent.setTitle(record[0].data.label);
            headerComponent.reconfigure(record[0].propertyGroupsStore.getAt(0).valuesStore);

            /*
            Header Edit
             */
            //ToDo: do what needs to be done for edit version of header
            var headerEditComponent = me.getView().queryById('itemViewHeaderEdit');
            headerEditComponent.setTitle(record[0].data.label);
            headerEditComponent.store = record[0].propertyGroupsStore.getAt(0).valuesStore;//.getAt(0).valuesStore;
            headerEditComponent.fireEvent('EditHeader:StoreSet');

            /*
            Related Processes View
             */
            var processComponent = me.getView().queryById('relatedProcessesView');
            processComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getAt(0).pairsStore.data.length + ')');
            processComponent.reconfigure(record[0].kvPairGroupsStore.getAt(0).pairsStore);

            /*
            Related Processes Edit
             */
            var processEditComponent = me.getView().queryById('relatedProcessesViewEdit');
            processEditComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getAt(0).pairsStore.data.length + ')');
            processEditComponent.reconfigure(record[0].kvPairGroupsStore.getAt(0).pairsStore);

            /*
            Qualities
             */
            var qualitiesComponent = me.getView().queryById('itemViewPropertiesView');
            qualitiesComponent.setTitle('Qualities (' + record[0].propertyGroupsStore.getAt(3).valuesStore.data.length + ')');
            qualitiesComponent.reconfigure(record[0].propertyGroupsStore.getAt(3).valuesStore);

            /*
            Qualities Edit
             */
            //ToDo: do what needs to be done for edit version of qualities

            /*
            Related Items View
             */
            var relatedItemView = me.getView().queryById('relatedItemsView');
            relatedItemView.fireEvent('ViewRelatedItems:SetupData', record[0].propertyGroupsStore.getAt(2).valuesStore.data.items);

            /*
            are we creating a new item?
             */
            if(me.getView().getEditMode())  {
                me.getView().setActiveTab(1);
            }

        } else {
            /*
            Server down..?
             */
            Ext.Error.raise({
                msg: 'No record return for item URI.'
            })
        }
    },

    onNewItemClick: function(btn)  {
        Savanna.app.fireEvent('itemview:createitem', btn);
    },

    onWorkflowSelect:function() {
       console.log('workflow selected');
    },

    onSearchSelect:function() {
        console.log('search selected');
    },

    onRelationshipSelect:function() {
        Ext.create('Savanna.itemView.view.relatedItems.AddRelationships', {
            width: 400,
            height: 300
        });
    },

    // TODO: Keeping for now in order to pull later into own controller
    setupDisplayLabel: function (displayLabel, view) {
        var displayLabelComponent = view.queryById('itemDisplayLabelView');
        displayLabelComponent.update({displayLabel: displayLabel});
    },

    // TODO: Keeping for now in order to pull later into own controller
    setupAliases: function (aliasList, view) {
        if (aliasList != null && aliasList.length > 0) {
            var aliasTags = view.down('#itemAlias > auto_complete');

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
    },

    openItem: function (itemName, itemUri) {
        var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
            title: itemName,
            itemUri: itemUri,
            closable: true,
            autoScroll: true,
            tabConfig: {
                ui: 'dark'
            }
        });

        Savanna.app.fireEvent('search:itemSelected', itemView);
    }
});
