/* global Ext: false, OpenLayers: false, SavannaConfig: false */

/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:09 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.modelSearch.controller.ResultsComponent', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.modelSearch.view.searchComponent.searchBody.ResultsComponent'
    ],
    requires: [
        'Savanna.controller.Factory'
    ],

    init: function () {
        var me = this;
        this.control({
            'model_search_resultscomponent': {
                'render': function (search) {
                    me.component = search;  // temporary measure, pending deft conversion next week

                    //Keelan asked that I use UI event bubbling...
                    //The pattern I've been using is for the controller of the child to fire the event on it's controlled view.
                    //Then we catch the event in all the "parent controllers" by listening to events on their controlled views. (See below)
                    me.component.on('Search:PageSizeChanged', this.onPageSizeChange, this);
                    me.component.on('Search:SortByChanged', this.onSortOrderChange, this);
                    me.component.on('search:changeSelectedStore', this.changeSelectedStore, this);

                    me.component.on('search:multiColumnGridView', this.onMultiColumnGridView, this);
                    me.component.on('search:singleColumnGridView', this.onSingleColumnGridView, this);


                    //grid notifications
                    me.component.on('search:grid:itemdblclick', this.onItemDoubleClick, this);
                    me.component.on('search:grid:itemclick', this.onItemClick, this);
                    me.component.on('search:grid:itemmouseenter', this.onItemMouseEnter, this);
                    me.component.on('search:grid:itemmouseleave', this.onItemMouseLeave, this);

                }
            },


            'model_search_resultscomponent #resultsFacetsReset': {
                'click': this.onDalReset
            }
        });

    },



    //Index to show in preview in range: 0 to store.totalCount.
    previewIndex: 0,

    //The grid with the results.
    resultsGrid: null,

    //Results store
    resultsStore: null,

    //True if we are waiting for some preview results to show up.
    _isWaitingForPreviewResults: false,

    getResultsComponent: function () {
        return this.component;
    },

    //True if we are waiting for some preview results to show up.
    _isWaitingForDocumentMetadata: false,


    // Get the grid component.
    getGrid: function () {
        return  this.getResultsComponent().down('model_search_resultspanelgrid');
    },

    // Get the grid component.
    getMultiGrid: function () {
        return  this.getResultsComponent().down('model_search_resultspanelgrid_multi_column');
    },

    // Get the grid's store.
    getGridStore: function () {
        return  this.getGrid().store;
    },

    //the window that holds the preview content
    previewWindow: function () {
        return  this.getResultsComponent().queryById('resultspreviewwindow');
    },

    //previous button on the preview window
    previewPrevButton: function () {
        return this.previewWindow().down('#previewPrevButton');
    },

    //next button on the preview window
    previewNextButton: function () {
        return this.previewWindow().down('#previewNextButton');

    },

    // The 'Preview Results 1 of xxx' label
    previewIndexAndTotalLabel: function () {
        return this.previewWindow().down('#itemIndexAndTotalLabel');
    },

    // Get button that displays the single column grid
    getSingleColumnGridButton: function () {
        return  this.getResultsComponent().down('multiColumnGridView');
    },

    // Get the button that displays the multicolumn grid
    getMultiColumnGridButton: function () {
        return  this.getResultsComponent().down('singleColumnGridView');
    },

    getCurrentDalId: function () {
        var resultSet = this.getResultsComponent().currentResultSet;
        if(resultSet){
            return resultSet.id;
        }
        return 'SolrJdbc';
    },

    getIsWaitingForPreviewResults: function () {
        return this._isWaitingForPreviewResults;
    },

    setIsWaitingForPreviewResults: function (value) {
        this._isWaitingForPreviewResults = value;
    },

    getIsWaitingForDocumentMetadata: function () {
        return this._isWaitingForDocumentMetadata;
    },

    setIsWaitingForDocumentMetadata: function (value) {
        this._isWaitingForDocumentMetadata = value;
    },

    //Loads the store based on current store settings
    getNewPreviewRecords: function () {
        this.resultsStore = this.getGridStore();
        var me = this;
        this.resultsStore.load({
            scope: this,
            callback: function() {
                me.updatePreviewHelper();
            }
        });
    },

    //The store uses an index that is zero-based such that the first record of the current page has index zero (range is 0 to pageSize - 1).
    // The previewIndex is zero-based but has the range 0 to totalResults - 1.
    getStoreIndexOfPreviewIndex: function () {
        return  this.previewIndex % this.resultsStore.pageSize;
    },

    pageOfCurrentPreviewIndex: function () {
        if (!this.resultsStore) {
            this.resultsStore = this.getGridStore();
        }
        if (this.previewIndex >= (this.resultsStore.currentPage) * this.resultsStore.pageSize) {
            return this.resultsStore.currentPage + 1;
        } else if (this.previewIndex < (this.resultsStore.currentPage - 1) * this.resultsStore.pageSize) {
            return this.resultsStore.currentPage - 1;
        }
        return this.resultsStore.currentPage;
    },

    updatePreviewHelper: function () {

        var me = Savanna.controller.Factory.getController('Savanna.modelSearch.controller.ResultsComponent');
        me.resultsGrid = me.getGrid();
        me.resultsStore = me.getGridStore();

        var record = me.resultsStore.getAt(me.getStoreIndexOfPreviewIndex()),
            recordMetadata;

        if(me.getResultsComponent().currentResultSet.metadata)   {
            recordMetadata = me.getResultsComponent().currentResultSet.metadata.getById(record.data.uri);
        }

        //this can happen when you hit next > 10 times/sec
        if(!record || !recordMetadata){
            setTimeout(me.updatePreviewHelper, 500);
            if(!record) {
                me.setIsWaitingForPreviewResults ( true );
            }
            if(!recordMetadata) {
                me.setIsWaitingForDocumentMetadata ( true );
            }
        }

        me.setIsWaitingForPreviewResults ( false );


        var win = me.previewWindow();
        //Show the contents
        win.displayPreview(record.data, recordMetadata.get('datastore'), me.previewIndex, me.resultsStore.totalCount);
        //Show the index and total
        me.previewIndexAndTotalLabel().setText('Preview Result ' + (me.previewIndex + 1) + ' of ' + me.resultsStore.totalCount);
        //Enable/disable the prev and next buttons
        if (me.previewIndex === 0) {
            me.previewPrevButton().disable();
        } else {
            me.previewPrevButton().enable();
        }
        if (me.previewIndex === me.resultsStore.totalCount - 1) {
            me.previewNextButton().disable();
        } else {
            me.previewNextButton().enable();
        }
    },

    getDocumentMetadata: function (results, uris) {


        this.setIsWaitingForDocumentMetadata ( true );

        var metadataStore = Ext.create('Savanna.modelSearch.store.ResultsMetadata', {
            storeId: 'searchMetadata_' + results.id,
            pageSize: results.store.pageSize
        });

        metadataStore.proxy.jsonData = Ext.JSON.encode(uris);  // attach the metadata request object

        metadataStore.load({
            callback: Ext.bind(this.metadataCallback, this, [results], true)
        });
    },

    metadataCallback: function (records, operation, success, results) {

        for (var record in records) {

            if (records.hasOwnProperty(record)) {
                var obj = records[record];

                var metaStore = Ext.create('Ext.data.Store', {
                    model: 'Savanna.modelSearch.model.ResultMetadata'
                });
                for (var elem in obj.raw) {
                    if (obj.raw.hasOwnProperty(elem)) {
                        var elem_obj = obj.raw[elem];
                        var metaPropertiesStore = Ext.create('Savanna.metadata.store.Metadata');
                        for (var prop in elem_obj) {
                            if (elem_obj.hasOwnProperty(prop)) {
                                metaPropertiesStore.add(elem_obj[prop]);
                            }
                        }
                        metaStore.add({id: elem, datastore: metaPropertiesStore});
                    }
                }
                results.metadata = metaStore;

                this.setIsWaitingForDocumentMetadata ( false );
            }
        }
    },

    updatePreview: function (){
        this.resultsGrid = this.getGrid();
        this.resultsStore = this.getGridStore();
        if(this.getIsWaitingForPreviewResults() || this.getIsWaitingForDocumentMetadata()){
            return;
        }

        //Make sure the record is paged in.
        var containingPage = this.pageOfCurrentPreviewIndex();
        if (this.resultsStore.currentPage !== containingPage) {
            this.resultsStore.currentPage = containingPage;
            this.getNewPreviewRecords();
        } else {

            this.updatePreviewHelper();
        }
    },

    //double click handler
    onItemDoubleClick: function (grid, record) {
        this.openUri(record);
    },

    onItemMouseEnter: function (view, rec, node) {    // other parameters: , index, e, options
        if (node) {
            var div = node.querySelector('#hoverDiv');
            //Not all grids have this div.
            if(div){
                div.style.visibility = 'visible';
            }
        }
    },

    onItemClick: function (view, rec, node, index, e) {  //other parameter options
        if (e && e.target && e.target.id) {
            if (e.target.id === 'openButton') {
                this.openUri(rec);
            }
        }
    },

    onItemMouseLeave: function (view, rec, node) {  // other parameters: , index, e, options
        if (node) {
            var div = node.querySelector('#hoverDiv');
            //Not all grids have this div.
            if(div){
                div.style.visibility = 'hidden';
            }
        }
    },

    openUri: function(rec){
        //type will be "item" or "process"
        EventHub.fireEvent('open', {uri: rec.data.uri, type: rec.data.type, label: rec.data.label});
    },

    onNextItemPreview: function () {
        if (this.previewIndex < this.resultsStore.totalCount) {
            this.previewIndex++;
            this.updatePreview();
        }
    },

    onPrevItemPreview: function () {
        if (this.previewIndex > 0)  {
            this.previewIndex--;
            this.updatePreview();
        }
    },


    onDalReset: function (btn) {
        var id = this.getCurrentDalId();
        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id),
            resultsDals = btn.up('#resultsdals'),
            resultsTerms = resultsDals.down('model_search_resultsDals_resultsterms');

        dalRecord.set('facetFilterCriteria', []);
        resultsDals.queryById('resultsfacets').removeAll();
        resultsDals.createFacetsTabPanel();
        btn.findParentByType('model_search_searchcomponent').refineSearchString = '';

        if(resultsTerms){
            resultsTerms.queryById('termValues').removeAll();
        }

        this.getApplication().fireEvent('model_results:dalreset', btn);
    },

    onSortOrderChange: function () {
        /*
         this is a placeholder at the moment - not sure what the available sort options
         will be, and only 'relevance' appears in the comps and flex client version.
         */
    },

    onPageSizeChange: function (newSize) {

        var id = this.getCurrentDalId();
        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id);
        /*
         regrettable but necessary call to the SearchController directly.  The target method
         'buildSearchObject' needs to return the request object, but when an event is fired it can
         only return a boolean.  If anyone thinks of a way around it, please feel free to update.
         */
        var searchController = Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent');
        var searchComponent = this.getResultsComponent().findParentByType('model_search_searchcomponent');
        var currentDalPanel = searchComponent.down('#searchdals').queryById(id);
        var searchString = searchComponent.queryById('searchbar').buildSearchString();

        //When we get a new size, we start again at page 1--like google.
        if(searchController.resultsStore.pageSize != newSize) {
            searchController.currentPage = 1;
        }

        var searchObj = searchController.buildSearchObject(searchString, dalRecord, currentDalPanel);

        dalRecord.set('resultsPerPage', newSize);

        this.getApplication().fireEvent('model_results:buildAndLoadResultsStore', dalRecord, searchComponent, searchObj, 'filter', newSize);

    },

    onSingleColumnGridView: function () {
        var grid = this.getGrid();
        var multiGrid = this.getMultiGrid();
        grid.show();
        multiGrid.hide();
    },

    onMultiColumnGridView: function () {
        var grid = this.getGrid();
        var multiGrid = this.getMultiGrid();
        grid.hide();
        multiGrid.show();
    },

    /*
     swaps the store assigned to our grid based on whichever DAL the
     user selects from the left-hand panel, and triggers an update
     of the facets for the newly selected store.
     */
    changeSelectedStore: function ( dal) {

        var component = dal.findParentByType('model_search_resultscomponent');

        Ext.each(component.allResultSets, function (resultSet) {
            if (resultSet.id === dal.itemId) {

                component.queryById('resultspanel').updateGridStore(resultSet.store);

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
                field.findParentByType('model_search_searchcomponent').refineSearchString += (field.getValue() + ' AND ');
                field.findParentByType('model_search_searchcomponent').down('#refineterms').addTerm(field);

                /*
                 resubmit the search request
                 */

                this.getApplication().fireEvent('model_results:refineSearch', field);
                return true;

            }   else    {

                return false;
            }
        }
        return false;
    },

    handleSearchSubmit: function (btn) {
        var field = btn.findParentByType('model_search_resultscomponent').down('#refine_search_terms');

        if (field.getValue().trim().length) {
            field.findParentByType('model_search_searchcomponent').refineSearchString += (field.getValue() + ' AND ');
            field.findParentByType('model_search_searchcomponent').down('#refineterms').addTerm(field);

            /*
             resubmit the search request
             */
            this.getApplication().fireEvent('model_results:refineSearch', field);
            return true;

        }   else    {

            return false;
        }
    }
});