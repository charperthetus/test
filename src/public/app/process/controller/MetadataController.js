Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.process.view.metadata.ProcessDetails'
    ],

    control: {
        view: {
            uriChange: 'onUriChange'
        },
        processMetadataPanel: true,

        processDetails: {
            live: true,
            selector: 'process_details',
            listeners: {
                boxready: 'addProcessDetailsListeners'
            }
        }
     },

    constructor: function (options) {
        this.opts = options || {};
        this.callParent(arguments);
    },

    init: function() {
        return this.callParent(arguments);
    },

    onUriChange: function(itemUri) {
        //determine type
        var items;
        if (itemUri.indexOf('ProcessModel') !== -1){
            items = this.setUpProcessDetails(itemUri);
        }else if (itemUri.indexOf('ProcessStep') !== -1){ //TODO: not sure of the types of uris we're looking for here
            items = this.setUpProcessDetails(itemUri);
        }else if (itemUri.indexOf('Item') !== -1){
            items = this.setUpProcessDetails(itemUri);
        }else{
            items = [{xtype:'label',text:'Unrecognized Uri'}];
        }
       this.getProcessMetadataPanel().add(items);
    },


    setUpProcessDetails: function(itemUri) {
        // get proper info from service for item configs

        var description = 'Item Uri is ' + itemUri;
        var pd0 = Ext.create('Savanna.process.view.metadata.ProcessDetails', {
            label: itemUri,
            description: description//,
            //
        });
        var pd1 = Ext.create('Savanna.process.view.metadata.ProcessDetails', {
            label: itemUri,
            description: description//,
        });
       return [pd0, pd1];
    },

    setUpProcessStepDetails: function(itemUri) {
    },

    setUpItemDetails: function(itemUri) {
    },

    addProcessDetailsListeners: function(process_details) {
        process_details.down('#processTitle').addListener('change', this.processLabelChangeHandler);
        process_details.down('#processDescription').addListener('change', this.processLabelChangeHandler);
    },

    processLabelChangeHandler: function(text, newValue, oldValue, eOpts) {
        console.log(arguments);
    }
});