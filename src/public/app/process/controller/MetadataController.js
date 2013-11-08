Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    config: {
        diagram: null,
        processUri: null,
        canvas: null
    },

    control: {
        view: {
            processUriChange: 'setUpProcessDetails',
            processclose: 'onProcessClose'
        },
        hiddenPanel: {
            boxready: 'onBeforeHiddenPanelShow'
        },
        fullProcessMetadata:  {
            boxready: 'addFullProcessMetadataListeners'
        },
        stepMetadata: true,
        itemMetadata: true,
        nothingHereLabel: true
     },

    constructor: function (options) {
        this.opts = options || {};
        this.callParent(arguments);
    },

    init: function() {
        this.callParent(arguments);
        this.setDiagram(this.getView().up('process_component').down('#canvas').diagram);
        this.setCanvas(this.getView().up('process_component').down('#canvas'));
        this.getDiagram().addDiagramListener('ChangedSelection', Ext.bind(this.selectionChanged, this));
    },

    selectionChanged: function(e) {
//        this.getDiagram().un('itemInstanceCreated', this.instanceLoaded, this);
        // save the existing set of changes, if any
        this.saveChanges();

        // then load up the panel for the new selection
        if (1 === this.getDiagram().selection.count) {
            var itemUri;
            var itemName = this.getDiagram().selection.first().data.label;
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
                        this.setUpItemDetails(itemUri, itemName);
                    }
                    else {
                        //show loading screen
                        this.getHiddenPanel().getLayout().setActiveItem(this.getNothingHereLabel());
                        this.getCanvas().on('itemInstanceCreated', this.instanceLoaded, this);
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
        if( null !== itemUri ) {
            this.setProcessUri( itemUri );
            this.getHiddenPanel().getLayout().setActiveItem(this.getFullProcessMetadata());
            this.getFullProcessMetadata().fireEvent('processUriChanged', itemUri);
        } else {
            // show the process details panel
            this.getHiddenPanel().getLayout().setActiveItem(this.getFullProcessMetadata());
        }
    },

    setUpStepDetails: function(itemUri) {
        this.getStepMetadata().show();

        this.getStepMetadata().fireEvent('stepUriChanged', itemUri);
        this.getHiddenPanel().getLayout().setActiveItem(this.getStepMetadata());
    },

    setUpItemDetails: function(itemUri,itemName) {
        this.getItemMetadata().show();

        this.getItemMetadata().fireEvent('processItemUriChanged', itemUri,itemName);
        this.getHiddenPanel().getLayout().setActiveItem(this.getItemMetadata());
    },

    addFullProcessMetadataListeners: function(process_details) {
        process_details.down('#processTitle').addListener('change', this.processLabelChangeHandler);
        process_details.down('#processDescription').addListener('change', this.processLabelChangeHandler);
    },

    processLabelChangeHandler: function(text, newValue, oldValue, eOpts) {
        //console.log('processLabelChangeHandler', arguments);
    },

    processSelectionChanged: function(e) {
        //console.log('processSelectionChanged selection size', this.getDiagram().selection.count);
    },

    onBeforeHiddenPanelShow: function() {
        //this.getHiddenPanel().getTabBar().setVisible(false);
    },

    saveChanges: function() {
        // TODO: save the existing set of changes, if any
        this.getHiddenPanel().getLayout().getActiveItem().fireEvent('savechanges');
    },

    onProcessClose: function() {
        this.saveChanges();
    }
});