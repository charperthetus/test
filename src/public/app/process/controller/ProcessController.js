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
        'Savanna.process.utils.ViewTemplates'
    ],

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
            boxready: 'loadJSONClick'
        },
        metadata: {
        }
    },
    toggleExpanded: function(expand) {
        var canvas = this.getCanvas();
        var diagram = canvas.diagram;
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
        var canvas = this.getCanvas();
        var metadata = this.getMetadata();
        this.load(canvas.diagram, metadata.down('#JSONtextarea'));
    },
    saveJSONClick: function() {
        var canvas = this.getCanvas();
        var metadata = this.getMetadata();
        this.save(canvas.diagram, metadata.down('#JSONtextarea'));
    },
    clearJSONClick: function() {
        var canvas = this.getCanvas();
        var metadata = this.getMetadata();
        this.clear(canvas.diagram, metadata.down('#JSONtextarea'));
    },

        // Show the diagram's model in JSON format that the user may have edited
    save: function(diagram, textarea) {
        var str = diagram.model.toJson();
        textarea.setValue(str);
    },

    load: function(diagram, textarea) {
       var str = textarea.value;
       diagram.model = go.Model.fromJson(str);
       diagram.undoManager.isEnabled = true;
    },

    clear: function(diagram, textarea) {
       var str = '{ "class": "go.GraphLinksModel", "nodeDataArray": [ {"key":-1, "category":"Start"} ], "linkDataArray": [ ]}';
       diagram.model = go.Model.fromJson(str);
       textarea.setValue(str);
       diagram.undoManager.isEnabled = true;
    }

});