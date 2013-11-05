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

    control: {
        view: {
            stepUriChanged: 'onUriChanged'
        }//,
//        processTitle: true,
//        processDescription: true,
//        imageBrowser: true,
//        detailsPanel: true,
//        sourcesPanel: true

    },


    onUriChanged: function(processUri) {
        console.log('Step onUriChanged',processUri);

        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.store.getProxy().url = this.buildItemDataFetchUrl(processUri);
        console.log('item this.store.getProxy().url',this.store.getProxy().url);

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    buildItemDataFetchUrl: function (uri) {
        return SavannaConfig.itemViewUrl + encodeURI(uri);
    },

    handleRecordDataRequestSuccess: function(record, operation, success) {
        console.log('handleRecordDataRequestSuccess step');
        if(success) {
            console.log('Step wins too!', record.data);
        }
    }



});