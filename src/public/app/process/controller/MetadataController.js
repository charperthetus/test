Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    config: {
        diagram: null,
        canvas: null
    },

    control: {
        view: {
            processUriChange: 'setUpProcessDetails'
        },
        hiddenPanel: true,
        fullProcessMetadata: {
            readyForDisplay: 'showProcessView'
        },
        itemMetadata: {
            readyForDisplay: 'showItemView'
        },
        nothingHereLabel: true,
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
        this.getCanvas().un('itemReLoaded', this.itemReLoaded, this);
        // save the existing set of changes, if any
        this.clearPanel();

        // then load up the panel for the new selection
        if (1 === this.getDiagram().selection.count) {
            var itemCategory = this.getDiagram().selection.first().data.category;

            switch(itemCategory) {
                case 'ProcessItem':
                    this.getCanvas().on('itemReLoaded', this.itemReLoaded, this);
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

        this.setUpItemDetails(store, i);
    },

    itemReLoaded: function(index) {
        this.getItemMetadata().fireEvent('clearPanel');
        var store = this.getView().up('process_component').getController().store.getAt(0).nodeDataArrayStore;
        this.setUpItemDetails(store, index);
    },

    setUpProcessDetails: function(itemUri) {
        // load the side panel initially or just show it
        if( null !== itemUri ) {
            this.getFullProcessMetadata().fireEvent('processUriChanged', itemUri, this.getView().up('process_component').getController().store.getAt(0).nodeDataArrayStore);
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

        // TODO: Fix me so that we are called from the controller with a get method
        // Unfortuantly we shouldn't have to do this is we build our component structure properly.
        Ext.ComponentQuery.query('#rnrmDescriptionContainer')[0].doLayout();
    },

    showProcessView: function() {
        this.getHiddenPanel().getLayout().setActiveItem(this.getFullProcessMetadata());
    },

    clearPanel: function() {
        this.getHiddenPanel().getLayout().getActiveItem().fireEvent('clearPanel');
    }
});