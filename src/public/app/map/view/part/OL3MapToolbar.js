Ext.define('Savanna.map.view.part.OL3MapToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ol3maptoolbar',

    ui:'thetus-toolbar',
    height: 33,

    items: [
        '->',
        {
            itemId: 'addLayerButton',
            glyph: 'addLayer',
            cls: 'toolbarButtonFramework',
            width:25,
            height:25
        }
    ]
});