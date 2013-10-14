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
        nodeTemplateMap.add('Item',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'Rectangle', { width: 24, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay())
                )
            ));

        nodeTemplateMap.add('Tool',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'HourGlass', { width: 24, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay())
                )
            ));

        nodeTemplateMap.add('Byproduct',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'Cloud', { width: 32, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay())
                )
            ));

        nodeTemplateMap.add('FinalResult',
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

        nodeTemplateMap.add('Action',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'Circle', { width: 32, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Left },
                        gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay())
                    )
                )
            )
        );

        nodeTemplateMap.add('Decision',
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

        paletteTemplateMap.add('Action',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                    gmake(go.Shape, 'Circle', { width: 16, height: 16, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(8), new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('Item',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                    gmake(go.Shape, 'Rectangle', { width: 12, height: 16, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(8), new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('Decision',
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

        linkTemplateMap.add('',
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

        linkTemplateMap.add('backLink',
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
                    { toArrow: 'none',
                        fromArrow: 'backward',
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

        return linkTemplateMap;
    },

    generateGroupTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var groupTemplateMap = new go.Map();

        // define the Step template
        groupTemplateMap.add('Step',
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
        groupTemplateMap.add('ActionsGroup',
            gmake(go.Group, go.Panel.Auto,
                {
                    name: '#88FFFF',
                    background: 'transparent',
                    mouseEnter: Savanna.process.utils.GroupEventHandlers.onMouseEnter,
                    mouseLeave: Savanna.process.utils.GroupEventHandlers.onMouseLeave,
                    // highlight when dragging into the Group
                    mouseDragEnter: Savanna.process.utils.GroupEventHandlers.onMouseDragEnter,
                    mouseDragLeave: Savanna.process.utils.GroupEventHandlers.onMouseDragLeave,
                    computesBoundsAfterDrag: false,
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
                gmake(go.Panel, go.Panel.Horizontal, {defaultAlignment: go.Spot.Top},
                    gmake(go.TextBlock, '+ Tools', {
                                angle: 270,
                                alignment: go.Spot.Center,
                                font: '9pt Helvetica, Arial, sans-serif',
                                stroke: 'blue',
                                isUnderline: true,
                                margin: 2,
                                editable: false,
                                click: Savanna.process.utils.ProcessUtils.addTool
                            }),

                    gmake(go.Panel, go.Panel.Vertical,
                        { defaultAlignment: go.Spot.Center },
                        gmake(go.TextBlock, '+ Items', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addInput)),
                        // create a placeholder to represent the area where the contents of the group are
                        gmake(go.Placeholder, { padding: new go.Margin(5, 5) }),
                        gmake(go.TextBlock, '+ Actions', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ProcessUtils.addAction))
                    ),  // end Vertical Panel

                    gmake(go.TextBlock, '+ Byproducts', {
                                angle: 270,
                                font: '9pt Helvetica, Arial, sans-serif',
                                stroke: 'blue',
                                isUnderline: true,
                                margin: 2,
                                editable: false,
                                click: Savanna.process.utils.ProcessUtils.addByproduct
                            })
                )
            )
        );  // end Actions Group

        return groupTemplateMap;
    }

});