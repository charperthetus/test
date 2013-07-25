Ext.define('Savanna.crumbnet.view.CrumbnetComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.go-graph',

    overview: null,
    requires: [
        'Savanna.crumbnet.view.part.Palette',
        'Savanna.crumbnet.view.part.Canvas',
        'Savanna.crumbnet.view.part.Overview'
    ],

    layout: {
        type: 'hbox'
    },

    tbar: [
        {
            xtype: 'button',
            itemId: 'layoutMenu',
            text: 'Layout',
            menu: [{ type: 'grid', text: 'Grid' },
                { type: 'tree', text: 'Tree' },
                { type: 'force', text: 'Force' },
                { type: 'layeredDigraph', text: 'Layered Digraph' },
                { type: 'circular', text: 'Circular' }
            ]
        },
        {
            xtype: 'button',
            itemId: 'alignmentMenu',
            text: 'Alignment',
            menu: [{ type: 'right', text: 'Right' },
                { type: 'left', text: 'Left' },
                { type: 'top', text: 'Top' },
                { type: 'bottom', text: 'Bottom' },
                { type: 'center', text: 'Center' }
            ]
        },
        '->',
        {type: 'zoomIn', icon:'resources/images/zoom_in.png', tooltip: 'Zoom In'},
        {type: 'zoomOut', icon:'resources/images/zoom_out.png', tooltip: 'Zoom Out'},
        {type: 'zoomToFit', icon:'resources/images/show_all.png', tooltip: 'Zoom To Fit'},
        {type: 'undo', icon:'resources/images/undo.png', tooltip: 'Undo'},
        {type: 'redo', icon:'resources/images/redo.png', tooltip: 'Redo'},
        {type: 'grid', icon:'resources/images/gridview.png', tooltip: 'Toggle Grid'},
        {type: 'overview', icon:'resources/images/globe.png', tooltip: 'Toggle Overview'}
    ],

    initComponent: function() {
        this.items = this.setupItems();

        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype: 'go-graph_palette',
                width: 100,
                height: '100%',
                config: this.getPaletteConfig()
            },
            {
                xtype: 'panel',
                itemId: 'mainCrumbnetViewport',
                flex: 10,
                height: '100%',
                layout: {
                    type: 'absolute'
                },
                items:[
                    {
                        xtype: 'go-graph_canvas',
                        width: '100%',
                        height: '100%',
                        config: this.getCanvasConfig()
                    }
                ]
            }
        ];
    },

    // GoDiagram HELPER METHODS

    getPaletteConfig: function() {
        return {
            paletteNodeTemplateMap: this.setupNodeTemplateMap()
        };
    },

    getCanvasConfig: function() {
        var initialConfig = this.getInitialConfig();

        return {
            label: initialConfig.label,
            nodeTemplateMap: this.setupNodeTemplateMap(),
            linkTemplate: this.generateLinkTemplate()
        }
    },

    setupNodeTemplateMap: function() {
        var $ = go.GraphObject.make;  // for conciseness in defining templates

        var defaultAdornment =
            $(go.Adornment, go.Panel.Spot,
                $(go.Panel, go.Panel.Auto,
                    $(go.Shape, { fill: null, stroke: "blue", strokeWidth: 2 }),
                    $(go.Placeholder)),
                // the button to create a "next" node, at the top-right corner
                $("Button",
                    { alignment: go.Spot.BottomRight,
                        click: this.addNodeAndLink },  // this function is defined below
                    $(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
                )
            );

        var nodeTemplateMap = new go.Map();

        nodeTemplateMap.add('', this.generateNodeTemplate({
            resizable: true,
            adornmentTemplate: defaultAdornment,
            shapeOpts: {
                icon: '/resources/images/conceptIcon.svg'
            },
            textOpts: {
                text: 'Concept'
            }
        }));

        nodeTemplateMap.add('Question', this.generateNodeTemplate({
            adornmentTemplate: defaultAdornment,
            shapeOpts: {
                icon: '/resources/images/questionIcon.svg'
            },
            textOpts: {
                text: 'Question'
            }
        }));

        nodeTemplateMap.add('Problem', this.generateNodeTemplate({
            adornmentTemplate: defaultAdornment,
            shapeOpts: {
                icon: '/resources/images/problemIcon.svg'
            },
            textOpts: {
                text: 'Problem'
            }
        }));

        nodeTemplateMap.add('Fact', this.generateNodeTemplate({
            adornmentTemplate: defaultAdornment,
            shapeOpts: {
                icon: '/resources/images/factIcon.svg'
            },
            textOpts: {
                text: 'Fact'
            }
        }));

        nodeTemplateMap.add('Hypothesis', this.generateNodeTemplate({
            adornmentTemplate: defaultAdornment,
            shapeOpts: {
                icon: '/resources/images/hypothesisIcon.svg'
            },
            textOpts: {
                wrap: go.TextBlock.WrapFit,
                text: 'Hypothesis'
            }
        }));

        nodeTemplateMap.add('Conclusion', this.generateNodeTemplate({
            adornmentTemplate: defaultAdornment,
            shapeOpts: {
                icon: '/resources/images/conclusionIcon.svg'
            },
            textOpts: {
                wrap: go.TextBlock.WrapFit,
                text: 'Conclusion'
            }
        }));

        nodeTemplateMap.add('Assumption', this.generateNodeTemplate({
            adornmentTemplate: defaultAdornment,
            shapeOpts: {
                icon: '/resources/images/assumptionIcon.svg'
            },
            textOpts: {
                wrap: go.TextBlock.WrapFit,
                text: 'Assumption'
            }
        }));

        return nodeTemplateMap;
    },

    generateNodeTemplate: function(options) {
        options = options || {};

        var shape, icon, textBlock, $ = go.GraphObject.make;

        icon = this.generateIconTemplate(options);

        textBlock = this.generateTextBlockTemplate(options);

        return $(
            go.Node, go.Panel.Auto,
            {
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                selectionAdornmentTemplate: options.adornmentTemplate ? options.adornmentTemplate : null,
                toLinkable: true,
                mouseEnter: this.nodeMouseEnter,
                mouseLeave: this.nodeMouseLeave
            },

            $(go.Panel, go.Panel.Vertical, icon, textBlock),
            this.makePort("T", go.Spot.TopRight, 0),
            this.makePort("L", go.Spot.TopLeft, 270),
            this.makePort("R", go.Spot.BottomRight,90),
            this.makePort("B", go.Spot.BottomLeft, 180)
        );
    },

    generateIconTemplate: function(options) {
        options = options || {};

        var icon = new go.Picture();
        icon.name = 'icon';

        icon.source = options.shapeOpts.icon;

        icon.toLinkable = true;
        icon.fromLinkable = true;
        icon.cursor = "pointer";

        icon.width = icon.height = 46;
        return icon;
    },

    makePort: function (name, spot, angle) {
        var $ = go.GraphObject.make;
        var triangle = go.Geometry.parse("M 0,0 L 12,0 12,12 0,0", true);
        return $(go.Panel,
            { alignment: spot },
            $(go.Shape, { geometry: triangle, stroke: null, fill: null, angle: angle},
                {portId: name, fromLinkable: true }) )
    },

    generateTextBlockTemplate: function(options) {
        options = options || {};

        var textOpts = options.textOpts || {}, binding, textBlock;

        textOpts.font = '10pt Helvetitca, Arial, sans-serif';
        textOpts.stroke = 'black';
        textOpts.row = 1;
        textOpts.column = 0;

        binding = typeof(textOpts.binding) === 'undefined' ? new go.Binding('text', 'text').makeTwoWay() : textOpts.binding;

        delete options.binding;

        textOpts = Ext.merge({
            wrap: go.TextBlock.None,
            textAlign: 'center',
            editable: true,
            width: 80,
            wrap: go.TextBlock.WrapDesiredSize,
            font: '15pt Helvetica, Arial, sans-serif',
            name: 'label'
        }, textOpts);

        textBlock = go.GraphObject.make(go.TextBlock, textOpts, { cursor: "pointer"});

        if (binding) textBlock.bind(binding);

        return textBlock;
    },

    generateLinkTemplate: function() {
        var $ = go.GraphObject.make;

        return $(go.Link,  // the whole link panel
            { selectionAdorned: true,
                layerName: "Foreground",
                routing: go.Link.AvoidsNodes,
                corner: 5
            },
            $(go.Shape,  // the link shape
                { isPanelMain: true,
                    stroke: "#303B45",
                    strokeWidth: 2.5 }),
            $(go.TextBlock,  // the "from" label
                { textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "#1967B3",
                    segmentIndex: 0,
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright },
                new go.Binding("text", "text")));
    },

    nodeMouseEnter: function(e, obj){
        var node = obj.part;
        var diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
        var it = node.ports;
        while (it.next()) {
            var port = it.value;
            port.fill = "red";
            port.stroke = "black";
        }
    },

    nodeMouseLeave: function(e, obj){
        var node = obj.part;
        var diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
        var it = node.ports;
        while (it.next()) {
            var port = it.value;
            port.fill = null;
            port.stroke = null;
        }
    },

    addNodeAndLink: function(e, obj) {
        var adorn = obj.part;
        if (adorn === null) return;
        e.handled = true;
        var diagram = adorn.diagram;
        diagram.startTransaction("Add Node");
        // get the node data for which the user clicked the button
        var fromNode = adorn.adornedPart;
        var fromData = fromNode.data;
        // create a new "State" data object, positioned off to the right of the adorned Node
        var toData = { text: "new", category: fromData.category, key: Ext.id() };
        var p = fromNode.location;
        //TODO - find all of the nodes that the starting node is linked to and add 50px to the lowest one for this y coord, use the same x coord
        toData.loc = p.x + 200 + " " + p.y;  // the "loc" property is a string, not a Point object
        // add the new node data to the model
        var model = diagram.model;
        model.addNodeData(toData);
        // create a link data from the old node data to the new node data
        var linkdata = {};
        linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
        linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
        // and add the link data to the model
        model.addLinkData(linkdata);
        diagram.commitTransaction("Add Node");
    }
});