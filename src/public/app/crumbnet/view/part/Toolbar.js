/* global Ext: false, Savanna: false */
Ext.define('Savanna.crumbnet.view.part.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.crumbnet_part_toolbar',

    requires: [
        'Savanna.Config',
        'Savanna.crumbnet.utils.ViewTemplates',
        'Ext.menu.ColorPicker'
    ],

    width: '100%',

    items: [],

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                itemId: 'toolbarDropdown',
                text: 'Appearance Settings',
                menu: this.buildDropdownMenu()
            },
            { xtype: 'tbfill' },
            { type: 'zoomIn', glyph: 61806, tooltip: 'Zoom In', ui: 'flat-toolbar-button' },
            { type: 'zoomOut', glyph: 61807, tooltip: 'Zoom Out', ui: 'flat-toolbar-button' },
            { type: 'zoomToFit', glyph: 61789, tooltip: 'Zoom To Fit', ui: 'flat-toolbar-button' },
            { type: 'undo', glyph: 61800, tooltip: 'Undo', ui: 'flat-toolbar-button' },
            { type: 'redo', glyph: 61777, tooltip: 'Redo', ui: 'flat-toolbar-button' },
            { type: 'grid', glyph: 61739, tooltip: 'Toggle Grid', ui: 'flat-toolbar-button' },
            { type: 'overview', glyph: 61736, tooltip: 'Toggle Overview', ui: 'flat-toolbar-button' },
            { type: 'print', glyph: 61773, tooltip: 'Print', ui: 'flat-toolbar-button' }
        ];
    },

    buildDropdownMenu: function() {
        var linkTemplateNames = Savanna.crumbnet.utils.ViewTemplates.getLinkTemplateNames();
        var linkStyleMenuChoices = Ext.Array.map(linkTemplateNames, function maplLinkTemplateNames(item) {
            return { type: item, text: item };
        });
        var linkRelationshipTypes = Savanna.crumbnet.utils.ViewTemplates.linkRelationshipTypes;
        var linkTypeMenuChoices = Ext.Array.map(linkRelationshipTypes, function mapLinkRelationshipTypes(item) {
            return { type: item, text: item };
        });

        return [
            {
                itemId: 'layoutMenu',
                text: 'Layout',
                menu: [
                    { type: 'grid', text: 'Grid' },
                    { type: 'tree', text: 'Tree' },
                    { type: 'force', text: 'Force' },
                    { type: 'layeredDigraph', text: 'Layered Digraph' },
                    { type: 'circular', text: 'Circular' }
                ]
            },
            {
                itemId: 'alignmentMenu',
                text: 'Alignment',
                menu: [
                    { type: 'right', text: 'Right' },
                    { type: 'left', text: 'Left' },
                    { type: 'top', text: 'Top' },
                    { type: 'bottom', text: 'Bottom' },
                    { type: 'center', text: 'Center' }
                ]
            },
            {
                itemId: 'linkStyleMenu',
                text: 'Link Style',
                menu: {
                    items: linkStyleMenuChoices
                }
            },
            {
                itemId: 'linkTypeMenu',
                text: 'Link Relationship Type',
                menu: {
                    items: linkTypeMenuChoices
                }
            },
            {
                itemId: 'nodeColorMenu',
                text: 'Node Color',
                menu: { xtype: 'colormenu', itemId: 'nodeColorPicker' }
            }
        ];
    }
});