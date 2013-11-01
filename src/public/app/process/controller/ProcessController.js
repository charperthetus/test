/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 1:02 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.controller.ProcessController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.process.utils.ProcessUtils',
        'Savanna.process.utils.ViewTemplates',
        'Savanna.process.store.Processes',
        'Savanna.process.view.part.Overview' //added dynamically later
    ],
    store: null,

    control: {
        newProcess: {
            click: 'clearJSONClick'
        },
        expandsteps: {
            click: 'expandStepsClick'
        },
        collapsesteps: {
            click: 'collapseStepsClick'
        },
        loadJSON: {
            click: 'loadJSONClick'
        },
        saveJSON: {
            click: 'saveJSONClick'
        },
        clearJSON: {
            click: 'clearJSONClick'
        },
        canvas: {
            boxready: 'initCanvas'
        },
        metadata: {
        },
        undo: {
            click: 'handleUndo'
        },
        redo: {
            click: 'handleRedo'
        },
        merge: {
            click: 'handleMerge'
        },
        alts: {
            click: 'handleAlts'
        },
        zoomin: {
            click: 'zoomIn'
        },
        zoomout: {
            click: 'zoomOut'
        },
        zoomToFit: {
            click: 'zoomToFit'
        },
        cancelprocess: {
            click: 'onCancel'
        },
        saveprocess: {
            click: 'onSave'
        },
        view: {
            beforeclose: 'onProcessClose'
        },
        palette: {
            // palette window has its own controller
        },
        showPalette: {
            click: 'togglePalette'
        },
        showOverview: {
            click: 'toggleOverview'
        }
    },

    constructor: function (options) {
        this.opts = options || {};
        this.callParent(arguments);
    },

    init: function() {
        //todo: diagram initialization here: setup for checking for a "dirty" process component
        var uri = this.getView().getItemUri();
        this.store = Ext.create('Savanna.process.store.Processes', {itemUri:uri});
        return this.callParent(arguments);
    },

    onStoreLoaded: function (records) {
        this.load(this.getCanvas().diagram, records[0]);
    },

    toggleExpanded: function(expand) {
        var diagram = this.getCanvas().diagram;
        diagram.startTransaction('toggleExpanded');
        var iter = diagram.nodes;
        while ( iter.next() ){
            var node = iter.value;
            if (node instanceof go.Group) {
                node.isSubGraphExpanded = expand;
            }
        }
        diagram.commitTransaction('toggleExpanded');
    },
    expandStepsClick: function() {
        this.toggleExpanded(true);
    },
    collapseStepsClick: function() {
        this.toggleExpanded(false);
    },
    loadJSONClick: function() {
        var diagram = this.getCanvas().diagram;
        var textarea = this.getMetadata().down('#JSONtextarea');

        var str = textarea.value;
        diagram.model = go.Model.fromJson(str);
        diagram.undoManager.isEnabled = true;
    },
    saveJSONClick: function() {
        var metadata = this.getMetadata();
        this.showDiagramJSON(this.getCanvas().diagram, metadata.down('#JSONtextarea'));
    },
    clearJSONClick: function() {
        var metadata = this.getMetadata();
        var textArea = metadata.down('#JSONtextarea');
        this.clear(this.getCanvas().diagram, textArea);
    },

    // Show the diagram's model in JSON format that the user may have edited
    showDiagramJSON: function(diagram, textarea) {
        var str = diagram.model.toJson();
        textarea.setValue(str);
    },

    load: function(diagram, rec) {
        diagram.model = go.GraphObject.make(go.GraphLinksModel, {
            nodeKeyProperty: rec.get('nodeKeyProperty'),
            nodeDataArray: rec.get('nodeDataArray'),
            linkDataArray: rec.get('linkDataArray')
        });
        diagram.undoManager.isEnabled = true;
    },

    clear: function(diagram, textarea) {
        var newProcess = {'class': 'go.GraphLinksModel', 'nodeKeyProperty': 'uri', 'nodeDataArray': [{'category':'Start'}], 'linkDataArray': []};
        newProcess.nodeDataArray[0].uri = Savanna.process.utils.ProcessUtils.getURI('Start');
        newProcess.uri = Savanna.process.utils.ProcessUtils.getURI('ProcessModel');
        this.store.add(newProcess);
        this.load(diagram, this.store.first());
        this.showDiagramJSON(diagram, textarea);
    },

    handleUndo: function() {
        this.getCanvas().diagram.undoManager.undo();
    },

    handleRedo: function() {
        this.getCanvas().diagram.undoManager.redo();
    },

    handleMerge: function() {
        Savanna.process.utils.ProcessUtils.addMerge(this.getCanvas().diagram);
    },

    handleAlts: function() {
        Savanna.process.utils.ProcessUtils.addAlts(this.getCanvas().diagram);
    },

    zoomIn: function() {
        var diagram = this.getCanvas().diagram;
        diagram.scale = diagram.scale * Math.LOG2E;
    },

    zoomOut: function() {
        var diagram = this.getCanvas().diagram;
        diagram.scale = diagram.scale / Math.LOG2E;
    },

    zoomToFit: function() {
        this.getCanvas().diagram.zoomToFit();
    },

    confirmClosed: false,

    onProcessClose: function(panel) {
        var me = this;
        Ext.Msg.show({
            title: 'Close Process',
            msg: 'Are you sure you want to close? Any unsaved changes will be lost.', //todo: get final wording for dialog
            buttons: Ext.Msg.YESNOCANCEL,
            buttonText: {yes: 'Close and Disard Changes', no: 'Save Changes and Close', cancel: 'Cancel'},//Ext.Msg.YESNOCANCEL,
            fn: function(button) {
                if(button == 'yes'){
                    //discard changes and close
                    me.confirmClosed = true;
                    panel[panel.closeAction]();
                } else if (button == 'no') {
                    //save and close
                    me.onSave();
                    panel[panel.closeAction]();
                } else {
                    //do nothing, leave the process open
                }
            }
        });
        return false;
    },

    onCancel: function() {
        var me = this;
        Ext.Msg.confirm(
            'Cancel Changes?',
            'This will abort any changes you have made. Are you sure you want to cancel your changes?',//todo: get final wording for dialog
            function(btn) {
               if (btn == 'yes') {
                   me.cancelProcess();
               }
            }
        );
    },

    cancelProcess: function() {
        //todo: options:
        // - rollback to initial transaction (if possible in GoJS)...i don't think this is possible
        // - make a service call to get/load json for the uri - which should just be store.load()
        // For now just reload the initial JSON
        var diagram = this.getCanvas().diagram;
        if (diagram.isInTransaction) {
            diagram.rollbackTransaction();
        }
        this.loadInitialJSON();
    },

    onSave: function() {
        //todo: options:
        // - commit the initial transaction (if possible in GoJS)...i don't think this is possible
        // - Call service to save json data - this should just be store.sync()
        // - Start a new main transaction...again, probably not possible
        this.store.first().setDirty();
        this.store.sync();
    },

    initCanvas: function() {
        var diagram = this.getCanvas().diagram;
        diagram.addDiagramListener('PartResized', Ext.bind(this.partResized, this));
        diagram.addDiagramListener('TextEdited', Ext.bind(this.textEdited, this));

        var uri = this.getView().getItemUri();
        if (uri) {
            this.store.load({callback: this.onStoreLoaded, scope: this});
        } else {
            this.loadInitialJSON();
        }
    },

    textEdited: function() {
        // reset our textarea selection so that we do not have anything selected yet
        this.getCanvas().diagram.toolManager.textEditingTool.currentTextEditor.setSelectionRange(0,0);
    },

    partResized: function(diagramEvent) {
        if (diagramEvent.subject instanceof go.TextBlock){
            var textBlock = diagramEvent.subject;
            textBlock.height = textBlock.lineCount * 15; //TODO - need to do this a better way - super brittle
        }
    },

    loadInitialJSON: function () {
        this.clearJSONClick();
        this.setupCanvasDrop(this.getCanvas());
    },

    loadJSON: function (callbackFunc) {
        var processStore = Ext.data.StoreManager.lookup(this.store);
        processStore.load({
            callback: function() {
                if (callbackFunc) {
                    callbackFunc(processStore.first());
                }
            }
        });
    },

    setupCanvasDrop: function(canvasView) {
        var me = this;
        var canvasElement = canvasView.getEl();
        if (canvasElement) {
            canvasView.dropTarget = Ext.create('Ext.dd.DropTarget', canvasElement.dom, {
                ddGroup: 'RNRM-ITEMS',
                notifyDrop: Ext.Function.bind(me.notifyDropTarget, me),
                notifyOver: Ext.Function.bind(me.notifyOverTarget, me)
            });
        }
    },

    notifyOverTarget: function(ddSource, e, data){
        var part = this.getDiagramPart(e);
        if (part && part.mouseDrop) {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed; //currently, say we can't drop anywhere in the canvas
        }
    },

    notifyDropTarget: function(ddSource, e, data){
        var part = this.getDiagramPart(e);
        if (part && part.mouseDrop) {
            return part.mouseDrop(e,ddSource, data, this.getCanvas().diagram, part);
        }
    },

    getDiagramPart: function(e) {
        //given an event with mouse XY coordinates, find the diagram part under the mouse
        var targetXY = Ext.get(e.getTarget()).getXY(),
            eventXY = e.getXY(),
            x = eventXY[0] - targetXY[0],
            y = eventXY[1] - targetXY[1],
            diagram = this.getCanvas().diagram,
            diagramCoordinate = diagram.transformViewToDoc(new go.Point(x,y));

        return diagram.findPartAt(diagramCoordinate); //may be null
    },

    togglePalette: function() {
        var palette = this.getPalette();
        if (palette.hidden) {
            palette.show();
        } else {
            palette.hide();
        }
    },

    toggleOverview: function() {
        var processViewport = this.getView();
        var overview = processViewport.overview;

        if (overview) {
            processViewport.overview = null;
            processViewport.remove(overview);
        } else {
            overview = Ext.create('Savanna.process.view.part.Overview', {});
            overview.setDiagram(this.getCanvas().diagram);
            processViewport.overview = overview;
            processViewport.add(overview);
        }
    }

});