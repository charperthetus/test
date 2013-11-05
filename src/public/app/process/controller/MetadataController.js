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
        fullProcessMetadata:  {
            boxready: 'addFullProcessMetadataListeners'
        },
        stepMetadata: true,
        itemMetadata: true

     },

    constructor: function (options) {
        this.opts = options || {};
        this.callParent(arguments);
    },

    init: function() {
        this.callParent(arguments);
        this.setDiagram(this.getView().up('process_component').down('#canvas').diagram);

        this.getDiagram().addDiagramListener('ChangedSelection', Ext.bind(this.selectionChanged, this));
    },

    selectionChanged: function(e) {

        if(1 === this.getDiagram().selection.count) {
            var itemUri = encodeURIComponent(this.getDiagram().selection.first().data.uri);
            var itemCategory = this.getDiagram().selection.first().data.category;
            switch(itemCategory) {
                case 'ProcessModel':
                case 'InternalGroup':
                    // this is a step
                    this.setUpStepDetails(itemUri);
                    break;
                case 'ProcessItem':
                    // this is an item
                    //console.log('This is an item');
                    this.setUpItemDetails(itemUri);
                    break;
                default:
                    console.log("we don't know what this is yet", itemUri);
                    this.setUpProcessDetails(null);
                    break;
            }
        } else {
            // if nothing is selected, we'll use the whole process
            this.setUpProcessDetails(null);
        }
    },

    setUpProcessDetails: function(itemUri) {
        // get proper info from service for item configs
        console.log('MetadataController setUpProcessDetails', itemUri);
        if( null !== itemUri ) {
            this.setProcessUri( itemUri );
            this.getFullProcessMetadata().show();
            this.getFullProcessMetadata().fireEvent('processUriChanged', itemUri);
            this.getHiddenTabPanel().setActiveTab(this.getFullProcessMetadata());
        } else {
            this.getFullProcessMetadata().show();
            this.getHiddenTabPanel().setActiveTab(this.getFullProcessMetadata());
        }
    },

    setUpStepDetails: function(itemUri) {
        this.getStepMetadata().show();

        this.getStepMetadata().fireEvent('stepUriChanged', itemUri);
        this.getHiddenTabPanel().setActiveTab(this.getStepMetadata());
    },

    setUpItemDetails: function(itemUri) {
        this.getItemMetadata().show();

        this.getItemMetadata().fireEvent('processUriChanged', itemUri);
        this.getHiddenTabPanel().setActiveTab(this.getItemMetadata());
    },

    addFullProcessMetadataListeners: function(process_details) {
        process_details.down('#processTitle').addListener('change', this.processLabelChangeHandler);
        process_details.down('#processDescription').addListener('change', this.processLabelChangeHandler);
    },

    processLabelChangeHandler: function(text, newValue, oldValue, eOpts) {
        console.log('processLabelChangeHandler', arguments);
    },

    processSelectionChanged: function(e) {
        console.log('processSelectionChanged selection size', this.getDiagram().selection.count);
    },

    onBeforeHiddenPanelShow: function() {
        this.getHiddenTabPanel().getTabBar().setVisible(false);
    }
});