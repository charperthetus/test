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

    control: {
        view: {
            processUriChanged: 'onUriChanged'
        }//,
//        processTitle: true,
//        processDescription: true,
//        imageBrowser: true,
//        detailsPanel: true,
//        sourcesPanel: true

    },


    onUriChanged: function(processUri) {
        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
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
            this.getProcessTitle().setValue(this.store.getAt(0).data.label);
            this.getProcessDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);

        }
    }



});