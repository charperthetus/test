Ext.define('Savanna.crumbnet.view.goGraph.Canvas', {
    extend: 'Ext.Component',
    alias: 'widget.go-graph_canvas',

    store: 'Savanna.crumbnet.store.Graph',

    statics: {
        goChangeEvents: [
            // TODO: this is not truly tied to the list defined in mapGoChangeEventToExtEventName...
            'property',
            'insert',
            'remove',
            'transaction',
            'unknown'
        ],
        goDiagramEvents: [
            'BackgroundSingleClicked',
            'BackgroundDoubleClicked',
            'BackgroundContextClicked',
            'ChangingSelection',
            'ChangedSelection',
            'ClipboardChanged',
            'ClipboardPasted',
            'DocumentBoundsChanged',
            'ExternalObjectsDropped',
            'InitialLayoutCompleted',
            'LayoutCompleted',
            'LinkDrawn',
            'LinkRelinked',
            'LinkReshaped',
            'ObjectSingleClicked',
            'ObjectDoubleClicked',
            'ObjectContextClicked',
            'PartCreated',
            'PartResized',
            'PartRotated',
            'SelectionMoved',
            'SelectionCopied',
            'SelectionDeleting',
            'SelectionDeleted',
            'SelectionGrouped',
            'SelectionUngrouped',
            'SubGraphCollapsed',
            'SubGraphExpanded',
            'TextEdited',
            'TreeCollapsed',
            'TreeExpanded',
            'ViewportBoundsChanged'
        ]
    },

    diagram: null,

    initComponent: function() {
        Savanna.controller.Factory.getController('Savanna.crumbnet.controller.GoGraph');

        // NOTE: borrowed from Ext.panel.Table (abbreviated version of how it uses a store for it's data backend)
        this.store = Ext.data.StoreManager.lookup(this.store || 'ext-empty-store');

        this.mon(this.store, {
            load: this.onStoreLoad,
            scope: this
        });
    },

    onRender: function(parentNode, containerIdx) {
        var domElem, config, i = 0, eventName;

        this.callParent(parentNode, containerIdx);

        domElem = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="go-graph" style="width: 100%; height: 100%;"></div>');
        config = this.getInitialConfig();

        this.diagram = new go.Diagram(domElem);
        this.diagram.nodeTemplateMap = config.nodeTemplateMap;
        this.diagram.linkTemplate = config.linkTemplate;

        // have mouse wheel events zoom in and out instead of scroll up and down
        this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
        this.diagram.allowDrop = true;
//        this.diagram.autoScale = go.Diagram.Uniform;
        this.diagram.initialContentAlignment = go.Spot.Center;
//        this.diagram.layout = go.GraphObject.make(go.ForceDirectedLayout, { arrangesToOrigin: true });

        this.diagram.addChangedListener(Ext.bind(this.goEventChangeManager, this));

        for (i = 0; i < Savanna.crumbnet.view.goGraph.Canvas.goDiagramEvents.length; ++i) {
            eventName = Savanna.crumbnet.view.goGraph.Canvas.goDiagramEvents[i];
            this.diagram.addDiagramListener(eventName, Ext.bind(this.goEventDiagramManager, this, [eventName], true));
        }

        if (this.store.getCount() > 0) {
            this.onStoreLoad(this.store);
        }

        this.on('resize', Ext.bind(function() { this.diagram.requestUpdate(); }, this));
        this.on('show', Ext.bind(function() { this.diagram.requestUpdate(); }, this));
    },

    // CUSTOM METHODS

    onStoreLoad: function(store) {
        if (this.diagram) {
            var graphRecord = store.getById(this.up('go-graph').itemId);

            this.diagram.model = go.GraphObject.make(go.GraphLinksModel, {
                nodeDataArray: graphRecord.get('nodeDataArray'),
                linkDataArray: graphRecord.get('linkDataArray')
            });

            //Can use this instead of the above
//            this.generateNodes(500, 25, 25, true, false);
//            this.generateLinks(1,2,false);
        }
    },

    generateNodes: function(numNodes, width, height, randSizes, circ) {
        var nodeArray = [];
        for (var i = 0; i < numNodes; i++) {
            var size;
            if (randSizes) {
                size = new go.Size(Math.floor(Math.random() * (65 - width + 1)) + width, Math.floor(Math.random() * (65 - height + 1)) + height);
            } else {
                size = new go.Size(width, height);
            }

            if (circ) size.height = size.width;

            var figure = "Rectangle";
            if (circ) figure = "Ellipse";

            nodeArray.push({
                key: i,
                text: i.toString(),
                figure: figure,
                fill: go.Brush.randomColor(),
                size: size
            });
        }
        // randomize the data, to help demonstrate sorting
        for (i = 0; i < nodeArray.length; i++) {
            var swap = Math.floor(Math.random() * nodeArray.length);
            var temp = nodeArray[swap];
            nodeArray[swap] = nodeArray[i];
            nodeArray[i] = temp;
        }

        // set the nodeDataArray to this array of objects
        this.diagram.model.nodeDataArray = nodeArray;
    },

    generateLinks: function(min, max, cyclic) {
        if (this.diagram.nodes.count < 2) return;
        var linkArray = [];
        var nit = this.diagram.nodes;
        var nodes = new go.List(go.Node);
        nodes.addAll(nit);
        var num = nodes.length;
        if (cyclic) {
            for (var i = 0; i < num; i++) {
                if (i >= num - 1) {
                    linkArray.push({ from: i, to: 0 });
                } else {
                    linkArray.push({ from: i, to: i + 1 });
                }
            }
        } else {
            if (isNaN(min) || min < 0) min = 0;
            if (isNaN(max) || max < min) max = min;
            for (var i = 0; i < num; i++) {
                var next = nodes.elt(i);
                var children = Math.floor(Math.random() * (max - min + 1)) + min;
                for (var j = 1; j <= children; j++) {
                    var to = nodes.elt(Math.floor(Math.random() * num));
                    // get keys from the Node.text strings
                    var nextKey = parseInt(i, 10);
                    var toKey = parseInt(Math.floor(Math.random() * num), 10);
                    if (nextKey !== toKey) {
                        linkArray.push({ from: nextKey, to: toKey });
                    }
                }
            }
        }
        this.diagram.model.linkDataArray = linkArray;
    },

    goEventChangeManager: function(changedEvent) {
        var eventName = this.mapGoChangeEventToExtEventName(changedEvent);
        this.fireEvent(eventName, changedEvent);
    },

    goEventDiagramManager: function(diagramEvent, eventName) {
        this.fireEvent(eventName, diagramEvent);
    },

    mapGoChangeEventToExtEventName: function(changedEvent) {
        var eventPrefix = 'go.change.';

        switch(changedEvent.change) {
            case go.ChangedEvent.Property:
                return eventPrefix + 'property';
            case go.ChangedEvent.Insert:
                return eventPrefix + 'insert';
            case go.ChangedEvent.Remove:
                return eventPrefix + 'remove';
            case go.ChangedEvent.Transaction:
                return eventPrefix + 'transaction';
            default:
                return eventPrefix + 'unknown';
        }
    }
});