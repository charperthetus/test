/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 4:36 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.controller.ProcessStepMetadataController', {
    extend: 'Deft.mvc.ViewController',

    store: null,
    storeHelper: null,

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    control: {
        view: {
            stepUriChanged: 'onUriChanged'
        },
        stepTitle: true,
        durationLabel: true,
        stepDescription: true,
        stepImageBrowser: true,
        stepActions: true

    },


    onUriChanged: function(processUri) {
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.store.getProxy().url = this.buildItemDataFetchUrl(processUri);

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    buildItemDataFetchUrl: function (uri) {
        //return SavannaConfig.itemViewUrl + encodeURI(uri);
        return SavannaConfig.mockItemViewUrl + encodeURI(uri); // mock data
    },

    handleRecordDataRequestSuccess: function(record, operation, success) {
        if(success) {
            this.storeHelper.init(this.store);
            this.getStepTitle().setValue(this.store.getAt(0).data.label);
            this.getStepDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
            this.getStepImageBrowser().storeHelper = this.storeHelper;
            this.getStepImageBrowser().store = record[0].propertyGroupsStore.getById('Images').valuesStore;
            this.getStepImageBrowser().fireEvent('EditImagesGrid:Setup', record[0].propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);
        }
    }



});