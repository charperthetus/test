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
        'Savanna.search.view.resultsDals.ResultsOptions',
        'Savanna.search.view.resultsDals.ResultsFacets'
    ],

    title: 'Search Sources',
    region: 'west',
    width: 175,
    minWidth: 100,
    maxWidth: 250,
    layout: 'vbox',
    border: false,
    autoScroll:true,

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
        var facetPanel = this.createFacetsPanel();
        this.add(facetPanel);
    },

    createPanel: function (myRecord) {
        return Ext.create('Savanna.search.view.resultsDals.ResultsOptions', {
            itemId: myRecord.data.id,
            checkboxLabel: myRecord.data.displayName
        });
    },

    createFacetsPanel:function() {
        return Ext.create('Savanna.search.view.resultsDals.ResultsFacets', {
            itemId:"resultsfacets"
        });
    },

    updateDalStatus: function (dalId, status) {
        var myDal = this.queryById(dalId);
        var styleStatus = {
            'success': myDal.dalLoadSuccess,
            'fail': myDal.dalLoadFail,
            'pending': myDal.dalLoadPending,
            'none': myDal.dalLoadNone
        }
        myDal.down('#dalStatusIcon').getEl().setStyle(styleStatus[status]);
        if(status != 'none')    {
            myDal.query('checkbox')[0].setValue(true);  // a DAL selected in search options
        }
    }
});
