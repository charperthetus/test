Ext.define('Savanna.crumbnet.controller.CrumbnetController', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.crumbnet.view.CrumbnetComponent',
        'Savanna.crumbnet.view.part.PaletteMenu',
        'Savanna.crumbnet.view.part.Canvas'
    ],

    stores: [
        'Savanna.crumbnet.store.Graph'
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
            'go-graph menu':{
                click: this.handleGraphMenuClick
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

        viewBounds.width = viewBounds.width * zoomRatio;
        viewBounds.height = viewBounds.height * 1.1;
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

    handleGraphMenuClick: function(menu, item){
        var diagram = menu.up('go-graph').down('go-graph_canvas').diagram,
            layout = null,
            align = null;

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
            case 'circular':
                layout = go.GraphObject.make(go.CircularLayout, { isOngoing: false });
                break;
            case 'layeredDigraph':
                layout = go.GraphObject.make(go.LayeredDigraphLayout, { isOngoing: false, layerSpacing: 50 });
                break;
            default:
                console.error('unknown type (' + button.type + ')');
                break;
        }
        diagram.startTransaction('ChangeLayout');
        if (layout) diagram.layout = layout;
        if (align) {
            diagram.contentAlignment = align;
            diagram.contentAlignment = go.Spot.Default;
        }
        diagram.commitTransaction('ChangeLayout');
    }
});