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
        },
        stepTitle: true,
        durationLabel: true,
        stepDescription: true,
        stepImageBrowser: true,
        stepActions: true

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
            console.log('Step wins too!', record.data);
            this.getStepTitle().setValue(this.store.getAt(0).data.label);
            this.getStepDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
        }
    }



});