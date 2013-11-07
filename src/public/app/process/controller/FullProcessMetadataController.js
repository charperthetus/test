/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 4:35 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.controller.FullProcessMetadataController', {
    extend: 'Deft.mvc.ViewController',

    store: null,
    storeHelper: null,

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    control: {
        view: {
            processUriChanged: 'onUriChanged',
            savechanges: 'onSaveChanges'
        },
        processTitle: {
            blur: 'processTitleBlur'
        },
        processDescription: {
            blur: 'processDescriptionBlur'
        },
        imageBrowser: true,
        detailsPanel: true,
        itemSources: true
    },

    onUriChanged: function(processUri) {
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.store.getProxy().url = this.buildItemDataFetchUrl(processUri);

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestResponse
        });
        this.getDetailsPanel().setItemURI(encodeURI(processUri));
    },

    buildItemDataFetchUrl: function (uri) {
        //return SavannaConfig.itemViewUrl + encodeURI(uri);
        return SavannaConfig.mockItemViewUrl + encodeURI(uri); // mock data
    },

    handleRecordDataRequestResponse: function(record, operation, success) {
        if(success) {
            this.storeHelper.init(this.store);
            this.getProcessTitle().setValue(this.store.getAt(0).data.label);
            this.getProcessDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
            this.getImageBrowser().storeHelper = this.storeHelper;
            this.getImageBrowser().store = record[0].propertyGroupsStore.getById('Images').valuesStore;
            this.getImageBrowser().fireEvent('EditImagesGrid:Setup', record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);
            this.getItemSources().storeHelper = this.storeHelper;
            this.getItemSources().store = record[0].propertyGroupsStore.getById('Sources').valuesStore;
            Ext.bind(this.getItemSources().addSourcesGrid(record[0].propertyGroupsStore.getById('Sources').valuesStore.getById('Source Document').valuesStore), this.getItemSources());
        }
    },

    onSaveChanges: function() {
        console.log('FullProcessMetadataController saveChanges');
        this.store.getAt(0).setDirty();
        this.store.sync();
    },

    processTitleBlur: function(e) {
        if(this.store.getAt(0).data.label !== e.getValue()) {
            this.store.getAt(0).data.label = e.getValue();
            this.store.getAt(0).setDirty();
        }
    },

    processDescriptionBlur: function(e) {
        if( this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value !== e.getValue() ) {
            this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value = e.getValue();
            this.store.getAt(0).setDirty();
        }
    }

});