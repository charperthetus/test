Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.process.view.metadata.ProcessDetails',
        'Savanna.itemView.view.header.EditHeader'
    ],

    config: {
        diagram: null,
        processUri: null
    },

    control: {
        view: {
            //uriChange: 'onUriChange'
        },
        processMetadata: true,
        //processSidepanel: true,
        stepMetadata: true,
        itemMetadata: true,

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
        this.callParent(arguments);
        this.setDiagram(this.getView().up('process_component').down('#canvas').diagram);

        this.getDiagram().addDiagramListener('ChangedSelection', Ext.bind(this.selectionChanged, this));

        return;
    },

    selectionChanged: function(e) {
        //determine type

    if(1 === this.getDiagram().selection.count) {
    var itemUri = this.getDiagram().selection.first().data.representsUri;
        console.log('this.getDiagram().selection.first()', this.getDiagram().selection.first());
        if (itemUri.indexOf('ProcessModel') !== -1){
         // this is a step
        } else if (itemUri.indexOf('Item') !== -1) {
         // this is an item
        } else {
         //we don't know what this is yet
        }
    } else {
        this.setUpProcessDetails(null);
    }


    },


    setUpProcessDetails: function(itemUri) {
        // get proper info from service for item configs

        if( null === itemUri ) {
            this.setProcessUri( itemUri );
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
            getProcessMetadataPanel().items = [pd0, pd1];
        } else {
            // show the process details panel
            getProcessSidepanel().child('#processMetadata').tab.show();
        }

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
    },

    processSelectionChanged: function(e) {
        console.log('selection size', this.getDiagram().selection.count);
    }
});