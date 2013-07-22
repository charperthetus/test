Ext.define('Savanna.crumbnet.controller.GoGraph', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.crumbnet.view.GoGraph',
        'Savanna.crumbnet.view.goGraph.Palette',
        'Savanna.crumbnet.view.goGraph.Canvas'
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
            'go-graph_canvas': {
                afterrender: this.registerGraphEventHandlers
            },
            'go-graph button': {
                click: function(button, evt) {
                    var diagram = button.up('go-graph').down('go-graph_canvas').diagram

                    switch (button.type) {
                        case 'zoomIn':
                            break;
                        case 'zoomOut':
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
                            var newSetting = !diagram.grid.visible;
                            diagram.grid.visible = newSetting;
                            diagram.toolManager.draggingTool.isGridSnapEnabled = newSetting;
                            diagram.toolManager.resizingTool.isGridSnapEnabled = newSetting;

                            //TODO - The diagram is not auto updating itself when I turn the grid on the first time.  It does once it has been shown once.
                            diagram.update(); //this is not working - try something else
                            break;
                        case 'overview':
                            break;
                    }
                }
            },
            'go-graph menu':{click:function(menu, item, event){
                console.log('clicked menu item', menu, item, event);

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
            }
        });
    },

    // CUSTOM METHODS/CONFIGURATION

    DEFAULT_GRAPH_RECORD_ID: 'TEST_DATA_ID',

    registerGraphEventHandlers: function(canvasView) {

    }

});