/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.controller.ResultsComponent', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.search.view.searchComponent.searchBody.ResultsComponent'
    ],
    init: function () {

        this.control({
            'search_resultscomponent panel[cls=results-dal]': {
                'render': this.onDalRender
            },
            'search_resultscomponent #resultsPageSizeCombobox':   {
                select: this.onPageComboChange
            },
            'search_resultscomponent #resultsSortByCombobox':   {
                select: this.onSortByChange
            },
            'search_resultscomponent #resultspanelgrid': {
                'itemdblclick': this.onItemPreview
            },
            'search_resultscomponent > #resultspreviewwindow #resultspreviewcontent #previewclosebutton': {
                'click': this.onCloseItemPreview
            },
            'search_resultscomponent #resultsFacetsReset':  {
                'click': this.onDalReset
            },
            'search_resultscomponent #refine_search_terms': {
                keyup: this.handleSearchTermKeyUp
            }
        });
    },

    onItemPreview: function (grid, record) {
        var win = grid.findParentByType('search_resultscomponent').queryById('resultspreviewwindow');
        win.displayPreview(record);
    },

    onCloseItemPreview:function(btn)   {
        btn.up('#resultspreviewwindow').hide();
    },

    onDalRender: function (dal) {
        dal.body.on('click', this.changeSelectedStore, this, dal);
    },

    onDalReset:function(btn)   {
        var id = btn.findParentByType('search_resultscomponent').currentResultSet.id;
        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id);
        dalRecord.set('facetFilterCriteria', []);
        btn.up('#resultsdals').queryById('resultsfacets').removeAll();
        btn.up('#resultsdals').createFacetsTabPanel();
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        searchController.doSearch(btn);
    },

    onSortByChange:function(){
        /*
        this is a placeholder at the moment - not sure what the available sort options
        will be, and only 'relevance' appears in the comps and flex client version.
         */
    },

    onPageComboChange:function(combo){

        var id = combo.findParentByType('search_resultscomponent').currentResultSet.id,
            dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id),
            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent'),
            component = searchController.getSearchComponent(combo),
            currentDalPanel = component.down('#searchdals').queryById(id),
            searchString = component.queryById('searchbar').buildSearchString(),
            searchObj = Ext.create('Savanna.search.model.SearchRequest', {
                'textInputString': searchString,
                'displayLabel': searchString
            });

        dalRecord.set('resultsPerPage', combo.value);

        searchObj.set('contentDataSource', dalRecord.get('id'));

        searchObj.set('searchPreferencesVOs', [
            {
                'dalId': id,
                'sortOrder': 'Default',
                'customSearchSelections': searchController.getCustomSearchSelections(currentDalPanel)
            }
        ]);

        /*
         build the 'desiredFacets' array for the request, by iterating over
         facetValueSummaries in the DAL sources json
         */
        var desiredFacets = [];

        Ext.each(dalRecord.get('facetDescriptions'), function (description) {
            desiredFacets.push(description.facetId);
        });

        searchObj.set('desiredFacets', desiredFacets);

        /*
         set the facet filters, if any
         */
        if (dalRecord.get('facetFilterCriteria').length) {
            searchObj.set('facetFilterCriteria', dalRecord.get('facetFilterCriteria'));
        }

        /*
         set the date ranges, if any
         */
        if (dalRecord.get('dateTimeRanges').length) {
            searchObj.set('dateTimeRanges', dalRecord.get('dateTimeRanges'));
        }

        /*
         Determine the pageSize for the stores,
         create a new store for each DAL
         */
        var resultsStore = Ext.create('Savanna.search.store.SearchResults', {
            storeId: 'searchResults_' + dalRecord.get('id'),
            pageSize: combo.value
        });

        var resultsDal = component.down('#resultsdals'),
            resultsPanel = component.down('#resultspanel');

        resultsStore.proxy.jsonData = Ext.JSON.encode(searchObj.data);  // attach the search request object
        resultsStore.load({
            callback: Ext.bind(this.pageSizeCallback, this, [resultsDal, resultsPanel, dalRecord.get('id'), resultsStore], true)
        });

        resultsDal.updateDalStatus(dalRecord.get('id'), 'pending');   // begin in a pending state
    },

    pageSizeCallback: function (records, operation, success, resultsDal, resultsPanel, dalId, store) {

        if (!success) {
            // server down..?
            Ext.Error.raise({
                msg: 'The server could not complete the filter request.'
            });
        } else {

            var resultsObj = {id: dalId, store: store};

            Ext.each(resultsPanel.up('#searchresults').allResultSets, function (resultset, index) {
                if (resultset.id === dalId) {
                    resultsPanel.up('#searchresults').allResultSets[index] = resultsObj;
                }
            });

            var statusString = success ? 'success' : 'fail';
            resultsDal.updateDalStatus(dalId, statusString);


            var controller = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
            controller.changeSelectedStore({}, {}, resultsDal.queryById(dalId));

        }
    },

    /*
    tried to give this a more intuitive name - it swaps the store assigned to our grid
    based on whichever DAL the user selects from the left-hand panel, and triggers an update
    of the facets for the newly selected store.
     */
    changeSelectedStore:function(evt, body, dal) {

        var component = dal.findParentByType('search_resultscomponent');

        Ext.each(component.allResultSets, function(resultSet) {
            if(resultSet.id === dal.itemId)    {

                component.queryById('resultspanel').updateGridStore(resultSet);

                component.currentResultSet = resultSet;

                dal.up('#resultsdals').queryById('resultsfacets').setActiveTab('tab_' + dal.itemId);

                var pageValue = Ext.data.StoreManager.lookup('dalSources').getById(resultSet.id).get('resultsPerPage');

                component.down('#resultsPageSizeCombobox').setValue(pageValue);
            }
        });
    },

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode === 13) {   // user pressed enter

            field.findParentByType('search_searchcomponent').refineSearchString += (field.getValue() + ' AND ');

            field.findParentByType('search_searchcomponent').down('#refineterms').addTerm(field.getValue());

             /*
             resubmit the search request
             */
            var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

            if (searchController !== undefined) {
                searchController.doSearch(field);
            }
        }
    }
});