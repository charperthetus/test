/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 5:44 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false, go: false, Savanna: false */
Ext.define('Savanna.process.view.part.Canvas', {
    extend: 'Ext.container.Container',
    alias: 'widget.process_canvas',

    requires: [
        'Savanna.process.store.TypeAheadStore',
        'Savanna.process.utils.ViewTemplates',
        'Savanna.process.view.part.TypeAhead'
    ],

    diagram: null,
    itemTextEditor: null,
    actionTextEditor: null,

    onRender: function() {
        var domElem;

        this.callParent(arguments);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph" style="width: 100%; height: 100%; position: absolute;"></div>');
        this.diagram = new go.Diagram(domElem);

        this.itemTextEditor = Ext.create('Savanna.process.view.part.TypeAhead', {
                itemId: 'itemTextEditor',
                diagram: this.diagram,
                store: Ext.create('Savanna.process.store.TypeAheadStore', {
                    paramsObj: { pageStart: 0, pageSize: 20, alphabetical: true, type: "Item" }
                })
            }
        );
        this.add(this.itemTextEditor);

        this.actionTextEditor  = Ext.create('Savanna.process.view.part.TypeAhead', {
                itemId: 'actionTextEditor',
                diagram: this.diagram,
                store: Ext.create('Savanna.process.store.TypeAheadStore', {
                    paramsObj: { pageStart: 0, pageSize: 20, alphabetical: true, type: "Action" }
                })
            }
        );
        this.add(this.actionTextEditor);

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

        var toolManager = this.diagram.toolManager;
        //mouseDownTools
        toolManager.relinkingTool.endabled = false;
        toolManager.linkReshapingTool.enabled = false;
        toolManager.resizingTool.enabled = false;
        toolManager.rotatingTool.enabled = false;
        //mouseMoveTools
        toolManager.linkingTool.enabled = false;
        toolManager.dragSelectingTool.enabled = false;
        //mouseUpTools
        toolManager.contextMenuTool.enabled = false;
        toolManager.clickCreatingTool.enabled = false;
    }
});