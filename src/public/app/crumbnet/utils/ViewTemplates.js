/* global Ext: false, go: false */
Ext.define('Savanna.crumbnet.utils.ViewTemplates', {
    singleton: true,

    /**
     * Creates our default node template for use with GoJS
     *
     * @param {Object} options - optional parameter that can contain a object properties to be applied to the node template
     * @return {go.Node} - The node template for use with GoJS
     */
    generateNodeTemplate: function(options) {
        options = options || {};

        var gmake = go.GraphObject.make;

        var icon = go.GraphObject.make(go.Picture, {
            name: 'icon',
            toLinkable: true,
            cursor: 'pointer',
            height: 46,
            width: 46
        }, new go.Binding('source', 'category', this.convertCategoryToImage));

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
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                toLinkable: true,
                mouseEnter: this.nodeMouseEnter,
                mouseLeave: this.nodeMouseLeave
            },
            //Bind the location to the model text loc so when we add new nodes to the model with a location it will show correctly
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            //Make a transparent rectangle in the background so our hover always works
            gmake(go.Shape, { figure: "Rectangle", fill: "transparent", stroke: null }),
            gmake(go.Panel, go.Panel.Vertical,
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, { figure: "Rectangle", fill: "transparent", stroke: null, width: 52, height: 52 }),
                    icon,
                    gmake(go.Shape, { figure: "circle", fill: null, strokeWidth: 3, width: 49 }, new go.Binding("stroke", "isSelected", function (s) { return (s ? "cornflowerblue" : null); }).ofObject("") ),
                    this.makePort("T", go.Spot.TopRight, 0),
                    this.makePort("L", go.Spot.TopLeft, 270),
                    this.makePort("B", go.Spot.BottomLeft, 180),
                    //The button to make a new child node and link it
                    gmake("Button",
                        { alignment: go.Spot.BottomRight, visible: false, portId: 'R', fromLinkable: true,
                            click: this.addNodeAndLink },  // this function is defined below
                        gmake(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
                    )),
                textBlock)
        );

        nodeTemplate = Ext.merge(nodeTemplate, options);

        return nodeTemplate;
    },

    makePort: function (name, spot, angle) {
        var gmake = go.GraphObject.make;
        var triangle = go.Geometry.parse("M 0,0 L 12,0 12,12 0,0 12,0", true);
        return gmake(go.Panel,
            { alignment: spot },
            gmake(go.Shape, { geometry: triangle, stroke: 'black', fill: 'red', angle: angle, visible: false},
                {portId: name, fromLinkable: true }) );
    },

    convertCategoryToImage: function(category){
        return "resources/images/" + category + "Icon.svg";
    },

    nodeMouseEnter: function(e, obj){
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

    nodeMouseLeave: function(e, obj){
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

        linkTemplateMap.add('standard', gmake(go.Link,  // the whole link panel
            { selectionAdorned: true,
                layerName: "Foreground",
                routing: go.Link.AvoidsNodes,
                corner: 5,
                toShortLength: 5
            },
            gmake(go.Shape,  // the link shape
                { isPanelMain: true,
                    stroke: "#303B45",
                    strokeWidth: 2.5}),
            gmake(go.TextBlock,  // the "from" label
                { textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "#1967B3",
                    segmentIndex: 0,
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright },
                new go.Binding("text", "text")),
            gmake(go.Shape,  // the arrowhead
                { toArrow: "standard",
                    stroke: null })));

        linkTemplateMap.add('curvy', gmake(go.Link,
            { curve: go.Link.Bezier,
                fromShortLength: -2, toShortLength: -2 },
            gmake(go.Shape,
                { strokeWidth: 3, stroke: 'skyblue' } ),
            gmake(go.TextBlock,  // the "from" label
                { textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "#1967B3",
                    segmentOffset: new go.Point(NaN, NaN) },
                new go.Binding("text", "text"))));

        return linkTemplateMap;
    },

    addNodeAndLink: function(e, obj) {
        var fromNode = obj.part;

        if (null === fromNode) {
            return;
        }

        e.handled = true;

        var diagram = fromNode.diagram;
        diagram.startTransaction("Add Node");

        // get the node data for which the user clicked the button
        var fromData = fromNode.data;

        // create a new "State" data object, positioned off to the right of the adorned Node
        var toData = { text: "new", category: fromData.category, key: Ext.id() };
        var p = fromNode.location;

        var nit = fromNode.findNodesOutOf();
        if (nit.count > 0){
            while (nit.next()){
                var cnLoc = nit.value.location;

                var x = 0;
                var y = Number.NEGATIVE_INFINITY;

                if (cnLoc.y == y){
                    if (cnLoc.x > x){
                        y = cnLoc.y;
                        x = cnLoc.x;
                    }
                }else if (cnLoc.y > y){
                    y = cnLoc.y;
                    x = cnLoc.x;
                }
            }
            toData.loc = x + " " + (y + 70);
        }else{
            toData.loc = (p.x + 200) + " " + (p.y + 50);  // the "loc" property is a string, not a Point object
        }

        // add the new node data to the model
        var model = diagram.model;
        model.addNodeData(toData);

        // create a link data from the old node data to the new node data
        var linkdata = {category: 'curvy'}; //New link with curvy category
        linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
        linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);

        // and add the link data to the model
        model.addLinkData(linkdata);
        diagram.commitTransaction("Add Node");
    }
});