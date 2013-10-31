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
        newItemButton: {
            click: 'onNewItemClick'
        },
        deleteItemButton: {
            click: 'onEditDelete'
        },
        workflowButton: {
            click: 'onWorkflowSelect'
        },
        relatedItemsView: {
            'ItemView:OpenItem': 'openItem'
        },
        relatedItemsEdit: {
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
        Savanna.app.on('ItemView:SaveEnable', this.onSaveEnable, this);
        return this.callParent(arguments);
    },

    onSaveEnable: function () {
        if (this.getView().queryById('editSaveButton').disabled) {
            this.getView().queryById('editSaveButton').enable();
        }
    },

    lockItem:function(uri)  {
        this.getView().lockStore.getProxy().url = SavannaConfig.itemLockUrl + uri;
        this.getView().lockStore.load({
            callback: Ext.bind(this.onItemLockCallback, this, [], true)
        });
    },

    unlockItem:function(uri)    {
        this.getView().lockStore.getProxy().url = SavannaConfig.itemLockUrl + uri;
        var record = this.getView().lockStore.getAt(0);
        if(record)  {
            this.getView().lockStore.remove(record);
            this.getView().lockStore.sync({
                callback: Ext.bind(this.onItemUnlockCallback, this, [], true)
            });
        }   else    {
            Ext.Error.raise({
                msg: 'No record found to unlock - lock for edit may have failed.'
            });
        }

    },

    onItemLockCallback:function(records, operation, success)   {
        if (!success) {
            Ext.Error.raise({
                msg: 'Locking record failed.'
            });
        }
    },

    onItemUnlockCallback:function(responseObj)   {
        if(!responseObj.operations[0].success)  {
            Ext.Error.raise({
                msg: 'Failed to unlock the item.'
            })
        }
    },

    toggleEditMode: function (btn) {
        if (!this.getView().getEditMode()) {
            this.getView().getLayout().setActiveItem(1);
            var tmpStore = Ext.data.StoreManager.lookup(this.store);
            this.lockItem(tmpStore.getAt(0).data.uri);
        } else {
            this.getView().getLayout().setActiveItem(0);
        }

        this.getView().setEditMode(!this.getView().getEditMode());
    },

    onEditCancel: function () {
        var tmpStore = Ext.data.StoreManager.lookup(this.store);
        tmpStore.rejectChanges();
        this.getView().getLayout().setActiveItem(0);
        this.getView().setEditMode(!this.getView().getEditMode());

        this.unlockItem(tmpStore.getAt(0).data.uri)
    },

    onEditDelete: function () {
        console.log('delete item method');

        var tmpStore = Ext.data.StoreManager.lookup(this.store);
        tmpStore.getProxy().url = SavannaConfig.itemDeleteUrl + tmpStore.getAt(0).data.uri;

        if(tmpStore.getProxy().extraParams && tmpStore.getProxy().extraParams.parentUri !== null)  {
            delete tmpStore.getProxy().extraParams.parentUri;
        };

        tmpStore.addSessionId = false;

        console.log('URI IS:', tmpStore.getProxy().url)

        var record = tmpStore.getAt(0);
        tmpStore.remove(record);

        tmpStore.sync({
            scope: this,
            callback: Ext.bind(this.handleRecordDelete, this, [], true)
        });
    },

    onEditSave: function (btn) {
        btn.disable();
        var myStore = Ext.data.StoreManager.lookup(this.store);
        var headerComponent = this.getView().queryById('itemViewHeaderView');
        headerComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Header').valuesStore);

        var qualitiesComponent = this.getView().queryById('itemViewPropertiesView');
        qualitiesComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Properties').valuesStore);

        var relatedItemView = this.getView().queryById('relatedItemsView');
        Ext.each(myStore.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.data.items, function (group) {
            if (relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, ''))) {
                relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, '')).reconfigure(group.valuesStore);
            }
            else {
                relatedItemView.fireEvent('ViewRelatedItems:AddRelationshipGrid', group);
            }
        }, this);

        myStore.getAt(0).setDirty();
        myStore.sync({
            callback: Ext.bind(this.onEditSaveCallback, this, [], true)
        });
    },

    onEditSaveCallback: function (records, operation, success) {
        if (!success) {
            Ext.Error.raise({
                msg: 'Saving record failed.'
            });
        }
    },

    onEditDone: function () {
        var myStore = Ext.data.StoreManager.lookup(this.store);
        var headerComponent = this.getView().queryById('itemViewHeaderView');
        headerComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Header').valuesStore);

        var qualitiesComponent = this.getView().queryById('itemViewPropertiesView');
        qualitiesComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Properties').valuesStore);

        var relatedItemView = this.getView().queryById('relatedItemsView');
        Ext.each(myStore.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.data.items, function (group) {
            if (relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, ''))) {
                relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, '')).reconfigure(group.valuesStore);
            }
            else {
                relatedItemView.fireEvent('ViewRelatedItems:AddRelationshipGrid', group);
            }
        }, this);


        myStore.getAt(0).setDirty();
        myStore.sync({
            callback: Ext.bind(this.onEditDoneCallback, this, [], true)
        });
    },

    onEditDoneCallback: function (records, operation, success) {

        this.getView().getLayout().setActiveItem(0);
        this.getView().setEditMode(!this.getView().getEditMode());

        if (!success) {
            Ext.Error.raise({
                msg: 'Updating record failed.'
            })
        }
    },

    getItemViewData: function () {
        var tmpStore = Ext.data.StoreManager.lookup(this.store);
        tmpStore.getProxy().url = this.buildItemDataFetchUrl(tmpStore.getAt(0).data.uri);
        if (this.getView().getCreateMode()) {
            tmpStore.getProxy().setExtraParam("parentUri", tmpStore.getAt(0).data.uri);
        }   else    {
            if(tmpStore.getProxy().extraParams && tmpStore.getProxy().extraParams.parentUri !== null)  {
                delete tmpStore.getProxy().extraParams.parentUri;
            };
        }
        tmpStore.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDelete: function (responseObj) {

        Savanna.app.fireEvent('itemview:itemDeleted', this.getView());

        if(!responseObj.operations[0].success)  {
            Ext.Error.raise({
                msg: 'Failed to delete the item.'
            })
        }
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {

        if (success) {
            var me = this;

            /*
             Header View
             */
            var headerComponent = me.getView().queryById('itemViewHeaderView');
            headerComponent.setTitle(record[0].data.label);
            headerComponent.reconfigure(record[0].propertyGroupsStore.getById('Header').valuesStore);

            /*
             Header Edit
             */
            //ToDo: do what needs to be done for edit version of header
            var headerEditComponent = me.getView().queryById('itemViewHeaderEdit');
            headerEditComponent.setTitle(record[0].data.label);
            headerEditComponent.store = record[0].propertyGroupsStore.getById('Header').valuesStore;
            headerEditComponent.fireEvent('EditHeader:StoreSet');

            /*
             Related Processes View
             */
            var processComponent = me.getView().queryById('relatedProcessesView');
            processComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getById('Related Processes').pairsStore.data.length + ')');
            processComponent.reconfigure(record[0].kvPairGroupsStore.getById('Related Processes').pairsStore);

            /*
             Related Processes Edit
             */
            var processEditComponent = me.getView().queryById('relatedProcessesViewEdit');
            processEditComponent.setTitle('Participated in Process (' + record[0].kvPairGroupsStore.getById('Related Processes').pairsStore.data.length + ')');
            processEditComponent.reconfigure(record[0].kvPairGroupsStore.getById('Related Processes').pairsStore);

            /*
             Related Items View
             */
            var relatedItemView = me.getView().queryById('relatedItemsView');
            relatedItemView.fireEvent('ViewRelatedItems:SetupData', record[0].propertyGroupsStore.getById('Related Items').valuesStore.data.items);

            /*
             Related Items Edit
             */
            var relatedItemViewEdit = me.getView().queryById('relatedItemsEdit');
            relatedItemViewEdit.store = record[0].propertyGroupsStore.getById('Related Items').valuesStore;
            relatedItemViewEdit.fireEvent('EditRelatedItems:SetupData', record[0].propertyGroupsStore.getById('Related Items').valuesStore.data.items);

            /*
             Qualities View
             */
            var qualitiesComponent = me.getView().queryById('itemViewPropertiesView');
            qualitiesComponent.setTitle('Qualities (' + record[0].propertyGroupsStore.getById('Properties').valuesStore.data.length + ')');
            qualitiesComponent.reconfigure(record[0].propertyGroupsStore.getById('Properties').valuesStore);

            /*
             Qualities Edit
             */
            var qualitiesEditComponent = me.getView().queryById('itemViewPropertiesEdit');
            qualitiesEditComponent.setTitle('Qualities (' + record[0].propertyGroupsStore.getById('Properties').valuesStore.data.length + ')');
            qualitiesEditComponent.store = record[0].propertyGroupsStore.getById('Properties').valuesStore;
            qualitiesEditComponent.fireEvent('EditQualities:StoreSet');

            /*
             Annotation Properties View
             */
            var annotationViewComponent = me.getView().queryById('annotationPropertiesView');
            annotationViewComponent.setTitle('Additional Properties (' + record[0].propertyGroupsStore.getById('Annotations').valuesStore.data.length + ')');
            annotationViewComponent.reconfigure(record[0].propertyGroupsStore.getById('Annotations').valuesStore);

            /*
             Annotation Properties Edit
             */
            var annotationEditComponent = me.getView().queryById('annotationPropertiesEdit');
            annotationEditComponent.setTitle('Additional Properties (' + record[0].propertyGroupsStore.getById('Annotations').valuesStore.data.length + ')');
            annotationEditComponent.reconfigure(record[0].propertyGroupsStore.getById('Annotations').valuesStore);

            /*
             Images View
             */
            var imagesBrowserComponent = me.getView().queryById('itemViewImagesGrid');
            if (record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images') !== null) {
                imagesBrowserComponent.fireEvent('ViewImagesGrid:Setup', record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);
            }
            ;


            /*
             are we creating a new item?
             */

            if (me.getView().getEditMode()) {
                me.getView().getLayout().setActiveItem(1);
                me.lockItem(record[0].data.uri);
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

    onNewItemClick: function (btn) {
        Savanna.app.fireEvent('itemview:createitem', btn);
    },

    onWorkflowSelect: function () {
        Ext.create('Savanna.itemView.view.workflow.WorkflowSelect', {
            width: 500,
            height: 425
        });
    },

    onSearchSelect: function () {
        console.log('search selected');
    },

    buildItemDataFetchUrl: function (uri) {
        uri = encodeURI(uri);
        if (!this.getView().getCreateMode()) {
            return SavannaConfig.itemViewUrl + uri;
        } else {
            return SavannaConfig.itemCreateUrl;
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
    },
    deleteRelatedItem: function (itemName, itemUri) {

    }
});
