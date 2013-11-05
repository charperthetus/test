/* global Ext: false, OpenLayers: false, SavannaConfig: false */

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
        var me = this;
        this.control({
            'search_resultscomponent': {
                'render': function (search) {
                    me.component = search;  // temporary measure, pending deft conversion next week

                    //Keelan asked that I use UI event bubbling...
                    //The pattern I've been using is for the controller of the child to fire the event on it's controlled view.
                    //Then we catch the event in all the "parent controllers" by listening to events on their controlled views. (See below)
                    me.component.on('search:PageSizeChanged', this.onPageSizeChange, this);
                    me.component.on('search:SortByChanged', this.onSortOrderChange, this);
                    me.component.on('search:changeSelectedStore', this.changeSelectedStore, this);

                    //grid notifications
                    me.component.on('search:grid:itemdblclick', this.onItemPreview, this);
                    me.component.on('search:grid:itemclick', this.onItemClick, this);
                    me.component.on('search:grid:itemmouseenter', this.onItemMouseEnter, this);
                    me.component.on('search:grid:itemmouseleave', this.onItemMouseLeave, this);


                    //The exception is for popups....
                    //We can listen for events fired in  a popup this way (just like we did in Flex).
                    var dispatcher = this.previewWindow();
                    dispatcher.on('search:previewNextButton', this.onNextItemPreview, this);
                    dispatcher.on('search:previewPrevButton', this.onPrevItemPreview, this);
                }
            },


            'search_resultscomponent #resultsFacetsReset': {
                'click': this.onDalReset
            },
            'search_searchcomponent #resultMapCanvas': {
                afterrender: this.loadVectorLayer,
                resize: this.onMapCanvasResize
            },
            'search_searchcomponent #resultspanel button': {
                click: this.changeResultView
            },
            'search_searchcomponent #gridtoolbar': {
                change: this.gridStoreLoad
            },
            'search_searchcomponent #searchMapCanvas': {
                searchPolygonAdded: this.addSearchPolygon,
                searchPolygonRemoved: this.removeSearchPolygon
            },
            'search_searchcomponent #mapResultNext': {
                'click': this.navigateMapResult
            },
            'search_searchcomponent #mapResultPrev': {
                'click': this.navigateMapResult
            },
            'search_searchcomponent #openThumbButton': {
                'click': this.mapShowDocumentThumbnail
            },
            'search_searchcomponent #openDocButton': {
                'click': this.mapOpenDocument
            },
            'search_searchcomponent #popup-preview-button': {
                'click': this.mapOpenDocumentPreview
            },
            'search_searchcomponent search_resultscomponent': {
                'clearPopUpOnNewSearch': this.hidePopUp
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
        return  this.getResultsComponent().down('search_resultspanelgrid');
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

    getCurrentDalId: function () {
        return this.getResultsComponent().currentResultSet.id;
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

        var me = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
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

    onItemPreview: function (grid, record, node, index) {
        this.resultsGrid = grid;
        this.resultsStore = grid.store;
        //gaaaahhh    the index passed in does not include all the pages that have come before.
        //gaaaahhh*10 the current page is 1-based.
        this.previewIndex = index + (this.resultsStore.currentPage - 1) * (this.resultsStore.pageSize);
        this.updatePreview();
    },

    onItemMouseEnter: function (view, rec, node) {    // other parameters: , index, e, options
        if (node) {
            node.querySelector('#hoverDiv').style.visibility = 'visible';
        }
    },

    onItemClick: function (view, rec, node, index, e) {  //other parameter options
        //TODO - the way of getting this button is wrong, refactor
        if (e && e.target && e.target.className.indexOf('openButtonClass') != -1) {
            EventHub.fireEvent('open', {uri: rec.data.uri, type: rec.data.contentType, label: rec.data.title});
        }
    },

    onItemMouseLeave: function (view, rec, node) {  // other parameters: , index, e, options
        if (node) {
            node.querySelector('#hoverDiv').style.visibility = 'hidden';
        }
    },

    onNextItemPreview: function () {
        if (this.previewIndex >= this.resultsStore.totalCount) {
            return;
        } else {
            this.previewIndex++;
            this.updatePreview();
        }
    },

    onPrevItemPreview: function () {
        if (this.previewIndex <= 0) {
            return;
        } else {
            this.previewIndex--;
            this.updatePreview();
        }
    },


    onDalReset: function (btn) {
        var id = this.getCurrentDalId();
        var dalRecord = Ext.data.StoreManager.lookup('dalSources').getById(id),
            resultsDals = btn.up('#resultsdals'),
            resultsTerms = resultsDals.down('search_resultsDals_resultsterms');

        dalRecord.set('facetFilterCriteria', []);
        dalRecord.set('dateTimeRanges', []);
        resultsDals.queryById('resultsfacets').removeAll();
        resultsDals.createFacetsTabPanel();
        btn.findParentByType('search_searchcomponent').refineSearchString = '';

        resultsTerms.queryById('termValues').removeAll();

        this.getApplication().fireEvent('results:dalreset', btn);
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
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        var searchComponent = this.getResultsComponent().findParentByType('search_searchcomponent');
        var currentDalPanel = searchComponent.down('#searchdals').queryById(id);
        var searchString = searchComponent.queryById('searchbar').buildSearchString();
        var searchObj = searchController.buildSearchObject(searchString, dalRecord, currentDalPanel);

        dalRecord.set('resultsPerPage', newSize);

        this.getApplication().fireEvent('results:buildAndLoadResultsStore', dalRecord, searchComponent, searchObj, 'filter', newSize);

    },

    /*
     swaps the store assigned to our grid based on whichever DAL the
     user selects from the left-hand panel, and triggers an update
     of the facets for the newly selected store.
     */
    changeSelectedStore: function ( dal) {

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
    },

    onMapCanvasResize: function (canvas) {
        canvas.map.updateSize();
    },

    loadVectorLayer: function (canvas) {
        ////////////////////////////////////////
        //Begin setting up style for result layer
        var colors = {
            low: '#B5E28C',
            middle: '#F1D357',
            high: '#FD9C73'
        };

        var singleRule =  new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: 'count',
                value: 1
            }),
            symbolizer: {
                externalGraphic: './resources/OpenLayers-2.13.1/img/mapMarker.png',
                graphicWidth: 32,
                graphicHeight: 32,
                fillOpacity: 1
            }
        });


        var lowRule = new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: 'count',
                lowerBoundary: 2,
                upperBoundary: 15
            }),
            symbolizer: {
                fillColor: colors.low,
                fillOpacity: 0.9,
                strokeColor: colors.low,
                strokeOpacity: 0.5,
                strokeWidth: 12,
                pointRadius: 10,
                label: '${count}',
                labelOutlineWidth: 1,
                fontColor: '#ffffff',
                fontOpacity: 0.8,
                fontSize: '12px'
            }
        });
        var middleRule = new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: 'count',
                lowerBoundary: 15,
                upperBoundary: 50
            }),
            symbolizer: {
                fillColor: colors.middle,
                fillOpacity: 0.9,
                strokeColor: colors.middle,
                strokeOpacity: 0.5,
                strokeWidth: 12,
                pointRadius: 15,
                label: '${count}',
                labelOutlineWidth: 1,
                fontColor: '#ffffff',
                fontOpacity: 0.8,
                fontSize: '12px'
            }
        });
        var highRule = new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.GREATER_THAN,
                property: 'count',
                value: 50
            }),
            symbolizer: {
                fillColor: colors.high,
                fillOpacity: 0.9,
                strokeColor: colors.high,
                strokeOpacity: 0.5,
                strokeWidth: 12,
                pointRadius: 20,
                label: '${count}',
                labelOutlineWidth: 1,
                fontColor: '#ffffff',
                fontOpacity: 0.8,
                fontSize: '12px'
            }
        });

        // Create a Style that uses the three previous rules
        var style = new OpenLayers.Style(null, {
            rules: [singleRule, lowRule, middleRule, highRule]
        });
        //End setting up style for result layer
        ///////////////////////////////////////

        var searchLayer = new OpenLayers.Layer.Vector('searchLayer');
        var strategy = new OpenLayers.Strategy.Cluster({distance: 50, threshold: null});
        canvas.resultsLayer = new OpenLayers.Layer.Vector('resultsLayer', {
            strategies: [strategy],
            styleMap: new OpenLayers.StyleMap(style)
        });
        canvas.searchLayer = searchLayer;
        canvas.map.addLayers([searchLayer, canvas.resultsLayer]);

        canvas.controls = {
            hoverFeature : new OpenLayers.Control.SelectFeature(
                canvas.resultsLayer, {hover: true}
            )
        };

        // Add controls to map
        for(var key in canvas.controls) {
            canvas.map.addControl(canvas.controls[key])
        }

       /* This checks to see if the searchMap exists and then fire
        the event to add the search polygon
        */
        if (canvas.up('search_searchcomponent').down('searchMapCanvas')) {
            var searchMap = canvas.up('search_searchcomponent').down('searchMapCanvas');
            searchMap.fireEvent('searchPolygonAdded', this);
        }
    },

    changeResultView: function (button) {
        var mapPanel = button.up('search_resultscomponent').down('#resultsmap');
        var resultsGridPanel = button.up('search_resultscomponent').down('#resultspanelgrid');
        switch (button.itemId){
            case 'results_mapViewButton':
                resultsGridPanel.hide();
                mapPanel.show();
                break;
            case 'results_listViewButton':
                mapPanel.hide();
                resultsGridPanel.show();
                break;
        }
    },

    addSearchPolygon: function (canvas) {
      var searchLayer = canvas.searchLayer;

      //modify resultmap searchLayer to match searchmap searchLayer
      if(searchLayer.features.length > 0){
          var resultMap = canvas.up('search_searchcomponent').down('#resultMapCanvas');
          var layerFeatureArray = searchLayer.features;
          var cloneFeature = layerFeatureArray[0].clone();
          resultMap.searchLayer.removeAllFeatures();
          resultMap.searchLayer.addFeatures(cloneFeature);
      }
    },

    removeSearchPolygon: function (canvas) {
        var resultMap = canvas.up('search_searchcomponent').down('#resultMapCanvas');
        //clear all features
        if (resultMap.searchLayer.features.length > 0){
            resultMap.searchLayer.removeAllFeatures();
        }
    },

    loadPointsFromStore: function (grid) {
        var mapCanvas = grid.up('search_searchcomponent').down('#resultMapCanvas');
        if (mapCanvas.resultsLayer.features.length > 0) {
            mapCanvas.resultsLayer.removeAllFeatures();
        }
        var searchResults = grid.store.data.items;
        var searchResultList = [];
        for (var i = 0; i < searchResults.length; i++) {
            var resultPoints = searchResults[i].data.latLonPairs;
            if (resultPoints !== null) {
                var baseLayer = SavannaConfig.mapDefaultBaseLayer;
                var currentProjection,
                    resultsProjection;
                var transform = false;
                var uniqueResults = {};

                /*
                 Check to see if the projection of the base layer is EPSG:4326. Convert vector layer otherwise.
                 */

                if (baseLayer.projection != 'EPSG:4326'){
                    currentProjection = new OpenLayers.Projection(baseLayer.projection);
                    resultsProjection = new OpenLayers.Projection("EPSG:4326");
                    transform = true;
                }

                /*
                Eliminate duplicate points
                 */

                for (var j = 0; j < resultPoints.length; j++) {
                    var uriKey = searchResults[i].data.uri + "_" + resultPoints[j].name;
                    //if the unique uri_location exits
                    if (uniqueResults[uriKey]) {
                        uniqueResults[uriKey].count += 1;
                    } else {
                        uniqueResults[uriKey] = {
                            'count' : 1,
                            'title' : searchResults[i].data.title,
                            'uri' : searchResults[i].data.uri,
                            'contentType': searchResults[i].data.contentType,
                            'previewString' : searchResults[i].data.previewString,
                            'name' : resultPoints[j].name,
                            'publishedDate' : searchResults[i].data.publishedDate,
                            'composite' : searchResults[i].data.composite,
                            'fileType' : searchResults[i].data.fileType,
                            'latitude' : resultPoints[j].latitude,
                            'longitude' : resultPoints[j].longitude
                        }
                    }
                }

                /*
                 Push the new vector point to the to the searchResultList Array
                 */

                for (var key in uniqueResults){
                    var newItem = uniqueResults[key];
                    var newPoint = new OpenLayers.LonLat(newItem.longitude, newItem.latitude);
                    if (transform) {newPoint.transform(resultsProjection, currentProjection)}
                    searchResultList.push(new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(newPoint.lon, newPoint.lat), {
                        'title': newItem.title,
                        'previewString': newItem.previewString,
                        'contentType': newItem.contentType,
                        'uri': newItem.uri,
                        'composite': newItem.composite,
                        'publishedDate': newItem.publishedDate,
                        'fileType': newItem.fileType,
                        'name': newItem.name
                    }));
                }

            }
        }
        mapCanvas.resultsLayer.addFeatures(searchResultList);

        if (mapCanvas.resultsLayer.events.listeners.featureselected){
            mapCanvas.resultsLayer.events.listeners.featureselected = null;
            mapCanvas.resultsLayer.events.listeners.featureunselected = null;
        }

        mapCanvas.controls.hoverFeature.activate();
        mapCanvas.resultsLayer.events.register('featureselected', null, Ext.bind(this.displayMapPopUp, this, [mapCanvas], true));
        mapCanvas.resultsLayer.events.register('featureunselected', null, Ext.bind(this.hidePopUp, this, [mapCanvas], true));

    },

    displayMapPopUp: function(event, mapCanvas) {
        var featurePopUp = mapCanvas.up('search_resultsmap').down('#featurePopUp');
        var featureLocation = event.feature.geometry;
        this.setPopUpTemplate(event, featurePopUp, this);
        featurePopUp.show();
        this.position(featurePopUp, mapCanvas, featureLocation);
    },

    hidePopUp: function (event, scope) {
        var featurePopUp = scope.up('search_searchcomponent').down('#featurePopUp');
        featurePopUp.down('#mapResultPrev').disable();
        featurePopUp.down('#mapResultNext').disable();
        featurePopUp.hide();
    },

    setPopUpTemplate: function (event, featurePopUp, controller){
        featurePopUp.store = event.feature.cluster;
        featurePopUp.currentIndex = 0;
        controller.setPopUpContent(featurePopUp);
    },

    position: function(featurePopUp, mapCanvas, featureLocation) {
        //define the position that the popup window and assign class to popup anchor
        var locationPx = mapCanvas.map.getPixelFromLonLat(new OpenLayers.LonLat(featureLocation.x, featureLocation.y));
        var dom = Ext.dom.Query.select('.popUpAnchor');
        var popUpAnchor = Ext.get(dom[0]);
        popUpAnchor.removeCls("top left right bottom");
        var mapBox = mapCanvas.getBox(true);
        var top = null;
        var left = null;
        var ancLeft = null;
        var ancTop = null;
        var elSize = featurePopUp.el.getSize();

        var horizontalOffset = (locationPx.x > mapBox.width / 2) ? 'right' : 'left';
        var verticalOffset = (locationPx.y > mapBox.height / 2) ? 'bottom' : 'top';
        popUpAnchor.addCls(horizontalOffset);
        popUpAnchor.addCls(verticalOffset);
        var anchorSize = popUpAnchor.getSize();

        if (horizontalOffset === 'right') {
            left = locationPx.x - elSize.width;
            ancLeft = elSize.width - anchorSize.width;
        } else {
            left = locationPx.x;
            ancLeft = 0;
        }
        if (verticalOffset === 'bottom') {
            top = locationPx.y - (elSize.height + anchorSize.height);
            ancTop = elSize.height;
        } else {
            top = locationPx.y + anchorSize.height;
            ancTop -= anchorSize.height;
        }
        //Set the position of the feature popup panel and the popup anchor
        featurePopUp.setPosition(left, top);
        popUpAnchor.setLeftTop(ancLeft, ancTop);
    },

    navigateMapResult: function (button) {
        var me = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
        var featurePopUp = button.up('search_featurepopup');
        if(featurePopUp.currentIndex <= featurePopUp.store.length -1){
            featurePopUp.currentIndex += (button.direction === 'next')? 1:-1;
        }
        me.setPopUpContent(featurePopUp);

    },

    setPopUpContent: function (featurePopUp){
        var data = featurePopUp.store[featurePopUp.currentIndex].data;
        featurePopUp.down('#popup-index-count').setText('Result ' + (featurePopUp.currentIndex + 1) + ' of ' + featurePopUp.store.length);
        featurePopUp.down('#popup-title').setText(this.parseTitle(data.title));
        featurePopUp.down('#popup-location-text').setText('Location: ' + data.name);
        featurePopUp.down('#popup-preview-text').setText(data.composite + ' - ' + this.parseDate(new Date(data.publishedDate)) + ' - ' + data.fileType + ' - ' + data.previewString);
        featurePopUp.update(featurePopUp.store[featurePopUp.currentIndex]);
        featurePopUp.down('#mapResultPrev').setDisabled((featurePopUp.currentIndex > 0)? false:true);
        featurePopUp.down('#mapResultNext').setDisabled((featurePopUp.currentIndex < featurePopUp.store.length -1)? false:true);
        featurePopUp.updateLayout();
    },

    parseDate: function (v) {
        return Ext.Date.format(new Date(v), 'F d, Y');
    },

    parseTitle: function (v) {
        var title = "";
        if(v){
            title =  (v.length > 40) ? v.substring(0,40) + "..." : v;
        }
        return title;
    },

    mapShowDocumentThumbnail: function (button) {
        var documentDetails = this.getPopupDocumentRecord(button);
        /*
        Disabled until design for thumbnail view is finalized
         */
    },

    mapOpenDocument: function (button) {
        var documentDetails = this.getPopupDocumentRecord(button);
        EventHub.fireEvent('open', documentDetails);
    },

    mapOpenDocumentPreview: function (button) {
        var me = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
        var documentDetails = this.getPopupDocumentRecord(button);
        me.resultsStore = button.up('search_searchcomponent').down('search_resultspanelgrid').store;

        var record = me.resultsStore.query('uri', documentDetails.uri).items[0],
            recordMetadata;

        if(me.getResultsComponent().currentResultSet.metadata)   {
            recordMetadata = me.getResultsComponent().currentResultSet.metadata.getById(record.data.uri);
        }

        me.setIsWaitingForPreviewResults ( false );

        var win = me.previewWindow();
        //Show the contents
        win.displayPreview(record.data, recordMetadata.get('datastore'), record.index, me.resultsStore.totalCount);
    },

    getPopupDocumentRecord: function (button) {
        var featurePopUp = button.up('search_featurepopup');
        var uri = featurePopUp.store[featurePopUp.currentIndex].data.uri;
        var contentType = featurePopUp.store[featurePopUp.currentIndex].data.contentType;
        var title = featurePopUp.store[featurePopUp.currentIndex].data.title;
        return {uri: uri, type: contentType, label: title}
    },
    
    gridStoreLoad: function (grid) {
        var me = Savanna.controller.Factory.getController('Savanna.search.controller.ResultsComponent');
        var event = null;
        me.hidePopUp(event, grid);
        me.loadPointsFromStore(grid);
    }
});