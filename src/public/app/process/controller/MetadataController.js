Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    config: {
        diagram: null,
        processUri: null
    },

    control: {
        view: {
            processUriChange: 'setUpProcessDetails',
            processclose: 'onProcessClose'
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
        this.getDiagram().un('itemInstanceCreated', this.instanceLoaded, this);
        // save the existing set of changes, if any
        this.saveChanges();

        // then load up the panel for the new selection
        if (1 === this.getDiagram().selection.count) {
            var itemUri;
            var itemCategory = this.getDiagram().selection.first().data.category;

            switch(itemCategory) {
                case 'ProcessModel':
                case 'InternalGroup':
                    itemUri = encodeURIComponent(this.getDiagram().selection.first().data.uri);
                    // this is a step
                    this.setUpStepDetails(itemUri);
                    break;
                case 'ProcessItem':
                    if (this.getDiagram().selection.first().data.representsItemUri) {
                        itemUri = encodeURIComponent(this.getDiagram().selection.first().data.representsItemUri);
                        // this is an item
                        this.setUpItemDetails(itemUri);
                    }
                    else {
                        //show loading screen
                        this.getDiagram().on('itemInstanceCreated', this.instanceLoaded, this);
                    }

                    break;
                default:
                    //console.log("we don't know what this is yet", itemUri);
                    this.setUpProcessDetails(null);
                    break;
            }
        } else {
            // if nothing is selected, we'll use the whole process
            this.setUpProcessDetails(null);
        }
    },

    instanceLoaded: function() {
        var itemUri = encodeURIComponent(this.getDiagram().selection.first().data.representsItemUri);
        // this is an item
        this.setUpItemDetails(itemUri);
    },

    setUpProcessDetails: function(itemUri) {
        // get proper info from service for item configs
        console.log('MetadataController setUpProcessDetails', itemUri);
        if( null !== itemUri ) {
            this.setProcessUri( itemUri );
            this.getHiddenTabPanel().setActiveTab(this.getFullProcessMetadata());
            this.getFullProcessMetadata().fireEvent('processUriChanged', itemUri);
        } else {
            // show the process details panel
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
    },

    saveChanges: function() {
        // TODO: save the existing set of changes, if any
        console.log('saveChanges');
    },

    onProcessClose: function() {

    }
});