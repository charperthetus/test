Ext.define('Savanna.map.view.part.OL3MapToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ol3maptoolbar',

    ui:'thetus-toolbar',
    height: 33,

    items: [
        {
            itemId: 'drawPointButton',
            glyph: 'location',
            cls: 'toolbarButtonFramework',
            width:25,
            height:25
        },
        {
            itemId: 'drawLineButton',
            glyph: 'freehand',
            cls: 'toolbarButtonFramework',
            width:25,
            height:25
        },
        {
            itemId: 'drawPolygonButton',
            glyph: 'polygonTop',
            cls: 'toolbarButtonFramework',
            width:25,
            height:25
        },
        '->',
        {
            itemId: 'saveMapButton',
            glyph: 'saveMap',
            cls: 'toolbarButtonFramework',
            width:25,
            height:25
        }
    ]
});