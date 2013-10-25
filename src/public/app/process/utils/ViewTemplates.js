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

        return go.GraphObject.make(go.Shape, this.styler.topPort().shape
        );
    },

    makeLinkGadget: function () {

        return go.GraphObject.make(go.Panel, this.styler.linkGadget().panel,
            go.GraphObject.make(go.Shape, this.styler.linkGadget().shape
            )
        );
    },

    makeStepGadget: function () {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Auto, this.styler.stepGadget({"click":Savanna.process.utils.ProcessUtils.addStep}).panel,
            gmake(go.Shape, this.styler.stepGadget().circle
            ),
            gmake(go.Shape, this.styler.stepGadget().plusLine )
        );
    },

    makeDecisionGadget: function () {
        var gmake = go.GraphObject.make;
        return gmake(go.Panel, go.Panel.Auto, this.styler.decisionGadget({"click":Savanna.process.utils.ProcessUtils.addDecision}).panel,
            gmake(go.Shape, this.styler.decisionGadget().diamond
            ),
            gmake(go.Shape, this.styler.decisionGadget().plusLine)
        );
    },

    generateNodeTemplateMap: function() {
        var gmake = go.GraphObject.make;
        var nodeTemplateMap = new go.Map();

                // define the Node templates for regular nodes

        nodeTemplateMap.add('ProcessItem',
            gmake(go.Node, go.Panel.Spot, Savanna.process.utils.ViewTemplates.nodeStyle(), {toLinkable:true},
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                gmake(go.Panel, go.Panel.Horizontal,
                    gmake(go.Shape, 'Rectangle', this.styler.rectangle().outline),
                    gmake(go.TextBlock, this.styler.rectangle().textblock , new go.Binding('text', 'text').makeTwoWay())
                ),
                  /*
                * Addition Start
                */
                    new go.Binding("background", "isSelected", function(sel) {
                      if (sel) return "#f2f2f2"; else return "transparent";
                    }).ofObject(""),
                 
                  {
        selectionAdornmentTemplate:
          gmake(go.Adornment, "Auto",
            gmake(go.Shape, "RoundedRectangle",
            this.styler.processModel().selectionAdornment),
            gmake(go.Placeholder)
          )  // end Adornment
      },
                  
                   /*
                * Addition END
                */
                
                this.makeTopPort(),
                this.makeLinkGadget(),
                this.makeStepGadget(),
                this.makeDecisionGadget()
            )
        );
        
        
         nodeTemplateMap.add('Start',
          gmake(go.Node, "Spot", Savanna.process.utils.ViewTemplates.nodeStyle(),
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            gmake(go.Panel, "Auto",
              gmake(go.Shape, "Circle",
                this.styler.start().outline),
              gmake(go.TextBlock, "Start",
                this.styler.start().textblock)
            )   ,   {
                
                /*
                * Addition Start
                */
                
        selectionAdornmentTemplate:
          gmake(go.Adornment, "Auto",
            gmake(go.Shape, "RoundedRectangle",
            this.styler.start().selectionAdornment),
            gmake(go.Placeholder)
          )  
                
                 /*
                * Addition End
                */
      },
               this.makeTopPort(),
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

        
         /*
                * Addition Start
                */
        nodeTemplateMap.add('DecisionPoint', // Category must match the uri type
            gmake(go.Node, go.Panel.Table, Savanna.process.utils.ViewTemplates.nodeStyle(), {toLinkable: true},
                       gmake(go.RowColumnDefinition, { column: 0, width: 150, minimum: 150, maximum: 150 }),
        gmake(go.RowColumnDefinition, { column: 1, width: 30, minimum: 30, maximum: 30 }),
        gmake(go.RowColumnDefinition, { column: 2, width: 150, minimum: 150, maximum: 150 }),
 
                  
        gmake(go.TextBlock, "",
          { row: 0, column: 0, margin: 0 }),
                  
                  
        gmake(go.Shape, 'Diamond',
          this.styler.diamond().outline),
                  
        gmake( go.TextBlock,this.styler.diamond().textblock, new go.Binding('text', 'text').makeTwoWay() 

             ),
          
            
                   {
                
               
                
        selectionAdornmentTemplate:
          gmake(go.Adornment, "Auto",
            gmake(go.Shape, "RoundedRectangle",
            this.styler.start().selectionAdornment),
            gmake(go.Placeholder)
          )  
                
                
      },
                  this.makeLinkGadget(),
                  this.makeStepGadget(),
                  this.makeDecisionGadget()
                                       
            
                        
                        
                        
                        
                       
                                 
                  
    
   
                
            )
                           
        );
        
         /*
                * Addition End
                */

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
                ), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler.linker().arrowheadProcess),
            gmake(go.Shape,
              this.styler.linker().arrowheadProcess)
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
                      this.styler.addTo('linker','linkpathTool', 'isPanelMain', true).linker().linkpathTool
                   ),
                gmake(go.Shape,  // the arrowhead
                      this.styler.linker().arrowheadTool
                    ), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler.linker().arrowheadTool),
            gmake(go.Shape,
              this.styler.linker().arrowheadTool)
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
                      this.styler.addTo('linker','linkpathInput', 'isPanelMain', true).linker().linkpathInput
                    ),
                gmake(go.Shape, "Circle", // the arrowhead
                    this.styler.linker().arrowheadInput), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler.linker().arrowheadInput),
            gmake(go.Shape,
              this.styler.linker().arrowheadInput)
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
                      this.styler.addTo('linker','linkpathByProduct', 'isPanelMain', true).linker().linkpathByProduct),
                gmake(go.Shape,  // the arrowhead
                      this.styler.linker().arrowheadByProduct
            ), {
                    
      /*
        * Addition Start
        */
        selectionAdornmentTemplate:
          gmake(go.Adornment,
            gmake(go.Shape,
              this.styler.linker().arrowheadByProduct),
            gmake(go.Shape,
              this.styler.linker().arrowheadByProduct)
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
            return gmake(go.Panel, go.Panel.Position, this.styler.adornments({"alignment":alignmentSpot}).panel
            ,
            gmake(go.Shape, 'HalfEllipse', 
                   
                  this.styler.adornments({"angle":gooAngle, "position":gooPoint, "mouseDrop": dropHandler}).HalfEllipse
            ),
            gmake(go.Panel, go.Panel.Position, this.styler.adornments({"click":clickHandler, "mouseDrop":dropHandler}).circlePanel,
                gmake(go.Shape, 'Circle', this.styler.adornments().circle
                ),
                gmake(go.TextBlock, glyph, this.styler.adornments().mainIcon ),
                gmake(go.TextBlock, '\uf100', this.styler.adornments().addIcon )
            ),
            gmake(go.TextBlock, labelStr, this.styler.adornments({"position":labelPoint}).label
                
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
                } },
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
                    name: 'null',
                    background: 'transparent',
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
                gmake(go.Shape, 'RoundedRectangle', this.styler.addTo('processModel', 'roundedRectangle', 'name', 'BACKGROUND').processModel().roundedRectangle,
                            
                      /*
                * Addition Start
                */
                      new go.Binding("fill", "isSelected", function(sel) {
                      if (sel) return "#f2f2f2"; else return "transparent";
                    }).ofObject(""),
                     
             
        
                      new go.Binding("stroke", "isSelected", function(sel) {
                      if (sel) return "#f2f2f2"; else return "black";
                    }).ofObject("")

                     
                      /*
                * Addition END
                */
                   
        
        
              
                     
                     
                     ), {
        selectionAdornmentTemplate:
          gmake(go.Adornment, "Auto",
            gmake(go.Shape, "RoundedRectangle",
            this.styler.processModel().selectionAdornment),
            gmake(go.Placeholder)
          )  // end Adornment
      },
                gmake(go.Panel, go.Panel.Vertical,
                    this.styler.processModel().panelVertical,
                    gmake(go.Panel, go.Panel.Horizontal,
                        this.styler.processModel().panelHorizontal,
                        // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                        gmake('PanelExpanderButton'),
                        gmake(go.TextBlock, this.styler.processModel().textblock, new go.Binding('text', 'text').makeTwoWay())
                    ),
                    // create a placeholder to represent the area where the contents of the group are
                    gmake(go.Placeholder, this.styler.processModel().placeholder),
                    gmake(go.Panel, this.styler.processModel().panelPlaceholder) 
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
                                  this.styler.internalGroup().gridLayout),
                    // the group begins expanded
                    isSubGraphExpanded: true,
                    wasSubGraphExpanded: true
                },
                gmake(go.Panel, go.Panel.Auto,
                    gmake(go.Shape, 'RoundedRectangle', this.styler.internalGroup().roundedRectangle),
                    gmake(go.Placeholder, this.styler.internalGroup({"mouseDrop":Savanna.process.utils.GroupEventHandlers.onActionGroupMouseDrop}).placeholder
                    )
                ),
                this.makeAdornment(go.Spot.Left, new go.Point(0, 0), 180, Savanna.process.utils.GroupEventHandlers.onParticipantMouseDrop, Savanna.process.utils.ProcessUtils.addParticipant, '\uf116', 'Participants', new go.Point(17, 58)),
                this.makeAdornment(go.Spot.Top, new go.Point(0, 0), 270, Savanna.process.utils.GroupEventHandlers.onInputMouseDrop, Savanna.process.utils.ProcessUtils.addInput, '\uf124', 'Inputs', new go.Point(27, 12)),
                this.makeAdornment(go.Spot.Right, new go.Point(36, 0), 0, Savanna.process.utils.GroupEventHandlers.onByproductMouseDrop, Savanna.process.utils.ProcessUtils.addByproduct, '\uf13d', 'By Products', new go.Point(17, 58)),
                this.makeAdornment(go.Spot.Bottom, new go.Point(0, 36), 90, Savanna.process.utils.GroupEventHandlers.onResultMouseDrop, Savanna.process.utils.ProcessUtils.addResult, '\uf16d', 'Results', new go.Point(25, 58))
            )
        );  // end Actions Group

        return groupTemplateMap;
    }

});
