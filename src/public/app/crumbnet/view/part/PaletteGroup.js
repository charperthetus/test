/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:35 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false, go: false */
Ext.define('Savanna.crumbnet.view.part.PaletteGroup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.crumbnet_part_palette-group',

    //model: null,

    palette: null,

    initComponent: function() {
        this.callParent(arguments);

        //this.model = config.model;
        this.mon(this, 'expand', function() { this.requestPaletteUpdate(); }, this);
    },

    onRender: function() {
        this.callParent(arguments);

        var domElem = Ext.DomHelper.insertHtml('afterBegin', this.body.dom, '<div class="go-graph-palette" id="palette-' + Ext.id() + '" style="width: 100%; height: 100%;"></div>');

        this.palette = new go.Palette(domElem);
        this.palette.initialAutoScale = go.Diagram.None;

        this.palette.nodeTemplateMap = this.buildTemplateMap();

        this.palette.model.nodeDataArray = [
            { category: 'Concept' },
            { category: 'Question' },
            { category: 'Problem' },
            { category: 'Fact' },
            { category: 'Hypothesis' },
            { category: 'Conclusion' },
            { category: 'Assumption' }
        ];
    },

    requestPaletteUpdate: function() {
        this.palette.requestUpdate();
    },

    // NOTE: THESE WERE DIRECTLY COPIED FROM Savanna.crumbnet.view.CrumbnetComponent
    //       THEY SHOULD BE ABSTRACTED INTO A FACTORY

    buildTemplateMap: function() {
        var gmake = go.GraphObject.make;  // for conciseness in defining templates
        var defaultAdornment =
            gmake(go.Adornment, go.Panel.Spot,
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, { fill: null, stroke: "blue", strokeWidth: 2 }),
                    gmake(go.Placeholder)
                ),
                // the button to create a "next" node, at the top-right corner
                gmake("Button",
                    { alignment: go.Spot.BottomRight, click: this.addNodeAndLink },  // this function is defined below
                    gmake(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
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
                text: 'Concept ' + this.id
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

        var icon, textBlock, gmake = go.GraphObject.make;

        icon = this.generateIconTemplate(options);

        textBlock = this.generateTextBlockTemplate(options);

        return gmake(
            go.Node, go.Panel.Auto,
            {
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                selectionAdornmentTemplate: options.adornmentTemplate ? options.adornmentTemplate : null,
                toLinkable: true,
                mouseEnter: this.nodeMouseEnter,
                mouseLeave: this.nodeMouseLeave
            },

            gmake(go.Panel, go.Panel.Vertical, icon, textBlock),

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

    generateTextBlockTemplate: function(options) {
        options = options || {};

        var textOpts = options.textOpts || {}, binding, textBlock;

        textOpts.font = '10pt Helvetitca, Arial, sans-serif';
        textOpts.stroke = 'black';
        textOpts.row = 1;
        textOpts.column = 0;

        binding = 'undefined' === typeof(textOpts.binding) ? new go.Binding('text', 'text').makeTwoWay() : textOpts.binding;

        delete options.binding;

        textOpts = Ext.merge({
            textAlign: 'center',
            editable: true,
            width: 80,
            wrap: go.TextBlock.WrapDesiredSize,
            font: '15pt Helvetica, Arial, sans-serif',
            name: 'label'
        }, textOpts);

        textBlock = go.GraphObject.make(go.TextBlock, textOpts, { cursor: "pointer"});

        if (binding) {
            textBlock.bind(binding);
        }

        return textBlock;
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
    },

    makePort: function (name, spot, angle) {
        var $ = go.GraphObject.make;
        var triangle = go.Geometry.parse("M 0,0 L 12,0 12,12 0,0", true);
        return $(go.Panel,
            { alignment: spot },
            $(go.Shape, { geometry: triangle, stroke: null, fill: null, angle: angle},
                {portId: name, fromLinkable: true }) )
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
    }
});