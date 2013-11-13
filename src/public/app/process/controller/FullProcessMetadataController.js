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
    nodeData: null,
    mainNode: null,

    requires: [
        'Savanna.itemView.store.MainItemStore',
        'Savanna.itemView.store.ItemViewStoreHelper',
        'Savanna.process.view.metadata.ProcessCategoryWindow'
    ],

    control: {
        view: {
            processUriChanged: 'onUriChanged',
            processCategorySelected: 'onProcessCategorySelected'
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

    onUriChanged: function(processUri, store) {
        this.nodeData = this.getView().up('process_component').getController().store.getAt(0).data.nodeDataArray[0];
        this.mainNode = this.getView().up('process_component').getController().store.getAt(0).data;
        this.store = store;
        this.store.getAt(0).data.mainProcessUri = processUri;
        this.nodeData.mainProcessUri = processUri;

        if (!this.store.getAt(0).data.label || this.store.getAt(0).data.label.length === 0) {
            this.store.getAt(0).data.label = 'Untitled Process';
            this.nodeData.label = this.store.getAt(0).data.label;
            this.mainNode.label = this.store.getAt(0).data.label;
        }


        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
        this.handleData();
    },

    handleData: function() {
        this.storeHelper.init(this.store);
        this.getProcessTitle().setValue(this.store.getAt(0).data.label);

        if (this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0)) {
            this.getProcessDescription().setValue(this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description').valuesStore.getAt(0).data.value);
        }

        this.getImageBrowser().storeHelper = this.storeHelper;
        this.getImageBrowser().store = this.store.getAt(0).propertyGroupsStore.getById('Images').valuesStore;
        this.getImageBrowser().fireEvent('EditImagesGrid:Setup', this.store.getAt(0).propertyGroupsStore.getById('Images').valuesStore.getById('Images').valuesStore.data.items);
        this.getItemSources().storeHelper = this.storeHelper;
        this.getItemSources().store = this.store.getAt(0).propertyGroupsStore.getById('Sources').valuesStore;
        Ext.bind(this.getItemSources().addSourcesGrid(this.store.getAt(0).propertyGroupsStore.getById('Sources').valuesStore.getById('Source Document').valuesStore), this.getItemSources());
        this.getInformationPanel().setItemUri(encodeURI(this.store.getAt(0).data.mainProcessUri));

        if(this.store.getAt(0).data.categoryLabel && 0 < this.store.getAt(0).data.categoryLabel.length) {
            this.getCategoryValue().setText(this.store.getAt(0).data.categoryLabel);
        }

        this.getView().fireEvent('readyForDisplay');
    },

    processTitleBlur: function(e) {
        var value = {label: e.getValue(), comment: null, value: e.getValue()};
        this.store.getAt(0).data.label = e.getValue();
        this.nodeData.label = e.getValue();
        this.mainNode.label = e.getValue();
        this.getView().up('process_component').setTitle(this.store.getAt(0).data.label);
    },

    processDescriptionBlur: function(e) {
        var value = {label: "Description", comment: null, value: e.getValue()};
        this.storeHelper.updateBotLevItemInStore(null, value, this.store.getAt(0).propertyGroupsStore.getById('Header').valuesStore.getById('Description'));
        this.mainNode.description = e.getValue();
    },

    onCategoryChooserButtonSelect: function(e) {
        var me = this;
        Ext.create('Savanna.process.view.metadata.ProcessCategoryWindow', {
            viewer: me.getView(),
            width: 300,
            height: 500
        }, this);

    },

    onProcessCategorySelected: function(selection) {
        this.getCategoryValue().setText(selection.label);

        this.store.getAt(0).data.categoryLabel = selection.label;
        this.nodeData.categoryLabel = selection.label;
        this.store.getAt(0).data.categoryUri = selection.uri;
        this.nodeData.categoryUri = selection.uri;
    }

});