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

    }

});