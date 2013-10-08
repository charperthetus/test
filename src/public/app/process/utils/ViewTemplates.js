/* global Ext: false, go: false, Savanna: true, ExtendedLink: false */
Ext.define('Savanna.process.utils.ViewTemplates', {
    singleton: true,

    requires: [
        'Ext.ComponentQuery',
        'Savanna.process.utils.NodeEventHandlers'
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

    nodeTextStyle: function() {
        return {
            font: '10pt Helvetica, Arial, sans-serif',
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


    toggleButtons: function(obj, show) {
        var panel = obj.findObject('BUTTONS');
        if (panel) {
            panel.opacity = show ? 1.0 : 0.0;
        }
    },


    // this function is used to highlight a Group that the selection may be dropped into
    highlightGroup: function(group, show) {
        if (!group)
            return;
        var background = group.findObject('BACKGROUND');
        if (background) {
            if (show) {
                background.fill = group.canAddMembers(group.diagram.selection) ? '#00FF00' : this.stepColor;
            } else {
                background.fill = this.stepColor;
            }
        }
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

        nodeTemplateMap.add('FinalResult',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal,
                    gmake(go.Shape, 'Rectangle', { width: 24, height: 32, fill: Savanna.process.utils.ViewTemplates.mainColor, stroke: null }),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Left },
                        gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay()),
                        // define a Horizontal panel to place the node's three buttons side by side
                        gmake(go.Panel, go.Panel.Horizontal, {opacity: 0.0, name: 'BUTTONS'},
                            gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addStep)),
                            gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addDecision)),
                            gmake(go.TextBlock, '+End', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addEnd))
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
                                gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addStep)),
                                gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addDecision))
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
                        gmake(go.TextBlock, Savanna.process.utils.ViewTemplates.nodeTextStyle(), new go.Binding('text', 'text').makeTwoWay()),
                        // define a Horizontal panel to place the node's two buttons side by side
                        gmake(go.Panel, go.Panel.Horizontal, {opacity: 0.0, name: 'BUTTONS'},
                            gmake(go.TextBlock, '+Input', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addInput)),
                            gmake(go.TextBlock, '+Output', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addOutput))
                        )
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
                                gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addStep)),
                                gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addDecision))
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

        return linkTemplateMap;
    },

    generateGroupTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var groupTemplateMap = new go.Map();

        // define the Step template
        groupTemplateMap.add('Step',
            gmake(go.Group, go.Panel.Auto,
                {
                    background: 'transparent',
                    mouseEnter: function (e, obj) {
                        Savanna.process.utils.ViewTemplates.toggleButtons(obj, true);
                    },
                    mouseLeave: function (e, obj) {
                        Savanna.process.utils.ViewTemplates.toggleButtons(obj, false);
                    },
                    // highlight when dragging into the Group
                    mouseDragEnter: function (e, grp, prev) {
                        Savanna.process.utils.ViewTemplates.highlightGroup(grp, true);
                    },
                    mouseDragLeave: function (e, grp, next) {
                        Savanna.process.utils.ViewTemplates.highlightGroup(grp, false);
                    },
                    computesBoundsAfterDrag: false,
                    // when the selection is dropped into a Group, add the selected Parts into that Group;
                    // if it fails, cancel the tool, rolling back any changes
                    mouseDrop: function (e, grp) {
                        var ok = grp.addMembers(grp.diagram.selection, true);
                        if (ok) {
                            grp.expandSubGraph();
                        } else {
                            grp.diagram.currentTool.doCancel();
                        }
                    },
                    memberValidation: function(grp, part) {
                        if (part.category == 'Item' || part.category == 'Action') {
                            return true;
                        }
                    },
                    // define the group's internal layout
                    layout: gmake(go.LayeredDigraphLayout,
                            { direction: 90, columnSpacing: 10 }),
                    // the group begins unexpanded;
                    isSubGraphExpanded: false
                }, new go.Binding('isSubGraphExpanded', 'isSubGraphExpanded').makeTwoWay(),
                gmake(go.Shape, 'RoundedRectangle', { fill: Savanna.process.utils.ViewTemplates.stepColor, name:'BACKGROUND', stroke: null}),
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
                        gmake(go.TextBlock, '+Result', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addFinalResult)),
                        gmake(go.TextBlock, '+Step', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addStep)),
                        gmake(go.TextBlock, '+Decision', Savanna.process.utils.ViewTemplates.linkTextStyle(Savanna.process.utils.ViewTemplates.addDecision))
                    )
                )  // end Vertical Panel
            )
        );  // end Group

        return groupTemplateMap;
    },

    startTextEdit: function(diagram, nodeData) {
        diagram.clearSelection();
        var node = diagram.findNodeForData(nodeData);
        node.isSelected = true;
        diagram.commandHandler.editTextBlock(node.findObject('TEXT'));
    },

    addNode: function(obj, category, description, fromObj) {
        obj.diagram.startTransaction('addNode');
        var tobj = obj.panel.panel.part;
        var nodeData = {'category': category, 'text': description};
        if (tobj.data.group) {
            nodeData.group = tobj.data.group;
        }

        obj.diagram.model.addNodeData(nodeData);

        var linkData;
        if (fromObj) {
            linkData = { from: tobj.data.key, to: nodeData.key };
        } else {
            linkData = { from: nodeData.key, to: tobj.data.key };
        }
        if (tobj.category == 'Decision') {
            linkData.visible = true;
        }
        obj.diagram.model.addLinkData(linkData);
        obj.diagram.commitTransaction('addNode');
        Savanna.process.utils.ViewTemplates.startTextEdit(obj.diagram, nodeData);
    },

    addDecision: function(e, obj) {
        Savanna.process.utils.ViewTemplates.addNode(obj, 'Decision', 'Decision', true);
    },

    addInput: function(e, obj) {
        Savanna.process.utils.ViewTemplates.addNode(obj, 'Item', 'Input', false);
    },

    addOutput: function(e, obj) {
        Savanna.process.utils.ViewTemplates.addNode(obj, 'Item', 'Output', true);
    },

    addFinalResult: function(e, obj) {
        Savanna.process.utils.ViewTemplates.addNode(obj, 'FinalResult', 'Result', true);
    },

    addEnd: function(e, obj) {
        Savanna.process.utils.ViewTemplates.addNode(obj, 'End', 'End', true);
    },

    addStep: function(e, obj) {
        obj.diagram.startTransaction('addStep');
        var step = {'category': 'Step', 'text': 'Description', 'isGroup': true, 'isSubGraphExpanded': true};
        obj.diagram.model.addNodeData(step);
        var tobj = obj.panel.panel.part;
        var action = {'category': 'Action', 'text': 'Action', 'group': step.key};
        obj.diagram.model.addNodeData(action);

        newlink = { from: tobj.data.key, to: step.key };
        if (tobj.category == 'Decision') {
            newlink.visible = true;
        }
        obj.diagram.model.addLinkData(newlink);
        obj.diagram.commitTransaction('addStep');
        Savanna.process.utils.ViewTemplates.startTextEdit(obj.diagram, step);
    },

    // Show the diagram's model in JSON format that the user may have edited
    save: function(diagram, textarea) {
        var str = diagram.model.toJson();
        textarea.setValue(str);
    },

    load: function(diagram, textarea) {
       var str = textarea.value;
       diagram.model = go.Model.fromJson(str);
       diagram.undoManager.isEnabled = true;
    },

    clear: function(diagram, textarea) {
       var str = '{ "class": "go.GraphLinksModel", "nodeDataArray": [ {"key":-1, "category":"Start"} ], "linkDataArray": [ ]}';
       diagram.model = go.Model.fromJson(str);
       textarea.setValue(str);
       diagram.undoManager.isEnabled = true;
    }


});