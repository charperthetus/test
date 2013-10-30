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

    styler: function() {
        return Savanna.process.utils.Styler;
    },

    nodeStyle: function () {
        return {
            // handle mouse enter/leave events to show/hide the gadgets
            mouseEnter: Savanna.process.utils.NodeEventHandlers.onMouseEnter,
            mouseLeave: Savanna.process.utils.NodeEventHandlers.onMouseLeave,
            mouseDrop: Savanna.process.utils.NodeEventHandlers.onMouseDrop,
            selectionChanged: Savanna.process.utils.NodeEventHandlers.onSelectionChange
        };
    },

    makeTopPort: function () {

        return go.GraphObject.make(go.Shape, this.styler().topPort().shape
        );
    },

    makeStepGadget: function () {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Auto, this.styler().stepGadget({"click":Savanna.process.utils.ProcessUtils.addStep}).panel,
            gmake(go.Shape, this.styler().stepGadget().circle, {
                     mouseEnter: function(e, obj){
            obj.fill = '#7cc19d';
                        },
                    mouseLeave: function(e, obj){
            obj.fill = '#3d8060';
                        }
            }
                       
            ),
            gmake(go.Shape, this.styler().stepGadget().plusLine )
        );
    },

    makeDecisionGadget: function () {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Auto, this.styler().decisionGadget({"click":Savanna.process.utils.ProcessUtils.addDecision}).panel,
            gmake(go.Shape, this.styler().decisionGadget().diamond,
                  {
                     mouseEnter: function(e, obj){
            obj.fill = '#f9ba6e';
                        },
                    mouseLeave: function(e, obj){
            obj.fill = '#f9aa41';
                        }
                  }
            ),
            gmake(go.Shape, this.styler().decisionGadget().plusLine)
            
        );
    },

 /*   generateNodeTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var nodeTemplateMap = new go.Map();
        console.log(go.Group);

                // define the Node templates for regular nodes

        nodeTemplateMap.add('ProcessItem',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(), {selectionObjectName: 'BODY'},
                  
                  
                  
                  gmake(go.Panel, go.Panel.Vertical, 
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal, {name: 'BODY', background:'red'},
                    gmake(go.Shape, 'Rectangle', this.styler().rectangle().outline),
                    gmake(go.TextBlock, this.styler().rectangle().textblock, new go.Binding('text', 'text').makeTwoWay())
                ),
                        gmake(go.Panel, go.Panel.Horizontal, {name: 'BODY', background:'green', width: 100 },
                this.makeTopPort(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
                              )
                       ),
                {
                    selectionAdornmentTemplate: gmake(go.Adornment, "Auto",
                        gmake(go.Shape, "RoundedRectangle",
                            this.styler().processModel().selectionAdornment),
                        gmake(go.Placeholder)
                    )  // end Adornment
                }
                  
            )
                            
                            
                            
        ); */
    
    
 
   generateNodeTemplateMap: function() {
         var gmake = go.GraphObject.make;
         var nodeTemplateMap = new go.Map();

                 // define the Node templates for regular nodes
         nodeTemplateMap.add('ProcessItem',
             gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(), {selectionObjectName: 'BODY'},

                 // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal, {name: 'BODY'},
                     gmake(go.Shape, 'Rectangle', this.styler().rectangle().outline),
                     gmake(go.TextBlock, this.styler().rectangle().textblock, new go.Binding('text', 'text').makeTwoWay())
                 ),

                 {
                     selectionAdornmentTemplate: gmake(go.Adornment, "Auto",
                         gmake(go.Shape, "RoundedRectangle",
                             this.styler().processModel().selectionAdornment),
                         gmake(go.Placeholder)
                     )  // end Adornment
                },
               this.makeTopPort(),
                this.makeStepGadget(),
               this.makeDecisionGadget()
               
             )
        );



        nodeTemplateMap.add('Start',
          gmake(go.Node, "Spot", Savanna.process.utils.ViewTemplates.nodeStyle(),
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            gmake(go.Panel, "Auto",
              gmake(go.Shape, "Circle",
                this.styler().start().outline),
              gmake(go.TextBlock, "Start",
                this.styler().start().textblock)
            )   ,   {
                
                /*
                * Addition Start
                */
                
        selectionAdornmentTemplate:
          gmake(go.Adornment, "Auto",
            gmake(go.Shape, "RoundedRectangle",
            this.styler().start().selectionAdornment),
            gmake(go.Placeholder)
          )  
                
                 /*
                * Addition End
                */
      },
               this.makeTopPort(),
                 this.makeStepGadget(),
                 this.makeDecisionGadget()
             )
         );
    
    
        
                  
                  
                
                        

        nodeTemplateMap.add('ProcessAction',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.TextBlock, this.styler().circle().textblock, new go.Binding('text', 'text').makeTwoWay(), {
                    mouseEnter: function(e, obj){ obj.isUnderline = true; },
                    mouseLeave: function(e, obj){ obj.isUnderline = false; } 
             
            }),   {
                
                /*
                * Addition Start
                */
                
        selectionAdornmentTemplate:
          gmake(go.Adornment, "Auto",
            gmake(go.Shape, "RoundedRectangle",
            this.styler().start().selectionAdornment),
            gmake(go.Placeholder)
          )  
                
                 /*
                * Addition End
                */
      }
            )
        );

        
         /*
                * Addition Start
                */
        nodeTemplateMap.add('DecisionPoint', // Category must match the uri type
            gmake(go.Node, go.Panel.Table, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.RowColumnDefinition, { column: 0, width: 150, minimum: 150, maximum: 150 }),
                gmake(go.RowColumnDefinition, { column: 1, width: 30, minimum: 30, maximum: 30 }),
                gmake(go.RowColumnDefinition, { column: 2, width: 150, minimum: 150, maximum: 150 }),
                gmake(go.TextBlock, "",
                    { row: 0, column: 0, margin: 0 }),
                gmake(go.Shape, 'Diamond',
                    this.styler().diamond().outline, {
                     mouseEnter: function(e, obj){
            obj.fill = '#f9ba6e';
                        },
                    mouseLeave: function(e, obj){
            obj.fill = '#f9aa41';
                        }, 
                    click: function(e, obj){
          //  obj.fill = '#fc9909';
                        }
            }),
                gmake(go.TextBlock, this.styler().diamond().textblock, new go.Binding('text', 'text').makeTwoWay()),
                {
                    selectionAdornmentTemplate: gmake(go.Adornment, "Auto",
                        gmake(go.Shape, "RoundedRectangle",
                            this.styler().start().selectionAdornment),
                        gmake(go.Placeholder)
                    )
                },
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );
        

        /*
               * Addition End
               */

        nodeTemplateMap.add('End',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Shape, 'StopSign', this.styler().end().outline),
                gmake(go.TextBlock, 'End', this.styler().end().textblock),
                this.makeTopPort()
            )
        );

        nodeTemplateMap.add('MergePoint', // Category must match the uri type
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                gmake(go.Shape, 'Diamond', this.styler().diamond().outline, {
                     mouseEnter: function(e, obj){
            obj.fill = '#f9ba6e';
                        },
                    mouseLeave: function(e, obj){
            obj.fill = '#f9aa41';
                        }, 
                    click: function(e, obj){
          //  obj.fill = '#fc9909';
                        }
            }),
                gmake(go.Shape,
      { geometryString: "F M74.957,6.366l-0.053-0.053c-0.386-0.385-1.065-0.349-2.072-0.238c-1.01,0.112-17.445,1.093-18.985,1.286 c-1.604,0.2-3.096,2.143,1.594,4.838c1.278,0.734,2.555,1.433,3.756,2.069c-5.376,4.662-13.3,12.94-18.56,24.668 C35.376,27.208,27.452,18.93,22.076,14.268c1.201-0.636,2.478-1.335,3.757-2.069c4.69-2.695,3.197-4.637,1.594-4.838 C25.887,7.168,9.451,6.187,8.441,6.075C7.434,5.964,6.756,5.928,6.37,6.313L6.316,6.366C5.93,6.751,5.964,7.429,6.072,8.437 C6.18,9.447,7.1,25.887,7.287,27.427c0.195,1.604,2.131,3.105,4.844-1.576c0.763-1.318,1.49-2.637,2.148-3.871 c7.135,5.995,20.832,20.375,20.891,42.361c0,0.047-0.003,0.093-0.003,0.141h10.939c0-0.047-0.002-0.093-0.002-0.141 c0.058-21.985,13.756-36.366,20.89-42.361c0.659,1.234,1.386,2.552,2.148,3.871c2.713,4.682,4.649,3.18,4.844,1.576 c0.187-1.54,1.107-17.98,1.215-18.99C75.309,7.429,75.342,6.751,74.957,6.366z",
       maxSize: new go.Size(16, 13),
       minSize: new go.Size(16, 13),
       fill:'#885613', position: new go.Point(0, 0), stroke:null}),
                this.makeTopPort(),
                this.makeStepGadget(),
                this.makeDecisionGadget(),{
                    selectionAdornmentTemplate: gmake(go.Adornment, "Auto",
                        gmake(go.Shape, "RoundedRectangle",
                            this.styler().start().selectionAdornment),
                        gmake(go.Placeholder)
                    )
                }
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
                    gmake(go.Shape, 'Circle', this.styler().paletteCircle().outline),
                    gmake(go.TextBlock, this.styler().paletteCircle().textblock, new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('ProcessItem',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                    gmake(go.Shape, 'Rectangle', this.styler().paletteRectangle().outline),
                    gmake(go.TextBlock, this.styler().paletteRectangle().textblock, new go.Binding('text', 'text').makeTwoWay())
                )
            )
        );

        paletteTemplateMap.add('DecisionPoint',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(),
                    gmake(go.Panel, go.Panel.Vertical, { defaultAlignment: go.Spot.Center },
                        gmake(go.Shape, 'Diamond', this.styler().paletteDiamond().outline),
                        gmake(go.TextBlock, this.styler().paletteDiamond().textblock, new go.Binding('text', 'text').makeTwoWay())
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
                    this.styler().addTo('linker','linkpathProcess', 'isPanelMain', true).linker().linkpathProcess),
                gmake(go.Shape,  // the arrowhead
                    this.styler().linker().arrowheadProcess),
                  
                gmake(go.Panel, 'Auto',
                    { visible: false,
                        name: 'LABEL'},
                    new go.Binding('visible', 'visible').makeTwoWay(),
                    gmake(go.Shape, 'RoundedRectangle', this.styler().linker().roundedRectangle),
                    gmake(go.TextBlock, 'Choice',  // the label
                        this.styler().linker().textblockProcess,
                        new go.Binding('text', 'text').makeTwoWay())
                ), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler().linker().arrowheadProcess),
            gmake(go.Shape,
              this.styler().linker().arrowheadProcess)
          )  
                    
          /*
        * Addition End
        */
      }
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
                      this.styler().addTo('linker','linkpathTool', 'isPanelMain', true).linker().linkpathTool
                   ),
                gmake(go.Shape,  // the arrowhead
                      this.styler().linker().arrowheadTool
                    ), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler().linker().arrowheadTool),
            gmake(go.Shape,
              this.styler().linker().arrowheadTool)
          )  
                    
          /*
        * Addition End
        */
      }
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
                      this.styler().addTo('linker','linkpathInput', 'isPanelMain', true).linker().linkpathInput
                    ),
                gmake(go.Shape, "Circle", // the arrowhead
                    this.styler().linker().arrowheadInput), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler().linker().arrowheadInput),
            gmake(go.Shape,
              this.styler().linker().arrowheadInput)
          )  
                    
          /*
        * Addition End
        */
      }
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
                      this.styler().addTo('linker','linkpathByProduct', 'isPanelMain', true).linker().linkpathByProduct),
                gmake(go.Shape,  // the arrowhead
                      this.styler().linker().arrowheadByProduct
            ), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler().linker().arrowheadByProduct),
            gmake(go.Shape,
              this.styler().linker().arrowheadByProduct)
          )  
                    
          /*
        * Addition End
        */
      }
                 )
        );
        return linkTemplateMap;
    },

    makeAdornment: function(alignmentSpot, gooPoint, gooAngle, dropHandler, clickHandler, glyph, labelStr, labelPoint) {
        
        
          
                  
        
        var gmake = go.GraphObject.make;
            return gmake(go.Panel, go.Panel.Position, this.styler().adornments({"alignment":alignmentSpot}).panel
            ,
            gmake(go.Shape, 'HalfEllipse', 
                   
                  this.styler().adornments({"angle":gooAngle, "position":gooPoint, "mouseDrop": dropHandler}).HalfEllipse
            ),
            gmake(go.Panel, go.Panel.Position, this.styler().adornments({"click":clickHandler, "mouseDrop":dropHandler}).circlePanel,
                gmake(go.Shape, 'Circle', this.styler().adornments().circle
                ),
                  
           

                gmake(go.Shape, glyph ), 
                gmake(go.Shape,
     // { geometryString: "F M16,5 11,5 11,1 5,1 5,5 1,5 1,11 5,11 5,16 11,16 11,11 16,11z",
      { geometryString: "F M0,4 4,4 4,0 8,0 8,4 12,4 12,8 8,8 8,12 4,12 4,8 0,8z",
       maxSize: new go.Size(12, 12),
       minSize: new go.Size(12, 12),
       fill:'#008bb9', position: new go.Point(21, 0), stroke:'#FFFFFF', strokeWidth:2}) 
          
                  
            ),
            gmake(go.TextBlock, labelStr, this.styler().adornments({"position":labelPoint}).label
            )
        );
    },

    generateGroupTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var groupTemplateMap = new go.Map();

        /*
        * Addition Start
        */
      go.GraphObject.Builders.add("PanelExpanderButton", function() {
        return gmake("Button",
              { "ButtonBorder.stroke": null,
                "ButtonBorder.fill": "#454545",
                click: function(e, obj) {
                    
                    var group = obj.part;  // OBJ is this button
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
                }, 
                    mouseEnter: function(e, button) {
                    var buttonFillOver = '#666666';
                         var buttonStrokeOver = null;
                    
    var shape = button.elt(0);  // the border Shape
    var brush = button["_buttonFillOver"];
    if (brush === undefined) brush = buttonFillOver;
    button["_buttonFillNormal"] = shape.fill;
    shape.fill = brush;
    brush = button["_buttonStrokeOver"];
    if (brush === undefined) brush = buttonStrokeOver;
    button["_buttonStrokeNormal"] = shape.stroke;
    shape.stroke = brush;
                    
                   
                    },
                    mouseLeave: function(e, button) {
                        var buttonFillOver = '#666666';
                        var buttonStrokeOver = null;
    var shape = button.elt(0);  // the border Shape
    var brush = button["_buttonFillNormal"];
    if (brush === undefined) brush = buttonFillOver;
    shape.fill = brush;
    brush = button["_buttonStrokeNormal"];
    if (brush === undefined) brush = buttonStrokeOver;
    shape.stroke = brush;
                    
                    }
              
              },
              gmake(go.Shape, "PlusLine",
                { desiredSize: new go.Size(7, 7), fill:'white', stroke: 'white', strokeWidth: 2 },
                    // bind the Shape.figure to the Group.isSubGraphExpanded value using this converter:
                    new go.Binding("figure", "isSubGraphExpanded",
                      function(exp, group) {
                        var fig = null;
                        var button = group.panel;
                        if (button) fig = exp ? button["_subGraphExpandedFigure"] : button["_subGraphCollapsedFigure"];
                        if (!fig) fig = exp ? "MinusLine" : "PlusLine";
                        return fig;
                  }) ) )});

                /*
                * Addition End
                */

        // define the Step template
        groupTemplateMap.add('ProcessModel',
            gmake(go.Group, go.Panel.Auto,
                {
                    background: 'transparent',
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
                gmake(go.Shape, 'RoundedRectangle', this.styler().processModel().roundedRectangle,
                    //new go.Binding("fill", "isSelected", function (sel) {
                    //    if (sel) return "#f2f2f2"; else return "transparent";
                    //}).ofObject(""),
                    new go.Binding("stroke", "isSelected", function (sel) {
                        if (sel) return 'transparent'; else return "#999999";
                    }).ofObject("")
                ), {
                    selectionAdornmentTemplate: gmake(go.Adornment, "Auto",
                        gmake(go.Shape, "RoundedRectangle",
                            this.styler().processModel().selectionAdornment),
                        gmake(go.Placeholder)
                    )  // end Adornment
                },
                gmake(go.Panel, go.Panel.Vertical,
                    this.styler().processModel().panelVertical,
                    gmake(go.Panel, go.Panel.Horizontal,
                        this.styler().processModel().panelHorizontal,
                        // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                        gmake('PanelExpanderButton'),
                        gmake(go.TextBlock, this.styler().processModel().textblock, new go.Binding('text', 'text').makeTwoWay())
                    ),
                    // create a placeholder to represent the area where the contents of the group are
                    gmake(go.Placeholder, this.styler().processModel().placeholder,
                         
                          //padding: new go.Margin(20, 20, 20 , 20)
                           new go.Binding("padding", "isSubGraphExpanded", function (sel) {
                                if (sel) return new go.Margin(20, 20, 20 , 20); else return new go.Margin(0, 10);
                            }).ofObject("")
                         
                         ),
                    gmake(go.Panel, this.styler().processModel().panelPlaceholder)
                ),  // end Vertical Panel
                this.makeTopPort(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );  // end Group
        
        


        // define the Actions Group template
        groupTemplateMap.add('InternalGroup',
            gmake(go.Group, go.Panel.Spot,
                {
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
                                  this.styler().internalGroup().gridLayout),
                    // the group begins expanded
                    isSubGraphExpanded: true,
                    wasSubGraphExpanded: true, 
                    click: function(e, obj){
                        obj.containingGroup.isSelected = true;                 
                       
                    },
                    selectionAdornmentTemplate:
                          gmake(go.Adornment, "Auto",
            gmake(go.Shape, "RoundedRectangle",
            this.styler().start().selectionAdornment),
            gmake(go.Placeholder)
          )   
                },
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, 'RoundedRectangle', this.styler().internalGroup().roundedRectangle),
                    gmake(go.Placeholder, this.styler().internalGroup({"mouseDrop":Savanna.process.utils.GroupEventHandlers.onActionGroupMouseDrop}).placeholder
                    ),
                      gmake(go.Shape,
      { geometryString: "F M16.5,9l-5,4v-2c-9,0-10-5-10-6c2,4,9,2,10,2V5L16.5,9z",
       maxSize: new go.Size(60, 42),
       minSize: new go.Size(60, 42),
       fill:'#c5e9f2', position: new go.Point(0, 0), stroke:null}) 
                ),
                this.makeAdornment(go.Spot.Left, new go.Point(0, 0), 180, Savanna.process.utils.GroupEventHandlers.onParticipantMouseDrop, Savanna.process.utils.ProcessUtils.addParticipant, 
                                   
                                   { geometryString: "F M16.554,15.638c-0.18,0.181-0.482,0.479-0.482,0.479s-0.301,0.3-0.483,0.48 c-0.181,0.179-0.766,0.193-0.962-0.004c-0.194-0.194-2.45-2.465-2.45-2.465l-0.48-0.483c0,0-0.781,0.179-0.961-0.003 c-0.18-0.182-0.3-0.301-0.3-0.301s-0.179-0.181,0.032-0.39c0.211-0.21,0.753-0.749,0.753-0.749l-1.928-1.94L8.198,11.35 c0.255,0.496,0.411,1.052,0.409,1.649c-0.006,2-1.631,3.614-3.631,3.61c-0.324-0.001-0.633-0.059-0.932-0.141l1.911-1.899 L5.51,12.457l-2.108-0.456l-1.906,1.895c-0.077-0.295-0.131-0.6-0.129-0.919C1.375,10.977,3,9.36,5,9.366 c0.665,0.003,1.279,0.196,1.814,0.51l1.055-1.048L4.479,5.417l-1.2-0.724L2.32,3.729L1.304,1.862l0.302-0.3l0.302-0.298L3.767,2.29 l0.96,0.965l0.717,1.203l3.389,3.411l1.059-1.052C9.581,6.28,9.391,5.665,9.393,5c0.006-2,1.631-3.615,3.631-3.609 c0.324,0.002,0.634,0.058,0.932,0.14l-1.911,1.9l0.445,2.11l2.108,0.457l1.906-1.895c0.077,0.296,0.131,0.602,0.129,0.92 c-0.006,2-1.631,3.616-3.631,3.61c-0.597-0.002-1.152-0.162-1.648-0.42l-1.096,1.09l1.929,1.941c0,0,0.543-0.54,0.753-0.751c0.212-0.208,0.391-0.028,0.391-0.028s0.121,0.12,0.3,0.303c0.18,0.18-0.003,0.961-0.003,0.961l0.479,0.482c0,0,2.256,2.269,2.451,2.466C16.752,14.873,16.734,15.458,16.554,15.638z",
       minSize: new go.Size(14, 14),
       maxSize: new go.Size(14, 14),
       fill:'#3ca8c8', position: new go.Point(8, 8), stroke:null}
                                   
                                   
                                   
                                   , 'Participants', new go.Point(17, 58)),
                this.makeAdornment(go.Spot.Top, new go.Point(0, 0), 270, Savanna.process.utils.GroupEventHandlers.onInputMouseDrop, Savanna.process.utils.ProcessUtils.addInput, 
                                   
                                   
                                   { geometryString: "F M7,5V3h4v2H7z M11,9V6H7v3H11z M13,9H5l4,6L13,9z",
       maxSize: new go.Size(13, 17),
       minSize: new go.Size(13, 17),
       fill:'#3ca8c8', position: new go.Point(10, 8), stroke:null}
                                   
                                   , 'Inputs', new go.Point(27, 12)),
                this.makeAdornment(go.Spot.Right, new go.Point(36, 0), 0, Savanna.process.utils.GroupEventHandlers.onByproductMouseDrop, Savanna.process.utils.ProcessUtils.addByproduct, 
                                   
                                   { geometryString: "F M16.072,13.243 11.828,8.998 16.071,4.756 13.241,1.929 9,6.171 4.758,1.929 1.928,4.756 6.172,9 1.928,13.243 4.758,16.071 9,11.829 13.242,16.071z",
       minSize: new go.Size(15, 15),
       maxSize: new go.Size(15, 15),
       fill:'#3ca8c8', position: new go.Point(9, 9), stroke:null}
                                   
                                   , 'Byproducts', new go.Point(17, 58)),
                this.makeAdornment(go.Spot.Bottom, new go.Point(0, 36), 90, Savanna.process.utils.GroupEventHandlers.onResultMouseDrop, Savanna.process.utils.ProcessUtils.addResult, 
                                   
                                   
                                   { geometryString: "F M7,5V3h4v2H7z M11,9V6H7v3H11z M13,9H5l4,6L13,9z",
       maxSize: new go.Size(13, 17),
       minSize: new go.Size(13, 17),
       fill:'#3ca8c8', position: new go.Point(10, 8), stroke:null}
                                   , 'Results', new go.Point(25, 58)) 
            )
        );  // end Actions Group

        groupTemplateMap.add('AltsGroup',
            gmake(go.Group, go.Panel.Auto,
                {
                    background: 'transparent',
                    computesBoundsAfterDrag: true,
                    mouseEnter: Savanna.process.utils.GroupEventHandlers.onMouseEnter,
                    mouseLeave: Savanna.process.utils.GroupEventHandlers.onMouseLeave,
                    // highlight when dragging into the Group
                    mouseDragEnter: Savanna.process.utils.GroupEventHandlers.onMouseDragEnter,
                    mouseDragLeave: Savanna.process.utils.GroupEventHandlers.onMouseDragLeave,
                    memberValidation: Savanna.process.utils.GroupEventHandlers.altsGroupMemberValidation,
                    // define the group's internal layout
                    layout: gmake(go.GridLayout, this.styler().altsGroup().gridLayout),
                    // the group begins expanded
                    isSubGraphExpanded: true,
                    wasSubGraphExpanded: true
                },
                gmake(go.Shape, 'RoundedRectangle', this.styler().altsGroup().roundedRectangle),
                gmake(go.Panel, go.Panel.Vertical,
                    gmake(go.Panel, go.Panel.Horizontal,
                        this.styler().processModel().panelHorizontal,
                        // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                        gmake('PanelExpanderButton'),
                        gmake(go.TextBlock, this.styler().altsGroup().textblock, new go.Binding('text', 'text').makeTwoWay())
                    ),
                    gmake(go.Placeholder, this.styler().altsGroup({"mouseDrop":Savanna.process.utils.GroupEventHandlers.onActionGroupMouseDrop}).placeholder
                    )
                ),
                this.makeTopPort(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );  // end AltsGroup

        return groupTemplateMap;
    }

});
