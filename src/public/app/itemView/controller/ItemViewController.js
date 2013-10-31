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
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
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
        var myStore = Ext.data.StoreManager.lookup(this.store);

        //gotta update the Item Name here since we can't access inside the edit header component.  Also have to update the tab text
        myStore.getAt(0).data.label = this.getView().queryById('itemViewHeaderEdit').queryById('itemNameField').value;
        this.getView().setTitle(myStore.getAt(0).data.label);

        var headerComponent = this.getView().queryById('itemViewHeaderView');
        headerComponent.setTitle(myStore.getAt(0).data.label);
        headerComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Header').valuesStore);
        
        var qualitiesComponent = this.getView().queryById('itemViewPropertiesView');
        qualitiesComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Properties').valuesStore);

        var relatedItemView = this.getView().queryById('relatedItemsView');
        Ext.each(myStore.getAt(0).propertyGroupsStore.getById('Related Items').valuesStore.data.items, function(group){
            if (relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g,''))) {
                relatedItemView.queryById('relatedItemGrid_' + group.get('label').replace(/\s/g,'')).reconfigure(group.valuesStore);
            }
            else {
                relatedItemView.fireEvent('ViewRelatedItems:AddRelationshipGrid', group);
            }
        }, this);

        this.getView().getLayout().setActiveItem(0);
        this.getView().setEditMode(!this.getView().getEditMode());

        myStore.getAt(0).setDirty();
        myStore.sync();
    },

    getItemViewData: function () {
        var tmpStore = Ext.data.StoreManager.lookup(this.store);
        tmpStore.getProxy().url = this.buildItemDataFetchUrl(this.getView().itemUri);
        if(this.getView().getCreateMode())  {
            tmpStore.getProxy().setExtraParam("parentUri", 'thetus%2EArtifactOntology%3AYellowPalmOilContainer%2FModelItemXML');
        }
        tmpStore.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    handleRecordDataRequestSuccess: function (record, operation, success) {
        if (success) {
            var me = this;
            this.storeHelper.init(this.store);

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
            headerEditComponent.queryById('itemNameField').setValue(record[0].data.label);
            headerEditComponent.storeHelper = this.storeHelper;
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
            relatedItemViewEdit.storeHelper = this.storeHelper;
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
            qualitiesEditComponent.storeHelper = this.storeHelper;
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
            if(record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images') !== null)    {
                imagesBrowserComponent.fireEvent('ViewImagesGrid:Setup', record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);
            };


            /*
            are we creating a new item?
             */

            if(me.getView().getEditMode())  {
                me.getView().getLayout().setActiveItem(1);
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
        Ext.create('Savanna.itemView.view.workflow.WorkflowSelect', {
            width: 500,
            height: 425
        });
    },

    onSearchSelect:function() {
        console.log('search selected');
    },

    buildItemDataFetchUrl: function (uri) {
//        uri = encodeURI(uri);
        if(!this.getView().getCreateMode()) {
            return SavannaConfig.itemViewUrl + uri;
        }   else    {
            return SavannaConfig.itemCreateUrl;
        }
    },

    openItem: function (itemName, itemUri) {
        var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
            title: itemName,
            itemUri: encodeURI(itemUri),
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
