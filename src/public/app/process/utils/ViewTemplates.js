/* global Ext: false, go: false, Savanna: true, ExtendedLink: false */
Ext.define('Savanna.process.utils.ViewTemplates', {
    singleton: true,

    requires: [
        'Savanna.process.layout.StepLayout',
        'Savanna.process.utils.GroupEventHandlers',
        'Savanna.process.utils.NodeEventHandlers',
        'Savanna.process.utils.ProcessUtils'
    ],

    darkText: '#454545',
    startColor: '#79C900',
    mainColor: '#00A9C9',
    endColor: '#DC3C00',
    stepColor: '#FFFF88',

    nodeStyle:function(){
        return {
            // the Node.location is at the center of each node
            locationSpot: go.Spot.Center,
            // handle mouse enter/leave events to show/hide the ports
            mouseEnter: Savanna.process.utils.NodeEventHandlers.onMouseEnter,
            mouseLeave: Savanna.process.utils.NodeEventHandlers.onMouseLeave,
            mouseDrop: Savanna.process.utils.NodeEventHandlers.onMouseDrop
        };
    },

    linkTextStyle: function(clickHandler) {
        return {
            font: '9pt Helvetica, Arial, sans-serif',
            stroke: 'blue',
            isUnderline: true,
            margin: 2,
            editable: false,
            click: clickHandler
        };
    },

    nodeTextStyle: function(fontsize) {
        return {
            font: fontsize? fontsize.toString() + 'pt Helvetica, Arial, sans-serif' : '10pt Helvetica, Arial, sans-serif',
            stroke: this.darkText,
            margin: 4,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true,
            name: 'TEXT'
        };
    },

    uneditableNodeTextStyle: function() {
        return {
            font: '10pt Helvetica, Arial, sans-serif',
            stroke: this.darkText,
            margin: 4
        };
    },

    generateNodeTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var nodeTemplateMap = new go.Map();

                // define the Node templates for regular nodes

        nodeTemplateMap.add('ProcessItem',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal,
                    gmake(go.Shape, 'Rectangle', { width: 24, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Left },
                        gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay()),
                        // define a Horizontal panel to place the node's three buttons side by side
                        gmake(go.Panel, go.Panel.Horizontal, {opacity: 0.0, name: 'BUTTONS'},
                            gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addStep)),
                            gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addDecision)),
                            gmake(go.TextBlock, '+End', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addEnd))
                        )
                    )
                )
            )
        );

        nodeTemplateMap.add('Start',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'Start', { width: 32, height: 16, fill: Savanna.process.utils.ViewTemplates.startColor, stroke: null }),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Left },
                        gmake(go.TextBlock, 'Start', Savanna.process.utils.ViewTemplates.uneditableNodeTextStyle()),
                        // define a Horizontal panel to place the node's two buttons side by side
                        gmake(go.Panel, go.Panel.Horizontal, {opacity: 0.0, name: 'BUTTONS'},
                                gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addStep)),
                                gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addDecision))
                        )
                    )
                )
            )
        );

        nodeTemplateMap.add('ProcessAction',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'Circle', { width: 32, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Left },
                        gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay())
                    )
                )
            )
        );

        nodeTemplateMap.add('DecisionPoint', // Category must match the uri type
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                    gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                        gmake(go.Shape, 'Diamond', { width: 32, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                        gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Left },
                            gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay()),
                            // define a Horizontal panel to place the node's two buttons side by side
                            gmake(go.Panel, go.Panel.Horizontal, {opacity: 0.0, name: 'BUTTONS'},
                                gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addStep)),
                                gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addDecision))
                            )
                        )  // end Horizontal Panel
                    )
            )
        );

        nodeTemplateMap.add('End',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Horizontal,
                    gmake(go.Shape, 'StopSign', { width: 32, height: 32, fill: Savanna.process.utils.ViewTemplates.endColor, stroke: null }),
                    gmake(go.TextBlock, 'End', Savanna.process.utils.ViewTemplates.uneditableNodeTextStyle())
                )
            )
        );

        return nodeTemplateMap;
    },

    generatePaletteTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var paletteTemplateMap = new go.Map();

        paletteTemplateMap.add('ProcessAction',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                    gmake(go.Shape, 'Circle', { width: 16, height: 16, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(8), new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('ProcessItem',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                    gmake(go.Shape, 'Rectangle', { width: 12, height: 16, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(8), new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('DecisionPoint',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                        gmake(go.Shape, 'Diamond', { width: 16, height: 16, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                        gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(8), new go.Binding('text', 'text').makeTwoWay())
                    )
            )
        );

        return paletteTemplateMap;
    },

    generateLinkTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var linkTemplateMap = new go.Map();

        linkTemplateMap.add('ProcessLink',
            gmake(go.Link,  // the whole link panel
                { routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: true,
                    relinkableTo: true,
                    reshapable: false },
                gmake(go.Shape,  // the link path shape
                    { isPanelMain: true,
                        stroke: 'gray',
                        strokeWidth: 2 }),
                gmake(go.Shape,  // the arrowhead
                    { toArrow: 'standard',
                        stroke: null,
                        fill: 'gray'}),
                gmake(go.Panel, 'Auto',
                    { visible: false,
                        name: 'LABEL'},
                    new go.Binding('visible', 'visible').makeTwoWay(),
                    gmake(go.Shape, 'RoundedRectangle', { fill: '#F8F8F8', stroke: null }),
                    gmake(go.TextBlock, 'Choice',  // the label
                        { textAlign: 'center',
                            font: '9pt helvetica, arial, sans-serif',
                            stroke: '#919191',
                            margin: 2,
                            editable: true},
                        new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        linkTemplateMap.add('ToolLink',
            gmake(go.Link,  // the whole link panel
                { routing: go.Link.Orthogonal,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false },
                gmake(go.Shape,  // the link path shape
                    { isPanelMain: true,
                        stroke: 'gray',
                        strokeWidth: 2 }),
                gmake(go.Shape,  // the arrowhead
                    { toArrow: 'none',
                        fromArrow: 'backward',
                        stroke: null,
                        fill: 'gray'})
            )
        );

        linkTemplateMap.add('InputLink',
            gmake(go.Link,  // the whole link panel
                { routing: go.Link.Orthogonal,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false },
                gmake(go.Shape,  // the link path shape
                    { isPanelMain: true,
                        stroke: 'gray',
                        strokeWidth: 2 }),
                gmake(go.Shape,  // the arrowhead
                    { toArrow: 'none',
                        fromArrow: 'backward',
                        fill: 'gray'})
            )
        );

        linkTemplateMap.add('ByproductLink',
            gmake(go.Link,  // the whole link panel
                { routing: go.Link.Orthogonal,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false },
                gmake(go.Shape,  // the link path shape
                    { isPanelMain: true,
                        stroke: 'gray',
                        strokeWidth: 2 }),
                gmake(go.Shape,  // the arrowhead
                    { toArrow: 'standard',
                        stroke: null,
                        fill: 'gray'})
            )
        );
        return linkTemplateMap;
    },

    makeAdornment: function(alignmentSpot, gooPoint, gooAngle, clickHandler, glyph, labelStr, labelPoint) {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Position,
            {
                alignment: alignmentSpot,
                alignmentFocus: go.Spot.Center,
                width:48, height:48
            },
            gmake(go.Shape, 'HalfEllipse', {
                    background: 'transparent',
                    fill: null,
                    stroke: null,
                    angle: gooAngle,
                    width:24, height:48,
                    position: gooPoint,
                    isActionable: true,
                    mouseEnter: function(e, obj) {
                        obj.fill = 'lightblue';
                    },
                    mouseLeave: function(e, obj) {
                       obj.fill = null;
                    }
                }
            ),
            gmake(go.Shape, 'Circle', {
                    isActionable: true,
                    fill: 'lightblue',
                    stroke: 'white',
                    strokeWidth:3,
                    width:24, height:24,
                    position: new go.Point(12, 12),
                    click: clickHandler,
                    actionDown: function(e, obj) {
                        obj.fill = 'dodgerblue';
                    },
                    actionUp: function(e, obj) {
                        obj.fill = 'lightblue';
                    }
                }
            ),
            gmake(go.TextBlock, glyph,{ font: "10pt SickFont", stroke: 'blue', position: new go.Point(19, 20) } ),
            gmake(go.TextBlock, "\uf100",{ font: "7pt SickFont", stroke: 'blue', position: new go.Point(30, 14) } ),
            gmake(go.TextBlock, labelStr,
                { font: "bold 6pt sans-serif", background: 'white', position: labelPoint }
            )
        );
    },

    generateGroupTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var groupTemplateMap = new go.Map();

        // define the Step template
        groupTemplateMap.add('ProcessModel',
            gmake(go.Group, go.Panel.Auto,
                {
                    name: 'null',
                    background: 'transparent',
                    mouseEnter: Savanna.process.utils.GroupEventHandlers.onMouseEnter,
                    mouseLeave: Savanna.process.utils.GroupEventHandlers.onMouseLeave,
                    // highlight when dragging into the Group
                    mouseDragEnter: Savanna.process.utils.GroupEventHandlers.onMouseDragEnter,
                    mouseDragLeave: Savanna.process.utils.GroupEventHandlers.onMouseDragLeave,
                    computesBoundsAfterDrag: true,
                    // when the selection is dropped into a Group, add the selected Parts into that Group;
                    // if it fails, cancel the tool, rolling back any changes
                    mouseDrop: Savanna.process.utils.GroupEventHandlers.onNodeGroupMouseDrop,
                    memberValidation: Savanna.process.utils.GroupEventHandlers.memberValidation,
                    // define the group's internal layout
                    layout: gmake(StepLayout),
                    // the group begins unexpanded;
                    isSubGraphExpanded: false
                }, new go.Binding('isSubGraphExpanded', 'isSubGraphExpanded').makeTwoWay(),
                gmake(go.Shape, 'RoundedRectangle', { fill: null, name:'BACKGROUND', stroke: 'black'}),
                gmake(go.Panel, go.Panel.Vertical,
                    { defaultAlignment: go.Spot.Center },
                    gmake(go.Panel, go.Panel.Horizontal,
                        { defaultAlignment: go.Spot.Top, stretch: go.GraphObject.Horizontal, background: 'transparent' },
                        // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                        gmake('SubGraphExpanderButton'),
                        gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay())
                    ),
                    // create a placeholder to represent the area where the contents of the group are
                    gmake(go.Placeholder, { padding: new go.Margin(0, 10) }),
                    gmake(go.Panel, go.Panel.Horizontal,
                        { defaultAlignment: go.Spot.Center, opacity: 0.0, name: 'BUTTONS'},
                        gmake(go.TextBlock, '+Result', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addFinalResult)),
                        gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addStep)),
                        gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addDecision))
                    )
                )  // end Vertical Panel
            )
        );  // end Group

        // define the Actions Group template
        groupTemplateMap.add('InternalGroup',
            gmake(go.Group, go.Panel.Auto,
                {
                    name: '#88FFFF',
                    background: 'transparent',
                    computesBoundsAfterDrag: true,
                    mouseEnter: Savanna.process.utils.GroupEventHandlers.onMouseEnter,
                    mouseLeave: Savanna.process.utils.GroupEventHandlers.onMouseLeave,
                    // highlight when dragging into the Group
                    mouseDragEnter: Savanna.process.utils.GroupEventHandlers.onMouseDragEnter,
                    mouseDragLeave: Savanna.process.utils.GroupEventHandlers.onMouseDragLeave,
                    // when the selection is dropped into a Group, add the selected Parts into that Group;
                    // if it fails, cancel the tool, rolling back any changes
                    mouseDrop: Savanna.process.utils.GroupEventHandlers.onActionGroupMouseDrop,
                    memberValidation: Savanna.process.utils.GroupEventHandlers.actionsGroupMemberValidation,
                    // define the group's internal layout
                    layout: gmake(go.GridLayout,
                                  { wrappingWidth: Infinity, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }),
                    // the group begins expanded
                    isSubGraphExpanded: true,
                    wasSubGraphExpanded: true
                },
                gmake(go.Shape, 'RoundedRectangle', { fill: '#88FFFF', name:'BACKGROUND', stroke: null}),
                gmake(go.Placeholder, { padding: new go.Margin(16, 16) }),
                {
                    selectionAdornmentTemplate:
                        gmake(go.Adornment, go.Panel.Spot,
                            gmake(go.Panel, go.Panel.Auto,
                                gmake(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
                                gmake(go.Placeholder)
                            ),
                            this.makeAdornment(go.Spot.Left, new go.Point(0, 0), 180, Savanna.process.utils.ProcessUtils.addParticipant, "\uf116", "Participants", new go.Point(2, 38)),
                            this.makeAdornment(go.Spot.Top, new go.Point(0, 0), 270, Savanna.process.utils.ProcessUtils.addInput, "\uf124", "Inputs", new go.Point(14, 4)),
                            this.makeAdornment(go.Spot.Right, new go.Point(24, 0), 0, Savanna.process.utils.ProcessUtils.addByproduct, "\uf13d", "Byproducts", new go.Point(2, 38)),
                            this.makeAdornment(go.Spot.Bottom, new go.Point(0, 24), 90, Savanna.process.utils.ProcessUtils.addResult, "\uf16d", "Results", new go.Point(12, 38))
                        )  // end Adornment
                }
            )
        );  // end Actions Group

        return groupTemplateMap;
    }

});