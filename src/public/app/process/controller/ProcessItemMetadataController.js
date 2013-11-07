/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 4:36 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.controller.ProcessItemMetadataController', {
    extend: 'Deft.mvc.ViewController',

    store: null,
    storeHelper: null,
    itemName: null,

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    control: {
        view: {
            processItemUriChanged: 'onUriChanged',
            savechanges: 'onSaveChanges'
        },
        openBtn: {
            click: 'onOpenBtnClick'
        },

        itemTitle: {
            blur: 'itemTitleBlur'
        },
        itemDescription: {
            blur: 'itemDescriptionBlur'
        },
        itemPrimeImage: true,
        itemInstanceTitle: true,
//        itemInstanceDescription: true,
        itemQualities: true

    },

    onOpenBtnClick: function() {
        //console.log('open item');
        EventHub.fireEvent('open', {uri: this.store.getAt(0).data.uri, type: 'Item', label: this.store.getAt(0).data.label});
    },

    onUriChanged: function(processUri, itemName) {
        this.itemName = itemName;
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.store.getProxy().url = this.buildItemDataFetchUrl(processUri);

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    buildItemDataFetchUrl: function (uri) {
        return SavannaConfig.itemViewUrl + uri;
        //return SavannaConfig.mockItemViewUrl + encodeURI(uri); // mock data
    },

    handleRecordDataRequestSuccess: function(record, operation, success) {
        if(success) {
            this.storeHelper.init(this.store);
            this.getItemTitle().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Intended Use').valuesStore.getAt(0).data.inheritedFrom.label);

            if (this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0)) {
                this.getItemDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
            }

            this.getItemInstanceTitle().setValue(this.store.getAt(0).data.label);
            this.getItemQualities().storeHelper = this.storeHelper;
            this.getItemQualities().store = record[0].propertyGroupsStore.getById('Properties').valuesStore;
            this.getItemQualities().fireEvent('EditQualities:StoreSet');

            if (this.store.getAt(0).propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.getAt(0)) {
                var imageURI = record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.getAt(0).data.uri;
                this.getItemPrimeImage().setSrc( SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageURI) + '/original/');
            }

            this.getItemInstanceTitle().setText(this.itemName);

        }
    },

    onSaveChanges: function() {
        // TODO: save the existing set of changes, if any
        console.log('ProcessItemMetadataController saveChanges');
        this.store.getAt(0).setDirty();
        this.store.sync();
    },

    itemTitleBlur: function(e) {
        if(this.store.getAt(0).data.label !== e.getValue()) {
            this.store.getAt(0).data.label = e.getValue();
            this.store.getAt(0).setDirty();
        }
    },

    itemDescriptionBlur: function(e) {
        if(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value !== e.getValue()) {
            this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value = e.getValue();
            this.store.getAt(0).setDirty();
        }
    }


});