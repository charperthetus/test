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
    mainProcessUri: null,

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    control: {
        view: {
            savechanges: 'onSaveChanges',
            processUriChanged: 'onUriChanged'
        },
        processTitle: {
            blur: 'processTitleBlur'
        },
        processDescription: {
            blur: 'processDescriptionBlur'
        },
        categoryValue: true,
        categoryChooserButton: {
            click: 'onCategoryChooserButtonSelect'
        },
        imageBrowser: true,
        informationPanel: true,
        itemSources: true
    },

    onUriChanged: function(processUri) {
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.store.getProxy().url = this.buildItemDataFetchUrl(processUri);
        this.mainProcessUri = processUri;
//
        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestResponse
        });
    },

    buildItemDataFetchUrl: function (uri) {
        return SavannaConfig.itemViewUrl + encodeURI(uri);
        //return SavannaConfig.mockItemViewUrl + encodeURI(uri); // mock data
    },

    handleRecordDataRequestResponse: function(record, operation, success) {
        if(success) {
            this.storeHelper.init(this.store);
            this.getProcessTitle().setValue(this.store.getAt(0).data.label);

            if (this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0)) {
                this.getProcessDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
            }

            this.getImageBrowser().storeHelper = this.storeHelper;
            this.getImageBrowser().store = record[0].propertyGroupsStore.getById('Images').valuesStore;
            this.getImageBrowser().fireEvent('EditImagesGrid:Setup', record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);
            this.getItemSources().storeHelper = this.storeHelper;
            this.getItemSources().store = record[0].propertyGroupsStore.getById('Sources').valuesStore;
            Ext.bind(this.getItemSources().addSourcesGrid(record[0].propertyGroupsStore.getById('Sources').valuesStore.getById('Source Document').valuesStore), this.getItemSources());
            this.getInformationPanel().setItemUri(encodeURI(this.mainProcessUri));
        }
    },

    onSaveChanges: function() {
        if(this.store && this.store.getAt(0)) {
            this.store.getAt(0).setDirty();
            this.store.sync();
        }
    },

    processTitleBlur: function(e) {
        var value = {label: e.getValue(), comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore(null, value, this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Label'));
        this.store.getAt(0).data.label = e.getValue();
        this.getView().up('process_component').setTitle(this.store.getAt(0).data.label);
    },

    processDescriptionBlur: function(e) {
        var value = {label: "Description", comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore(null, value, this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description'));
    },

    onCategoryChooserButtonSelect: function(e) {
        console.log('onCategoryChooserButtonSelect');
    }

});