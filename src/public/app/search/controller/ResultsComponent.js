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
    refs: [{
        ref: 'resultsComponent',             // this.getResultsComponent() should return the results component
        selector: 'search_resultscomponent' //  xtype
    }],
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
                'itemdblclick': this.onItemPreview,
                'itemclick' : this.onItemClick,
                'itemmouseenter': this.onItemMouseEnter,
                'itemmouseleave': this.onItemMouseLeave
            },
            'search_resultscomponent > #resultspreviewwindow #resultspreviewcontent #previewclosebutton': {
                'click': this.onCloseItemPreview
            },
            'search_resultscomponent #resultsFacetsReset': {
                'click': this.onDalReset
            },
            'search_resultscomponent > #resultspreviewwindow #resultspreviewcontent #previewNextButton': {
                'click': this.onNextItemPreview
            },
            'search_resultscomponent > #resultspreviewwindow #resultspreviewcontent #previewPrevButton': {
                'click': this.onPrevItemPreview
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

    //Index to show in preview in range: 0 to store.totalCount.
    previewIndex: 0,

    //The grid with the results.
    resultsGrid: null,

    //Results store
    resultsStore: null,

    //True iff we are waiting for some preview results to show up.
    _isWaitingForPreviewResults: false,


    // Get the grid component.
    getGrid: function(){
        return  this.getResultsComponent().down('search_resultspanelgrid');
    },

    // Get the grid's store.
    getGridStore: function(){
        return  this.getGrid().store;
    },

    //the window that holds the preview content
    previewWindow: function () {
        return  this.getGrid().findParentByType('search_resultscomponent').queryById('resultspreviewwindow');
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


    getIsWaitingForPreviewResults: function () {
        return this._isWaitingForPreviewResults;
    },

    setIsWaitingForPreviewResults: function (value) {
        this._isWaitingForPreviewResults = value;
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
        if(!this.resultsStore){
            this.resultsStore = this.getGridStore();
        }
        if(this.previewIndex >= (this.resultsStore.currentPage) * this.resultsStore.pageSize){
            return this.resultsStore.currentPage + 1;
        } else if(this.previewIndex < (this.resultsStore.currentPage - 1) * this.resultsStore.pageSize){
            return this.resultsStore.currentPage - 1;
        }
        return this.resultsStore.currentPage;
    },

    updatePreviewHelper: function () {
        this.resultsGrid = this.getGrid();
        this.resultsStore = this.getGridStore();


        var record = this.resultsStore.getAt(this.getStoreIndexOfPreviewIndex()),
            component = this.getGrid().findParentByType('search_resultscomponent');

        /*
         array of uri's to get the metadata for these results
         */

        var metadataArray = [];

        console.log(component.currentResultSet.store)

        Ext.each(component.currentResultSet.store.data.items, function (record) {
            metadataArray.push(record.get('uri'));
        });

        console.log(metadataArray);

        this.getDocumentMetadata(component.currentResultSet, metadataArray);


        /*
            hm... it may make sense to pull all of the metadata stuff into here.  this method
            below does not work when the grid is paged.  solution in progress above

            var recordMetadata = component.currentResultSet.metadata.getById(record.get('uri')).get('datastore').data;

         */



        //this can happen when you hit next > 10 times/sec
        if(!record){
            setTimeout(this.updatePreviewHelper, 500);
            this.setIsWaitingForPreviewResults ( true );
            return;
        }

        this.setIsWaitingForPreviewResults ( false );

        var win = this.previewWindow();
        //Show the contents
        win.displayPreview(record.data, recordMetadata, this.previewIndex, this.resultsStore.totalCount);
        //Show the index and total
        this.previewIndexAndTotalLabel().setText('Preview Result ' + (this.previewIndex + 1) + ' of ' + this.resultsStore.totalCount);
        //Enable/disable the prev and next buttons
        if (this.previewIndex === 0) {
            this.previewPrevButton().disable();
        } else {
            this.previewPrevButton().enable();
        }
        if (this.previewIndex === this.resultsStore.totalCount - 1) {
            this.previewNextButton().disable();
        } else {
            this.previewNextButton().enable();
        }
    },

    getDocumentMetadata: function (results, uris) {

        var metadataStore = Ext.create('Savanna.search.store.ResultsMetadata', {
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
                    model: 'Savanna.search.model.ResultMetadata'
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
            }
        }
    },

    updatePreview: function (){
        this.resultsGrid = this.getGrid();
        this.resultsStore = this.getGridStore();
        if(this.getIsWaitingForPreviewResults()){
            return;
        }

        //Make sure the record is paged in.
        var containingPage =  this.pageOfCurrentPreviewIndex();
        if(this.resultsStore.currentPage !== containingPage ) {
            this.resultsStore.currentPage = containingPage;
            this.getNewPreviewRecords();
        } else {
            this.updatePreviewHelper();
        }
    },

    onItemPreview: function (grid, record, node, index) {
        this.resultsGrid = grid;
        this.resultsStore = grid.store;
        //gaaaahhh    the index passed in does not include all the pages that have come before.
        //gaaaahhh*10 the current page is 1-based.
        this.previewIndex = index + (this.resultsStore.currentPage - 1)*(this.resultsStore.pageSize);
        this.updatePreview();
    },

    onItemMouseEnter: function (view, rec, node) {
        if(node){
            node.querySelector('#hoverDiv').style.visibility = 'visible';
        }
    },

    onItemClick: function (view, rec, node, index, e) {
        if(e && e.target && e.target.id){
            if(e.target.id === 'openButton'){
                this.openUri(rec.data.uri);
            }
        }
    },

    onItemMouseLeave: function (view, rec, node) {
        if(node){
            node.querySelector('#hoverDiv').style.visibility = 'hidden';
        }
    },

    openUri: function(){
        //todo open the uri...
    },

    onTermRender:function(term)    {
        term.mon(term.queryById('removeTerm'), 'click', this.handleRemoveTerm, this, term);
    },

    handleRemoveTerm: function (term) {
        term.findParentByType('search_searchcomponent').down('#refineterms').removeTerm(term);
    },

    onShowHideFacets: function (btn) {

        Ext.each(btn.up('#resultsfacets').getActiveTab().query('panel[cls=results-facet]'), function (facet) {
            if(facet)    {
                if(!btn.facetsExpanded)    {
                    btn.setText('Hide All');
                    facet.expand();
                }    else    {
                    facet.collapse();
                    btn.setText('Show All');
                }
            }
        });
        btn.facetsExpanded = !btn.facetsExpanded;
    },


    onCloseItemPreview: function (btn) {
        btn.up('#resultspreviewwindow').hide();
    },


    onNextItemPreview: function () {
        if(this.previewIndex < this.resultsStore.totalCount){
            this.previewIndex++;
            this.updatePreview();
        }
    },

    onPrevItemPreview: function () {
        if(this.previewIndex > 0){
            this.previewIndex--;
            this.updatePreview();
        }
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
        /*
         regrettable but necessary call to the SearchController directly.  The target method
         'buildSearchObject' needs to return the request object, but when an event is fired it can
         only return a boolean.  If anyone thinks of a way around it, please feel free to update.
         */
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
                return true;

            }   else    {

                return false;
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
            return true;

        }   else    {

            return false;
        }
    }
});