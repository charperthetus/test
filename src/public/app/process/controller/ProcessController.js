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
        deleteProcess: {
            click: 'onDelete'
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // construct and init code
    //

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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // loading and initialization code
    //

    initCanvas: function() {
        var me = this;
        var view = this.getView();
        var diagram = this.getCanvas().diagram;
        diagram.addDiagramListener('PartResized', Ext.bind(this.partResized, this));
        diagram.addDiagramListener('TextEdited', Ext.bind(this.textEdited, this));

        var uri = this.getView().getItemUri();
        if (uri) {
            Ext.Ajax.request({
                url: SavannaConfig.itemLockUrl + encodeURI(uri) + ';jsessionid=' + Savanna.jsessionid,
                method: 'GET',
                success: function(response){
                    if (response.responseText !== '') {
                        Ext.MessageBox.alert({
                            title : 'Process Locked',
                            msg : 'This process is locked for editing by another user. Please try again later.',
                            buttons: Ext.Msg.OK,
                            fn: function() {
                                me.confirmClosed = true;
                                view[view.closeAction]();
                            },
                            scope : null,   //  We are setting a minWidth here because Firefox sizes the window
                            minWidth: 350   //  too small and the message ends up wrapping out of view in the window.
                        })
                    } else {
                        me.store.load({callback: me.onStoreLoaded, scope: me});
                    }
                },
                failure: function(response){
                    console.log('initCanvas: Server Side Failure: ' + response.status);
                    me.confirmClosed = true;
                    view[view.closeAction]();
                }
            });
        } else {
            this.createNewProcess(diagram);
        }
    },

    onStoreLoaded: function (records) {
        this.load(this.getCanvas().diagram, records[0]);
    },

    load: function(diagram, rec) {
        diagram.model = go.GraphObject.make(go.GraphLinksModel, {
            nodeKeyProperty: rec.get('nodeKeyProperty'),
            nodeDataArray: rec.get('nodeDataArray'),
            linkDataArray: rec.get('linkDataArray')
        });
        diagram.undoManager.isEnabled = true;
        this.setupCanvasDrop();
    },

    createNewProcess: function(diagram) {
        var me = this;

        var newProcess = {'class': 'go.GraphLinksModel', 'nodeKeyProperty': 'uri', 'nodeDataArray': [{'category':'Start'}], 'linkDataArray': []};
        //newProcess.uri = this.utils().getURI('ProcessModel');  //todo: remove this code once the instance creation starts working
        newProcess.nodeDataArray[0].uri = this.utils().getURI('Start');
        this.store.loadRawData(newProcess);
        this.load(diagram, this.store.first());

        // make a process instance
        Ext.Ajax.request({
            url: SavannaConfig.itemViewUrl + encodeURI('lib%2Espan%3AProcess%2FModelItemXML') + '/instance;jsessionid=' + Savanna.jsessionid,
            method: 'GET',
            success: function(response){
                if (response.responseText.charAt(0) === '{') {
                    //looks like it might really be json
                    var message = Ext.decode(response.responseText);
                    var uri = message.uri
                    var index = uri.indexOf('ModelItemInstance');
                    if ( index >= 0 ) {
                        uri = message.uri.slice(0,index);
                        uri = uri.concat('ProcessModel');
                    }
                    me.store.getAt(0).set('uri', uri);
                    me.getView().down('#processSidepanel').fireEvent('processUriChange', uri);
                } else {
                    // probably an error page even though we got a 200
                    // todo: we should have a standard mechanism of reporting errors. For now writing this to console matches how we handle other server errors  (500)
                    console.log(response.responseText);
                }
            },
            failure: function(response){
                console.log('Server Side Failure: ' + response.status);
            }
        });
    },


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // simple event handlers
    //

    newProcessClick: function() {
        EventHub.fireEvent('createprocess');
    },

    expandStepsClick: function() {
        this.utils().toggleExpanded(this.getCanvas().diagram, true);
    },

    collapseStepsClick: function() {
        this.utils().toggleExpanded(this.getCanvas().diagram, false);
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
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // save, close, delete alerts
    //

    confirmClosed: false,

    isStoreDirty: function(){
        return true;  //hack for now
        //todo - figure out how to get the store to correctly manage dirtyness
//        var isDirty = false;
//
//        store.each(function(record){
//            if(record.dirty === true){
//                isDirty = true;
//            }
//        });
//        if (!isDirty) {
//            isDirty = (store.removed.length > 0);
//        }
//        return isDirty;
    },

    releaseLock: function() {
        var uri = this.store.getAt(0).data.uri;
        Ext.Ajax.request({
            url: SavannaConfig.itemLockUrl + encodeURI(uri) + ';jsessionid=' + Savanna.jsessionid,
            method: 'DELETE',
            success: function(){
                // nothing to do
            },
            failure: function(response){
                console.log('releaseLock: Server Side Failure: ' + response.status);
            }
        });
    },

    onProcessClose: function(panel) {
        var me = this;
        if (this.isStoreDirty(this.store)) {
            Ext.Msg.show({
                title: 'Close Process',
                msg: "Do you want to save the changes you made in this process?\nYour changes will be lost if you don't save them.",
                width: 375,
                buttons: Ext.Msg.YESNOCANCEL,
                buttonText: {yes: "Don't Save", no: 'Save', cancel: 'Cancel'},
                fn: function(button) {
                    if(button == 'yes'){
                        //save and close
                        //force a dirty state so that sync will do something
                        me.store.first().setDirty();
                        me.store.sync({
                            callback: function () {
                                me.releaseLock();
                                me.getView().down('#processSidepanel').fireEvent('processclose');
                                panel[panel.closeAction]();
                            }
                        });
                    } else if (button == 'no') {
                        //discard changes and close
                        me.releaseLock();
                        me.confirmClosed = true;
                        me.getView().down('#processSidepanel').fireEvent('processclose');
                        panel[panel.closeAction]();
                    } else {
                        //do nothing, leave the process open
                    }
                }
            });

            return false;
        }

        return true;
    },

    onDelete: function() {
        var me = this;
        Ext.Msg.confirm(
            {
                buttons:Ext.Msg.YESNO,
                buttonText: {yes: 'OK', no: 'Cancel'},
                title: 'Delete Process',
                msg: 'Are you sure you want to permanently delete this process?'
            },
            function(btn) {
               if (btn == 'yes') {
                   me.deleteProcess();
               } else {
                   //cancel
               }
            }
        );
    },

    deleteProcess: function() {
        var me = this;
        var uri = this.store.getAt(0).data.uri;
        var view = this.getView();
        Ext.Ajax.request({
            url: SavannaConfig.modelProcessLoadUrl + encodeURI(encodeURIComponent(uri)) + ';jsessionid=' + Savanna.jsessionid,
            method: 'DELETE',
            success: function(response) {
                me.releaseLock();
                me.confirmClosed = true;
                view[view.closeAction]();
            },
            failure: function(response) {
                console.log('deleteProcess: Server Side Failure: ' + response.status);
            }
        });
    },

    onSave: function() {
        this.store.first().setDirty(); // force dirty for now
        this.store.sync();
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // text editing and type ahead support
    //

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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // drag and drop
    //

    setupCanvasDrop: function() {
        var me = this;
        var canvasView = this.getCanvas();
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
    }

});