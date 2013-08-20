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
    region: 'west',
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

    onStoreLoad: function () {
        this.createDalPanels();
    },

    createDalPanels: function () {
        this.removeAll();
        this.store.each(function (record) {
            var myPanel = this.createPanel(record);
            this.add(myPanel);
        }, this);
    },

    createPanel: function (myRecord) {
        return Ext.create('Savanna.search.view.searchDals.ResultsOptions', {
            itemId: myRecord.data.id,
            checkboxLabel: myRecord.data.displayName
        });
    },

    /*
     this method manages showing a loading, success or fail indication for each DAL
     */
    setDalStatus: function (operation, success) {
        var component = this.up("search_searchcomponent"),
            dalStore = Ext.data.StoreManager.lookup('dalSources'),
            me = this;

        dalStore.each(function (source) {
            var dals = component.down('#searchdals');
            var myDal = me.queryById(source.data.id);
            myDal.down('#dalStatusIcon').getEl().setStyle(myDal.dalLoadPending);    // show pending if no success/fail yet
            if (dals.queryById(source.data.id).query('checkbox')[0].getValue()) {
                if (myDal != undefined) {  // if the DAL is selected, check the box and set success/fail
                    myDal.query('checkbox')[0].setValue(true);
                    if (success) {
                        myDal.down('#dalStatusIcon').getEl().setStyle(myDal.dalLoadSuccess);
                    } else {
                        myDal.down('#dalStatusIcon').getEl().setStyle(myDal.dalLoadFail);
                    }
                }
            } else {    // not selected, no indicator and unchecked
                myDal.query('checkbox')[0].setValue(false);
                myDal.down('#dalStatusIcon').getEl().setStyle(myDal.dalLoadNone);
            }
        });
    }
});
