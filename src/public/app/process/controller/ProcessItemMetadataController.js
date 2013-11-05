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
        console.log('Item onUriChanged',processUri);

        this.store = Ext.create('Savanna.itemView.store.MainItemStore');
        this.store.getProxy().url = this.buildItemDataFetchUrl(processUri);
        console.log('item this.store.getProxy().url',this.store.getProxy().url);

        this.store.load({
            scope: this,
            callback: this.handleRecordDataRequestSuccess
        });
    },

    buildItemDataFetchUrl: function (uri) {
        return SavannaConfig.itemViewUrl + uri;
    },

    handleRecordDataRequestSuccess: function(record, operation, success) {
        console.log('handleRecordDataRequestSuccess item');
        if(success) {
            console.log('We Win!');
        }
    }



});