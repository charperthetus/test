/* global Ext: false, go: false, Savanna: false */
Ext.define('Savanna.crumbnet.controller.CrumbnetController', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.crumbnet.view.CrumbnetComponent',
        'Savanna.crumbnet.view.part.PaletteMenu',
        'Savanna.crumbnet.view.part.Canvas'
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
            'go-graph button': {
                click: this.handleGraphToolbarButtonClick
            },
            'go-graph #layoutMenu menu':{
                click: this.handleLayoutMenuClick
            },
            'go-graph #alignmentMenu menu':{
                click: this.handleAlignmentMenuClick
            },
            'go-graph #linkStyleMenu menu': {
                click: this.handleLinkStyleMenuClick
            }
        });
    },

    // CUSTOM METHODS/CONFIGURATION

    handleGraphToolbarButtonClick: function(button) {
        var crumbnet = button.up('go-graph');
        var diagram = crumbnet.down('go-graph_canvas').diagram;

        switch (button.type) {
            case 'zoomIn':
                this.zoomIn(diagram);
                break;
            case 'zoomOut':
                this.zoomOut(diagram);
                break;
            case 'zoomToFit':
                diagram.zoomToFit();
                break;
            case 'undo':
                diagram.undoManager.undo();
                break;
            case 'redo':
                diagram.undoManager.redo();
                break;
            case 'grid':
                this.toggleGrid(diagram);
                break;
            case 'overview':
                var mainCrumbnetViewport = crumbnet.down('#mainCrumbnetViewport');
                this.toggleOverview(mainCrumbnetViewport, diagram);
                break;
            default:
                // NOTE: there is no "default" because we get clicks for other "buttons" (such as the dropdown menus)
                //       which we do not need to handle
                break;
        }
    },

    zoomIn: function(diagram) {
        this.zoomTo(diagram, 0.9);
    },

    zoomOut: function(diagram) {
        this.zoomTo(diagram, 1.1);
    },

    zoomTo: function(diagram, zoomRatio) {
        var viewBounds = diagram.viewportBounds.copy();
        var centerPoint = viewBounds.center.copy();

        viewBounds.width *= zoomRatio;
        viewBounds.height *= 1.1;
        viewBounds.center = centerPoint;

        diagram.zoomToRect(viewBounds);
    },

    toggleGrid: function(diagram) {
        var newSetting = !diagram.grid.visible;

        diagram.grid.visible = newSetting;
        diagram.toolManager.draggingTool.isGridSnapEnabled = newSetting;
        diagram.toolManager.resizingTool.isGridSnapEnabled = newSetting;

        //TODO - The diagram is not auto updating itself when I turn the grid on the first time.  It does once it has been shown once.
        diagram.update(); //this is not working - try something else
    },

    toggleOverview: function(mainCrumbnetViewport, diagram) {
        var overview = mainCrumbnetViewport.down('go-graph_overview');

        if (overview) {
            mainCrumbnetViewport.remove(overview);
        }
        else {
            overview = Ext.create('Savanna.crumbnet.view.part.Overview', {});
            overview.setDiagram(diagram);
            mainCrumbnetViewport.add(overview);
        }
    },

    handleLayoutMenuClick: function(menu, item) {
        var diagram = this.getDiagramForMenu(menu),
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

    handleAlignmentMenuClick: function(menu, item) {
        var diagram = this.getDiagramForMenu(menu),
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
                Ext.Error.notify('unknown type (' + item.type + ')');
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
                    iterator.value.category = item.type;
                }
            }
            // TODO: should this be rollbackTransaction if nothing is changed?
            diagram.commitTransaction('changeLinkStyle');
        }
        else {
            Ext.Error.raise('Unknown link style "' + item.type + '"');
        }
    },

    getDiagramForMenu: function(menu) {
        return menu.up('go-graph').down('go-graph_canvas').diagram;
    }
});