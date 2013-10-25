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
        'Savanna.process.utils.ViewTemplates'
    ],
    inject: [ 'application', 'processStore' ], //todo: inject Process store and use it to load process data

    config: {
        application: null,
        processStore: null
    },

    control: {
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
            boxready: 'loadInitialJSON'
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
        zoomin: {
            click: 'zoomIn'
        },
        zoomout: {
            click: 'zoomOut'
        },
        cancelprocess: {
            click: 'onCancel'
        },
        saveprocess: {
            click: 'onSave'
        },
        view: {
            beforeclose: 'onProcessClose'
        }
    },

    init: function() {
        //todo: diagram initialization here: setup for checking for a "dirty" process component

        return this.callParent(arguments);
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
            nodeDataArray: rec.get('nodeDataArray'),
            linkDataArray: rec.get('linkDataArray')
        });
        diagram.undoManager.isEnabled = true;
    },

    clear: function(diagram, textarea) {
       var str = '{ "class": "go.GraphLinksModel", "nodeDataArray": [ {"key":-1, "category":"Start"} ], "linkDataArray": [ ]}';
       diagram.model = go.Model.fromJson(str);
       textarea.setValue(str);
       diagram.undoManager.isEnabled = true;
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

    zoomIn: function() {
        var diagram = this.getCanvas().diagram;
        diagram.scale = diagram.scale * Math.LOG2E;
    },

    zoomOut: function() {
        var diagram = this.getCanvas().diagram;
        diagram.scale = diagram.scale / Math.LOG2E;
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
        //todo: either rollback to initial transaction (if possible in GoJS) or make a service call to get/load json for the uri
        // For now just reload the initial JSON
        var diagram = this.getCanvas().diagram;
        if (diagram.isInTransaction) {
            diagram.rollbackTransaction();
        }
        this.loadInitialJSON();
    },

    onSave: function() {
        //todo: commit the initial transaction (if possible in GoJS). Call service to save json data. Start a new main transaction.
        //for now, do nothing
    },

    loadInitialJSON: function () {
        var me = this;
        var metadata = this.getMetadata();

        me.loadJSON(function(rec) {
            me.load(me.getCanvas().diagram, rec);
            me.showDiagramJSON(me.getCanvas().diagram, metadata.down('#JSONtextarea'));
        });
    },

    loadJSON: function (callbackFunc) {
        var store = this.getProcessStore();
        this.getProcessStore().load({
            callback: function() {
                if (callbackFunc) {
                    callbackFunc(store.first());
                }
            }
        });
    }
});