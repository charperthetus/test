Ext.define('Savanna.crumbnet.utils.ViewTemplates', {
    singleton: true,

    generateCanvasNodeTemplate: function() {
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

        return this.generateNodeTemplate({selectionAdornmentTemplate: defaultAdornment})
    },

    /**
     * Creates our default node template for use with GoJS
     *
     * @param {Object} options - optional parameter that can contain a object properties to be applied to the node template
     * @return {go.Node} - The node template for use with GoJS
     */
    generateNodeTemplate: function(options) {
        options = options || {};

        var $ = go.GraphObject.make;

        var icon = go.GraphObject.make(go.Picture, {
            name: 'icon',
            toLinkable: true,
            cursor: 'pointer',
            width: 46,
            height: 46
        }, new go.Binding('source', 'category', this.convertCategoryToImage));

        var textBlock = $(go.TextBlock, {
            textAlign: 'center',
            editable: true,
            width: 80,
            wrap: go.TextBlock.WrapDesiredSize,
            font: '10pt Helvetitca, Arial, sans-serif',
            name: 'label',
            cursor: 'pointer'
        }, new go.Binding('text', 'text').makeTwoWay());

        var nodeTemplate = $(go.Node, go.Panel.Auto,
            {
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
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

        nodeTemplate = Ext.merge(nodeTemplate, options);

        return nodeTemplate;
    },

    makePort: function (name, spot, angle) {
        var $ = go.GraphObject.make;
        var triangle = go.Geometry.parse("M 0,0 L 12,0 12,12 0,0", true);
        return $(go.Panel,
            { alignment: spot },
            $(go.Shape, { geometry: triangle, stroke: null, fill: null, angle: angle},
                {portId: name, fromLinkable: true }) )
    },

    convertCategoryToImage: function(category){
        return "/resources/images/" + category + "Icon.svg";
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

    generateLinkTemplateMap: function() {
        var $ = go.GraphObject.make,
            linkTemplateMap = new go.Map();

        linkTemplateMap.add('standard', $(go.Link,  // the whole link panel
            { selectionAdorned: true,
                layerName: "Foreground",
                routing: go.Link.AvoidsNodes,
                corner: 5,
                toShortLength: 5
            },
            $(go.Shape,  // the link shape
                { isPanelMain: true,
                    stroke: "#303B45",
                    strokeWidth: 2.5}),
            $(go.TextBlock,  // the "from" label
                { textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "#1967B3",
                    segmentIndex: 0,
                    segmentOffset: new go.Point(NaN, NaN),
                    segmentOrientation: go.Link.OrientUpright },
                new go.Binding("text", "text")),
            $(go.Shape,  // the arrowhead
                { toArrow: "standard",
                    stroke: null })));

        linkTemplateMap.add('curvy', $(go.Link,
            { curve: go.Link.Bezier,
                fromShortLength: -2, toShortLength: -2,
                selectable: false },
            $(go.Shape,
                { strokeWidth: 3, stroke: 'skyblue' } ),
            $(go.TextBlock,  // the "from" label
                { textAlign: "center",
                    font: "bold 14px sans-serif",
                    stroke: "#1967B3",
                    segmentOffset: new go.Point(NaN, NaN) },
                new go.Binding("text", "text"))));

        return linkTemplateMap;
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
        toData.loc = new go.Point(p.x + 200, p.y);  //TODO - This seems to not be working because the location of the node template is not bound to the model, check out http://gojs.net/latest/samples/pageflow.html
        // add the new node data to the model
        var model = diagram.model;
        model.addNodeData(toData);
        // create a link data from the old node data to the new node data
        var linkdata = {category: 'standard'}; //New link with standard category
        linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
        linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
        // and add the link data to the model
        model.addLinkData(linkdata);
        diagram.commitTransaction("Add Node");
    }
});