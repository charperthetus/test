/* global Ext: false, Savanna: false */
Ext.define('Savanna.crumbnet.view.part.NodeTypeMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.crumbnet_part_nodeTypeMenu',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    items:[],

    store: 'Savanna.crumbnet.store.Templates',

    initComponent: function() {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    setupItems: function() {
        // should i call set up items from onStoreLoad???
    },

    onStoreLoad: function() {
        this.removeAll();
        if (this.store.getCount() > 0) {
            this.store.each(function(model) {
                var templates = model.data.templates;
                var i;
                for (i=0 ; i < templates.length ; i++ ){
                   this.add({ type: templates[i].type, text: templates[i].title });
                }
            }, this);
        }
    }
});