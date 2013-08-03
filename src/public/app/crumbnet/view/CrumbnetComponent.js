Ext.define('Savanna.crumbnet.view.CrumbnetComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.go-graph',

    overview: null,
    requires: [
        'Ext.layout.container.Absolute',
        'Savanna.crumbnet.view.part.PaletteMenu',
        'Savanna.crumbnet.view.part.Canvas',
        'Savanna.crumbnet.view.part.Overview',
        'Savanna.crumbnet.utils.ViewTemplates'
    ],

    layout: {
        type: 'hbox'
    },

    tbar: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.tbar = this.setupTbar();

        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype: 'crumbnet_part_palette-menu',
                width: 100,
                height: '100%'
            },
            {
                xtype: 'panel',
                itemId: 'mainCrumbnetViewport',
                flex: 10,
                height: '100%',
                layout: {
                    type: 'absolute'
                },
                items:[
                    {
                        xtype: 'go-graph_canvas',
                        width: '100%',
                        height: '100%'
                    }
                    // NOTE: there is a dynamically added "go-graph_overview" component that is managed at runtime
                ]
            }
        ];
    },

    setupTbar: function() {
        var linkStyleMenuChoices = Ext.Array.map(Savanna.crumbnet.utils.ViewTemplates.getLinkTemplateNames(), function(item, index, array) {
            return { type: item, text: item };
        });

        console.log(linkStyleMenuChoices);

        return [
            {
                xtype: 'button',
                itemId: 'layoutMenu',
                text: 'Layout',
                menu: [{ type: 'grid', text: 'Grid' },
                    { type: 'tree', text: 'Tree' },
                    { type: 'force', text: 'Force' },
                    { type: 'layeredDigraph', text: 'Layered Digraph' },
                    { type: 'circular', text: 'Circular' }
                ]
            },
            {
                xtype: 'button',
                itemId: 'alignmentMenu',
                text: 'Alignment',
                menu: [{ type: 'right', text: 'Right' },
                    { type: 'left', text: 'Left' },
                    { type: 'top', text: 'Top' },
                    { type: 'bottom', text: 'Bottom' },
                    { type: 'center', text: 'Center' }
                ]
            },
            {
                xtype: 'button',
                itemId: 'linkStyleMenu',
                text: 'Link Style',
                menu: {
                    items: linkStyleMenuChoices
                }
            },
            '->',
            // TODO: this needs to be converted to use glyphs instead of icons...
            {type: 'zoomIn', icon:'resources/images/zoom_in.png', tooltip: 'Zoom In'},
            {type: 'zoomOut', icon:'resources/images/zoom_out.png', tooltip: 'Zoom Out'},
            {type: 'zoomToFit', icon:'resources/images/show_all.png', tooltip: 'Zoom To Fit'},
            {type: 'undo', icon:'resources/images/undo.png', tooltip: 'Undo'},
            {type: 'redo', icon:'resources/images/redo.png', tooltip: 'Redo'},
            {type: 'grid', icon:'resources/images/gridview.png', tooltip: 'Toggle Grid'},
            {type: 'overview', icon:'resources/images/globe.png', tooltip: 'Toggle Overview'}
        ];
    }

});