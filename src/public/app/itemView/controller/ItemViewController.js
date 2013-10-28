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
            'ItemView:OpenItem': 'openItem',
            'ItemView:DeleteRelatedItem': 'deleteRelatedItem'
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
        var headerComponent = this.getView().queryById('itemViewHeaderView');
        headerComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Header').valuesStore);
        
        var qualitiesComponent = this.getView().queryById('itemViewPropertiesView');
        qualitiesComponent.reconfigure(myStore.getAt(0).propertyGroupsStore.getById('Properties').valuesStore);
        
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
            annotationViewComponent.setTitle('Participated in Process (' + record[0].propertyGroupsStore.getById('Annotations').valuesStore.data.length + ')');
            annotationViewComponent.reconfigure(record[0].propertyGroupsStore.getById('Annotations').valuesStore);

            /*
            Annotation Properties Edit
             */
            var annotationEditComponent = me.getView().queryById('annotationPropertiesEdit');
            annotationEditComponent.setTitle('Participated in Process (' + record[0].propertyGroupsStore.getById('Annotations').valuesStore.data.length + ')');
            annotationEditComponent.reconfigure(record[0].propertyGroupsStore.getById('Annotations').valuesStore);

            /*
            Images View
            */
            var imagesBrowserComponent = me.getView().queryById('itemViewImagesGrid');
            imagesBrowserComponent.fireEvent('ViewImagesGrid:Setup', record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);

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

    onRelationshipSelect:function() {
        Ext.create('Savanna.itemView.view.relatedItems.AddRelationships', {
            width: 400,
            height: 300
        });
    },

    buildItemDataFetchUrl: function (uri) {
        uri = encodeURI(uri);
        return SavannaConfig.itemViewUrl + uri + ';jsessionid=' + Savanna.jsessionid;
    },

    openItem: function (itemName, itemUri) {
        console.log('itemName',itemName);
        console.log('itemUri', itemUri);
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
