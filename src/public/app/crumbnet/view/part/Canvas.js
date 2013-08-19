/* global Ext: false, go: false, Savanna: false */
Ext.define('Savanna.crumbnet.view.part.Canvas', {
    extend: 'Ext.Component',
    alias: 'widget.go-graph_canvas',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store: 'Savanna.crumbnet.store.Graph',

    diagram: null,

    initComponent: function() {
        this.callParent(arguments);

        Savanna.controller.Factory.getController('Savanna.crumbnet.controller.CrumbnetController');

        // NOTE: borrowed from Ext.panel.Table (abbreviated version of how it uses a store for it's data backend)
        this.mixins.storeable.initStore.call(this);
    },

    onRender: function() {
        var domElem;

        this.callParent(arguments);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph" style="width: 100%; height: 100%; position: absolute;"></div>');

        this.diagram = new go.Diagram(domElem);
        this.diagram.nodeTemplateMap = Savanna.crumbnet.utils.ViewTemplates.generateNodeTemplateMap();
        this.diagram.linkTemplateMap = Savanna.crumbnet.utils.ViewTemplates.generateLinkTemplateMap();

        // have mouse wheel events zoom in and out instead of scroll up and down
        this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
        this.diagram.allowDrop = true;
        this.diagram.initialContentAlignment = go.Spot.Center;

        if (0 < this.store.getCount()) {
            this.onStoreLoad(this.store);
        }

        this.on('resize', Ext.bind(function() { this.diagram.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.diagram.requestUpdate(); }, this));

        this.diagram.layout = go.GraphObject.make(go.ForceDirectedLayout, { isOngoing: false });

        this.diagram.toolManager.clickCreatingTool.archetypeNodeData = { text:"Fact", type:"Fact", category:"standard", percent: 10 };

        this.diagram.toolManager.linkingTool.archetypeLinkData = {category: 'Orthogonal', text: 'New Link'};
        this.diagram.toolManager.linkingTool.direction = go.LinkingTool.ForwardsOnly;
        this.diagram.toolManager.linkingTool.portGravity = 10;

        this.diagram.model.undoManager.isEnabled = true;

        this.setupImageDrop(domElem);
    },

    // CUSTOM METHODS

    onStoreLoad: function(store) {
        if (this.diagram) {
            //TODO - this is just getting the first array in the store - we need to figure out how we really want to use the stores
            var graphRecord = store.getAt(0);

            this.diagram.model = go.GraphObject.make(go.GraphLinksModel, {
                nodeDataArray: graphRecord.get('nodeDataArray'),
                linkDataArray: graphRecord.get('linkDataArray')
            });
        }
    },

    setupImageDrop: function(dropArea){
        if (typeof window.FileReader != 'undefined') {
            var _diagram = this.diagram;
            dropArea.ondragover = function () { return false; };
            dropArea.ondragend = function () { return false; };
            dropArea.ondrop = function (e) {
                this.className = '';
                e.preventDefault();
                var file = e.dataTransfer.files[0],
                    reader = new FileReader();
                reader.onload = function (event) {
                    var screenPoint = new go.Point(e.layerX, e.layerY);
                    var docPoint = _diagram.transformViewToDoc(screenPoint);
                    var newNode = { text: 'new image', category: 'image',
                        key: Ext.id(), percent: 10,
                        loc: docPoint.x + ' ' + docPoint.y,
                        imageData: event.target.result};
                    var model = _diagram.model;
                    _diagram.startTransaction('addImage');
                    model.addNodeData(newNode);
                    _diagram.commitTransaction('addImage');
                };
                reader.readAsDataURL(file);

                return false;
            }
        }
    }
});