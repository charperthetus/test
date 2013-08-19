/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.ResultsDals', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsdals',
    requires: [
        'Savanna.controller.Factory',
        'Ext.form.Label',
        'Ext.toolbar.Spacer',
        'Savanna.search.view.searchDals.ResultsOptions'
    ],

    title: 'Search Sources',
    region:'west',
    width: 175,
    minSize: 100,
    maxSize: 250,
    layout: 'vbox',
    border: false,

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store: 'Savanna.search.store.DalSources',

    initComponent: function () {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
    },

    onStoreLoad: function() {
        this.createDalPanels();
    },

    createDalPanels: function() {
        this.removeAll();
        this.store.each(function (record) {
            var myPanel = this.createPanel(record);
            this.add(myPanel);
        }, this);
    },

    createPanel: function(myRecord) {
        return Ext.create('Savanna.search.view.searchDals.ResultsOptions', {
            itemId: myRecord.data.id,
            checkboxLabel: myRecord.data.displayName
        });
    }
});
