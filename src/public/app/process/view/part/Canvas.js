/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 5:44 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false, go: false, Savanna: false */
Ext.define('Savanna.process.view.part.Canvas', {
    extend: 'Ext.Component',
    alias: 'widget.process_canvas',

    requires: [
        'Savanna.crumbnet.utils.ViewTemplates'
    ],

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    diagram: null,

    onRender: function() {
        var domElem;

        this.callParent(arguments);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph" style="width: 100%; height: 100%; position: absolute;"></div>');

        this.diagram = new go.Diagram(domElem);

        // have mouse wheel events zoom in and out instead of scroll up and down
        this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
        this.diagram.allowDrop = true;
        this.diagram.initialContentAlignment = go.Spot.Center;

        this.diagram.nodeTemplate =
            go.GraphObject.make(go.Node, "Vertical",
                go.GraphObject.make(go.Shape,
                    { width: 25, height: 25, fill: "white" }, new go.Binding("figure", "figure")),
                go.GraphObject.make(go.TextBlock, {alignment: go.Spot.Center, margin: 7 },
                    new go.Binding("text", "title"))
            );

        this.on('resize', Ext.bind(function() { this.diagram.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.diagram.requestUpdate(); }, this));

        this.diagram.layout = go.GraphObject.make(go.ForceDirectedLayout, { isOngoing: false });

        this.diagram.toolManager.linkingTool.archetypeLinkData = {
            category: Savanna.crumbnet.utils.ViewTemplates.defaultLinkTemplate,
            text: Savanna.crumbnet.utils.ViewTemplates.linkRelationshipTypes[Savanna.crumbnet.utils.ViewTemplates.linkRelationshipTypes.length - 1]
        };

        this.diagram.toolManager.linkingTool.direction = go.LinkingTool.ForwardsOnly;
        this.diagram.toolManager.linkingTool.portGravity = 10;

        this.diagram.model.undoManager.isEnabled = true;

        //TODO - Move this to the controller
        this.diagram.addDiagramListener('PartResized', Ext.bind(this.partResized, this));
        this.diagram.addDiagramListener('ExternalObjectsDropped', Ext.bind(this.externalObjectsDropped, this));
        this.diagram.addDiagramListener('TextEdited', Ext.bind(this.textEdited, this));

        this.diagram.toolManager.linkingTool.findLinkablePort = this.findPort;
    },

    // CUSTOM METHODS

    textEdited: function() {
        // reset our textarea selection so that we do not have anything selected yet
        this.diagram.toolManager.textEditingTool.currentTextEditor.setSelectionRange(0,0);
    },

    partResized: function(diagramEvent) {
        if (diagramEvent.subject instanceof go.TextBlock){
            var textBlock = diagramEvent.subject;
            textBlock.height = textBlock.lineCount * 15; //TODO - need to do this a better way - super brittle
        }
    },

    externalObjectsDropped: function(diagramEvent) {
        var addedNode = diagramEvent.subject.first();

        Savanna.crumbnet.utils.ViewTemplates.setupTextEditor(this.diagram, addedNode.findObject('title'));
    },

    findPort: function() {
        var diagram = this.diagram,
            obj;

        if (diagram === null) {
            return null;
        }

        obj = diagram.findObjectAt(diagram.firstInput.documentPoint, null, null);

        if (obj === null) {
            return null;
        }

        var node = obj.part;

        if (!(node instanceof go.Node)) {
            return null;
        }

        // return the node, not the obj
        if (obj.fromLinkable === true) {
            return node;
        }

        return null;
    }
});