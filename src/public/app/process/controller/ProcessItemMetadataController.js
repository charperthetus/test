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

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

    control: {
        view: {
            processUriChanged: 'onUriChanged'
        },
        openBtn: {
            click: 'onOpenBtnClick'
        },

        itemTitle: true,
        itemDescription: true,
        itemPrimeImage: true,
        itemInstanceTitle: true,
        itemInstanceDescription: true,
        itemQualities: true

    },

    onOpenBtnClick: function() {
        console.log('open item');
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
        return SavannaConfig.mockItemViewUrl + encodeURI(uri);
    },

    handleRecordDataRequestSuccess: function(record, operation, success) {
        if(success) {
            console.log('Item wins too!', record.data);
            this.storeHelper.init(this.store);
            this.getItemTitle().setValue(this.store.getAt(0).data.label);
            this.getItemDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
            this.getItemQualities().storeHelper = this.storeHelper;
            this.getItemQualities().store = record[0].propertyGroupsStore.getById('Properties').valuesStore;
            this.getItemQualities().fireEvent('EditQualities:StoreSet');
        }
    }
});