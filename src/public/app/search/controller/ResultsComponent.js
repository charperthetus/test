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
                    me.component.on('Search:PageSizeChanged', this.onPageSizeChange, this);
                    me.component.on('Search:SortByChanged', this.onSortOrderChange, this);
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
                beforerender: this.loadDefaultLayer,
                afterrender: this.loadVectorLayer,
                resize: this.onMapCanvasResize
            },
            'search_searchcomponent #resultspanel button': {
                click: this.changeResultView
            },
            'search_searchcomponent #searchMapCanvas': {
                searchPolygonAdded: this.addSearchPolygon,
                searchPolygonRemoved: this.removeSearchPolygon
            },
            'search_searchcomponent search_resultsdals': {
                mapNewSearchResults: this.loadPointsFromStore
            },
            'search_searchcomponent search_featurepopup button': {
                'click': this.navigateMapResult
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

    // The 'Preview Results 1 of xxx' label
    previewIndexAndTotalLabel: function () {
        return this.previewWindow().down('#itemIndexAndTotalLabel');
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
        if (e && e.target && e.target.id) {
            if (e.target.id === 'openButton') {
                this.openUri(rec.data.uri);
            }
        }
    },

    onItemMouseLeave: function (view, rec, node) {  // other parameters: , index, e, options
        if (node) {
            node.querySelector('#hoverDiv').style.visibility = 'hidden';
        }
    },

    openUri: function(){
        //todo open the uri...
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

    loadDefaultLayer: function (canvas) {
        canvas.map.addLayer(new OpenLayers.Layer.WMS(SavannaConfig.mapBaseLayerLabel,
            SavannaConfig.mapBaseLayerUrl, {layers: SavannaConfig.mapBaseLayerName}));
    },

    onMapCanvasResize: function (canvas) {
        canvas.map.updateSize();
    },

    loadVectorLayer: function (canvas) {
        ////////////////////////////////////////
        //Begin setting up style for result layer
        var colors = {
            low: 'rgb(181, 226, 140)',
            middle: 'rgb(241, 211, 87)',
            high: 'rgb(253, 156, 115)'
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
            selectFeature : new OpenLayers.Control.SelectFeature(
                canvas.resultsLayer, {hover: true}
            )
        };

        // Add controls to map
        for(var key in canvas.controls) {
            canvas.map.addControl(canvas.controls[key])
        }
    },

    changeResultView: function (button) {
       var mapPanel = button.up('search_resultscomponent').down('#resultsmap');
       var resultsGridPanel = button.up('search_resultscomponent').down('#resultspanelgrid');
       switch (button.text){
           case 'Map':
               resultsGridPanel.hide();
               mapPanel.show();
               break;
           case 'List':
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
          resultMap.searchLayer.removeAllFeatures();
          var cloneFeature = layerFeatureArray[0].clone();
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

    loadPointsFromStore: function (results, scope) {
        var searchResults = results.store.data.items;
        var searchResultList = [];
        var mapCanvas = scope.up('search_searchcomponent').down('#resultMapCanvas');
        for (var i = 0; i < searchResults.length; i++) {
            var attributes = {};
            attributes.title = searchResults[i].data.title;
            attributes.previewString = searchResults[i].data.previewString;
            attributes.uri = searchResults[i].data.uri;
            attributes.composite = searchResults[i].data.composite;
            attributes.publishedDate = searchResults[i].data.publishedDate;
            attributes.fileType = searchResults[i].data.fileType;
            var resultPoints = searchResults[i].data.latLonPairs;
            if (resultPoints !== null) {
                for (var j = 0; j < resultPoints.length; j++) {
                    attributes.name = resultPoints[j].name;
                    searchResultList.push(new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(resultPoints[j].longitude, resultPoints[j].latitude), attributes));
                }
            }
        }
        if (mapCanvas.resultsLayer.features.length > 0) {
            mapCanvas.resultsLayer.removeAllFeatures();
        }
        mapCanvas.resultsLayer.addFeatures(searchResultList);
        mapCanvas.controls.selectFeature.activate();
        mapCanvas.resultsLayer.events.register("featureselected", event, this.displayMapPopUp);
        mapCanvas.resultsLayer.events.register("featureunselected", event, this.destroyPopUp);

    },

    displayMapPopUp: function(event) {
        console.log(arguments);
        var resultsController = Savanna.app.getController('Savanna.search.controller.ResultsComponent');
        var resultsMap = Ext.ComponentQuery.query('search_resultscomponent')[0].down('search_resultsmap');
        var mapCanvas = resultsMap.down('#resultMapCanvas');
        var featurePopUp = resultsMap.down('#featurePopUp');
        var featureLocation = event.feature.geometry;
        resultsController.setPopUpTemplate(event, featurePopUp);
        featurePopUp.show();
        resultsController.position(featurePopUp, mapCanvas, featureLocation);
    },

    destroyPopUp: function () {
        var featurePopUp = Ext.ComponentQuery.query('search_resultscomponent')[0].down('#featurePopUp');
        var prevButton = featurePopUp.down('#mapResultPrev');
        var nextButton = featurePopUp.down('#mapResultNext');
        prevButton.disable();
        nextButton.disable();
        featurePopUp.hide();
    },

    setPopUpTemplate: function (event, featurePopUp){
        featurePopUp.removeAll(true);
        var tempData = event.feature.cluster;
        var uniqueResults = {};
        var uriCount = 0;
        //pivot the cluster feature data to group by uri & location
        for (var i = 0; i < tempData.length; i++) {
            var uri = tempData[i].data.uri + "_" + tempData[i].data.name;
            if (uniqueResults[uri]) {
                uniqueResults[uri].count += 1;
            } else {
                uriCount += 1;
                uniqueResults[uri] = {
                    'count' : 1,
                    'title' : tempData[i].data.title,
                    'uri' : uri,
                    'previewString' : tempData[i].data.previewString,
                    'name' : tempData[i].data.name,
                    'publishedDate' : tempData[i].data.publishedDate,
                    'composite' : tempData[i].data.composite,
                    'fileType' : tempData[i].data.fileType
                }
            }
        }

        (uriCount > 1) ? featurePopUp.down('#mapResultNext').enable() : featurePopUp.down('#mapResultNext').disable();
        //create "cards" of each cluster location for the popup
        var items = [];
        for (var key in uniqueResults){
            if (uniqueResults.hasOwnProperty(key)){
                var title =  (uniqueResults[key].title.length > 40) ? uniqueResults[key].title.substring(0,40) + "..." : uniqueResults[key].title;
                var item = {
                    id: uniqueResults[key].uri,
                    html: '<div style="position: relative" >' +
                    '<div id="hoverDivTop" style=" right: 0;  top: 5; position: absolute;" ><button class="openButtonClass">TN</button><button class="openButtonClass">AU</button><button class="openButtonClass">OF</button></div>' +
                    '<table>' +
                    '<tr><td colspan="2" class="map-popup-title"><strong>' + title + '</strong></td></tr>'+
                    '<tr><td colspan="2" class="map-popup-text">Location: ' + uniqueResults[key].name + '</td></tr>'+
                    '<tr><td colspan="2" class="map-popup-text">Mentions: ' + uniqueResults[key].count + '</td></tr>'+
                    '<td>(' + uniqueResults[key].composite + ') - ' +  Ext.Date.format(new Date(uniqueResults[key].publishedDate), 'F d, Y') +' - ['+ uniqueResults[key].fileType + ']<br />' +uniqueResults[key].previewString + '</td>'+
                    '</table>'+
                    '</div>'+
                    '<div id="hoverDivBottom" style=" right: 0;  bottom: 5; position: absolute;" ><button class="openButtonClass">Preview</button></div>'
                }
                items.push(item);
            }
        }
        featurePopUp.add(items)
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

        if (horizontalOffset == 'right') {
            left = locationPx.x - elSize.width;
            ancLeft = elSize.width - anchorSize.width;
        } else {
            left = locationPx.x;
            ancLeft = 0;
        }
        if (verticalOffset == 'bottom') {
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
        var featurePopUp = button.up('search_featurepopup');
        var buttonDirection = button.direction;
        var layout = featurePopUp.getLayout();
        layout[buttonDirection]();
        Ext.getCmp('mapResultPrev').setDisabled(!layout.getPrev());
        Ext.getCmp('mapResultNext').setDisabled(!layout.getNext());
    }
});