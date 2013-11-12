Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    config: {
        diagram: null,
        canvas: null
    },

    control: {
        view: {
            processUriChange: 'setUpProcessDetails',
            processclose: 'onProcessClose'
        },
        hiddenPanel: true,
        fullProcessMetadata: {
            readyForDisplay: 'showProcessView'
        },
        itemMetadata: {
            readyForDisplay: 'showItemView'
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
        // save the existing set of changes, if any
        this.saveChanges();

        // then load up the panel for the new selection
        if (1 === this.getDiagram().selection.count) {
            var itemCategory = this.getDiagram().selection.first().data.category;

            switch(itemCategory) {
                case 'ProcessItem':
                    //show loading screen
                    this.getHiddenPanel().getLayout().setActiveItem(this.getNothingHereLabel());

                    if (this.getDiagram().selection.first().data.className) {
                        this.itemLoaded();
                    }
                    else {
                        this.getCanvas().on('itemLoaded', this.itemLoaded, this);
                    }

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

    itemLoaded: function() {
        this.getCanvas().un('itemLoaded', this.itemLoaded, this);
        var store = this.getView().up('process_component').getController().store.getAt(0).nodeDataArrayStore;
        var len = store.data.length;

        for (var i= 0; i<len; i++) {
            var storeData = store.getAt(i);
            if (storeData.data.uri === this.getDiagram().selection.first().data.uri) {
                break;
            }
        }
        // this is an item
        this.setUpItemDetails(store, i);
    },

    setUpProcessDetails: function(itemUri) {
        // load the side panel initially or just show it
        if( null !== itemUri ) {
            this.getFullProcessMetadata().fireEvent('processUriChanged', itemUri);
        } else {
            // show the process details panel
            this.getHiddenPanel().getLayout().setActiveItem(this.getFullProcessMetadata());
        }
    },

    setUpItemDetails: function(store, index) {
        this.getItemMetadata().fireEvent('processItemUriChanged', store, index);
    },

    showItemView: function() {
        this.getHiddenPanel().getLayout().setActiveItem(this.getItemMetadata());
    },

    showProcessView: function() {
        this.getHiddenPanel().getLayout().setActiveItem(this.getFullProcessMetadata());
    },

    saveChanges: function() {
        // TODO: save the existing set of changes, if any
        this.getHiddenPanel().getLayout().getActiveItem().fireEvent('savechanges');
    },

    onProcessClose: function() {
        this.saveChanges();
    }
});