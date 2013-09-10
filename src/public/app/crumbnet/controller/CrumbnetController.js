/* global Ext: false, go: false, Savanna: false */
Ext.define('Savanna.crumbnet.controller.CrumbnetController', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.crumbnet.view.CrumbnetComponent',
        'Savanna.crumbnet.view.part.PaletteMenu',
        'Savanna.crumbnet.view.part.Canvas',
        'Savanna.view.PrintModal'
    ],

    stores: [
        'Savanna.crumbnet.store.Graph',
        'Savanna.crumbnet.store.Templates'
    ],

    refs: [
        {
            ref: 'canvas',
            selector: 'go-graph_canvas'
        }
    ],

    init: function() {
        this.control({
            'go-graph_canvas': {
                afterrender: this.setupImageDrop
            },
            'go-graph crumbnet_part_toolbar [type="save"]': {
                click: this.handleSave
            },
            'go-graph crumbnet_part_toolbar [type="saveAs"]': {
                click: this.handleSave
            },
            'go-graph crumbnet_part_toolbar [type="close"]': {
                click: this.handleClose
            },
            'go-graph crumbnet_part_toolbar [type="export"]': {
                click: this.handleExport
            },
            'go-graph crumbnet_part_toolbar [type="print"]': {
                click: this.handlePrint
            },
            'go-graph crumbnet_part_toolbar [type="undo"]': {
                click: this.handleUndo
            },
            'go-graph crumbnet_part_toolbar [type="redo"]': {
                click: this.handleRedo
            },
            'go-graph crumbnet_part_toolbar [type="zoomIn"]': {
                click: this.zoomIn
            },
            'go-graph crumbnet_part_toolbar [type="zoomOut"]': {
                click: this.zoomOut
            },
            'go-graph crumbnet_part_toolbar [type="zoomToFit"]': {
                click: this.zoomToFit
            },
            'go-graph crumbnet_part_toolbar [type="layoutMenu"] menu':{
                click: this.handleLayoutMenuClick
            },
            'go-graph crumbnet_part_toolbar [type="toggleGrid"]': {
                click: this.toggleGrid
            },
            'go-graph crumbnet_part_toolbar [type="toggleOverview"]': {
                click: this.toggleOverview
            },
            'go-graph crumbnet_part_toolbar [type="toggleLinkType"]': {
                click: this.toggleLinkType
            },
            'go-graph crumbnet_part_toolbar [type="toggleNodeType"]': {
                click: this.toggleNodeType
            },
            'go-graph crumbnet_part_toolbar [type="toggleNodeDescriptions"]': {
                click: this.toggleNodeDescriptions
            },
            'go-graph crumbnet_part_toolbar [type="snapToGrid"]': {
                click: this.handleSnapToGrid
            },
            'go-graph crumbnet_part_toolbar [type="gridSettings"]': {
                click: this.handleGridSettings
            },
            'go-graph crumbnet_part_toolbar [type="expandAllNodes"]': {
                click: this.handleExpandAllNodes
             },
            'go-graph crumbnet_part_toolbar [type="alignRight"]': {
                click: this.alignNodes
             },
            'go-graph crumbnet_part_toolbar [type="alignLeft"]': {
                click: this.alignNodes
            },
            'go-graph crumbnet_part_toolbar [type="alignTop"]': {
                click: this.alignNodes
            },
            'go-graph crumbnet_part_toolbar [type="alignBottom"]': {
                click: this.alignNodes
            },
            'go-graph crumbnet_part_toolbar [type="alignCenter"]': {
                click: this.alignNodes
            },
/*            'go-graph crumbnet_part_toolbar [type=""]': {
                click: this.
            },*/



            'go-graph button': {
                click: this.handleGraphToolbarButtonClick
            },
            'go-graph #cutCopyPaste menu': {
                click: this.handleCutCopyPaste
            },
            'go-graph #alignmentMenu menu':{
                click: this.handleAlignmentMenuClick
            },
            'go-graph #linkStyleMenu menu': {
                click: this.handleLinkStyleMenuClick
            },
            'go-graph #linkTypeMenu menu': {
                click: this.handleLinkTypeMenuClick
            },
            'go-graph #nodeColorPicker': {
                select: this.handleNodeColorSelect
            },
            'go-graph #search': {
                click: this.handleCrumbnetSearch
            },
            'crumbnet_part_palette-group': {
                'nodePaletteSelectionChanged': this.handlePaletteSelectionChange
            }
        });
    },

    // CUSTOM METHODS/CONFIGURATION

    setupImageDrop: function(canvasView) {
        if (typeof window.FileReader !== 'undefined') {
            var dropArea = canvasView.getEl().dom;

            dropArea.ondragover = function () {
                //TODO - check the type of thing dragged in to determine if it can be dropped
                //Note that false means it can be dropped
                return false;
            };

            dropArea.ondrop = Ext.bind(this.imageDropHandler, null, [canvasView.diagram], true);
        }
    },

    imageDropHandler: function(e, diagram) {
        e.preventDefault();
        //this context is the canvasView as defined in the listener above
        var file = e.dataTransfer.files[0],
            reader = new FileReader();

        reader.onload = function (event) {
            var screenPoint = new go.Point(e.layerX, e.layerY);
            var docPoint = diagram.transformViewToDoc(screenPoint);
            var newNode = {
                text: 'new image',
                category: 'image',
                key: Ext.id(), percent: 10,
                loc: docPoint.x + ' ' + docPoint.y,
                imageData: event.target.result
            };

            var model = diagram.model;
            diagram.startTransaction('addImage');
            model.addNodeData(newNode);
            diagram.commitTransaction('addImage');
        };

        reader.readAsDataURL(file);

        return false;
    },

    handleSave: function(menu) {
        var msg = '';

        switch (menu.type) {
            case 'save':
                msg = 'TODO: Implement "Save"';
                break;
            case 'saveAs':
                msg = 'TODO: Implement "Save As"';
                break;
            default:
                Ext.Error.raise({ msg: 'Unknown "type" (' + menu.type + ') for handleSave' });
                break;
        }

        this.showTODOmodal(msg);
    },

    handleClose: function(button, event) {
        this.showTODOmodal('Implement "Close"');
    },

    handleExport: function(button, event) {
        this.showTODOmodal('Implement "Export"');
    },

    handlePrint: function(button) {
        var diagram = this.getDiagramForComponent(button);

        Ext.create('Savanna.view.PrintModal', {
            html: diagram.makeImage({ scale: 0.5 })
        }).show();
    },

    handleUndo: function(button) {
        var diagram = this.getDiagramForComponent(button);
        diagram.undoManager.undo();
    },

    handleRedo: function(button) {
        var diagram = this.getDiagramForComponent(button);
        diagram.undoManager.redo();
    },

    zoomIn: function(button) {
        var diagram = this.getDiagramForComponent(button);
        this.zoomTo(diagram, 0.9);
    },

    zoomOut: function(button) {
        var diagram = this.getDiagramForComponent(button);
        this.zoomTo(diagram, 1.1);
    },

    zoomToFit: function(button) {
        var diagram = this.getDiagramForComponent(button);
        diagram.zoomToFit();
    },

    zoomTo: function(diagram, zoomRatio) {
        var viewBounds = diagram.viewportBounds.copy();
        var centerPoint = viewBounds.center.copy();

        viewBounds.width *= zoomRatio;
        viewBounds.height *= zoomRatio;
        viewBounds.center = centerPoint;

        diagram.zoomToRect(viewBounds);
    },

    handleLayoutMenuClick: function(menu, item) {
        var diagram = this.getDiagramForComponent(menu),
            layout = null;

        switch (item.type) {
            case 'tree':
                layout = go.GraphObject.make(go.TreeLayout,{ isOngoing: false });
                break;
            case 'grid':
                layout = go.GraphObject.make(go.GridLayout, { comparer: go.GridLayout.smartComparer, isOngoing: false });
                break;
            case 'force':
                layout = go.GraphObject.make(go.ForceDirectedLayout, { isOngoing: false });
                break;
            case 'circular':
                layout = go.GraphObject.make(go.CircularLayout, { isOngoing: false });
                break;
            case 'layeredDigraph':
                layout = go.GraphObject.make(go.LayeredDigraphLayout, { isOngoing: false, layerSpacing: 50 });
                break;
            default:
                Ext.Error.raise('unknown type (' + item.type + ')');
                break;
        }

        if (layout) {
            diagram.startTransaction('ChangeLayout');
            diagram.layout = layout;
            diagram.commitTransaction('ChangeLayout');
        }
    },

    toggleGrid: function(button) {
        var diagram = this.getDiagramForComponent(button),
            newSetting = !diagram.grid.visible;

        diagram.grid.visible = newSetting;
        diagram.toolManager.draggingTool.isGridSnapEnabled = newSetting;
        diagram.toolManager.resizingTool.isGridSnapEnabled = newSetting;

        //TODO - The diagram is not auto updating itself when I turn the grid on the first time.  It does once it has been shown once.
        diagram.update(); //this is not working - try something else
    },

    toggleOverview: function(button) {
        var mainCrumbnetViewport = button.up('go-graph'),
            overview = mainCrumbnetViewport.down('go-graph_overview'),
            diagram = mainCrumbnetViewport.down('go-graph_canvas').diagram;

        if (overview) {
            mainCrumbnetViewport.remove(overview);
        }
        else {
            overview = Ext.create('Savanna.crumbnet.view.part.Overview', {});
            overview.setDiagram(diagram);
            mainCrumbnetViewport.add(overview);
        }
    },

    toggleLinkType: function(button) {
        this.showTODOmodal('Implement toggle link type');
    },

    toggleNodeType: function(button) {
        this.showTODOmodal('Implement toggle node type');
    },

    toggleNodeDescriptions: function(button) {
        this.showTODOmodal('Implement toggle node descriptions');
    },

    handleSnapToGrid: function(button) {
        this.showTODOmodal('Implement snap to grid');
    },

    handleGridSettings: function(button) {
        this.showTODOmodal('Implement grid settings dialog');
    },

    handleExpandAllNodes: function(button) {
        this.showTODOmodal('Implement expand all nodes');
    },

    alignNodes: function(button) {
        this.showTODOmodal('Implement alignment for "' + button.type + '"');
    },


    handlePaletteSelectionChange: function(e, selPalette){
        var iterator = e.diagram.selection.iterator;

        //There should only ever be one selected node in the palette
        iterator.next();

        if (iterator.value){
            var mainView = selPalette.up('go-graph');
            var diagram = mainView.down('go-graph_canvas').diagram;

            diagram.toolManager.clickCreatingTool.archetypeNodeData = iterator.value.data;

            var palettes = mainView.query('crumbnet_part_palette-group');

            palettes.forEach(function(paletteView){
                if (selPalette !== paletteView){
                    paletteView.palette.clearSelection();
                }
            });
        }
    },

    handleGraphToolbarButtonClick: function(button) {
        var crumbnet = button.up('go-graph');
        var diagram = crumbnet.down('go-graph_canvas').diagram;

        switch (button.type) {
            case 'grid':
                this.toggleGrid(diagram);
                break;
            case 'overview':
                var mainCrumbnetViewport = crumbnet.down('#mainCrumbnetViewport');
                this.toggleOverview(mainCrumbnetViewport, diagram);
                break;
            default:
                console.log('handleGraphToolbarButtonClick', button.type);
                // NOTE: there is no "default" because we get clicks for other "buttons" (such as the dropdown menus)
                //       which we do not need to handle
                break;
        }
    },

    handleAlignmentMenuClick: function(menu, item) {
        var diagram = this.getDiagramForComponent(menu),
            align = null;

        switch (item.type) {
            case 'right':
                align = go.Spot.Right;
                break;
            case 'left':
                align = go.Spot.Left;
                break;
            case 'top':
                align = go.Spot.Top;
                break;
            case 'bottom':
                align = go.Spot.Bottom;
                break;
            case 'center':
                align = go.Spot.Center;
                break;
            default:
                Ext.Error.raise('unknown type (' + item.type + ')');
                break;
        }

        if (align) {
            diagram.startTransaction('ChangeAlignment');
            diagram.contentAlignment = align;
            diagram.contentAlignment = go.Spot.Default;
            diagram.commitTransaction('ChangeAlignment');
        }
    },

    handleLinkStyleMenuClick: function(menu, item) {
        var linkTemplateNames = Savanna.crumbnet.utils.ViewTemplates.getLinkTemplateNames();

        if (Ext.Array.contains(linkTemplateNames, item.type)) {
            var diagram = this.getDiagramForMenu(menu);
            var selectedNodeSet = diagram.selection;
            var iterator = selectedNodeSet.iterator;

            // TODO: some interaction details to iron out
            //        1) if no links are selected, should all link styles be changed?
            //        2) if there are nodes selected, should anything change?
            //        3) if nothing will happen, does anything need to be communicated to the user?
            diagram.startTransaction('changeLinkStyle');
            while (iterator.next()) {
                if (iterator.value instanceof go.Link) {
                    diagram.model.setDataProperty(iterator.value, 'category', item.type);
                }
            }
            // TODO: should this be rollbackTransaction if nothing is changed?
            diagram.commitTransaction('changeLinkStyle');
        }
        else {
            Ext.Error.raise('Unknown link style "' + item.type + '"');
        }
    },

    handleLinkTypeMenuClick: function(menu, item) {
        var linkRelationshipTypes = Savanna.crumbnet.utils.ViewTemplates.linkRelationshipTypes,
            diagram,
            selectionSet,
            iterator;

        if (Ext.Array.contains(linkRelationshipTypes, item.type)) {
            diagram = this.getDiagramForMenu(menu);
            selectionSet = diagram.selection;
            iterator = selectionSet.iterator;

            diagram.startTransaction('changeLinkType');
            while (iterator.next()) {
                if (iterator.value instanceof go.Link) {
                    diagram.model.setDataProperty(iterator.value.data, 'text', item.type);
                }
            }
            // TODO: should this be rollbackTransaction if nothing is changed?
            diagram.commitTransaction('changeLinkType');
        }
        else {
            Ext.Error.raise('Unknown link type "' + item.type + '"');
        }
    },

    handleNodeColorSelect: function(picker, selColor){
        var diagram = this.getDiagramForComponent(picker);
        var selectionSet = diagram.selection;
        var iterator = selectionSet.iterator;

        diagram.startTransaction('changeNodeColor');

        while (iterator.next()) {
            if (iterator.value instanceof go.Node) {
                diagram.model.setDataProperty(iterator.value.data, 'color', '#' + selColor);
            }
        }

        diagram.commitTransaction('changeNodeColor');
    },

    handleCutCopyPaste: function(menu, item) {
        var diagram = this.getDiagramForComponent(menu),
            commandHandler = diagram.commandHandler;

        switch (item.type) {
            case 'cut':
                commandHandler.cutSelection();
                break;
            case 'copy':
                commandHandler.copySelection();
                break;
            case 'paste':
                diagram.startTransaction('menuPaste');
                commandHandler.pasteFromClipboard();
                diagram.commitTransaction('menuPaste');
                break;
            default:
                Ext.Error.raise({ msg: 'Unknown "type" (' + item.type + ') for cutCopyPaste' });
                break;
        }
    },

    handleCrumbnetSearch: function(button) {
        this.showTODOmodal('Add functionality to search the crumbnet for "' + button.up('go-graph').down('#crumbnetSearchText').value + '"');
    },

    getDiagramForComponent: function(component) {
        return component.up('go-graph').down('go-graph_canvas').diagram;
    },

    showTODOmodal: function(msg) {
        Ext.create('Ext.window.Window', {
            modal: true,
            width: 500,
            height: 100,
            html: 'TODO: ' + msg
        }).show();
    }
});