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
                    var diagram = button.up('go-graph').down('go-graph_canvas').diagram,
                        layout = null,
                        align = null;

                    switch (button.type) {
                        case 'tree':
                            layout = go.GraphObject.make(go.TreeLayout);
                            break;
                        case 'grid':
                            layout = go.GraphObject.make(go.GridLayout, { comparer: go.GridLayout.smartComparer });
                            break;
                        case 'force':
                            layout = go.GraphObject.make(go.ForceDirectedLayout);
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
                            layout = go.GraphObject.make(go.CircularLayout);
                            break;
                        case 'layeredDigraph':
                            layout = go.GraphObject.make(go.LayeredDigraphLayout);
                            break;
                        default:
                            console.error('unknown type (' + button.type + ')');
                            break;
                    }

                    if (layout) diagram.layout = layout;
                    if (align) {
                        diagram.contentAlignment = align;
                        diagram.contentAlignment = go.Spot.Default;
                    }
                }
            }
        });
    },

    // CUSTOM METHODS/CONFIGURATION

    DEFAULT_GRAPH_RECORD_ID: 'TEST_DATA_ID',

    registerGraphEventHandlers: function(canvasView) {
        for (var i = 0; i < Savanna.crumbnet.view.goGraph.Canvas.goChangeEvents.length; ++i) {
            var eventName = 'go.change.' + Savanna.crumbnet.view.goGraph.Canvas.goChangeEvents[i];
            canvasView.on(eventName, Ext.bind(this.handleCanvasChange, this, [eventName], true));
        }

        for (i = 0; i < Savanna.crumbnet.view.goGraph.Canvas.goDiagramEvents.length; ++i) {
            var eventName = Savanna.crumbnet.view.goGraph.Canvas.goDiagramEvents[i];
            canvasView.on(eventName, Ext.bind(this.handleCanvasDiagramChange, this, [eventName], true));
        }
    },

    handleCanvasChange: function(changedEvent, eventName) {
        //console.log('handleCanvasChange', eventName, changedEvent);
    },

    handleCanvasDiagramChange: function(diagramEvent, eventName) {
        //console.log('handleCanvasDiagramChange', eventName, diagramEvent);
    }
});