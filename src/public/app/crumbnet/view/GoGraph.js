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
            type: 'grid',
            html: 'Grid',
            tooltip: 'use grid layout'
        },
        {
            type: 'tree',
            html: 'Tree',
            tooltip: 'use tree layout'
        },
        {
            type: 'force',
            html: 'Force',
            tooltip: 'use force layout'
        },
        {
            type: 'layeredDigraph',
            html: 'Layered Digraph',
            tooltip: 'use layered digraph layout'
        },
        {
            type: 'circular',
            html: 'Circular',
            tooltip: 'use circular layout'
        },
        {
            type: 'right',
            html: 'Right',
            tooltip: 'align right'
        },
        {
            type: 'left',
            html: 'Left',
            tooltip: 'align left'
        },
        {
            type: 'top',
            html: 'Top',
            tooltip: 'top align'
        },
        {
            type: 'bottom',
            html: 'Bottom',
            tooltip: 'bottom align'
        },
        {
            type: 'center',
            html: 'Center',
            tooltip: 'center align'
        }
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
                flex: 1,
                width: '100%',
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
            nodeTemplate: this.getNodeTemplate(), //This sets up both a single simple node template, and a template map and we can choose which one to use
            linkTemplate: go.GraphObject.make(go.Link,
                { selectable: false },
                go.GraphObject.make(go.Shape))//this.generateLinkTemplate()
        }
    },

    getNodeTemplate: function(){
        var $ = go.GraphObject.make;
        return $(go.Node, go.Panel.Spot,
            // make sure the Node.location is different from the Node.position
            { locationSpot: go.Spot.Center },
            new go.Binding("text", "text"),  // for sorting
            $(go.Shape, "Ellipse",  // the default value for the Shape.figure property
                { fill: "lightgray",
                    stroke: "black",
                    desiredSize: new go.Size(30, 30) },
                new go.Binding("figure", "figure"),
                new go.Binding("fill", "fill"),
                new go.Binding("desiredSize", "size")),
            $(go.TextBlock,
                new go.Binding("text", "text")));
    },

    setupNodeTemplateMap: function(options) {
        options = options || {};

        var $ = go.GraphObject.make;  // for conciseness in defining templates

        var greengrad = $(go.Brush, go.Brush.Linear, { 0: "#D5D96C", 1: "#D4D94E" });
        var bluegrad = $(go.Brush, go.Brush.Linear, { 0: "#79C1FF", 1: "#67B4FF" });
        var redgrad = $(go.Brush, go.Brush.Linear, { 0: "#FF530D", 1: "#E82C0C" });

        var UndesiredEventAdornment = this.generateAdornmentTemplate({
            buttonOpts: {
                alignment: go.Spot.BottomRight,
                click: function() { console.log('TODO: undesired event callback...'); },
                shape: $(go.Shape, 'TriangleDown', { desiredSize: new go.Size(10, 10) })
            }
        });

        var defaultNodeTemplate = this.generateDefaultNodeTemplate(options);

        var nodeTemplateMap = new go.Map();

        nodeTemplateMap.add('', defaultNodeTemplate);

        nodeTemplateMap.add('Source', this.generateNodeTemplate({
            isPalette: options.isPalette,
            shapeOpts: {
                icon: './resources/images/face-grin.svg',
                fill: bluegrad,
                fromLinkable: true
            },
            textOpts: {
                text: 'Source'
            }
        }));

        nodeTemplateMap.add('DesiredEvent', this.generateNodeTemplate({
            isPalette: options.isPalette,
            shapeOpts: {
                icon: './resources/images/face-plain-2.svg',
                fill: greengrad
            },
            textOpts: {
                text: 'Success!'
            }
        }));

        nodeTemplateMap.add('UndesiredEvent', this.generateNodeTemplate({
            isPalette: options.isPalette,
            adornmentTemplate: UndesiredEventAdornment,
            shapeOpts: {
                icon: './resources/images/face-surprise-3.svg',
                fill: redgrad
            },
            textOpts: {
                stroke: 'whitesmoke',
                text: 'Drop'
            }
        }));

        nodeTemplateMap.add('Comment', this.generateNodeTemplate({
            isPalette: options.isPalette,
            shapeOpts: {
                icon: './resources/images/face-worried.svg',
                fromLinkable: true
            },
            textOpts: {
                wrap: go.TextBlock.WrapFit,
                text: 'Comment'
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
            go.Node, go.Panel.Auto, { selectionAdornmentTemplate: options.adornmentTemplate ? options.adornmentTemplate : null, toLinkable: true, fromLinkable: true },
            $(go.Panel, go.Panel.Table, icon, textBlock)
        );
    },

    generateIconTemplate: function(options) {
        options = options || {};

        var icon = new go.Picture();
        icon.source = options.shapeOpts.icon;

        icon.toLinkable = true;
        icon.fromLinkable = true;
        icon.cursor = "pointer";

        if (options.isPalette) {
            icon.width = icon.height = 64;
        }
        else {
            icon.width = icon.height = 64;
        }

        return icon;
    },

    generateShapeTemplate: function(options) {
        options = options || {};

        var shapeOpts = options.shapeOpts || {},
            shape = new go.Shape();

        shapeOpts = Ext.merge({
            figure: 'Circle',
            fill: go.GraphObject.make(go.Brush, go.Brush.Linear, { 0: '#FDFDFD', 1: '#F7F7F7' }),
            stroke: '#DADADA',
            cursor: 'pointer',
            name: 'shape',
            portId: '',
            toLinkable: true,
            fromLinkable: false
        }, shapeOpts);

        shape = Ext.apply(shape, shapeOpts);

        return shape;
    },

    generateDefaultNodeTemplate: function(options) {
        options = options || {};

        var adornmentTemplate = this.generateAdornmentTemplate({
            buttonOpts: {
                click: Ext.bind(function(mouseEvent, button) {
                    var commandHandler = button.diagram.commandHandler;

                    commandHandler.copySelection();
                    commandHandler.pasteSelection();
                }, this)
            }
        });

        return this.generateNodeTemplate({
            isPalette: options.isPalette,
            resizable: true,
            selectionAdornmentTemplate: adornmentTemplate,
            shapeOpts: {
                icon: 'resources/images/face-monkey.svg',
                fill: go.GraphObject.make(go.Brush, go.Brush.Linear, { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }),
                toLinkable: true,
                fromLinkable: true
            },
            textOpts: {
                text: 'Page'
            }
        });
    },

    generateTextBlockTemplate: function(options) {
        options = options || {};

        var textOpts = options.textOpts || {}, binding, textBlock;

//        if (options.isPalette) {
            textOpts.font = '10pt Helvetitca, Arial, sans-serif';
            textOpts.stroke = 'black';
            textOpts.row = 1;
            textOpts.column = 0;
//        }

        binding = typeof(textOpts.binding) === 'undefined' ? new go.Binding('text', 'text').makeTwoWay() : textOpts.binding;

        delete options.binding;

        textOpts = Ext.merge({
            wrap: go.TextBlock.None,
            textAlign: 'center',
            editable: true,
            font: '15pt Helvetica, Arial, sans-serif',
            name: 'label'
        }, textOpts);

        textBlock = go.GraphObject.make(go.TextBlock, textOpts, {fromLinkable: true, toLinkable: true, cursor: "pointer"});

        if (binding) textBlock.bind(binding);

        return textBlock;
    },

    generateAdornmentTemplate: function(options) {
        options = options || {};

        options = Ext.merge({
           shapeOpts: {
               fill: null,
               stroke: 'blue',
               strokeWidth: 2
           },
           buttonOpts: {
               alignment: go.Spot.TopRight,
               click: function() { console.log('you should define your own click handler...'); }
           }
        }, options);

        var adornment = new go.Adornment(go.Panel.Spot),
            panel = new go.Panel(go.Panel.Auto),
            shape = go.GraphObject.make(go.Shape, options.shapeOpts),
            buttonShape = options.buttonOpts.shape || go.GraphObject.make(go.Shape, 'PlusLine', { desiredSize: new go.Size(6, 6) });

        delete options.buttonOpts.shape;

        panel.add(shape);
        panel.add(new go.Placeholder());

        adornment.add(panel);
        adornment.add(go.GraphObject.make('Button', options.buttonOpts, buttonShape));

        return adornment;
    },

    generateLinkTemplate: function() {
        var link = new go.Link(),
            addLineShape = new go.Shape(),
            addedLineShape = new go.Shape(),
            label = new go.TextBlock(go.Link.OrientUpright);

        link.relinkableTo = true;
        link.canRelinkFrom = true;
        link.toShortLength = 2;
        link.curve = go.Link.None;

        addedLineShape.stroke = addLineShape.stroke = addedLineShape.fill = addLineShape.fill = 'blue';
        addLineShape.strokeWidth = 2;
        addLineShape.toArrow = 'OpenTriangle';

        addedLineShape.toArrow = 'Standard';

        label.background = 'white';
        label.text = 'edit me';
        label.editable = true;
        label.bind(new go.Binding('text', 'text'));

        link.add(addLineShape);
        link.add(addedLineShape);
        link.add(label);

        return link;
    }
});