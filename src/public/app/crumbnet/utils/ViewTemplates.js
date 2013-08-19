/* global Ext: false, go: false, Savanna: true, TaperedLink: false */
Ext.define('Savanna.crumbnet.utils.ViewTemplates', {
    singleton: true,

    requires: [
        'Savanna.Config',
        'Savanna.crumbnet.utils.TaperedLink'
    ],

    /**
     * Creates our default node template for use with GoJS
     *
     * @return {go.Map} - The node template map for use with GoJS
     */
    generateNodeTemplateMap: function() {
        var gmake = go.GraphObject.make;

        var icon = go.GraphObject.make(go.Picture, {
            name: 'icon',
            toLinkable: true,
            cursor: 'pointer',
            height: 46,
            width: 46
        }, new go.Binding('source', 'type', this.convertTypeToImage));

        var textBlock = gmake(go.TextBlock, {
            textAlign: 'center',
            editable: true,
            width: 80,
            wrap: go.TextBlock.WrapDesiredSize,
            font: '10pt Helvetitca, Arial, sans-serif',
            name: 'label',
            cursor: 'pointer'
        }, new go.Binding('text', 'text').makeTwoWay());

        var nodeTemplate = gmake(go.Node, go.Panel.Auto,
            {
                selectionAdorned: false,
                locationSpot: go.Spot.Center, //Makes it so when you create a node it is centered on your cursor
                toLinkable: true,
                mouseEnter: this.nodeMouseEnter,
                mouseLeave: this.nodeMouseLeave,
                mouseDragEnter: this.nodeDragEnter
            },
            //Bind the location to the model text loc so when we add new nodes to the model with a location it will show correctly
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            //Make a transparent rectangle in the background so our hover always works
            gmake(go.Shape, { figure: 'Rectangle', fill: 'transparent', stroke: null }),
            gmake(go.Panel, go.Panel.Vertical,
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, { figure: 'Rectangle', fill: 'transparent', stroke: null, width: 52, height: 52 }),
                    gmake(go.Shape, { fill: 'blue', stroke: null, alignment: go.Spot.BottomLeft }, new go.Binding('geometry', 'percent', function(p){ return makeCircle(p,52); }  )),
                    gmake(go.Shape, { figure: 'circle', stroke: null, width: 46 }, new go.Binding('fill', 'color')),
                    icon,
                    gmake(go.Shape, { figure: 'circle', fill: null, strokeWidth: 3, width: 49 }, new go.Binding('stroke', 'isSelected', function (s) { return (s ? 'cornflowerblue' : null); }).ofObject('') ),
                    this.makePort('T', go.Spot.TopRight, 0),
                    this.makePort('L', go.Spot.TopLeft, 270),
                    this.makePort('B', go.Spot.BottomLeft, 180),
                    //The button to make a new child node and link it
                    gmake('Button',
                        { alignment: go.Spot.BottomRight, visible: false, portId: 'R', fromLinkable: true,
                            click: this.addNodeAndLink },  // this function is defined below
                        gmake(go.Shape, 'PlusLine', { desiredSize: new go.Size(6, 6) })
                    )),
                textBlock)
        );

        function makeCircle(percent, size){
            var angle = 360 * (percent / 100);
            var newAngle = angle > 180 ? angle - 180 : angle + 180;
            var radians = newAngle * Math.PI / 180; //radians = angle * PI / 180
            var radius = size / 2;
            var x = radius * Math.cos(radians) + radius;
            var y = - radius * Math.sin(radians);
            var semicircle = go.Geometry.parse('M' + radius + ',-' + radius + ' h-' + radius + ' a' + radius + ',' + radius + ' 0 ' + (percent > 50 ? 1 : 0) + ',0 '+ x + ',' + y + ' z', true);
            return semicircle;
        }

        var imageTemplate = gmake(go.Node, go.Panel.Auto,
            {
                toLinkable: true,
                resizable: true,
                height: 100,
                width: 100
            },
            //Bind the location to the model text loc so when we add new nodes to the model with a location it will show correctly
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            gmake(go.Picture, {
                name: 'icon',
                toLinkable: true,
                cursor: 'pointer',
                imageStretch: go.GraphObject.Uniform
            }, new go.Binding('source', 'imageData' )) );

        var nodeTemplateMap = new go.Map();
        nodeTemplateMap.add('standard', nodeTemplate);
        nodeTemplateMap.add('image', imageTemplate)

        return nodeTemplateMap;
    },

    generatePaletteNodeTemplate: function(){
        var gmake = go.GraphObject.make;

        var icon = go.GraphObject.make(go.Picture, {
            name: 'icon',
            toLinkable: true,
            cursor: 'pointer',
            height: 46,
            width: 46
        }, new go.Binding('source', 'type', this.convertTypeToImage));

        var textBlock = gmake(go.TextBlock, {
            textAlign: 'center',
            editable: true,
            width: 80,
            wrap: go.TextBlock.WrapDesiredSize,
            font: '10pt Helvetitca, Arial, sans-serif',
            name: 'label',
            cursor: 'pointer'
        }, new go.Binding('text', 'text').makeTwoWay());

        var nodeTemplate = gmake(go.Node, go.Panel.Auto,
            {
                selectionAdorned: false
            },
            gmake(go.Panel, go.Panel.Vertical,
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, { figure: 'Rectangle', fill: 'transparent', stroke: null, width: 52, height: 52 }),
                    gmake(go.Shape, { figure: 'circle', stroke: null, width: 46 }, new go.Binding('fill', 'color')),
                    icon
                ),
                textBlock)
        );

        return nodeTemplate;
    },

    makePort: function (name, spot, angle) {
        var gmake = go.GraphObject.make;
        var triangle = go.Geometry.parse('M 0,0 L 12,0 12,12 0,0 12,0', true);
        return gmake(go.Panel,
            { alignment: spot },
            gmake(go.Shape, { geometry: triangle, stroke: 'black', fill: 'red', angle: angle, visible: false},
                {portId: name, fromLinkable: true }) );
    },

    convertTypeToImage: function(category) {
        return  Savanna.Config.resourcesPathPrefix + 'resources/images/' + category + 'Icon.svg';
    },

    nodeDragEnter: function(e, obj) {
        console.log('nodeDragEnter')
    },

    nodeMouseEnter: function(e, obj) {
        var node = obj.part;
        var diagram = node.diagram;

        if (!diagram || diagram.isReadOnly || !diagram.allowLink) {
            return;
        }

        var it = node.ports;

        while (it.next()) {
            var port = it.value;
            port.visible = true;
        }
    },

    nodeMouseLeave: function(e, obj) {
        var node = obj.part;
        var diagram = node.diagram;

        if (!diagram || diagram.isReadOnly || !diagram.allowLink) {
            return;
        }

        var it = node.ports;

        while (it.next()) {
            var port = it.value;
            port.visible = false;
        }
    },

    generateLinkTemplateMap: function() {
        var gmake = go.GraphObject.make,
            linkTemplateMap = new go.Map();

        //TODO - Using extended link here is temporary until the gojs lib is fixed to allow changing link classes.
        linkTemplateMap.add('Orthogonal', gmake(ExtendedLink,  // the whole link panel
            { selectionAdorned: true,
                layerName: 'Foreground',
                routing: go.Link.AvoidsNodes,
                corner: 5,
                toShortLength: 5
            },
            gmake(go.Shape,  // the link shape
                { isPanelMain: true,
                    stroke: '#303B45',
                    strokeWidth: 2.5}),
            gmake(go.TextBlock,  // the 'from' label
                { textAlign: 'center',
                    font: 'bold 14px sans-serif',
                    stroke: '#1967B3',
                    segmentIndex: 0,
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright },
                new go.Binding('text', 'text')),
            gmake(go.Shape,  // the arrowhead
                { toArrow: 'standard',
                    stroke: null })));

        linkTemplateMap.add('Straight', gmake(ExtendedLink,
            { routing: go.Link.Normal, fromEndSegmentLength: 0, toEndSegmentLength: 0 },
            gmake(go.Shape,
                { strokeWidth: 3, stroke: 'skyblue' } ),
            gmake(go.TextBlock,  // the 'from' label
                { textAlign: 'center',
                    font: 'bold 14px sans-serif',
                    stroke: '#1967B3',
                    segmentOffset: new go.Point(NaN, NaN) },
                new go.Binding('text', 'text'))));

        linkTemplateMap.add('Tapered', gmake(ExtendedLink,
            go.Link.Bezier,
            go.Link.Orthogonal,
            { fromEndSegmentLength: 1,
                toEndSegmentLength: 1,
                selectionObjectName: 'Path',
                relinkableFrom: true,
                relinkableTo: true },
            gmake(go.Shape,
                { isPanelMain: true,
                    name: 'Path',
                    stroke: null,
                    fill: 'blue' }
            )));

        return linkTemplateMap;
    },

    getLinkTemplateNames: function() {
        var linkTemplateMap = this.generateLinkTemplateMap();
        var keySet = linkTemplateMap.toKeySet();

        return keySet.toArray();
    },

    addNodeAndLink: function(e, node) {
        var fromNode = node.part;

        if (!fromNode) {
            return;
        }

        e.handled = true;

        var diagram = fromNode.diagram;
        diagram.startTransaction('Add Node');

        // get the node data for which the user clicked the button
        var fromData = fromNode.data;

        //TODO - Need to figure out which properties should be copied into the new node by default (ie category, percent)
        // create a new "State" data object, positioned off to the right of the adorned Node
        var toData = { text: 'new', type: fromData.type, category: fromData.category, key: Ext.id(), percent: 10 };
        var fromLocation = fromNode.location;
        var siblingNodes = fromNode.findNodesOutOf();
        var x = 0;
        var y = Number.NEGATIVE_INFINITY;

        if (siblingNodes.count > 0) {
            while (siblingNodes.next()) {
                var linkedNodeLocation = siblingNodes.value.location;

                if (linkedNodeLocation.y === y) {
                    if (linkedNodeLocation.x > x) {
                        y = linkedNodeLocation.y;
                        x = linkedNodeLocation.x;
                    }
                }
                else if (linkedNodeLocation.y > y) {
                    y = linkedNodeLocation.y;
                    x = linkedNodeLocation.x;
                }
            }

            toData.loc = x + ' ' + (y + 70);
        }
        else {
            toData.loc = (fromLocation.x + 200) + ' ' + (fromLocation.y + 50);  // the 'loc' property is a string, not a Point object
        }

        // add the new node data to the model
        var model = diagram.model;
        model.addNodeData(toData);

        // create a link data from the old node data to the new node data
        var linkdata = { category: 'Tapered' }; // New link with tapered category
        linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
        linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);

        // and add the link data to the model
        model.addLinkData(linkdata);
        diagram.commitTransaction('Add Node');
    }
});