/* global Ext: false */
Ext.define('Savanna.crumbnet.view.part.PaletteMenu', {
    extend: 'Ext.container.Container',
    alias: 'widget.crumbnet_part_palette-menu',
    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    requires: [
        'Ext.layout.container.Accordion',
        'Savanna.crumbnet.view.part.PaletteGroup'
    ],

    store: 'Savanna.crumbnet.store.Templates',

    layout: {
        type: 'accordion',
        titleCollapse: false,
        animate: true,
        activeOnTop: false
    },

    defaultType: 'crumbnet_part_palette-group',

    items: [],

    initComponent: function() {
        this.mixins.storeable.initStore.call(this);
        this.items = this.setupItems();

        this.callParent(arguments);
    },

    onStoreLoad: function() {
        // NOTE: nothing to do yet...
    },

    setupItems: function() {
        var items = [];

        if (this.store.getCount() === 0) {
            // TODO: should this be an error?
            items.push({
                xtype: this.defaultType,
                model: Ext.create('Savanna.crumbnet.model.TemplateGroup', { title: 'NO PALETTE', templates: [] })
            });
        }
        else {
            this.store.each(function(model) {
                items.push({
                    xtype: this.defaultType,
                    model: model
                });
            }, this);
        }

        return items;
    }
});