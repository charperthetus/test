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
        'Savanna.process.utils.ViewTemplates'
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
        this.diagram.nodeTemplateMap = Savanna.process.utils.ViewTemplates.generateNodeTemplateMap();
        this.diagram.linkTemplateMap = Savanna.process.utils.ViewTemplates.generateLinkTemplateMap();
        this.diagram.groupTemplateMap = Savanna.process.utils.ViewTemplates.generateGroupTemplateMap();

        // have mouse wheel events zoom in and out instead of scroll up and down
   //     this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
        this.diagram.allowDrop = true;
        this.diagram.initialContentAlignment = go.Spot.Top;

        this.on('resize', Ext.bind(function() { this.diagram.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.diagram.requestUpdate(); }, this));

        this.diagram.layout = go.GraphObject.make(go.TreeLayout, { angle: 90, isRealtime: false, layerSpacing:24 });

        this.diagram.toolManager.linkingTool.direction = go.LinkingTool.ForwardsOnly;
        this.diagram.toolManager.linkingTool.portGravity = 10;

        this.diagram.model.undoManager.isEnabled = true;

        // replace the default Link template in the linkTemplateMap
        this.diagram.linkTemplate =  this.diagram.linkTemplateMap.getValue('ProcessLink');

        // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
        this.diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
        this.diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
    }
});