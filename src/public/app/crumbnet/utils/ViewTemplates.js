/* global Ext: false, go: false, Savanna: true, ExtendedLink: false */
Ext.define('Savanna.crumbnet.utils.ViewTemplates', {
    singleton: true,

    requires: [
        'Savanna.Config',
        'Savanna.crumbnet.utils.ExtendedLink'
    ],

    /**
     * Creates our default node template for use with GoJS
     *
     * @return {go.Map} - The node template map for use with GoJS
     */
    generateNodeTemplateMap: function() {
        var nodeTemplateMap = new go.Map();

        nodeTemplateMap.add('standard', this.generateNodeTemplate());
        nodeTemplateMap.add('image', this.generateImageTemplate());

        return nodeTemplateMap;
    },

    generateNodeTemplate: function() {
        var gmake = go.GraphObject.make;

        var titleText = this.makeTextBlock({ bold: true, alignment: go.Spot.TopLeft });
        titleText.bind(new go.Binding('text', 'title').makeTwoWay());

        var descText = this.makeTextBlock({ alignment: go.Spot.TopLeft, name: 'descText' });
        descText.bind(new go.Binding('text', 'description').makeTwoWay());
        descText.bind(new go.Binding('width', 'width').makeTwoWay());

        var selectionCircle = this.makeCircle({
            fill: null,
            strokeWidth: 3,
            width: 49
        });
        selectionCircle.bind(new go.Binding('stroke', 'isSelected', function (s) { return (s ? 'cornflowerblue' : null); }).ofObject(''));

        var nodeTemplate = gmake(go.Node, go.Panel.Auto, {
                selectionAdorned: false,
                locationSpot: go.Spot.Center, //Makes it so when you create a node it is centered on your cursor
                toLinkable: true,
                fromLinkable: true, // This is needed to allow the whole node to be the only port
                resizable: true,
                resizeObjectName: 'descText',
                areaBackground: 'transparent', //This allows the hover to always work
                mouseEnter: this.nodeMouseEnter,
                mouseLeave: this.nodeMouseLeave,
                mouseDragEnter: this.nodeDragEnter
            },
            //Bind the location to the model text loc so when we add new nodes to the model with a location it will show correctly
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            gmake(go.Panel, go.Panel.Horizontal,
                gmake(go.Panel, go.Panel.Auto,
                    this.makeIconBounds(),
                    this.makePercentComplete(),
                    this.makeIconColor(),
                    this.makeIcon(),
                    selectionCircle,
                    this.makePort('TR', go.Spot.TopRight, 0),
                    this.makePort('TL', go.Spot.TopLeft, 270),
                    this.makePort('BL', go.Spot.BottomLeft, 180),
                    //The button to make a new child node and link it
                    gmake('Button', {
                            alignment: go.Spot.BottomRight,
                            opacity: 0,
                            name: 'BR',
                            fromLinkable: true,
                            click: this.addNodeAndLink
                        },
                        gmake(go.Shape, 'PlusLine', { desiredSize: new go.Size(6, 6) })
                    )
                ),
                gmake(go.Panel, go.Panel.Vertical, titleText, descText)
            )
        );

        nodeTemplate.resizeAdornmentTemplate = gmake(go.Adornment, 'Spot',
            gmake(go.Placeholder),
            gmake(go.Shape, {
                    alignment: go.Spot.BottomRight,
                    desiredSize: new go.Size(8, 8),
                    fill: 'cyan',
                    cursor: 'col-resize'
                }
            )
        );

        return nodeTemplate;
    },

    generateImageTemplate: function() {
        var gmake = go.GraphObject.make;

        return gmake(go.Node, go.Panel.Auto, {
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
            }, new go.Binding('source', 'imageData' ))
        );
    },

    generatePaletteNodeTemplate: function(){
        var gmake = go.GraphObject.make;

        var textBlock = this.makeTextBlock({ textAlign: 'center', name: 'label' });
        textBlock.bind(new go.Binding('text', 'title').makeTwoWay());

        var nodeTemplate = gmake(go.Node, go.Panel.Auto,
            gmake(go.Panel, go.Panel.Vertical,
                gmake(go.Panel, go.Panel.Auto,
                    this.makeIconBounds(),
                    this.makeIconColor(),
                    this.makeIcon()
                ),
                textBlock
            )
        );

        return nodeTemplate;
    },

    generateLinkTemplateMap: function() {
        var linkTemplateMap = new go.Map();

        linkTemplateMap.add('Orthogonal', this.makeOrthogonalLink());

        linkTemplateMap.add('Straight', this.makeStraightLink());

        linkTemplateMap.add('Tapered', this.makeTaperedLink());

        return linkTemplateMap;
    },

    getLinkTemplateNames: function() {
        var linkTemplateMap = this.generateLinkTemplateMap();
        var keySet = linkTemplateMap.toKeySet();

        return keySet.toArray();
    },

    // Shape-helpers (to consolidate logic for building parts of nodes/links)

    makeIconBounds: function() {
        return go.GraphObject.make(go.Shape, { figure: 'Rectangle', fill: 'transparent', stroke: null, width: 52, height: 52 });
    },

    makeIcon: function() {
        return go.GraphObject.make(go.Picture, {
            name: 'icon',
            toLinkable: true,
            cursor: 'pointer',
            height: 46,
            width: 46
        }, new go.Binding('source', 'type', this.convertTypeToImage));
    },

    makeIconColor: function() {
        var iconColor = this.makeCircle({
            stroke: null
        });
        iconColor.bind(new go.Binding('fill', 'color'));

        return iconColor;
    },

    makeTextBlock: function(options) {
        options = options || {};

        var textBlockOptions = {};

        Ext.apply(textBlockOptions, options, {
            textAlign: 'left',
            width: 80,
            editable: true,
            wrap: go.TextBlock.WrapDesiredSize,
            font: '10pt Helvetica, Arial, sans-serif',
            cursor: 'pointer'
        });

        if (typeof textBlockOptions.bold !== 'undefined') {
            // would be nice if there was a way to have a default font and have it bolded, but alas...no...
            if (textBlockOptions.bold) {
                textBlockOptions.font = 'bold ' + textBlockOptions.font;
            }

            delete textBlockOptions.bold;
        }

        return go.GraphObject.make(go.TextBlock, textBlockOptions);
    },

    makeCircle: function(options) {
        options = options || {};

        var circleOptions = {};

        Ext.apply(circleOptions, options, {
            figure: 'circle',
            width: 46
        });

        return go.GraphObject.make(go.Shape, circleOptions);
    },

    makePercentComplete: function() {

        function drawPercent(percent, size) {
            var angle = 360 * (percent / 100);
            var radius = size / 2;
            var semicircle = go.Geometry.parse('M' + radius + ',' + radius +
                'B' + 180 + ' ' + -angle+ ' ' + radius + ' ' + radius + ' ' + radius + ' ' + radius + ' z', true);
            return semicircle;
        }

        return go.GraphObject.make(go.Shape, {
            fill: 'blue',
            stroke: null,
            alignment: go.Spot.TopLeft,
            visible: false },
            new go.Binding('geometry', 'percent', function(p){ return drawPercent(p,52); })
        );
    },

    makeOrthogonalLink: function() {
        var gmake = go.GraphObject.make,
            linkShape = gmake(go.Shape, { isPanelMain: true, stroke: '#303B45', strokeWidth: 2.5 }),
            fromLabel = this.makeLinkTextBlock({ segmentIndex: 0, segmentOrientation: go.Link.OrientUpright }),
            arrowhead = gmake(go.Shape, { toArrow: 'standard', stroke: null });

        return gmake(ExtendedLink, {
                selectionAdorned: true,
                layerName: 'Foreground',
                routing: go.Link.AvoidsNodes,
                corner: 5,
                toShortLength: 5
            },
            linkShape,
            fromLabel,
            arrowhead
        );
    },

    makeStraightLink: function() {
        var gmake = go.GraphObject.make,
            linkShape = gmake(go.Shape, { strokeWidth: 3, stroke: 'skyblue' }),
            fromLabel = this.makeLinkTextBlock();

        return gmake(ExtendedLink, {
                routing: go.Link.Normal,
                fromEndSegmentLength: 0,
                toEndSegmentLength: 0
            },
            linkShape,
            fromLabel
        );
    },

    makeTaperedLink: function() {
        var gmake = go.GraphObject.make;

        return gmake(ExtendedLink,
            go.Link.Bezier,
            go.Link.Orthogonal,
            {
                fromEndSegmentLength: 1,
                toEndSegmentLength: 1,
                selectionObjectName: 'Path',
                relinkableFrom: true,
                relinkableTo: true
            },
            gmake(go.Shape, {
                isPanelMain: true,
                name: 'Path',
                stroke: null,
                fill: 'blue'
            })
        );
    },

    makeLinkTextBlock: function(options) {
        options = options || {};

        var textBlockOptions = {};

        Ext.apply(textBlockOptions, options, {
            textAlign: 'center',
            font: 'bold 14px sans-serif',
            stroke: '#1967B3',
            segmentOffset: new go.Point(NaN, NaN)
        });

        return go.GraphObject.make(go.TextBlock, textBlockOptions, new go.Binding('text', 'text'));
    },

    convertTypeToImage: function(category) {
        return  Savanna.Config.resourcesPathPrefix + 'resources/images/' + category + 'Icon.svg';
    },

    // Event handlers

    /* temporarily disable jshint complaints until we get this sorted out... */
    /*jshint unused: false */
    /* global console: false */
    nodeDragEnter: function(e, obj) {
        console.log('nodeDragEnter');
    },
    /*jshint unused: true */

    nodeMouseEnter: function(e, obj) {
        var node = obj.part;
        var diagram = node.diagram;

        if (!diagram || diagram.isReadOnly || !diagram.allowLink) {
            return;
        }

        var iterator = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

        while (iterator.next()) {
            Savanna.crumbnet.utils.ViewTemplates.showPort(iterator.value);
        }
    },

    nodeMouseLeave: function(e, obj) {
        var node = obj.part;
        var diagram = node.diagram;

        if (!diagram || diagram.isReadOnly || !diagram.allowLink) {
            return;
        }

        var iterator = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

        while (iterator.next()) {
            Savanna.crumbnet.utils.ViewTemplates.hidePort(iterator.value);
        }
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
        var toData = { title: 'New Node', type: fromData.type, color: fromData.color, category: fromData.category, key: Ext.id() };
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
    },

    // PORT methods

    makePort: function (name, spot, angle) {
        var triangle = go.Geometry.parse('M 0,0 L 12,0 12,12 0,0 12,0', true);

        return go.GraphObject.make(go.Panel, {
                alignment: spot,
                alignmentFocus: spot
            },
            go.GraphObject.make(go.Shape, {
                    geometry: triangle,
                    stroke: null,
                    fill: null,
                    angle: angle
                },
                {
                    name: name,
                    fromLinkable: true
                }
            )
        );
    },

    showPort: function(port) {
        if (port instanceof go.Panel) {
            port.opacity = 1;
        } else { // it's a shape
            port.stroke = 'black';
            port.fill = 'red';
        }
    },

    hidePort: function(port) {
        if (port instanceof go.Panel) {
            port.opacity = 0;
        } else { // it's a shape
            port.stroke = null;
            port.fill = null;
        }
    },

    getPorts: function(node) {
        var ports = new go.List();

        var names = ['TR','TL','BR','BL'];
        for (var i = 0; i < names.length; i++) {
            var port = node.findObject(names[i]);
            if (port) {
                ports.add(port);
            }
        }

        return ports.iterator;
    }
});