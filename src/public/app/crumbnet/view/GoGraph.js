Ext.define('Savanna.crumbnet.view.GoGraph', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.go-graph',

    requires: [
        'Savanna.crumbnet.view.goGraph.Palette',
        'Savanna.crumbnet.view.goGraph.Canvas'
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
                xtype: 'go-graph_canvas',
                flex: 11,
                width: '100%',
                height: '100%',
                config: this.getCanvasConfig()
            }
        ];
    },

    // GoDiagram HELPER METHODS

    getPaletteConfig: function() {
        return {
            paletteNodeTemplateMap: this.setupNodeTemplateMap({ isPalette: true })
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

    setupNodeTemplateMap: function(options) {
        options = options || {};

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

        var triangle = go.Geometry.parse("M 0,0 L 12,0 12,12 0,0", true);

        return $(
            go.Node, go.Panel.Auto,
            {
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                selectionAdornmentTemplate: options.adornmentTemplate ? options.adornmentTemplate : null,
                desiredSize: new go.Size(70, 80),
                toLinkable: true
            },

            $(go.Panel, go.Panel.Table, icon, textBlock),
            $(go.Panel,
                { alignment: go.Spot.TopRight },  // this function is defined below
                $(go.Shape, { geometry: triangle, fill: 'Red' }, {portId: 'out', fromLinkable: true })
            )

        );
    },

    generateIconTemplate: function(options) {
        options = options || {};

        var icon = new go.Picture();
        icon.source = options.shapeOpts.icon;

        icon.toLinkable = true;
        icon.fromLinkable = true;
        icon.cursor = "pointer";

        icon.width = icon.height = 46;
        return icon;
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