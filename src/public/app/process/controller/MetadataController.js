Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    config: {
        diagram: null,
        processUri: null
    },

    control: {
        view: {
            processUriChange: 'setUpProcessDetails'
            //uriChange: 'onUriChange'
        },
        hiddenTabPanel: {
            boxready: 'onBeforeHiddenPanelShow'
        },
        fullProcessMetadata: true,
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

        if(1 === this.getDiagram().selection.count) {
            var itemUri = this.getDiagram().selection.first().data.uri;
            itemUri = encodeURIComponent(itemUri);
            console.log('this.getDiagram().selection.first()', this.getDiagram().selection.first().data.uri);
            if (itemUri.indexOf('ProcessModel') !== -1){
             // this is a step
                console.log('This is a step');
                this.setUpStepDetails();
            } else if (itemUri.indexOf('Item') !== -1) {
             // this is an item
                console.log('This is an item');
                this.setUpItemDetails(itemUri);
            } else {
                console.log('we dont know what this is yet');
                this.setUpProcessDetails(null);
             //we don't know what this is yet
            }
        } else {
            console.log('This is process');
            this.setUpProcessDetails(null);
        }
    },


    setUpProcessDetails: function(itemUri) {
        // get proper info from service for item configs
        console.log('MetadataController setUpProcessDetails');
        if( null !== itemUri ) {
            this.setProcessUri( itemUri );
            // need to populate the full_process_metadata

            this.getFullProcessMetadata().fireEvent('processUriChanged', itemUri);

        } else {
            // show the process details panel
            this.getHiddenTabPanel().setActiveTab(this.getFullProcessMetadata());
        }

    },

    setUpStepDetails: function(itemUri) {
        this.getStepMetadata().show();

        this.getStepMetadata().fireEvent('processUriChanged', itemUri);
        this.getHiddenTabPanel().setActiveTab(this.getStepMetadata());
    },

    setUpItemDetails: function(itemUri) {
        this.getItemMetadata().show();

        console.log('****** setUpItemDetails ready to fire event', itemUri);
        this.getItemMetadata().fireEvent('processUriChanged', itemUri);
        this.getHiddenTabPanel().setActiveTab(this.getItemMetadata());
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
    },

    onBeforeHiddenPanelShow: function() {
        this.getHiddenTabPanel().getTabBar().setVisible(false);
    }
});