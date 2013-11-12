/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/31/13
 * Time: 4:31 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.ResultsDals', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultsdals',
    bubbleEvents: ['search:changeSelectedStore'],
    requires: [
        'Savanna.controller.Factory',
        'Ext.form.Label',
        'Ext.toolbar.Spacer',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacets',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineSearchbar'
    ],

    title: 'Refine Search',
    region: 'west',
    headerPosition: 'right',
    collapsedCls: 'light-blue',
    header: {
        ui: 'light-blue'
    } ,
    /*
     NOTE: to be replaced with a class attribute I'm sure - this just
     here to get the panel to display for development.
     */
    width: 220,
    height:'100%',

    layout: 'vbox',
    autoScroll: true,

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store: 'Savanna.modelSearch.store.DalSources',

    defaults: {
        padding: 10,
        width: '100%'
    },

    items: [],

    initComponent: function () {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    createDalPanels: function (sources) {

        /*
         remove DALs that have been deselected
         */

         var resulstsSearchSources = Ext.create('Ext.panel.Panel', {
                                                    xtype: 'panel',
                                                    itemId: 'results-searchSources',
                                                    ui: 'simple',
                                                    title: 'search sources',
                                                    layout: 'vbox',
                                                    align: 'left',
                                                    margin: '0 0 10 0'
                                                });
        /* This panel is hidden until the bug with refine search can be fixed. */
        var resulstsRefineSearch = Ext.create('Ext.panel.Panel', {
                                                    itemId: 'results-refineSearch',
                                                    hidden: true,
                                                    bbar: {
                                                        padding: 0,
                                                        margin: '10 0 0 0',
                                                        items: ['->',{
                                                            text:'Keyword Reset',
                                                            itemId:'resultsFacetsReset',
                                                            padding: 0,
                                                            margin: 0
                                                        }]
                                                    }
                                                });
        var resulstsSearchFacets = Ext.create('Ext.container.Container', {
                                                    itemId: 'results-refineSearchFacets',
                                                    cls: 'refineSearchFacets',
                                                    padding: '0 10 10 10'
                                                });
        this.add(resulstsSearchSources);

        if (!this.queryById('refinesearch')) {
            if (!this.queryById('results-refineSearch')) {
                this.add(resulstsRefineSearch);
            }
            this.down('#results-refineSearch').add(this.createRefineSearchPanel());
        }

        if (!this.queryById('refineterms')) {
            if (!this.queryById('results-refineSearch')) {
                this.add(resulstsRefineSearch);
            }
            this.down('#results-refineSearch').add(this.createRefineTermsPanel());
        }

        var facetTabs = this.createFacetsTabPanel();    // always do this...

        if (!this.queryById('resultsfacets')) {
            if (!this.queryById('results-refineSearchFacets')) {
                this.add(resulstsSearchFacets);
            }
            this.down('#results-refineSearchFacets').add(facetTabs);    // ...but only add if doesn't exist
        }

        var startingItemsLength = this.items.length; // determine where to insert the dals, above facets

        Ext.each(sources, function (record) {
            var dalId = record.get('id'),
                myPanel,
                exists = this.queryById(dalId);

            if (!exists) {
                myPanel = this.createDalPanel(record);
                myPanel.setText(record.get('displayName'));

                this.down('#results-searchSources').insert(this.items.length - startingItemsLength, myPanel);
            } else {
                this.updateDalStatus(dalId);
            }

        }, this);

    },

    createDalPanel: function (myRecord) {
        return Ext.create('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsOptions', {
            itemId: myRecord.get('id'),
            dalName: myRecord.get('displayName')
        });
    },

    createRefineSearchPanel: function () {
        return Ext.create('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineSearchbar', {
            itemId: 'refinesearch'
        });
    },

    createRefineTermsPanel: function () {
        return Ext.create('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerms', {
            itemId: 'refineterms'
        });
    },

    createFacetsTabPanel: function () {
        var facetTabs;

        if (!this.queryById('resultsfacets')) {
            facetTabs = Ext.create('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacets', {
                itemId: 'resultsfacets'
            });

            /*
             hide actual tabs.
             */
            facetTabs.tabBar.hide();
            facetTabs.componentLayout.childrenChanged = true;
            facetTabs.doComponentLayout();

        } else {
            facetTabs = this.queryById('resultsfacets');
        }

        var searchPanelDals = this.findParentByType('model_search_searchcomponent').down('#searchdals');  // the dal sources in search options

        this.store.each(function (record) {

            var dalId = record.get('id'),
                checked = searchPanelDals.queryById(dalId).query('checkbox')[0].getValue();

            var exists = (facetTabs.queryById('tab_' + record.get('id')) !== null);
            if (checked) {
                if (!exists) {
                    /*
                     the user selected this DAL, and a tab of facets doesn't exist yet for it
                     */
                    facetTabs.add({
                        xtype: 'panel',
                        itemId: 'tab_' + record.get('id')
                    });
                }
            } else {
                if (exists) {
                    /*
                     the user deselected this DAL or started a brand new search,
                     but the tab exists, presumably created by the previous search
                     */
                    facetTabs.remove('tab_' + record.get('id'));
                }
            }

        }, this);

        return facetTabs;
    },

    createDalFacets: function (id) {


        var dalRecord = this.store.getById(id),
            facets = this.queryById('resultsfacets').queryById('tab_' + id),
            me = this;

        if (facets !== null) {
            facets.removeAll();
        }

        Ext.each(this.findParentByType('model_search_resultscomponent').allResultSets, function (resultset) {
            if (resultset.id === id) {
                var facetData = resultset.store.facetValueSummaries;
                var len = facetData.length;

                for (var i = 0; i < len; i++) {
                    var facetElement;

                    facetElement = me.createFacet(facetData[i], resultset, dalRecord);
                    if (facetElement) {
                        facets.add(facetElement);
                    }
                }
            }

        });
    },

    createFacet: function (facet, results, dalRecord) {
        var hasValues = facet.facetValues.length;
        var isStringFacet = (facet.facetType === 'string');
        var createdFacet;
        if (!isStringFacet || (isStringFacet && hasValues)) {
            createdFacet = Ext.create('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
                facet: facet,
                searchResults: results,
                dal: dalRecord,
                itemId: 'facet_' + dalRecord.get('id') + '_' + facet.key
            });
        }
        return createdFacet;
    },

    updateDalStatus: function (dalId, status) {

        /*
         set the status icon - pending, success or fail - as well as the text,
         which is the display name and number of results returned
         */
        var myDal = this.queryById(dalId);

        var styleStatus = {
            'success': 'icon-success',
            'fail': 'icon-alert',
            'pending': 'icon-pending',
            'none': 'loadNone'
        };
        
        myDal.setIconCls(styleStatus[status]);

        var me = this,
            count = 0;

        Ext.each(this.findParentByType('model_search_resultscomponent').allResultSets, function (searchResult) {

            if (searchResult.id === dalId) {
                if (status !== 'fail') {
                    count = searchResult.store.totalCount;
                }

                myDal.setText(me.store.getById(dalId).get('displayName') + ' ' + '(' + count + ')');
            }
        });
    }
});
