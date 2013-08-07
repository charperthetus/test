/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 8/7/13
 * Time: 10:08 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.crumbnet.view.part.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.crumbnet_part_toolbar',

    width: '100%',

    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        var linkTemplateNames = Savanna.crumbnet.utils.ViewTemplates.getLinkTemplateNames();
        var linkStyleMenuChoices = Ext.Array.map(linkTemplateNames, function maplLinkTemplateNames(item) {
            return { type: item, text: item };
        });

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
            { xtype: 'tbfill', },
            // TODO: this needs to be converted to use glyphs instead of icons...
            { type: 'zoomIn', icon:'resources/images/zoom_in.png', tooltip: 'Zoom In' },
            { type: 'zoomOut', icon:'resources/images/zoom_out.png', tooltip: 'Zoom Out' },
            { type: 'zoomToFit', icon:'resources/images/show_all.png', tooltip: 'Zoom To Fit' },
            { type: 'undo', icon:'resources/images/undo.png', tooltip: 'Undo' },
            { type: 'redo', icon:'resources/images/redo.png', tooltip: 'Redo' },
            { type: 'grid', icon:'resources/images/gridview.png', tooltip: 'Toggle Grid' },
            { type: 'overview', icon:'resources/images/globe.png', tooltip: 'Toggle Overview' }
        ];
    }
});