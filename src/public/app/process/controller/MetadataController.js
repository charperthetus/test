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
        hiddenPanel: true,
        fullProcessMetadata:  {
            boxready: 'addFullProcessMetadataListeners'
        },
        itemMetadata: {
            itemReadyForDisplay: 'showTheItemView'
        },
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
            var data = this.getDiagram().selection.first().data;
            var itemCategory = data.category;

            switch(itemCategory) {
                case 'ProcessItem':
                    //show loading screen
                    this.getHiddenPanel().getLayout().setActiveItem(this.getNothingHereLabel());

                    var store = this.getView().up('process_component').getController().store.getAt(0).nodeDataArrayStore;
                    var len = store.data.length;
                    for (var i= 0; i<len; i++) {
                        var storeData = store.getAt(i);
                        if (storeData.data.uri === data.uri) {
                            break;
                        }
                    }
                    // this is an item
                    this.setUpItemDetails(store, i);

                    break;
                default:
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
        if( null !== itemUri ) {
            this.setProcessUri( itemUri );
            this.getHiddenPanel().getLayout().setActiveItem(this.getFullProcessMetadata());
            this.getFullProcessMetadata().fireEvent('processUriChanged', itemUri);
        } else {
            // show the process details panel
            this.getHiddenPanel().getLayout().setActiveItem(this.getFullProcessMetadata());
        }
    },

    setUpItemDetails: function(store, index) {
        this.getItemMetadata().fireEvent('processItemUriChanged', store, index);
    },

    showTheItemView: function() {
        this.getHiddenPanel().getLayout().setActiveItem(this.getItemMetadata());
    },

    addFullProcessMetadataListeners: function(process_details) {
//        process_details.down('#processTitle').addListener('change', this.processLabelChangeHandler);
//        process_details.down('#processDescription').addListener('change', this.processLabelChangeHandler);
    },

//    processLabelChangeHandler: function(text, newValue, oldValue, eOpts) {
//        //console.log('processLabelChangeHandler', arguments);
//    },
//
//    processSelectionChanged: function(e) {
//        //console.log('processSelectionChanged selection size', this.getDiagram().selection.count);
//    },

    saveChanges: function() {
        // TODO: save the existing set of changes, if any
        this.getHiddenPanel().getLayout().getActiveItem().fireEvent('savechanges');
    },

    onProcessClose: function() {
        this.saveChanges();
    }
});