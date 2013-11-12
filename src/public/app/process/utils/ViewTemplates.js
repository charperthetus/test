/* global Ext: false, go: false, Savanna: true, ExtendedLink: false */
Ext.define('Savanna.process.utils.ViewTemplates', {
    singleton: true,

    requires: [
        'Savanna.process.layout.StepLayout',
        'Savanna.process.utils.ProcessUtils',
        'Savanna.process.utils.Styler'
    ],

    styler: function () {
        return Savanna.process.utils.Styler;
    },

    utils: function () {
        return Savanna.process.utils.ProcessUtils;
    },

    //node event handlers
    onMouseEnter: function(e, obj) {
        this.utils().toggleGadgets(obj, true);
    },

    onMouseLeave: function(e, obj) {
        this.utils().toggleGadgets(obj, false);
    },

    onMouseEnterCG: function(e, obj) {
        this.utils().toggleGadgets(obj.containingGroup, true);
    },

    onMouseLeaveCG: function(e, obj) {
        this.utils().toggleGadgets(obj.containingGroup, false);
    },

    onNodeMouseDrop: function(e, obj, data) {
        this.utils().onNodeMouseDrop(obj, data, 'ProcessLink');
    },

    onNodeSelectionChange: function(obj) {
        this.utils().toggleGadgets(obj, false);
        this.utils().toggleBackground(obj);
    },

    makeTopPort: function () {
        return go.GraphObject.make(go.Shape, this.styler().topPort().shape);
    },

    makeStepGadget: function () {

        function makeStandardButton(s, c) {
            var gmake = go.GraphObject.make;

            var button =
                gmake(go.Panel, "Auto",
                    s.stepGadget(c).panel,
                    { isActionable: true },  // handle mouse events without involving other tools
                    gmake(go.Shape,  // the border
                        { name: "ButtonBorder",
                            figure: "Circle",
                            fill: '#3d8060',
                            stroke: null,
                            desiredSize: new go.Size(13, 13)
                        }),
                    gmake(go.Shape, 'PlusLine', {
                            desiredSize: new go.Size(7, 7),
                            fill: 'white',
                            stroke: 'white',
                            strokeWidth: 2
                        }
                    ),{
                        toolTip:  // define a tooltip for each node that displays the color as text
                          gmake(go.Adornment, "Auto",
                            gmake(go.Shape, { fill: "#454545", stroke: 0 }),
                            gmake(go.TextBlock, "Create a step", { margin: 4, stroke: 'white' },
                              new go.Binding("text", "color"))
                          )  // end of Adornment
                      }
                );

            button.mouseEnter = function (e, obj) {
                var shape = obj.elt(0);
                shape.fill = '#7cc19d';
                shape.stroke = null;
            };
            button.mouseLeave = function (e, obj) {
                var shape = obj.elt(0);
                shape.fill = '#3d8060';
                shape.stroke = null;
            };
            return button;
        }

        return makeStandardButton(this.styler(), {click: Ext.bind(this.utils().addStep, this.utils())});
    },

    makeDecisionGadget: function () {

        function makeStandardButton(s, c) {
            var gmake = go.GraphObject.make;

            var button =
                gmake(go.Panel, "Auto",
                    s.decisionGadget(c).panel,
                    { isActionable: true },  // handle mouse events without involving other tools
                    gmake(go.Shape,  // the border
                        { name: "ButtonBorder",
                            figure: "Diamond",
                            fill: '#f9aa41',
                            stroke: null,
                            desiredSize: new go.Size(13, 13)
                        }),
                    gmake(go.Shape, 'PlusLine', {
                            desiredSize: new go.Size(7, 7),
                            fill: 'white',
                            stroke: 'white',
                            strokeWidth: 2
                        }
                    ),{
                        toolTip:  // define a tooltip for each node that displays the color as text
                          gmake(go.Adornment, "Auto",
                            gmake(go.Shape, { fill: "#454545", stroke: 0 }),
                            gmake(go.TextBlock, "Create a branch point", { margin: 4, stroke: 'white' },
                              new go.Binding("text", "color"))
                          )  // end of Adornment
                      }
                );

            button.mouseEnter = function (e, obj) {
                var shape = obj.elt(0);
                shape.fill = '#f9ba6e';
                shape.stroke = null;
            };
            button.mouseLeave = function (e, obj) {
                var shape = obj.elt(0);
                shape.fill = '#f9aa41';
                shape.stroke = null;
            };
            return button;
        }

        return makeStandardButton(this.styler(), {click: Ext.bind(this.utils().addDecision, this.utils())});
    },

    // To simplify this code we define a function for creating a context menu button
    makeContextMenuItem: function (text, action, visiblePredicate) {    
        var gmake = go.GraphObject.make;
        
        if (visiblePredicate === undefined) visiblePredicate = function () {
            return true;
        };

      var buttonFillNormal = '#ffffff'
      var buttonStrokeNormal = "transparent";
      var buttonFillOver = '#ebf1f4'
      var buttonStrokeOver = "transparent";
    
      var button =
        gmake(go.Panel, "Auto",
          { isActionable: true },  // handle mouse events without involving other tools
          gmake(go.Shape,  // the border
            { name: "ContextMenuButton",
              figure: "Rectangle",
              desiredSize: new go.Size(118, 26),
              fill: buttonFillNormal,
              stroke: 'transparent',
             strokeWidth: 0
            }),
          gmake(go.Panel, "Auto", {padding: new go.Margin(2,2,2,10), alignment: go.Spot.Left},
          gmake(go.TextBlock, text)),{ click: action },
          new go.Binding("visible", "", visiblePredicate).ofObject()
        );
    
      button.mouseEnter = function(e, obj, prev) {
        var button = obj;
        var diagram = button.diagram;
        var shape = button.elt(0);
        shape.fill = buttonFillOver;
        shape.stroke = buttonStrokeOver;
      };
      button.mouseLeave = function(e, obj, next) {
        var button = obj;
        var diagram = button.diagram;
        var shape = button.elt(0);
        shape.fill = buttonFillNormal;
        shape.stroke = buttonStrokeNormal;
      };
      return button; 
    },

    // a context menu is an Adornment with a bunch of buttons in them
    makeContextMenu: function () {
        var gmake = go.GraphObject.make;
        return gmake(go.Adornment, "Vertical",  {background:'#333333', padding: new go.Margin(1) },
            this.makeContextMenuItem("Make Optional",
                function (e, obj) {  // the OBJ is this Button
                    var contextmenu = obj.part;  // the Button is in the context menu Adornment
                    
                    var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
                    // now can do something with PART, or with its data, or with the Adornment (the context menu)
                    Savanna.process.utils.ProcessUtils.toggleOptional(part.diagram);
                },
                function(contextmenu) {
                    var obj = contextmenu.adornedPart;
                    var dm = obj.diagram;
                    var firstObj = dm.selection.first();
                    var optional = !firstObj.data.isOptional;

                    return ((Savanna.process.utils.ProcessUtils.optionalCategories.indexOf(obj.category) >= 0) && (optional === true));
                }),
            this.makeContextMenuItem("Make Mandatory",
                function (e, obj) {  // the OBJ is this Button
                    var contextmenu = obj.part;  // the Button is in the context menu Adornment
                    
                    var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
                    // now can do something with PART, or with its data, or with the Adornment (the context menu)
                    Savanna.process.utils.ProcessUtils.toggleOptional(part.diagram);
                },
                function(contextmenu) {
                   var obj = contextmenu.adornedPart;
                   var dm = obj.diagram;
                   var firstObj = dm.selection.first();
                   var optional = !firstObj.data.isOptional;
                    
                   return ((Savanna.process.utils.ProcessUtils.optionalCategories.indexOf(obj.category) >= 0) && (optional === false));
                }),
            this.makeContextMenuItem("Add Alternates",
                function (e, obj) {
                    Savanna.process.utils.ProcessUtils.addAlts(obj.diagram);
                },
                function (contextmenu) {
                    var obj = contextmenu.adornedPart;
                    return (obj.category === 'ProcessItem');
                })
        );
    },

    generateItemNodeTemplate: function(itemTextEditor) {
        var gmake = go.GraphObject.make;
        var _this = this;
       // var forelayer = new go.Layer({name:"ForegroundText"});
        return gmake(go.Node, 'Auto', {
                // handle mouse enter/leave events to show/hide the gadgets
                mouseEnter: Ext.bind(this.onMouseEnter, this),
                //mouseLeave: Ext.bind(this.onMouseLeave, this),
                selectionChanged: Ext.bind(this.onNodeSelectionChange, this),
                defaultStretch: go.GraphObject.Horizontal,
                selectionObjectName: 'BODY',
                click: function (e, obj) {
                    obj.findObject("cubeNode").stroke = "transparent";
                    obj.findObject("cubeNode").strokeWidth = 0;
                },
                mouseOver: function(e, obj, n){
                  if ( obj.isSelected !== true ){
                            obj.findObject("cubeNode").stroke = "#63d9f5";
                            obj.findObject("cubeNode").strokeWidth = 2;
    
                            var me = obj;
                           
                            obj.mouseLeave = function(e, obj, n){
                                _this.utils().toggleGadgets(obj, false);
                                obj.findObject("cubeNode").stroke = "transparent";
                                obj.findObject("cubeNode").strokeWidth = 2;
                            }
                        }
                    }
            },
                     
            gmake(go.Panel, go.Panel.Vertical, {name:"MAIN"},
                gmake(go.Panel, go.Panel.Auto,
                gmake(go.Shape, "RoundedRectangle", {name:"cubeNode", stroke:'transparent', strokeWidth: 2, fill: 'transparent' }),
                gmake(go.Panel, go.Panel.Horizontal, {
                        name: 'BODY',
                        background: 'transparent'
                    },
                      
                    gmake(go.Panel, go.Panel.Auto, {portId: "", fromSpot: go.Spot.Right, toSpot: go.Spot.Left},
                           
                        gmake(go.Shape, 'Border', {
                            stroke: 'black',
                            strokeWidth: 1,
                            fill: 'white',
                            height: 32,
                            width: 32
                        }, new go.Binding('strokeDashArray', 'isOptional', function(isOptional) {
                            return isOptional? [8,8] : [];
                        })),
                        gmake(go.Shape, 'Cube1', this.styler().rectangle().outline, {
                            height: 20,
                            width: 20,
                            fill: 'white'
                        })
                    ),
                    gmake(go.TextBlock, this.styler().rectangle().textblock, {textEditor: itemTextEditor},
                        new go.Binding('text', 'label').makeTwoWay())
                    )
                ),
                gmake(go.Panel, go.Panel.Spot, {
                        name: "gadgetsMenu",
                        background: 'transparent',
                        padding: 2,
                        stretch: go.GraphObject.Fill
                    },
                    gmake(go.TextBlock, '', {alignment: new go.Spot(0, 0)}),
                    this.makeTopPort(),
                    this.makeStepGadget(),
                    this.makeDecisionGadget()
                )
            ), {
                selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                    gmake(go.Shape, 'RoundedRectangle',
                        this.styler().rectangle().selectionAdornment),
                    gmake(go.Placeholder)),
                contextMenu: this.makeContextMenu()
            }
        );
    },

    generateActionNodeTemplate: function(actionTextEditor) {
        var gmake = go.GraphObject.make;
        return  gmake(go.Node, go.Panel.Auto,
            gmake(go.Shape, 'Border', {
                stroke: null,
                fill: null,
                strokeWidth: 1
            }, new go.Binding('strokeDashArray', 'isOptional', function(isOptional) {
                return isOptional? [8,8] : [];
            }), new go.Binding('stroke', 'isOptional', function(isOptional) {
                return isOptional? 'black' : null;
            })),
            gmake(go.TextBlock, this.styler().circle().textblock, {textEditor: actionTextEditor},
                new go.Binding('text', 'label').makeTwoWay(), {
                    mouseEnter: function (e, obj) {
                        obj.isUnderline = true;
                    },
                    mouseLeave: function (e, obj) {
                        obj.isUnderline = false;
                    }
                }),
            {
                selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                    gmake(go.Shape, 'RoundedRectangle',
                        this.styler().start().selectionAdornment),
                    gmake(go.Placeholder)),
                contextMenu: this.makeContextMenu()
            }
        );
    },

    generateNodeTemplateMap: function () {
        var gmake = go.GraphObject.make;
        var nodeTemplateMap = new go.Map();

        // define the Node templates for regular nodes

        nodeTemplateMap.add('Start',
            gmake(go.Node, 'Vertical', {
                    // handle mouse enter/leave events to show/hide the gadgets
                    mouseEnter: Ext.bind(this.onMouseEnter, this),
                    mouseLeave: Ext.bind(this.onMouseLeave, this),
                    mouseDrop: Ext.bind(this.onNodeMouseDrop, this),
                    selectionChanged: Ext.bind(this.onNodeSelectionChange, this),
                    defaultStretch: go.GraphObject.Horizontal,
                    selectionObjectName: 'BODY'
                },
                gmake(go.Panel, go.Panel.Vertical,
                    gmake(go.Panel, go.Panel.Auto, {
                            name: 'BODY',
                            background: 'transparent'
                        },
                        gmake(go.Shape, 'Circle', this.styler().start().outline,{
                            name:"startShape",
                            
                            mouseEnter: function (e, obj) {
                                obj.fill = '#aee2c7';
                            },
                            mouseLeave: function (e, obj) {
                                if (obj.panel.part.isSelected === true) {
                                    obj.fill = '#4a966e';
                                } else {
                                    obj.fill = '#7cc19d';
                                }
                            }
                        },new go.Binding('fill', 'isSelected', function (sel) {
                            if (sel) return '#4a966e';
                            else return '#7cc19d';
                        }).ofObject('')),
                        gmake(go.TextBlock, 'Start', this.styler().start().textblock,{
                            mouseEnter: function (e, obj) {
                                obj.panel.findObject('startShape').fill = '#aee2c7';
                            },
                            mouseLeave: function (e, obj) {
                                if (obj.panel.part.isSelected === true) {
                                    obj.panel.findObject('startShape').fill = '#7cc19d';
                                } else {
                                    obj.panel.findObject('startShape').fill = '#4a966e';
                                }
                            }
                        })
                    ),
                    gmake(go.Panel, go.Panel.Spot, {
                            background: 'transparent',
                            padding: 2,
                            stretch: go.GraphObject.Fill
                        },
                        gmake(go.TextBlock, '', {
                            alignment: new go.Spot(0, 0)
                        }),
                        this.makeTopPort(),
                        this.makeStepGadget(),
                        this.makeDecisionGadget()
                    )
                ), {
                    selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                        gmake(go.Shape, 'RoundedRectangle',
                            this.styler().start().selectionAdornment),
                        gmake(go.Placeholder))
                }
            )
        );

        nodeTemplateMap.add('ProcessAction',
            gmake(go.Node, go.Panel.Spot,
                gmake(go.TextBlock, this.styler().circle().textblock, new go.Binding('text', 'label').makeTwoWay(), {
                    mouseEnter: function (e, obj) {
                        obj.isUnderline = true;
                    },
                    mouseLeave: function (e, obj) {
                        obj.isUnderline = false;
                    }
                }), {
                    selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                        gmake(go.Shape, 'RoundedRectangle',
                            this.styler().start().selectionAdornment),
                        gmake(go.Placeholder))
                }
            )
        );

        nodeTemplateMap.add('DecisionPoint',
            gmake(go.Node, 'Vertical', {
                    // handle mouse enter/leave events to show/hide the gadgets
                    mouseEnter: Ext.bind(this.onMouseEnter, this),
                    mouseLeave: Ext.bind(this.onMouseLeave, this),
                    selectionChanged: Ext.bind(this.onNodeSelectionChange, this),
                    defaultStretch: go.GraphObject.Horizontal,
                    selectionObjectName: 'BODY'
                },
                gmake(go.Panel, go.Panel.Vertical,
                    gmake(go.Panel, go.Panel.Horizontal, {
                            name: 'BODY',
                            background: 'transparent'
                        },
                        gmake(go.Panel, go.Panel.Auto,

                            gmake(go.Shape, 'Diamond',
                                this.styler().diamond().outline, {
                                    name:"diamondShape",
                                    mouseEnter: function (e, obj) {
                                        obj.fill = '#f9ba6e';
                                    },
                                    mouseLeave: function (e, obj) {
                                        if (obj.panel.part.isSelected === true) {
                                            obj.fill = '#fc9909';
                                        } else {
                                            obj.fill = '#f9aa41';
                                        }
                                    }
                                },new go.Binding('fill', 'isSelected', function (sel) {
                                    if (sel) return '#fc9909';
                                    else return '#f9aa41';
                                }).ofObject('')),
                            gmake(go.Shape, {
                                geometryString: 'F M21.782,242.258l0.19,0.19c1.384,1.379,3.814,1.251,7.422,0.854c3.619-0.401,62.49-3.916,68.005-4.607 c5.744-0.718,11.091-7.675-5.71-17.329c-4.577-2.63-9.153-5.132-13.454-7.411c19.256-16.701,47.641-46.353,66.482-88.362 c18.845,42.009,47.229,71.661,66.486,88.362c-4.301,2.279-8.878,4.781-13.457,7.411c-16.801,9.654-11.451,16.611-5.708,17.329 c5.512,0.691,64.386,4.206,68.003,4.607c3.61,0.398,6.038,0.525,7.421-0.854l0.19-0.19c1.384-1.38,1.263-3.805,0.875-7.419 c-0.384-3.615-3.681-62.506-4.351-68.021c-0.697-5.745-7.633-11.124-17.35,5.647c-2.734,4.722-5.335,9.444-7.695,13.864 c-25.556-21.474-74.621-72.985-74.831-151.737c0-0.168,0.01-0.333,0.01-0.503h-39.185c0,0.17,0.009,0.335,0.009,0.503 c-0.209,78.752-49.274,130.263-74.83,151.737c-2.359-4.42-4.964-9.143-7.695-13.864c-9.717-16.771-16.652-11.392-17.35-5.647 c-0.67,5.515-3.967,64.406-4.351,68.021C20.521,238.452,20.401,240.878,21.782,242.258z',
                                maxSize: new go.Size(16, 13),
                                minSize: new go.Size(16, 13),
                                fill: '#885613',
                                position: new go.Point(0, 0, 0, 0),
                                stroke: null,

                                margin: 0,
                                mouseEnter: function (e, obj) {
                                    obj.panel.findObject('diamondShape').fill = '#f9ba6e';
                                },
                                mouseLeave: function (e, obj) {
                                    if (obj.panel.part.isSelected === true) {
                                            obj.panel.findObject('diamondShape').fill = '#fc9909';
                                        } else {
                                            obj.panel.findObject('diamondShape').fill = '#f9aa41';
                                        }
                                }

                            })

                        ),
                        gmake(go.TextBlock, this.styler().rectangle().textblock,
                            new go.Binding('text', 'label').makeTwoWay())
                    ),
                    gmake(go.Panel, go.Panel.Spot, {
                            background: 'transparent',
                            padding: 2,
                            stretch: go.GraphObject.Fill
                        },
                        gmake(go.TextBlock, '', {alignment: new go.Spot(0, 0)}),
                        this.makeTopPort(),
                        this.makeStepGadget(),
                        this.makeDecisionGadget()
                    )
                ), {
                    selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                        gmake(go.Shape, 'RoundedRectangle',
                            this.styler().start().selectionAdornment),
                        gmake(go.Placeholder))
                }
            )
        );

        nodeTemplateMap.add('MergePoint',
            gmake(go.Node, 'Vertical', {
                    // handle mouse enter/leave events to show/hide the gadgets
                    mouseEnter: Ext.bind(this.onMouseEnter, this),
                    mouseLeave: Ext.bind(this.onMouseLeave, this),
                    mouseDrop: Ext.bind(this.onNodeMouseDrop, this),
                    selectionChanged: Ext.bind(this.onNodeSelectionChange, this),
                    defaultStretch: go.GraphObject.Horizontal,
                    selectionObjectName: 'BODY'
                },
                gmake(go.Panel, go.Panel.Vertical,
                    gmake(go.Panel, go.Panel.Auto, {
                            name: 'BODY',
                            background: 'transparent'
                        },
                        gmake(go.Shape, 'Diamond', this.styler().merge().outline)
                    ),
                    gmake(go.Panel, go.Panel.Spot, {
                            background: 'transparent',
                            padding: 2,
                            stretch: go.GraphObject.Fill
                        },
                        gmake(go.TextBlock, '', {
                            alignment: new go.Spot(0, 0)
                        }),
                        this.makeTopPort(),
                        this.makeStepGadget(),
                        this.makeDecisionGadget()
                    )
                ), {
                    selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                        gmake(go.Shape, 'RoundedRectangle',
                            this.styler().start().selectionAdornment),
                        gmake(go.Placeholder))
                }
            )
        );

        return nodeTemplateMap;
    },

    generateLinkTemplateMap: function () {
        var gmake = go.GraphObject.make;
        var linkTemplateMap = new go.Map();

        linkTemplateMap.add('ProcessLink',
            gmake(go.Link, {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false
                },
                gmake(go.Shape, // the link path shape
                    this.styler().addTo('linker', 'linkpathProcess', 'isPanelMain', true).linker().linkpathProcess),
                gmake(go.Shape, // the arrowhead
                    this.styler().linker().arrowheadProcess),
                gmake(go.Panel, go.Panel.Auto, {
                        visible: false,
                        name: 'LABEL'
                    },
                    new go.Binding('visible', 'visible').makeTwoWay(),
                    gmake(go.Shape, 'RoundedRectangle', this.styler().linker().roundedRectangle),
                    gmake(go.TextBlock, 'Choice', // the label
                        this.styler().linker().textblockProcess,
                        new go.Binding('text', 'label').makeTwoWay())
                ), {
                    selectionAdornmentTemplate: gmake(go.Adornment,
                        gmake(go.Shape, this.styler().linker().arrowheadProcess),
                        gmake(go.Shape, this.styler().linker().arrowheadProcess))

                }
            )
        );

        linkTemplateMap.add('OutputLink',
            gmake(go.Link, {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false
                },
                gmake(go.Shape, // the link path shape
                    this.styler().addTo('linker', 'linkpathProcess', 'isPanelMain', true).linker().linkpathProcess),
                gmake(go.Shape, // the arrowhead
                    this.styler().linker().arrowheadProcess),
                {
                    selectionAdornmentTemplate: gmake(go.Adornment,
                        gmake(go.Shape, this.styler().linker().arrowheadProcess),
                        gmake(go.Shape, this.styler().linker().arrowheadProcess))

                }
            )
        );

        linkTemplateMap.add('ToolLink',
            gmake(go.Link, {
                    routing: go.Link.Orthogonal,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false
                },
                gmake(go.Shape, // the link path shape
                    this.styler().addTo('linker', 'linkpathTool', 'isPanelMain', true).linker().linkpathTool),
                gmake(go.Shape, // the arrowhead
                    this.styler().linker().arrowheadTool),
                {
                    selectionAdornmentTemplate: gmake(go.Adornment,
                        gmake(go.Shape, this.styler().linker().arrowheadTool),
                        gmake(go.Shape, this.styler().linker().arrowheadTool))
                }
            )
        );

        linkTemplateMap.add('InputLink',
            gmake(go.Link, {
                    routing: go.Link.Orthogonal,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false
                },
                gmake(go.Shape, // the link path shape
                    this.styler().addTo('linker', 'linkpathInput', 'isPanelMain', true).linker().linkpathInput),
                gmake(go.Shape, // the arrowhead
                    this.styler().linker().arrowheadInput),
                {
                    selectionAdornmentTemplate: gmake(go.Adornment,
                        gmake(go.Shape, this.styler().linker().arrowheadInput),
                        gmake(go.Shape, this.styler().linker().arrowheadInput))
                }
            )
        );

        linkTemplateMap.add('ByproductLink',
            gmake(go.Link, {
                    routing: go.Link.Orthogonal,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    relinkableFrom: false,
                    relinkableTo: false,
                    reshapable: false
                },
                gmake(go.Shape, // the link path shape
                    this.styler().addTo('linker', 'linkpathByProduct', 'isPanelMain', true).linker().linkpathByProduct),
                gmake(go.Shape, // the arrowhead
                    this.styler().linker().arrowheadByProduct),
                {
                    selectionAdornmentTemplate: gmake(go.Adornment,
                        gmake(go.Shape, this.styler().linker().arrowheadByProduct),
                        gmake(go.Shape, this.styler().linker().arrowheadByProduct))
                }
            )
        );

        return linkTemplateMap;
    },

    makeAdornment: function (alignmentSpot, gooPoint, gooAngle, dropHandler, clickHandler, glyph, labelStr, labelPoint) {
        var gmake = go.GraphObject.make;

        return gmake(go.Panel, go.Panel.Position,
            this.styler().adornments({alignment: alignmentSpot}).panel,
            gmake(go.Shape, 'HalfEllipse',
                this.styler().adornments({
                    angle: gooAngle,
                    position: gooPoint,
                    mouseDrop: dropHandler
                }).HalfEllipse),
            gmake(go.Panel, go.Panel.Position, this.styler().adornments({
                click: clickHandler,
                mouseDrop: dropHandler
            }).circlePanel,
                gmake(go.Shape, 'Circle', this.styler().adornments().circle),
                gmake(go.Shape, glyph),
                gmake(go.Shape, {
                    geometryString: 'F M0,4 4,4 4,0 8,0 8,4 12,4 12,8 8,8 8,12 4,12 4,8 0,8z',
                    maxSize: new go.Size(12, 12),
                    minSize: new go.Size(12, 12),
                    fill: '#008bb9',
                    position: new go.Point(21, 0),
                    stroke: '#FFFFFF',
                    strokeWidth: 2
                })
            ),
            gmake(go.TextBlock, labelStr, this.styler().adornments({'position': labelPoint}).label)
        );
    },

    //group event handlers
    onGroupSelectionChange: function(obj) {
        this.utils().toggleGadgets(obj, false);
    },

    onStepMouseDrop: function(e, obj, data) {
        this.utils().onNodeMouseDrop(obj, data, 'OutputLink');
    },

    onParticipantMouseDrop:function(e, obj, data) {
        this.utils().onNodeMouseDrop(obj, data, 'ToolLink');
    },

    onInputMouseDrop:function(e, obj, data) {
        this.utils().onNodeMouseDrop(obj, data, 'InputLink');
    },

    onByproductMouseDrop:function(e, obj, data) {
        this.utils().onNodeMouseDrop(obj, data, 'ByproductLink');
    },

    onResultMouseDrop:function(e, obj, data) {
        var actionsGroup = obj.part;
        var stepGroup = actionsGroup ? actionsGroup.containingGroup : null;

        this.utils().onNodeMouseDrop(stepGroup, data, 'OutputLink');
    },

    onActionGroupMouseDrop: function (e, obj, data) {
        this.utils().onActionMouseDrop(obj, data);
    },

    onAltsMouseDrop: function (e, obj, data) {
        this.utils().onAltsMouseDrop(obj, data);
    },

    generateGroupTemplateMap: function () {
        var gmake = go.GraphObject.make;
        var groupTemplateMap = new go.Map();

        function makeStandardButton(btnType) {
            var gmake = go.GraphObject.make;
            var btnBinding = new go.Binding('figure', 'isSubGraphExpanded', function (exp, group) {
                var fig = null;
                var button = group.panel;
                if (button) fig = exp ? button['_subGraphExpandedFigure'] : button['_subGraphCollapsedFigure'];
                if (!fig) fig = exp ? 'MinusLine' : 'PlusLine';
                return fig;
            });

            var btnShape = undefined;
            if (btnType === "open") {
                btnShape = gmake(go.Shape, 'PlusLine', {
                        desiredSize: new go.Size(7, 7),
                        fill: 'white',
                        stroke: 'white',
                        strokeWidth: 2
                    },
                    // bind the Shape.figure to the Group.isSubGraphExpanded value using this converter:
                    btnBinding
                )
            } else {
                btnShape = gmake(go.Shape, 'MinusLine', {
                        desiredSize: new go.Size(7, 7),
                        fill: 'white',
                        stroke: 'white',
                        strokeWidth: 2
                    },
                    // bind the Shape.figure to the Group.isSubGraphExpanded value using this converter:
                    btnBinding
                )
            }
            
            var button =
                gmake(go.Panel, "Auto",
                    { isActionable: true },  // handle mouse events without involving other tools
                    gmake(go.Shape,  // the border
                        { name: "ButtonBorder",
                            figure: "Border",
                            fill: '#454545',
                            stroke: null,
                            desiredSize: new go.Size(13, 13)
                        }),
                   btnShape
                );

            // There's no GraphObject inside the button shape --
            // it must be added as part of the button definition.
            // This way the button object could be a TextBlock or a Shape or a Picture or whatever.

            button.click = function (e, obj) {
                var group = obj.part; // OBJ is this button
                if (!(group instanceof go.Group)) return;
                var diagram = group.diagram;
                if (diagram === null) return;
                e.handled = true;
                if (group.isSubGraphExpanded) {
                    diagram.commandHandler.collapseSubGraph(group);
                } else {
                    diagram.commandHandler.expandSubGraph(group);
                }
                group.isSelected = true;
            };
            // mouse-over behavior
            button.mouseEnter = function (e, obj) {
                var shape = obj.elt(0);
                shape.fill = '#666666';
                shape.stroke = null;
            };
            button.mouseLeave = function (e, obj) {
                var shape = obj.elt(0);
                shape.fill = '#454545';
                shape.stroke = null;
            };
            return button;
        }

        go.GraphObject.Builders.add('PanelExpanderButtonStartClosed', function () {
            return makeStandardButton("open")
        });
        go.GraphObject.Builders.add('PanelExpanderButtonStartOpen', function () {
            return makeStandardButton("close")
        });

        groupTemplateMap.add('ProcessModel',
            gmake(go.Group, go.Panel.Auto, {
                    defaultStretch: go.GraphObject.Horizontal,
                    selectionObjectName: 'BODY',
                    background: 'transparent',
                    mouseEnter: Ext.bind(this.onMouseEnter, this),
                    mouseLeave: Ext.bind(this.onMouseLeave, this),
                    selectionChanged: Ext.bind(this.onGroupSelectionChange, this),
                    mouseDrop: Ext.bind(this.onStepMouseDrop, this),
                    computesBoundsAfterDrag: true,
                    // define the group's internal layout


                    layout: gmake(StepLayout),
                    // the group begins unexpanded;
                    isSubGraphExpanded: false
                }, new go.Binding('isSubGraphExpanded', 'isSubGraphExpanded').makeTwoWay(),
                gmake(go.Panel, go.Panel.Vertical,
                    gmake(go.Panel, go.Panel.Auto, {
                            name: 'BODY',
                            background: 'transparent'
                        },
                        gmake(go.Shape, 'RoundedRectangle', this.styler().processModel().roundedRectangle
                            ,{
                                name: "processModelShape",
                                mouseOver: function(e, obj, n){

                                    if ( obj.panel.part.isSelected !== true ){
                                        obj.stroke = "#63d9f5";
                                        obj.strokeWidth = 2;

                                        var me = obj;

                                        obj.mouseLeave = function(e, obj, n){
                                            if ( me.panel.part.isSelected !== true ){
                                                me.stroke = "#999999";
                                                me.strokeWidth = 1;
                                            }
                                        }
                                    }
                                }
                            },

                            new go.Binding('strokeDashArray', 'isOptional', function(isOptional) {
                                return isOptional ? [8,8] : [];
                            }),
                            new go.Binding('stroke', 'isSelected', function (sel) {
                                if (sel) return 'transparent';
                                else return '#999999';
                            }).ofObject(''),
                            new go.Binding('strokeWidth', 'isSelected', function (sel) {
                                if (sel) return 0;
                                else return 1;
                            }).ofObject('')),
                        gmake(go.Panel, go.Panel.Vertical,{
                      
                                mouseOver: function(e, obj, n){

                                    if ( obj.panel.part.isSelected !== true ){
                                        obj.panel.findObject('processModelShape').stroke = "#63d9f5";
                                        obj.panel.findObject('processModelShape').strokeWidth = 2;

                                        var me = obj;

                                        obj.mouseLeave = function(e, obj, n){
                                            if ( me.panel.part.isSelected !== true ){
                                                me.panel.findObject('processModelShape').stroke = "#999999";
                                                me.panel.findObject('processModelShape').strokeWidth = 1;
                                            }
                                        }
                                    }
                                }
                            },
                            this.styler().processModel().panelVertical,
                            gmake(go.Panel, go.Panel.Horizontal,
                                this.styler().processModel().panelHorizontal,
                                // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                                gmake('PanelExpanderButtonStartOpen'),
                                gmake(go.TextBlock, this.styler().processModel().textblock, new go.Binding('text', 'label').makeTwoWay())),
                            // create a placeholder to represent the area where the contents of the group are
                            gmake(go.Placeholder, this.styler().processModel().placeholder,
                                new go.Binding('padding', 'isSubGraphExpanded', function (sel) {
                                    if (sel) return new go.Margin(20, 20, 20, 20);
                                    else return new go.Margin(0, 10);
                                }).ofObject('')
                            ),
                            gmake(go.Panel, this.styler().processModel().panelPlaceholder)
                        )
                    ),
                    gmake(go.Panel, go.Panel.Spot, {
                            background: 'transparent',
                            padding: 2,
                            stretch: go.GraphObject.Fill
                        },
                        gmake(go.TextBlock, '', {
                            alignment: new go.Spot(0, 0)
                        }),
                        this.makeTopPort(),
                        this.makeStepGadget(),
                        this.makeDecisionGadget()
                    )
                ), {
                    selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                        gmake(go.Shape, 'RoundedRectangle',
                            this.styler().processModel().selectionAdornment),
                        gmake(go.Placeholder)),
                    contextMenu: this.makeContextMenu()
                }
             )
        );

        // define the Actions Group template
        groupTemplateMap.add('InternalGroup',
            gmake(go.Group, go.Panel.Spot, {
                    background: 'transparent',
                    computesBoundsAfterDrag: true,
                    // define the group's internal layout
                    layout: gmake(go.GridLayout,
                        this.styler().internalGroup().gridLayout),
                    // the group begins expanded
                    isSubGraphExpanded: true,
                    wasSubGraphExpanded: true,
                    movable: false,
                    click: function (e, obj) {
                        obj.containingGroup.isSelected = true;
                    },
                    mouseOver: function(e, obj, n){
                        var me = obj.containingGroup.isSelected;
                        var r = obj.containingGroup.findObject('processModelShape'); //findObject

                        if (me !== true){
                            r.stroke = "#63d9f5";
                            r.strokeWidth = 2;

                            r.mouseLeave = function(e, obj, n){
                                if (me !== true){
                                    r.stroke = "#999999";
                                    r.strokeWidth = 1;
                                }
                            }
                        }
                    },
                    mouseEnter: Ext.bind(this.onMouseEnterCG, this),
                    mouseLeave: Ext.bind(this.onMouseLeaveCG, this),

                    selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                        gmake(go.Shape, 'RoundedRectangle',
                            this.styler().start().selectionAdornment),
                        gmake(go.Placeholder))
                },
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, 'RoundedRectangle', this.styler().internalGroup().roundedRectangle),
                    gmake(go.Placeholder, this.styler().internalGroup({
                        mouseDrop: Ext.bind(this.onActionGroupMouseDrop, this)
                    }).placeholder),
                    gmake(go.Shape, {
                        geometryString: 'F M16.5,9l-5,4v-2c-9,0-10-5-10-6c2,4,9,2,10,2V5L16.5,9z',
                        maxSize: new go.Size(60, 42),
                        minSize: new go.Size(60, 42),
                        fill: '#c5e9f2',
                        position: new go.Point(0, 0),
                        stroke: null
                    })),
                this.makeAdornment(go.Spot.Left, new go.Point(0, 3), 180,
                    Ext.bind(this.onParticipantMouseDrop, this), Ext.bind(this.utils().addParticipant, this.utils()), {
                        geometryString: 'F M16.554,15.638c-0.18,0.181-0.482,0.479-0.482,0.479s-0.301,0.3-0.483,0.48 c-0.181,0.179-0.766,0.193-0.962-0.004c-0.194-0.194-2.45-2.465-2.45-2.465l-0.48-0.483c0,0-0.781,0.179-0.961-0.003 c-0.18-0.182-0.3-0.301-0.3-0.301s-0.179-0.181,0.032-0.39c0.211-0.21,0.753-0.749,0.753-0.749l-1.928-1.94L8.198,11.35 c0.255,0.496,0.411,1.052,0.409,1.649c-0.006,2-1.631,3.614-3.631,3.61c-0.324-0.001-0.633-0.059-0.932-0.141l1.911-1.899 L5.51,12.457l-2.108-0.456l-1.906,1.895c-0.077-0.295-0.131-0.6-0.129-0.919C1.375,10.977,3,9.36,5,9.366 c0.665,0.003,1.279,0.196,1.814,0.51l1.055-1.048L4.479,5.417l-1.2-0.724L2.32,3.729L1.304,1.862l0.302-0.3l0.302-0.298L3.767,2.29 l0.96,0.965l0.717,1.203l3.389,3.411l1.059-1.052C9.581,6.28,9.391,5.665,9.393,5c0.006-2,1.631-3.615,3.631-3.609 c0.324,0.002,0.634,0.058,0.932,0.14l-1.911,1.9l0.445,2.11l2.108,0.457l1.906-1.895c0.077,0.296,0.131,0.602,0.129,0.92 c-0.006,2-1.631,3.616-3.631,3.61c-0.597-0.002-1.152-0.162-1.648-0.42l-1.096,1.09l1.929,1.941c0,0,0.543-0.54,0.753-0.751c0.212-0.208,0.391-0.028,0.391-0.028s0.121,0.12,0.3,0.303c0.18,0.18-0.003,0.961-0.003,0.961l0.479,0.482c0,0,2.256,2.269,2.451,2.466C16.752,14.873,16.734,15.458,16.554,15.638z',
                        minSize: new go.Size(14, 14),
                        maxSize: new go.Size(14, 14),
                        fill: '#3ca8c8',
                        position: new go.Point(8, 8),
                        stroke: null
                    }, 'Participants', new go.Point(17, 58)),
                this.makeAdornment(go.Spot.Top, new go.Point(5, 0), 270,
                    Ext.bind(this.onInputMouseDrop, this), Ext.bind(this.utils().addInput, this.utils()), {
                        geometryString: 'F M7,5V3h4v2H7z M11,9V6H7v3H11z M13,9H5l4,6L13,9z',
                        maxSize: new go.Size(13, 17),
                        minSize: new go.Size(13, 17),
                        fill: '#3ca8c8',
                        position: new go.Point(10, 8),
                        stroke: null
                    } , 'Inputs', new go.Point(27, 12)),
                this.makeAdornment(go.Spot.Right, new go.Point(39, 4), 0,
                    Ext.bind(this.onByproductMouseDrop, this), Ext.bind(this.utils().addByproduct, this.utils()), {
                        geometryString: 'F M16.072,13.243 11.828,8.998 16.071,4.756 13.241,1.929 9,6.171 4.758,1.929 1.928,4.756 6.172,9 1.928,13.243 4.758,16.071 9,11.829 13.242,16.071z',
                        minSize: new go.Size(15, 15),
                        maxSize: new go.Size(15, 15),
                        fill: '#3ca8c8',
                        position: new go.Point(9, 9),
                        stroke: null
                    }, 'Byproducts', new go.Point(13, 58)),
                this.makeAdornment(go.Spot.Bottom, new go.Point(4, 39), 90,
                    Ext.bind(this.onResultMouseDrop, this), Ext.bind(this.utils().addResult, this.utils()), {
                        geometryString: 'F M7,5V3h4v2H7z M11,9V6H7v3H11z M13,9H5l4,6L13,9z',
                        maxSize: new go.Size(13, 17),
                        minSize: new go.Size(13, 17),
                        fill: '#3ca8c8',
                        position: new go.Point(10, 8),
                        stroke: null
                    }, 'Results', new go.Point(25, 58)
                )
            )
        ); // end Actions Group

        groupTemplateMap.add('AltsGroup',
            gmake(go.Group, go.Panel.Auto, {
                    background: 'transparent',
                    computesBoundsAfterDrag: true,
                    mouseEnter: Ext.bind(this.onMouseEnter, this),
                    mouseLeave: Ext.bind(this.onMouseLeave, this),
                    selectionChanged: Ext.bind(this.onGroupSelectionChange, this),
                    mouseDrop: Ext.bind(this.onAltsMouseDrop, this),
                    // define the group's internal layout
                    layout: gmake(go.GridLayout, this.styler().altsGroup().gridLayout),
                    // the group begins expanded
                    isSubGraphExpanded: true,
                    wasSubGraphExpanded: true,
                    selectionObjectName: 'BODY',
                    mouseOver: function(e, obj, n){
                      if ( obj.isSelected !== true ){
                                    obj.findObject("altsGroup").stroke = "#63d9f5";
                                    obj.findObject("altsGroup").strokeWidth = 2;

                                    var me = obj;

                                    obj.mouseLeave = function(e, obj, n){
                                        if ( me.isSelected !== true ){
                                            me.findObject("altsGroup").stroke = "#999999";
                                            me.findObject("altsGroup").strokeWidth = 1;
                                        }
                                    }
                                }
                        }  
                }, new go.Binding('isSubGraphExpanded', 'isSubGraphExpanded').makeTwoWay(),
                gmake(go.Panel, go.Panel.Vertical,{name:"MAIN"},
                    gmake(go.Panel, go.Panel.Auto, {
                            name: 'BODY',
                            background: 'transparent'
                        
                        },
                        gmake(go.Shape, 'RoundedRectangle', this.styler().altsGroup().roundedRectangle,{
                             name:"altsGroup"
                        },
                            new go.Binding('stroke', 'isSelected', function (sel) {
                                if (sel) return 'transparent';
                                else return '#999999';
                            }).ofObject(''),
                            new go.Binding('strokeWidth', 'isSelected', function (sel) {
                                if (sel) return 0;
                                else return 1;
                            }).ofObject('') ),
                        gmake(go.Panel, go.Panel.Vertical,
                            gmake(go.Panel, go.Panel.Horizontal,
                                this.styler().processModel().panelHorizontal,
                                // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                                gmake('PanelExpanderButtonStartOpen'),
                                gmake(go.TextBlock, this.styler().altsGroup().textblock, new go.Binding('text', 'label').makeTwoWay())
                            ),
                            gmake(go.Placeholder, this.styler().altsGroup().placeholder
                            ), new go.Binding('padding', 'isSubGraphExpanded', function (sel) {
                                if (sel) return new go.Margin(5, 5, 5, 5);
                                else return new go.Margin(5, 5, 5, 5);
                            }).ofObject(''))
                    ),
                    gmake(go.Panel, go.Panel.Spot, {
                        name: "gadgetsMenu",
                            background: 'transparent',
                            padding: 2,
                            stretch: go.GraphObject.Fill
                        },
                        gmake(go.TextBlock, '', {
                            alignment: new go.Spot(0, 0)
                        }),
                        this.makeTopPort(),
                        this.makeStepGadget(),
                        this.makeDecisionGadget()
                    )
                ), {
                    selectionAdornmentTemplate: gmake(go.Adornment, 'Auto',
                        gmake(go.Shape, 'RoundedRectangle',
                            this.styler().processModel().selectionAdornment),
                        gmake(go.Placeholder))
                }
            )
        ); // end AltsGroup

        return groupTemplateMap;
    }

});