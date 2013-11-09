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
        'Savanna.process.view.part.Overview', //added dynamically later
        'Savanna.workflow.view.WorkflowSelect'
    ],
    store: null,

    control: {
        newProcess: {
            click: 'newProcessClick'
        },
        expandSteps: {
            click: 'expandStepsClick'
        },
        collapseSteps: {
            click: 'collapseStepsClick'
        },
        canvas: {
            boxready: 'initCanvas'
        },
        undo: {
            click: 'handleUndo'
        },
        redo: {
            click: 'handleRedo'
        },
        workflow: {
            click: 'onWorkflowSelect'
        },
        merge: {
            click: 'handleMerge'
        },
        zoomIn: {
            click: 'zoomIn'
        },
        zoomOut: {
            click: 'zoomOut'
        },
        zoomToFit: {
            click: 'zoomToFit'
        },
        cancelProcess: {
            click: 'onCancel'
        },
        saveProcess: {
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

    utils: function() {
        return Savanna.process.utils.ProcessUtils;
    },

    onStoreLoaded: function (records) {
        this.load(this.getCanvas().diagram, records[0]);
    },

    toggleExpanded: function(expand) {
        var diagram = this.getCanvas().diagram;
        diagram.startTransaction('toggleExpanded');
        var iterator = diagram.nodes;
        while ( iterator.next() ){
            var node = iterator.value;
            if (node instanceof go.Group) {
                node.isSubGraphExpanded = expand;
            }
        }
        diagram.commitTransaction('toggleExpanded');
    },

    newProcessClick: function() {
        EventHub.fireEvent('createprocess');
    },

    expandStepsClick: function() {
        this.toggleExpanded(true);
    },

    collapseStepsClick: function() {
        this.toggleExpanded(false);
    },

    clearJSONClick: function() {
        this.clear(this.getCanvas().diagram);
    },

    load: function(diagram, rec) {
        diagram.model = go.GraphObject.make(go.GraphLinksModel, {
            nodeKeyProperty: rec.get('nodeKeyProperty'),
            nodeDataArray: rec.get('nodeDataArray'),
            linkDataArray: rec.get('linkDataArray')
        });
        diagram.undoManager.isEnabled = true;
    },

    clear: function(diagram) {
        var newProcess = {'class': 'go.GraphLinksModel', 'nodeKeyProperty': 'uri', 'nodeDataArray': [{'category':'Start'}], 'linkDataArray': []};
        newProcess.nodeDataArray[0].uri = this.utils().getURI('Start');
        newProcess.uri = this.utils().getURI('ProcessModel');
        this.store.add(newProcess);
        this.load(diagram, this.store.first());

        this.getView().down('#processSidepanel').fireEvent('processUriChange', encodeURIComponent(Savanna.process.utils.ProcessUtils.getURI('ProcessModel')));
    },

    handleUndo: function() {
        this.getCanvas().diagram.undoManager.undo();
    },

    handleRedo: function() {
        this.getCanvas().diagram.undoManager.redo();
    },

    onWorkflowSelect: function () {
        Ext.create('Savanna.workflow.view.WorkflowSelect', {
            uri: this.store.getAt(0).data.uri
        });
    },

    handleMerge: function() {
        this.utils().addMerge(this.getCanvas().diagram);
    },

    handleAlts: function() {
        this.utils().addAlts(this.getCanvas().diagram);
    },

    toggleOptional: function() {
        this.utils().toggleOptional(this.getCanvas().diagram);
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
                    me.getView().down('#processSidepanel').fireEvent('processclose');
                    panel[panel.closeAction]();
                } else if (button == 'no') {
                    //save and close
                    me.onSave();
                    me.getView().down('#processSidepanel').fireEvent('processclose');
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
            "Cancel Changes",
            "Your changes will be lost if you don't save them. Are you sure you want to cancel your changes?",
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

    textEdited: function(e) {
        var curTextEdit = e.diagram.toolManager.textEditingTool.currentTextEditor;
        if (curTextEdit.hasOwnProperty('onCommit')) {
            curTextEdit['onCommit'](e.subject);
        }
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

    prevOver: null,

    notifyOverTarget: function(ddSource, e){
        var part = this.getDiagramPart(e);

        // simulate mouseDragLeave behavior
        if (this.prevOver != part) {
            if (this.prevOver && this.prevOver.mouseDragLeave) {
                this.prevOver.mouseDragLeave(e, this.prevOver);
            }
        }
        this.prevOver = part;

        if (part && part.mouseDrop) {
            if (part.mouseDragEnter) {
                part.mouseDragEnter(e, part);
            }
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed; //currently, say we can't drop anywhere in the canvas
        }
    },

    notifyDropTarget: function(ddSource, e, data){
        var part = this.getDiagramPart(e);

        if (this.prevOver && this.prevOver.mouseDragLeave) {
            this.prevOver.mouseDragLeave(e, this.prevOver);
            this.prevOver = null;
        }

        if (part && part.mouseDrop) {
            part.mouseDrop(e, part, data);
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

        var object = diagram.findObjectAt(diagramCoordinate);
        while (object && !object.mouseDrop) {
            object = object.panel;
        }
        return object; //may be null
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