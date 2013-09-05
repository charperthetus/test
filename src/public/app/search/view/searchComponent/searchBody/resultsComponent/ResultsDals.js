/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.ResultsDals', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsdals',
    requires: [
        'Savanna.controller.Factory',
        'Ext.form.Label',
        'Ext.toolbar.Spacer',
        'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions',
        'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacets'
    ],

    title: 'Search Sources',
    region: 'west',
    width: 175,
    minWidth: 200,
    maxWidth: 200,
    layout: 'vbox',
    border: false,
    autoScroll: true,

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

    },

    createDalPanels: function () {
        var dals = this.findParentByType('search_searchcomponent').down('#searchdals');


        this.store.each(function (record) {
            var dalId = record.data.id,
                checked = dals.queryById(dalId).query('checkbox')[0].getValue(),
                myPanel;
            if (checked) {
                myPanel = this.createDalPanel(record);
                this.add(myPanel);
            }
        }, this);

        var facetPanel = this.createFacetsTabPanel();
        this.add(facetPanel);
    },

    createDalPanel: function (myRecord) {
        return Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions', {
            itemId: myRecord.data.id,
            dalName: myRecord.data.displayName
        });
    },

    createFacetsTabPanel: function () {

        var facetTabs;

        if(this.queryById('resultsfacets') === null) {
            facetTabs = Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacets', {
                itemId: 'resultsfacets'
            });
            facetTabs.tabBar.hide();
            facetTabs.componentLayout.childrenChanged = true;
            facetTabs.doComponentLayout();
        }   else    {
            facetTabs = this.queryById('resultsfacets');
        }

        var dals = this.findParentByType('search_searchcomponent').down('#searchdals');

        this.store.each(function (record) {

            var dalId = record.data.id,
                checked = dals.queryById(dalId).query('checkbox')[0].getValue();

            var exists = (facetTabs.queryById('tab_' + record.data.id) !== null);
            if (checked) {
                if (!exists) {
                    /*
                     the user selected this DAL, and a tab of facets doesn't exist yet for it
                     */
                    facetTabs.add({
                        xtype: 'panel',
                        itemId: 'tab_' + record.data.id
                    });
                }
            } else {
                if (exists) {
                    /*
                     the user deselected this DAL or started a brand new search,
                     but the tab exists, presumably created by the previous search
                     */
                    facetTabs.remove('tab_' + record.data.id);
                }
            }

        }, this);

        return facetTabs;
    },

    createDalFacets: function (id) {

        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id),
            descriptions = dalRecord.data.facetDescriptions,
            facets = this.queryById('resultsfacets').queryById('tab_' + id),
            me = this;


        Ext.each(this.findParentByType('search_resultscomponent').allResultSets, function (resultset) {
            if (descriptions.length > 0) {
                Ext.each(descriptions, function (facet) {
                    if(facets.queryById('facet_' + dalRecord.data.id + '_' + facet.facetId) === null)   {
                        var facetElement = me.createFacet(facet, resultset, dalRecord);
                        facets.add(facetElement);
                    }
                });
            }
        });
    },

    createFacet: function (facet, results, dalRecord) {
        return Ext.create('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
            model: facet,
            set: results,
            dal: dalRecord,
            itemId: 'facet_' + dalRecord.data.id + '_' + facet.facetId
        });
    },

    updateDalStatus: function (dalId, status) {
        var myDal = this.queryById(dalId);
        console.log('in updateDalStatus, updating ', dalId);
        myDal.updateDalNameCount(dalId, status);
        var styleStatus = {
            'success': myDal.dalLoadSuccess,
            'fail': myDal.dalLoadFail,
            'pending': myDal.dalLoadPending,
            'none': myDal.dalLoadNone
        };
        myDal.down('#dalStatusIcon').getEl().setStyle(styleStatus[status]);
    }
});
