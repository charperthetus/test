/* global Ext: false, go: false, Savanna: true, ExtendedLink: false */
Ext.define('Savanna.process.utils.ViewTemplates', {
    singleton: true,

    requires: [
        'Savanna.process.layout.StepLayout',
        'Savanna.process.utils.GroupEventHandlers',
        'Savanna.process.utils.NodeEventHandlers',
        'Savanna.process.utils.ProcessUtils',
        'Savanna.process.utils.Styler'
    ],
    
    styler: Ext.create('Savanna.process.utils.Styler'),

    nodeStyle:function(){
        return {
            // handle mouse enter/leave events to show/hide the gadgets
            mouseEnter: Savanna.process.utils.NodeEventHandlers.onMouseEnter,
            mouseLeave: Savanna.process.utils.NodeEventHandlers.onMouseLeave,
            mouseDrop: Savanna.process.utils.NodeEventHandlers.onMouseDrop,
            selectionChanged: Savanna.process.utils.NodeEventHandlers.onSelectionChange
        };
    },

    makeTopPort: function () {

        return go.GraphObject.make(go.Shape, {
                    alignment: go.Spot.Top,
                    desiredSize: new go.Size(0,0),
                    fromSpot: go.Spot.Bottom,
                    toSpot: go.Spot.Top,
                    toLinkable: true,
                    portId: "Top"
                }
        );
    },

    makeLinkGadget: function () {

        return go.GraphObject.make(go.Panel, {
                name: 'LinkGadget',
                opacity: 0.0,
                alignment: go.Spot.Bottom,
                alignmentFocus: go.Spot.Top
            },
            go.GraphObject.make(go.Shape, {
                    figure: 'TriangleDown',
                    stroke: 'black',
                    fill: 'blue',
                    desiredSize: new go.Size(10,10),
                    name: 'Port',
                    fromSpot: go.Spot.Bottom,
                    toSpot: go.Spot.Top,
                    fromLinkable: true,
                    portId: "Bottom"
                }
            )
        );
    },

    makeStepGadget: function () {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Auto, {
                name: 'StepGadget',
                opacity: 0.0,
                alignment: new go.Spot(0.5, 1.0, 12, 0),
                alignmentFocus: go.Spot.Top,
                click: Savanna.process.utils.ProcessUtils.addStep
            },
            gmake(go.Shape, {
                    figure: 'Circle',
                    stroke: 'black',
                    fill: 'green',
                    desiredSize: new go.Size(10,10)
                }
            ),
            gmake(go.Shape, { figure: 'ThickCross', stroke: null, fill: 'white', desiredSize: new go.Size(8,8) } )
        );
    },

    makeDecisionGadget: function () {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Auto, {
                name: 'DecisionGadget',
                opacity: 0.0,
                alignment: new go.Spot(0.5, 1.0, 25, -1),
                alignmentFocus: go.Spot.Top,
                click: Savanna.process.utils.ProcessUtils.addDecision
            },
            gmake(go.Shape, {
                    figure: 'Diamond',
                    stroke: 'black',
                    fill: 'green',
                    desiredSize: new go.Size(12,12)
                }
            ),
            gmake(go.Shape, { figure: 'ThickCross', stroke: null, fill: 'white', desiredSize: new go.Size(8,8) } )
        );
    },

    generateNodeTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var nodeTemplateMap = new go.Map();

                // define the Node templates for regular nodes

        nodeTemplateMap.add('ProcessItem',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(), {fromLinkable:null, toLinkable:true},
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal,
                    gmake(go.Shape, 'Rectangle', this.styler.rectangle().outline),
                    gmake(go.TextBlock, this.styler.rectangle().textblock , new go.Binding('text', 'text').makeTwoWay())
                ),
                this.makeTopPort(),
                this.makeLinkGadget(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );
        
        nodeTemplateMap.add('Start',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'Start', this.styler.start().outline),
                    gmake(go.TextBlock, 'Start', this.styler.start().textblock)
                ),
                this.makeLinkGadget(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );

        nodeTemplateMap.add('ProcessAction',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.TextBlock, this.styler.circle().textblock, new go.Binding('text', 'text').makeTwoWay())
            )
        );

        nodeTemplateMap.add('DecisionPoint', // Category must match the uri type
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(), {toLinkable: true},
                gmake(go.Panel, go.Panel.Horizontal, { defaultAlignment: go.Spot.Top },
                    gmake(go.Shape, 'Diamond', this.styler.diamond().outline),
                    gmake(go.TextBlock,this.styler.diamond().textblock, new go.Binding('text', 'text').makeTwoWay())
                ),
                this.makeTopPort(),
                this.makeLinkGadget(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );

        nodeTemplateMap.add('End',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Panel, go.Panel.Horizontal,
                    gmake(go.Shape, 'StopSign', this.styler.end().outline),
                    gmake(go.TextBlock, 'End', this.styler.end().textblock)
                ),
                this.makeTopPort()
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
                    gmake(go.Shape, 'Circle', this.styler.paletteCircle().outline),
                    gmake(go.TextBlock, this.styler.paletteCircle().textblock, new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('ProcessItem',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                    gmake(go.Shape, 'Rectangle', this.styler.paletteRectangle().outline),
                    gmake(go.TextBlock, this.styler.paletteRectangle().textblock, new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('DecisionPoint',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                        gmake(go.Shape, 'Diamond', this.styler.paletteDiamond().outline),
                        gmake(go.TextBlock, this.styler.paletteDiamond().textblock, new go.Binding('text', 'text').makeTwoWay())
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
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false },
                gmake(go.Shape,  // the link path shape
                    this.styler.addTo('linker','linkpathProcess', 'isPanelMain', true).linker().linkpathProcess),
                gmake(go.Shape,  // the arrowhead
                    this.styler.linker().arrowheadProcess),
                gmake(go.Panel, 'Auto',
                    { visible: false,
                        name: 'LABEL'},
                    new go.Binding('visible', 'visible').makeTwoWay(),
                    gmake(go.Shape, 'RoundedRectangle', this.styler.linker().roundedRectangle),
                    gmake(go.TextBlock, 'Choice',  // the label
                        this.styler.linker().textblockProcess,
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
                      this.styler.addTo('linker','linkpathTool', 'isPanelMain', true).linker().linkpathTool
                   ),
                gmake(go.Shape,  // the arrowhead
                      this.styler.linker().arrowheadTool
                    )
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
                      this.styler.addTo('linker','linkpathInput', 'isPanelMain', true).linker().linkpathInput
                    ),
                gmake(go.Shape,  // the arrowhead
                    { toArrow: 'none',
                        fromArrow: 'backward',
                        stroke: null,
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
                      this.styler.addTo('linker','linkpathByProduct', 'isPanelMain', true).linker().linkpathByProduct),
                gmake(go.Shape,  // the arrowhead
                      this.styler.linker().arrowheadByProduct
            )
                 )
        );
        return linkTemplateMap;
    },

    makeAdornment: function(alignmentSpot, gooPoint, gooAngle, dropHandler, clickHandler, glyph, labelStr, labelPoint) {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Position,
            {
                alignment: alignmentSpot,
                alignmentFocus: go.Spot.Center,
                width:72, height:72
            },
            gmake(go.Shape, 'HalfEllipse', {
                    background: 'transparent',
                    fill: null,
                    stroke: null,
                    angle: gooAngle,
                    width:36, height:72,
                    position: gooPoint,
                    isActionable: true,
                    mouseDragEnter: function(e, obj) {
                        obj.fill = 'lightblue';
                    },
                    mouseDragLeave: function(e, obj) {
                        obj.fill = null;
                    },
                    mouseDrop: dropHandler
                }
            ),
            gmake(go.Panel, go.Panel.Position, {
                    isActionable: true,
                    position: new go.Point(24, 24),
                    click: clickHandler,
                    actionDown: function(e, obj) {
                        obj.elt(0).fill = 'dodgerblue';
                    },
                    actionUp: function(e, obj) {
                        obj.elt(0).fill = 'lightblue';
                    },
                    mouseEnter: function(e, obj) {
                        obj.elt(0).fill = 'skyblue';
                    },
                    mouseLeave: function(e, obj) {
                        // should only change the hover color if we are moving outside, not if we are moving over the glyph
                        // todo: not yet sure how to implement this
                        obj.elt(0).fill = 'lightblue';
                    },
                    mouseDragEnter: function(e, obj) {
                        obj.elt(0).fill = 'skyblue';
                    },
                    mouseDragLeave: function(e, obj) {
                        obj.elt(0).fill = 'lightblue';
                    },
                    mouseDrop: dropHandler
                },
                gmake(go.Shape, 'Circle', {
                        fill: 'lightblue',
                        stroke: 'white',
                        strokeWidth:3,
                        width:24, height:24,
                        position: new go.Point(0, 0)
                    }
                ),
                gmake(go.TextBlock, glyph,{ font: '10pt SickFont', stroke: 'blue', position: new go.Point(6, 7) } ),
                gmake(go.TextBlock, '\uf100',{ font: '7pt SickFont', stroke: 'blue', position: new go.Point(18, 0) } )
            ),
            gmake(go.TextBlock, labelStr,
                { font: 'bold 6pt sans-serif', background: 'white', position: labelPoint }
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
                    fromLinkable: true,
                    toLinkable: true,
                    mouseEnter: Savanna.process.utils.GroupEventHandlers.onMouseEnter,
                    mouseLeave: Savanna.process.utils.GroupEventHandlers.onMouseLeave,
                    selectionChanged: Savanna.process.utils.GroupEventHandlers.onSelectionChange,
                    // highlight when dragging into the Group
                    mouseDragEnter: Savanna.process.utils.GroupEventHandlers.onMouseDragEnter,
                    mouseDragLeave: Savanna.process.utils.GroupEventHandlers.onMouseDragLeave,
                    mouseHold: Savanna.process.utils.GroupEventHandlers.onMouseHold,
                    computesBoundsAfterDrag: true,
                    // when the selection is dropped into a Group, add the selected Parts into that Group;
                    // if it fails, cancel the tool, rolling back any changes
                    memberValidation: Savanna.process.utils.GroupEventHandlers.memberValidation,
                    // define the group's internal layout
                    layout: gmake(StepLayout),
                    // the group begins unexpanded;
                    isSubGraphExpanded: false
                }, new go.Binding('isSubGraphExpanded', 'isSubGraphExpanded').makeTwoWay(),
                gmake(go.Shape, 'RoundedRectangle', this.styler.addTo('processModel', 'roundedRectangle', 'name', 'BACKGROUND').processModel().roundedRectangle),
                gmake(go.Panel, go.Panel.Vertical,
                    { defaultAlignment: go.Spot.Center },
                    gmake(go.Panel, go.Panel.Horizontal,
                        { defaultAlignment: go.Spot.Top, stretch: go.GraphObject.Horizontal, background: 'transparent' },
                        // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                        gmake('SubGraphExpanderButton'),
                        gmake(go.TextBlock, this.styler.processModel().textblock, new go.Binding('text', 'text').makeTwoWay())
                    ),
                    // create a placeholder to represent the area where the contents of the group are
                    gmake(go.Placeholder, { padding: new go.Margin(0, 10) }),
                    gmake(go.Panel, {desiredSize: new go.Size(10,10)})
                ),  // end Vertical Panel
                this.makeTopPort(),
                this.makeLinkGadget(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );  // end Group

        // define the Actions Group template
        groupTemplateMap.add('InternalGroup',
            gmake(go.Group, go.Panel.Spot,
                {
                    name: '#88FFFF',
                    background: 'transparent',
                    computesBoundsAfterDrag: true,
                    mouseEnter: Savanna.process.utils.GroupEventHandlers.onMouseEnter,
                    mouseLeave: Savanna.process.utils.GroupEventHandlers.onMouseLeave,
                    // highlight when dragging into the Group
                    mouseDragEnter: Savanna.process.utils.GroupEventHandlers.onMouseDragEnter,
                    mouseDragLeave: Savanna.process.utils.GroupEventHandlers.onMouseDragLeave,
                    memberValidation: Savanna.process.utils.GroupEventHandlers.actionsGroupMemberValidation,
                    // define the group's internal layout
                    layout: gmake(go.GridLayout,
                                  { wrappingWidth: 1, alignment: go.GridLayout.Position, cellSize: new go.Size(1, 1) }),
                    // the group begins expanded
                    isSubGraphExpanded: true,
                    wasSubGraphExpanded: true
                },
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, 'RoundedRectangle', { fill: '#88FFFF', name:'BACKGROUND', stroke: null}),
                    gmake(go.Placeholder, {
                            padding: new go.Margin(16, 16),
                            background: 'transparent',
                            mouseDragEnter: function(e, obj) {
                                obj.background = 'orange';
                            },
                            mouseDragLeave: function(e, obj) {
                                obj.background = 'transparent';
                            },
                            mouseDrop: Savanna.process.utils.GroupEventHandlers.onActionGroupMouseDrop
                        }
                    )
                ),
                this.makeAdornment(go.Spot.Left, new go.Point(0, 0), 180, Savanna.process.utils.GroupEventHandlers.onParticipantMouseDrop, Savanna.process.utils.ProcessUtils.addParticipant, '\uf116', 'Participants', new go.Point(14, 50)),
                this.makeAdornment(go.Spot.Top, new go.Point(0, 0), 270, Savanna.process.utils.GroupEventHandlers.onInputMouseDrop, Savanna.process.utils.ProcessUtils.addInput, '\uf124', 'Inputs', new go.Point(26, 15)),
                this.makeAdornment(go.Spot.Right, new go.Point(36, 0), 0, Savanna.process.utils.GroupEventHandlers.onByproductMouseDrop, Savanna.process.utils.ProcessUtils.addByproduct, '\uf13d', 'Byproducts', new go.Point(14, 50)),
                this.makeAdornment(go.Spot.Bottom, new go.Point(0, 36), 90, Savanna.process.utils.GroupEventHandlers.onResultMouseDrop, Savanna.process.utils.ProcessUtils.addResult, '\uf16d', 'Results', new go.Point(24, 50))
            )
        );  // end Actions Group

        return groupTemplateMap;
    }

});
