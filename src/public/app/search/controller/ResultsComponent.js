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
            /*
             regrettable but necessary call to the SearchController directly.  The target method
             'buildSearchObject' needs to return the request object, but when an event is fired it can
             only return a boolean.  If anyone thinks of a way around it, please feel free to update.
             */
            searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent'),
            component = comboboxComponent.findParentByType('search_searchcomponent'),
            currentDalPanel = component.down('#searchdals').queryById(id),
            mapView = component.down('#searchMapCanvas'),
            searchString = component.queryById('searchbar').buildSearchString(),
            searchObj = searchController.buildSearchObject(searchString, dalRecord, currentDalPanel, mapView);

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
            low: "rgb(181, 226, 140)",
            middle: "rgb(241, 211, 87)",
            high: "rgb(253, 156, 115)"
        };

        var singleRule =  new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                property: "count",
                value: 1
            }),
            symbolizer: {
                externalGraphic: "./resources/images/mapMarker.png",
                graphicWidth: 32,
                graphicHeight: 32,
                fillOpacity: 1
            }
        });


        var lowRule = new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: "count",
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
                label: "${count}",
                labelOutlineWidth: 1,
                fontColor: "#ffffff",
                fontOpacity: 0.8,
                fontSize: "12px"
            }
        });
        var middleRule = new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.BETWEEN,
                property: "count",
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
                label: "${count}",
                labelOutlineWidth: 1,
                fontColor: "#ffffff",
                fontOpacity: 0.8,
                fontSize: "12px"
            }
        });
        var highRule = new OpenLayers.Rule({
            filter: new OpenLayers.Filter.Comparison({
                type: OpenLayers.Filter.Comparison.GREATER_THAN,
                property: "count",
                value: 50
            }),
            symbolizer: {
                fillColor: colors.high,
                fillOpacity: 0.9,
                strokeColor: colors.high,
                strokeOpacity: 0.5,
                strokeWidth: 12,
                pointRadius: 20,
                label: "${count}",
                labelOutlineWidth: 1,
                fontColor: "#ffffff",
                fontOpacity: 0.8,
                fontSize: "12px"
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
        canvas.resultsLayer = new OpenLayers.Layer.Vector("resultsLayer", {
            strategies: [strategy],
            styleMap: new OpenLayers.StyleMap(style)
        });
        canvas.searchLayer = searchLayer;
        canvas.map.addLayers([searchLayer, canvas.resultsLayer]);
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
          var resultMap = canvas.up('search_searchcomponent').down('#resultMapCanvas')
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
        for (var i = 0; i < searchResults.length; i++) {
            var attributes = {};
            attributes.title = searchResults[i].data.title;
            attributes.previewString = searchResults[i].data.previewString;
            attributes.contentDocUri = searchResults[i].data.contentDocUri;
            var resultPoints = searchResults[i].data.latLonPairs;
            if (resultPoints != null) {
                for (var j = 0; j < resultPoints.length; j++) {
                    attributes.name = resultPoints[j].name;
                    searchResultList.push(new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(resultPoints[j].longitude, resultPoints[j].latitude), attributes));
                }
            }
        }
        var mapCanvas = scope.up('search_searchcomponent').down('#resultMapCanvas');
        if (mapCanvas.resultsLayer.features.length > 0) {
            mapCanvas.resultsLayer.removeAllFeatures();
        }
        mapCanvas.resultsLayer.addFeatures(searchResultList);

    }
});