Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.ItemViewer'
    ],

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    store: null,

    storeHelper: null,

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
        },
        view: {
            'ItemView:SaveEnable': 'onSaveEnable'
        }
    },

    constructor: function (options) {
        this.opts = options || {};
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.callParent(arguments);
    },

    init: function (app) {
        if (this.getView().getItemStore()) {
            this.store = this.getView().getItemStore();
            this.updateViewWithStoreData(this.store.getAt(0));
        }
        else {
            this.getItemViewData();
        }

        return this.callParent(arguments);
    },

    onSaveEnable: function () {
        if (this.getView().queryById('editSaveButton').disabled) {
            this.getView().queryById('editSaveButton').enable();
        }
    },

    lockItem: function (uri, lock) {

        var act = 'DELETE';
        if(lock)    {
            act = 'GET';
        }
        Ext.Ajax.request({
            url: SavannaConfig.itemLockUrl + encodeURI(uri) +';jsessionid=' + Savanna.jsessionid,
            method: act,
            cors: true,
            headers: {
                'Accept': '*/*'
            },
            disableCaching: false,

            success: function (response) {
                //console.log('lock/unlock successful');
            },

            failure: function (response) {
                Ext.Error.raise({
                    msg: 'Error locking or unlocking file.'
                });
            }
        });
    },

    toggleEditMode: function (btn) {
        if (!this.getView().getEditMode()) {
            this.getView().getLayout().setActiveItem(1);
            this.lockItem(this.store.getAt(0).data.uri, true);
        } else {
            this.getView().getLayout().setActiveItem(0);
        }

        this.getView().setEditMode(!this.getView().getEditMode());
    },

    onEditCancel: function () {
        this.store.rejectChanges();
        this.getView().getLayout().setActiveItem(0);
        this.getView().setEditMode(!this.getView().getEditMode());

        this.lockItem(this.store.getAt(0).data.uri, false);
    },

    onEditDelete: function () {
        this.store.getProxy().url = SavannaConfig.itemDeleteUrl + this.store.getAt(0).data.uri;

        if (this.store.getProxy().extraParams && this.store.getProxy().extraParams.parentUri !== null) {
            delete this.store.getProxy().extraParams.parentUri;
        }

        var record = this.store.getAt(0);
        this.store.remove(record);

        this.store.sync({
            scope: this,
            callback: Ext.bind(this.handleRecordDelete, this, [], true)
        });
    },

    onEditSave: function (btn) {
        btn.disable();
        var headerComponent = this.getView().queryById('itemViewHeaderView');
        headerComponent.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore);

        var qualitiesComponent = this.getView().queryById('itemViewPropertiesView');
        qualitiesComponent.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Properties').valuesStore);

        var relatedItemView = this.getView().queryById('relatedItemsView');
        Ext.each(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.data.items, function (group) {
            if (relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, ''))) {
                relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, '')).reconfigure(group.valuesStore);
            }
            else {
                relatedItemView.fireEvent('ViewRelatedItems:AddRelationshipGrid', group);
            }
        }, this);

        this.store.getAt(0).setDirty();
        this.store.sync({
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
        //gotta update the Item Name here since we can't access inside the edit header component.  Also have to update the tab text
        this.store.getAt(0).data.label = this.getView().queryById('itemViewHeaderEdit').queryById('itemNameField').value;
        this.getView().setTitle(this.store.getAt(0).data.label);

        var headerComponent = this.getView().queryById('itemViewHeaderView');
        headerComponent.setTitle(this.store.getAt(0).data.label);
        headerComponent.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore);

        var qualitiesComponent = this.getView().queryById('itemViewPropertiesView');
        qualitiesComponent.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Properties').valuesStore);


        var imagesBrowserComponent = this.getView().queryById('itemViewImagesGrid'),
            imagesBrowserComponentEdit = this.getView().queryById('itemViewImagesEdit');

        imagesBrowserComponent.fireEvent('ViewImagesGrid:Setup');
        imagesBrowserComponentEdit.fireEvent('EditImagesGrid:Setup');

        var relatedItemView = this.getView().queryById('relatedItemsView');
        Ext.each(this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.data.items, function (group) {
            if (relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, ''))) {
                relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g, '')).reconfigure(group.valuesStore);
            }
            else {
                relatedItemView.fireEvent('ViewRelatedItems:AddRelationshipGrid', group);
            }
        }, this);
        relatedItemView.fireEvent('ViewRelatedItems:SetupData', this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.data.items);


        this.store.getAt(0).setDirty();
        this.store.sync({
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
        tmpStore.getProxy().url = this.buildItemDataFetchUrl(this.getView().itemUri);

        tmpStore.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDelete: function (responseObj) {

        EventHub.fireEvent('close', this.getView());

        if (!responseObj.operations[0].success) {
            Ext.Error.raise({
                msg: 'Failed to delete the item.'
            })
        }
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {
        if (success) {
            this.updateViewWithStoreData(record[0]);
        } else {
            /*
             Server down..?
             */
            Ext.Error.raise({
                msg: 'No record return for item URI.'
            })
        }
    },

    updateViewWithStoreData: function (record) {
        var me = this;
        this.storeHelper.init(this.store);

        /*
         Header View
         */
        var headerComponent = me.getView().queryById('itemViewHeaderView');
        headerComponent.setTitle(record.data.label);
        headerComponent.reconfigure(record.propertyGroupsStore.getById('Header').valuesStore);

        /*
         Header Edit
         */
        var headerEditComponent = me.getView().queryById('itemViewHeaderEdit');
        headerEditComponent.queryById('itemNameField').setValue(record.data.label);
        headerEditComponent.storeHelper = this.storeHelper;
        headerEditComponent.store = record.propertyGroupsStore.getById('Header').valuesStore;
        headerEditComponent.fireEvent('EditHeader:StoreSet');

        /*
         Related Processes View
         */
        var processComponent = me.getView().queryById('relatedProcessesView');
        processComponent.setTitle('Participated in Process (' + record.kvPairGroupsStore.getById('Related Processes').pairsStore.data.length + ')');
        processComponent.reconfigure(record.kvPairGroupsStore.getById('Related Processes').pairsStore);

        /*
         Related Processes Edit
         */
        var processEditComponent = me.getView().queryById('relatedProcessesViewEdit');
        processEditComponent.setTitle('Participated in Process (' + record.kvPairGroupsStore.getById('Related Processes').pairsStore.data.length + ')');
        processEditComponent.reconfigure(record.kvPairGroupsStore.getById('Related Processes').pairsStore);

        /*
         Related Items View
         */
        var relatedItemView = me.getView().queryById('relatedItemsView');
        relatedItemView.storeHelper = this.storeHelper;
        relatedItemView.store = record.propertyGroupsStore.getById('Related Items').valuesStore;
        relatedItemView.fireEvent('ViewRelatedItems:SetupData', record.propertyGroupsStore.getById('Related Items').valuesStore.data.items);

        /*
         Related Items Edit
         */
        var relatedItemViewEdit = me.getView().queryById('relatedItemsEdit');
        relatedItemViewEdit.storeHelper = this.storeHelper;
        relatedItemViewEdit.store = record.propertyGroupsStore.getById('Related Items').valuesStore;
        relatedItemViewEdit.fireEvent('EditRelatedItems:SetupData', record.propertyGroupsStore.getById('Related Items').valuesStore.data.items);

        /*
         Qualities View
         */
        var qualitiesComponent = me.getView().queryById('itemViewPropertiesView');
        qualitiesComponent.setTitle('Qualities (' + record.propertyGroupsStore.getById('Properties').valuesStore.data.length + ')');
        qualitiesComponent.reconfigure(record.propertyGroupsStore.getById('Properties').valuesStore);

        /*
         Qualities Edit
         */
        var qualitiesEditComponent = me.getView().queryById('itemViewPropertiesEdit');
        qualitiesEditComponent.setTitle('Qualities (' + record.propertyGroupsStore.getById('Properties').valuesStore.data.length + ')');
        qualitiesEditComponent.storeHelper = this.storeHelper;
        qualitiesEditComponent.store = record.propertyGroupsStore.getById('Properties').valuesStore;
        qualitiesEditComponent.fireEvent('EditQualities:StoreSet');

        /*
         Annotation Properties View
         */
        var annotationViewComponent = me.getView().queryById('annotationPropertiesView');
        annotationViewComponent.setTitle('Additional Properties (' + record.propertyGroupsStore.getById('Annotations').valuesStore.data.length + ')');
        annotationViewComponent.reconfigure(record.propertyGroupsStore.getById('Annotations').valuesStore);

        /*
         Annotation Properties Edit
         */
        var annotationEditComponent = me.getView().queryById('annotationPropertiesEdit');
        annotationEditComponent.setTitle('Additional Properties (' + record.propertyGroupsStore.getById('Annotations').valuesStore.data.length + ')');
        annotationEditComponent.reconfigure(record.propertyGroupsStore.getById('Annotations').valuesStore);

        /*
         Images View/Edit
         */
        var imagesBrowserComponent = me.getView().queryById('itemViewImagesGrid'),
            imagesBrowserComponentEdit = me.getView().queryById('itemViewImagesEdit');

        imagesBrowserComponent.store = record.propertyGroupsStore.getById('Images').valuesStore;
        imagesBrowserComponentEdit.storeHelper = this.storeHelper;
        imagesBrowserComponentEdit.store = record.propertyGroupsStore.getById('Images').valuesStore;

        imagesBrowserComponent.fireEvent('ViewImagesGrid:Setup', record.propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);
        imagesBrowserComponentEdit.fireEvent('EditImagesGrid:Setup', record.propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);


        /*
        sources
        */
        var itemSourceComponent = me.getView().queryById('itemSources');
        itemSourceComponent.storeHelper = this.storeHelper;
        itemSourceComponent.store = record.propertyGroupsStore.getById('Sources').valuesStore;
        Ext.bind(itemSourceComponent.addSourcesGrid(record.propertyGroupsStore.getById('Sources').valuesStore.getById('Source Document').valuesStore), itemSourceComponent);

        /*
         are we creating a new item?
         */
        if (me.getView().getEditMode()) {
            me.getView().getLayout().setActiveItem(1);
            me.lockItem(record.data.uri, true);
        }
    },

    onNewItemClick: function (btn) {
        EventHub.fireEvent('createitem');
    },


    onWorkflowSelect: function () {
        Ext.create('Savanna.itemView.view.workflow.WorkflowSelect', {
            width: 500,
            height: 425
        });
    },


    onSearchSelect: function () {
        //console.log('search selected');
    },

    buildItemDataFetchUrl: function (uri) {
        return SavannaConfig.itemViewUrl + uri;
    },

    openItem: function (itemName, itemUri) {
        EventHub.fireEvent('open', {uri: itemUri, label: itemName, type: 'item'});
    },
    deleteRelatedItem: function (itemName, itemUri) {

    }
});
