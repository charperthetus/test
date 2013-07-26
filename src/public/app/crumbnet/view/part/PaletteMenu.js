Ext.define('Savanna.crumbnet.view.part.PaletteMenu', {
    extend: 'Ext.container.Container',
    alias: 'widget.crumbnet_part_palette-menu',

    requires: [
        'Savanna.crumbnet.view.part.PaletteGroup'
    ],

    layout: {
        type: 'accordion',
        titleCollapse: false,
        animate: true,
        activeOnTop: false
    },

    defaultType: 'crumbnet_part_palette-group',

    items: [],

    initComponent: function() {
        this.items = this.setupItems();

        this.callParent(arguments);
    },

    setupItems: function() {
        return [
            {
                title: 'Panel 1'
            },{
                title: 'Panel 2'
            },{
                title: 'Panel 3'
            }
        ];
    }
});