Ext.define('Savanna.itemView.controller.ItemViewController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.ItemViewer'
    ],

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper',
        'Savanna.workflow.view.WorkflowSelect'
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
        editDoneButton: {
            click: 'onEditDone'
        },
        newItemButton: {
            click: 'onNewItemClick'
        },
        deleteItemButton: {
            click: 'onEditDelete'
        },

        //Pulling for the release as it doesn't quite work yet.
//        workflowButton: {
//            click: 'onWorkflowSelect'
//        },

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
            'ItemView:ParentSelected': 'onParentSelected',
            beforeclose: 'beforeClose'
        }
    },

    constructor: function (options) {
        this.opts = options || {};
        this.saving = false;
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

    lockItem: function (uri, lock) {

        var act = 'DELETE';
        if (lock) {
            act = 'GET';
        }
        Ext.Ajax.request({
            url: SavannaConfig.itemLockUrl + encodeURI(uri) + ';jsessionid=' + Savanna.jsessionid,
            method: act,
            cors: true,
            headers: {
                'Accept': '*/*'
            },
            disableCaching: false,

            success: Ext.bind(this.onLockSuccess, this),

            failure: this.onLockFail
        });
    },

    onLockSuccess: function (response, request) {
        if (request.method !== 'DELETE'){
            var lock = response.responseText;
            if (lock === ''){ // empty string means the user has the lock
                this.getView().getLayout().setActiveItem(1);
                this.getView().setEditMode(!this.getView().getEditMode()); // we got the lock, enter edit mode
                var itemSourceComponentEdit = this.getView().queryById('itemSourcesEdit').queryById('listOfSources');
                itemSourceComponentEdit.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Sources').valuesStore.getById('Source Document').valuesStore);
            }else{
                var message = 'This item is locked for editing by another user. Please try again later.';
                Ext.MessageBox.alert(
                    'Item Locked',
                    message
                );
            }
        }
    },

    onLockFail: function () {
        Ext.Error.raise({
            msg: 'Error locking or unlocking file.'
        });
    },

    toggleEditMode: function (btn) {
        if (!this.getView().getEditMode()) {
            this.lockItem(this.store.getAt(0).data.uri, true);
        } else {
            this.getView().getLayout().setActiveItem(0);
            this.getView().setEditMode(!this.getView().getEditMode());
            this.lockItem(this.store.getAt(0).data.uri, false);
        }
    },

    onEditCancel: function () {
        this.store.rejectChanges();
        this.getView().getLayout().setActiveItem(0);
        this.getView().setEditMode(!this.getView().getEditMode());

        this.lockItem(this.store.getAt(0).data.uri, false);
    },

    onEditDelete: function () {

        this.lockItem(this.store.getAt(0).data.uri, false);

        this.store.getProxy().url = SavannaConfig.itemDeleteUrl + encodeURI(this.store.getAt(0).data.uri);

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

    onEditSaveCallback: function (responseObj, evt, btn) {

        // Re-enable editing
        this.toggleSaving(false);
        this.getView().setTitle(this.store.getAt(0).data.label);

        if (!responseObj.operations[0].success) {
            /*
             server down..?
             */
            Ext.Error.raise({
                msg: 'Updating record failed.'
            });
        }
    },

    onEditDone: function (btn) {

        // Disable editing
        this.toggleSaving(true);
        
        this.store.getAt(0).setDirty();
        this.store.sync({
            callback: Ext.bind(this.onEditDoneCallback, this, [], true)
        });
        this.lockItem(this.store.getAt(0).data.uri, false);
    },

    onEditDoneCallback: function (responseObj, evt, btn) {

        // Re-enable edit mode
        this.toggleSaving(false);

        if (responseObj.operations[0].success) {
            this.getView().getLayout().setActiveItem(0);
            this.getView().setEditMode(!this.getView().getEditMode());
            
            // Have to wait to redraw the screen after we've switched views due to a framework bug where height isn't being properly set
            //  And we set it manually.
            this.getView().setTitle(this.store.getAt(0).data.label);

            var headerComponent = this.getView().queryById('itemViewHeaderView');
            headerComponent.setTitle(this.store.getAt(0).data.label);
            headerComponent.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore);

            var qualitiesComponent = this.getView().queryById('itemViewPropertiesView');
            qualitiesComponent.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Properties').valuesStore);
            qualitiesComponent.setTitle(this.updateQualitiesHeader(this.store.getAt(0).propertyGroupsStore.getById('Properties').valuesStore));

            var itemSourceComponent = this.getView().queryById('itemSources').queryById('listOfSources');
            itemSourceComponent.reconfigure(this.store.getAt(0).propertyGroupsStore.getById('Sources').valuesStore.getById('Source Document').valuesStore);

            var imagesBrowserComponent = this.getView().queryById('itemViewImagesGrid'),
                imagesBrowserComponentEdit = this.getView().queryById('itemViewImagesEdit');

            imagesBrowserComponent.fireEvent('ViewImagesGrid:Setup');
            imagesBrowserComponentEdit.fireEvent('EditImagesGrid:Setup');

            var relatedItemView = this.getView().queryById('relatedItemsView');
            relatedItemView.removeAll();
            relatedItemView.fireEvent('ViewRelatedItems:SetupData', this.store.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.data.items);
        } else {
            /*
             server down..?
             */
            Ext.Error.raise({
                msg: 'Updating record failed.'
            })
        }
    },

    /*
     *  Toggle Saving
     *
     *  Abstraction setting the Save state flag in this controller. Also disables the edit buttons, and toggles
     *  a saving class on the 'editDone' button (should have a busy spinner when saving).
     *
     *  @author <JLG>
     *  @param state {boolean} If true, item enters a saving state (and disabled toolbars), false removes this
     */
    toggleSaving: function(state) {
        var toolbarButtons = 'editDeleteButton, editDoneButton, editCancelButton'.split(', '),
            toggle = (state) ? 'disable' : 'enable', // disable buttons if saving is true
            toggleSaveClass = (state) ? 'addCls' : 'removeCls';

        // Toggling all the toolbar buttons
        Ext.each(toolbarButtons, function(btn) {
            this.getView().queryById(btn)[toggle]();
        }, this);

        // Add or remove the saving class on the edit done button
        this.getView().queryById('editDoneButton')[toggleSaveClass]('saving');

        // Set the saving state
        this.saving = state;
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
        
        // Apparently (according to nkedev) some items don't have a header label, and the "top-level" label is their URI, so we check for that here.
        var headerText = record.propertyGroupsStore.getById('Header').valuesStore.getById('Label').valuesStore.getAt(0).data.label;
        
        headerComponent.setTitle(headerText);
        headerComponent.reconfigure(record.propertyGroupsStore.getById('Header').valuesStore);

        /*
         Header Edit
         */
        var headerEditComponent = me.getView().queryById('itemViewHeaderEdit');
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
        qualitiesComponent.setTitle(this.updateQualitiesHeader(record.propertyGroupsStore.getById('Properties').valuesStore));
        qualitiesComponent.reconfigure(record.propertyGroupsStore.getById('Properties').valuesStore);

        /*
         Qualities Edit
         */
        var qualitiesEditComponent = me.getView().queryById('itemViewPropertiesEdit');
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

        var itemSourceComponentEdit = me.getView().queryById('itemSourcesEdit');
        itemSourceComponentEdit.storeHelper = this.storeHelper;
        itemSourceComponentEdit.store = record.propertyGroupsStore.getById('Sources').valuesStore;
        Ext.bind(itemSourceComponentEdit.addSourcesGrid(record.propertyGroupsStore.getById('Sources').valuesStore.getById('Source Document').valuesStore), itemSourceComponent);

        /*
         are we creating a new item, or for other reasons starting in edit view?
         */
        if (me.getView().getEditMode()) {
            /*
             is the record editable?  Assuming this should indicate if the record is locked,
             but currently the model data always shows editable set to true.  I'm betting the
             service needs to be modified to return false if the record is locked by another user.
             */
            if (record.data.editable) {
                me.getView().getLayout().setActiveItem(1);
                me.lockItem(record.data.uri, true);
            }
        }
        /*
         set the edit button to be enabled only if the record is editable, and provide a
         corresponding tooltip for the user.
         */

        var editBtn = this.getView().queryById('editModeButton');
        editBtn.setDisabled(!record.data.editable);
        editBtn.disabled ? editBtn.setTooltip('Item locked.') : editBtn.setTooltip('Edit');
    },

    onNewItemClick: function (btn) {
        EventHub.fireEvent('createitem');
    },


    onWorkflowSelect: function () {
        Ext.create('Savanna.workflow.view.WorkflowSelect', {
            uri: this.store.getAt(0).data.uri
        });
    },

    onParentSelected: function (uri, label) {

        Ext.each(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Type').valuesStore.data.items, function (item) {
            if (!item.get('inheritedFrom')) {
                item.set('value', uri);
                item.set('label', label);
            }
        });
        this.store.getAt(0).setDirty();
        this.store.sync({
            callback: Ext.bind(this.onParentSyncCallback, this, [], true)
        });
    },

    onParentSyncCallback: function () {
        this.store.load({
            scope: this,
            callback: Ext.bind(this.onItemReload, this, [], true)
        })
    },

    onItemReload: function (records, operation, success) {
        this.updateViewWithStoreData(records[0]);
    },

    updateQualitiesHeader: function (store) {
        var titlePre = 'Qualities (',
            values = this.storeHelper.getBotLevItemInStore(store).length,
            titlePost = ')';

        return titlePre + values + titlePost;
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

    },
    beforeClose: function (panel) {

        // Check if in edit mode (and prompt the user to save changes)
        if (this.getView().getEditMode() && !this.saving){
            var me = this;
            Ext.Msg.show({
                title: 'Close Item',
                msg: "Do you want to save the changes you made in this item? Your changes will be lost if you don't save them.",
                width: 375,
                buttons: Ext.Msg.YESNOCANCEL,
                buttonText: { yes: 'Save', no: 'Don\'t save', cancel: 'Cancel' },
                fn: function(button) {

                    // If yes, force dirty/save/release lock/close panel
                    if(button == 'yes'){
                        me.store.getAt(0).setDirty();
                        me.toggleSaving(true);
                        me.store.sync({
                            callback: function () {
                                me.lockItem(me.store.getAt(0).data.uri, false);
                                panel[panel.closeAction]();
                            }
                        });
                    
                    // Else if no, release lock and close
                    } else if (button == 'no') {
                        me.lockItem(me.store.getAt(0).data.uri, false);
                        panel[panel.closeAction]();
                    
                    } else {
                        //do nothing, leave the item open
                    }
                }
            });
            return false;

        // Check if we're already saving to prevent closing
        } else if (this.saving) {
            Ext.Msg.alert('Item Is Saving', 'The Item is still saving. You can close the Item once it is done saving.');
            return false;

        // Else proceed
        } else {
            return true;            
        }
    }
});