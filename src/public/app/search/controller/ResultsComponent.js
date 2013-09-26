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
    requires: [
        'Savanna.controller.Factory'
    ],
    init: function () {

        this.control({
            'search_resultscomponent panel[cls=results-dal]': {
                'render': this.onDalRender
            },
            'search_resultscomponent #resultsPageSizeCombobox': {
                select: this.onPageComboChange
            },
            'search_resultscomponent #resultsSortByCombobox': {
                select: this.onSortByChange
            },
            'search_resultscomponent #resultspanelgrid': {
                'itemdblclick': this.onItemPreview
            },
            'search_resultscomponent > #resultspreviewwindow #resultspreviewcontent #previewclosebutton': {
                'click': this.onCloseItemPreview
            },
            'search_resultscomponent #resultsFacetsReset': {
                'click': this.onDalReset
            },
            'search_resultscomponent #refine_search_terms': {
                keyup: this.handleSearchTermKeyUp
            },
            'search_resultscomponent #refine_search_submit': {
                click: this.handleSearchSubmit
            },
            'search_resultscomponent panel[cls=refine-term]': {
                'render': this.onTermRender
            },
            'search_resultscomponent #showHideFacets': {
                'click': this.onShowHideFacets
            }
        });

        this.getApplication().on('search:changeSelectedStore', this.changeSelectedStore, this);

    },

    onTermRender:function(term)    {
        term.mon(term.queryById('removeTerm'), 'click', this.handleRemoveTerm, this, term);
    },

    handleRemoveTerm: function (term) {
        term.findParentByType('search_searchcomponent').down('#refineterms').removeTerm(term);
    },

    onShowHideFacets: function (btn) {

        Ext.each(btn.up('#resultsfacets').query('panel[cls=results-facet]'), function (facet) {

           if(!btn.facetsExpanded)    {
               facet.expand();
           }    else    {
               facet.collapse();
           }
        });
        btn.facetsExpanded = !btn.facetsExpanded;
    },

    onItemPreview: function (grid, record) {
        var win = grid.findParentByType('search_resultscomponent').queryById('resultspreviewwindow');
        win.displayPreview(record);
    },

    onCloseItemPreview: function (btn) {
        btn.up('#resultspreviewwindow').hide();
    },

    onDalRender: function (dal) {
        dal.body.on('click', this.changeSelectedStore, this, dal);
    },

    onDalReset: function (btn) {
        var id = btn.findParentByType('search_resultscomponent').currentResultSet.id;
        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id),
            resultsDals = btn.up('#resultsdals'),
            resultsTerms = resultsDals.down('search_resultsDals_resultsterms');

        dalRecord.set('facetFilterCriteria', []);
        resultsDals.queryById('resultsfacets').removeAll();
        resultsDals.createFacetsTabPanel();
        btn.findParentByType('search_searchcomponent').refineSearchString = '';

        resultsTerms.queryById('termValues').removeAll();

        this.getApplication().fireEvent('results:dalreset', btn);
    },

    onSortByChange: function () {
        /*
         this is a placeholder at the moment - not sure what the available sort options
         will be, and only 'relevance' appears in the comps and flex client version.
         */
    },

    onPageComboChange:function(comboboxComponent){

        var id = comboboxComponent.findParentByType('search_resultscomponent').currentResultSet.id,
            dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id),
            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent'),
            component = comboboxComponent.findParentByType('search_searchcomponent'),
            currentDalPanel = component.down('#searchdals').queryById(id),
            searchString = component.queryById('searchbar').buildSearchString(),
            searchObj = searchController.buildSearchObject(searchString, dalRecord, currentDalPanel);

        dalRecord.set('resultsPerPage', comboboxComponent.value);

        this.getApplication().fireEvent('results:buildAndLoadResultsStore', dalRecord, component, searchObj, 'filter', comboboxComponent);

    },

    /*
     swaps the store assigned to our grid based on whichever DAL the
     user selects from the left-hand panel, and triggers an update
     of the facets for the newly selected store.
     */
    changeSelectedStore: function (evt, body, dal) {

        var component = dal.findParentByType('search_resultscomponent');

        Ext.each(component.allResultSets, function (resultSet) {
            if (resultSet.id === dal.itemId) {

                component.queryById('resultspanel').updateGridStore(resultSet);

                component.currentResultSet = resultSet;

                dal.up('#resultsdals').queryById('resultsfacets').setActiveTab('tab_' + dal.itemId);

                var pageValue = Ext.data.StoreManager.lookup('dalSources').getById(resultSet.id).get('resultsPerPage');

                component.down('#resultsPageSizeCombobox').setValue(pageValue);
            }
        });
    },

    handleSearchTermKeyUp: function (field, evt) {
        if (evt.keyCode === Ext.EventObject.ENTER) {   
            if (field.getValue().trim().length) {
                field.findParentByType('search_searchcomponent').refineSearchString += (field.getValue() + ' AND ');
                field.findParentByType('search_searchcomponent').down('#refineterms').addTerm(field);

                /*
                 resubmit the search request
                 */

                this.getApplication().fireEvent('results:refineSearch', field);
            }
        }
    },

    handleSearchSubmit: function (btn) {
        var field = btn.findParentByType('search_resultscomponent').down('#refine_search_terms');

        if (field.getValue().trim().length) {
            field.findParentByType('search_searchcomponent').refineSearchString += (field.getValue() + ' AND ');
            field.findParentByType('search_searchcomponent').down('#refineterms').addTerm(field);

            /*
             resubmit the search request
             */
            this.getApplication().fireEvent('results:refineSearch', field);
        }
    }
});