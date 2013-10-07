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
//        addstepbutton: {
//            click: 'addStepClick'
//        },
//        adddecisionbutton: {
//            click: 'addDecisionClick'
//        },
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
        canvas: {},
        metadata: {}
    },
    init: function() {
        return this.callParent(arguments);
    },

    addStepClick: function() {
        console.log('add step'); //todo: remove console log statement and do something useful
    },
    addDecisionClick: function() {
        console.log('add decision'); //todo: remove console log statement and do something useful
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
        Savanna.process.utils.ViewTemplates.load(canvas.diagram, metadata.down('#JSONtextarea'));
    },
    saveJSONClick: function() {
        var canvas = this.getCanvas();
        var metadata = this.getMetadata();
        Savanna.process.utils.ViewTemplates.save(canvas.diagram, metadata.down('#JSONtextarea'));
    },
    clearJSONClick: function() {
        var canvas = this.getCanvas();
        var metadata = this.getMetadata();
        Savanna.process.utils.ViewTemplates.clear(canvas.diagram, metadata.down('#JSONtextarea'));
    }
});