/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.PaletteWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.process_palettewindow',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    requires: [
        'Ext.layout.container.Accordion',
        'Savanna.process.view.part.Palette',
        'Savanna.process.store.Templates'
    ],

    store: 'Savanna.process.store.Templates',

    layout: {
        type: 'accordion',
        titleCollapse: true,
        multi: true
    },

    modal: false,
    closable: false,
    constrain: true, //limit this window to the parent container
    width: 250,
    height: 400,

    items: [],

    initComponent: function() {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    onStoreLoad: function() {
        this.removeAll();

        if (0 === this.store.getCount()) {
            // TODO: should this be an error?
            this.add(Ext.create('Savanna.process.view.part.Palette', {
                model: Ext.create('Savanna.process.model.TemplateGroup', { title: 'NO PALETTE', templates: [] })
            }));
        }
        else {
            this.store.each(function(model) {
                this.add(Ext.create('Savanna.process.view.part.Palette', { model: model }));
            }, this);
        }
    }
});