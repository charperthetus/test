Ext.define('Savanna.map.controller.MapController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.map.view.part.EditFeature'
    ],

    drawToolInUse: 'none',
    modifyTool: 'disabled',

    control: {
        ol3Map: {
            resize: 'updateMapSize',
            clickEvent: 'clickEvent',
            userFeatureAdded: 'addFeatureEvent'
        },

        addPointFeature: {
            click: 'activateDrawPoint'
        },

        drawLineFeature: {
            click: 'activateDrawLine'
        },

        drawPolygonFeature: {
            click: 'activateDrawPolygon'
        }
    },

    init: function() {
        EventHub.on('unselectFeature', this.unselectFeature, this);
        EventHub.on('updateFeatureView', this.updateFeatureView, this);
        EventHub.on('removeCurrentFeature', this.removeCurrentFeature, this);
        this.callParent(arguments);
    },

    destroy: function() {
        EventHub.un('unselectFeature', this.unselectFeature, this);
        EventHub.un('updateFeatureView', this.updateFeatureView, this);
        EventHub.un('removeCurrentFeature', this.removeCurrentFeature, this);
        this.callParent(arguments);
    },

    addFeatureEvent: function (evt) {
        var feature = evt.features[0];

        /*
        Set the default fields for the user layer
         */
        feature.values_.Feature_Type = this.drawToolInUse;
        feature.values_.Date_Created = Ext.Date.format(new Date(), 'F j, Y, g:i a');
        feature.values_.Title = 'None';
        feature.values_.Location_Description = 'None';
        feature.values_.Importance = Math.floor(Math.random() * (100 - 3 + 1)) + 3;

        /*
        Remove the draw interaction from the map
         */
        var mapCanvas = this.getOl3Map();
        var map = mapCanvas.map;
        map.removeInteraction(map.drawInteraction);
        map.drawInteraction = {};

        /*
        Add the select interaction back to the map
         */
        map.addInteraction(map.selectInteraction);

        var mapComponent = mapCanvas.up('mapcomponent');
        mapComponent.down('#addPointFeature').enable();
        mapComponent.down('#drawLineFeature').enable();
        mapComponent.down('#drawPolygonFeature').enable();
        this.drawToolInUse = 'none';
    },

    checkUserLayerStatus: function () {
        var mapView = this.getOl3Map();
        if (!mapView.getUserLayer()) {
            var userLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                }),
                id: 'vector',
                style: new ol.style.Style({
                    rules: [
                        new ol.style.Rule({
                            filter: 'renderIntent("selected")',
                            symbolizers: [
                                new ol.style.Shape({
                                    fill: new ol.style.Fill({
                                        color: '#0099ff',
                                        opacity: 1
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color: 'white',
                                        opacity: 0.75
                                    }),
                                    size: 14
                                }),
                                new ol.style.Fill({
                                    color: '#ffffff',
                                    opacity: 0.5
                                }),
                                new ol.style.Stroke({
                                    color: 'white',
                                    width: 5
                                }),
                                new ol.style.Stroke({
                                    color: '#0099ff',
                                    width: 3
                                })
                            ]
                        }),
                        new ol.style.Rule({
                            filter: 'renderIntent("temporary")',
                            symbolizers: [
                                new ol.style.Shape({
                                    fill: new ol.style.Fill({
                                        color: '#0099ff',
                                        opacity: 1
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color: 'white',
                                        opacity: 0.75
                                    }),
                                    size: 14,
                                    zIndex: 1
                                })
                            ]
                        }),
                        new ol.style.Rule({
                            filter: 'renderIntent("future")',
                            symbolizers: [
                                new ol.style.Shape({
                                    fill: new ol.style.Fill({
                                        color: '#00ff33',
                                        opacity: 1
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color: 'white',
                                        opacity: 0.75
                                    }),
                                    size: 14,
                                    zIndex: 1
                                })
                            ]
                        })
                    ],
                    symbolizers: [
                        new ol.style.Shape({
                            fill: new ol.style.Fill({
                                color: '#ffcc33',
                                opacity: 1
                            }),
                            size: 14
                        }),
                        new ol.style.Fill({
                            color: 'white',
                            opacity: 0.2
                        }),
                        new ol.style.Stroke({
                            color: '#ffcc33',
                            width: 2
                        })
                    ]
                })
            });
            mapView.setUserLayer(userLayer);
            mapView.map.addLayer(userLayer);
            userLayer.on('featureadd', function (arguments) {
                mapView.fireEvent('userFeatureAdded', arguments)
            }, mapView);
        }
    },

    activateDrawPoint: function () {
        var mapView = this.getOl3Map();
        var map = mapView.map;
        var mapComponent = mapView.up('mapcomponent');
        this.checkUserLayerStatus();

        /*
         Remove the select interaction from the map while feature is being drawn
         */
        map.removeInteraction(map.selectInteraction);

        /*
         need to find better way of calling userCreatedLayer
         */
        var targetLayer = mapView.getUserLayer();

        /*
         Disable buttons while drawing feature
         */
        mapComponent.down('#addPointFeature').disable();
        mapComponent.down('#drawLineFeature').disable();
        mapComponent.down('#drawPolygonFeature').disable();
        this.drawToolInUse = 'point';

        map.drawInteraction = new ol.interaction.Draw({
            layer: targetLayer,
            type: 'point'
        });
        map.addInteraction(map.drawInteraction);
    },

    activateDrawLine: function () {
        var mapView = this.getOl3Map();
        var map = mapView.map;
        var mapComponent = mapView.up('mapcomponent');
        this.checkUserLayerStatus();

        /*
        Remove the select interaction from the map while feature is being drawn
         */
        map.removeInteraction(map.selectInteraction);

        /*
        need to find better way of calling userCreatedLayer
         */
        var targetLayer = mapView.getUserLayer();

        /*
        Disable buttons while drawing feature
         */
        mapComponent.down('#addPointFeature').disable();
        mapComponent.down('#drawLineFeature').disable();
        mapComponent.down('#drawPolygonFeature').disable();
        this.drawToolInUse = 'linestring';

        map.drawInteraction = new ol.interaction.Draw({
            layer: targetLayer,
            type: 'linestring'
        });
        map.addInteraction(map.drawInteraction);

    },

    activateDrawPolygon: function () {
        var mapView = this.getOl3Map();
        var map = mapView.map;
        var mapComponent = mapView.up('mapcomponent');
        this.checkUserLayerStatus();

        /*
         Remove the select interaction from the map while feature is being drawn
         */
        map.removeInteraction(map.selectInteraction);

        /*
         need to find better way of calling userCreatedLayer
         */
        var targetLayer = mapView.getUserLayer();

        /*
         Disable buttons while drawing feature
         */
        mapComponent.down('#addPointFeature').disable();
        mapComponent.down('#drawLineFeature').disable();
        mapComponent.down('#drawPolygonFeature').disable();
        this.drawToolInUse = 'polygon';

        map.drawInteraction = new ol.interaction.Draw({
            layer: targetLayer,
            type: 'polygon'
        });
        map.addInteraction(map.drawInteraction);
    },

    getSelectedFeature: function (layerList) {
        var selection = [];
        for (var i = 0; i < layerList.length; i++) {
            if (layerList[i].featureCache_){
                var pathToIntent = layerList[i].featureCache_.idLookup_;
                for (var key in pathToIntent) {
                    if (pathToIntent[key].renderIntent_ === 'selected') {
                        selection.push(pathToIntent[key]);
                    }
                }
            }
        }
        this.getOl3Map().setCurrentSelection(selection);
    },

    clickEvent: function (evt) {
        var mapComponent = this.getOl3Map().up('mapcomponent');
        var map = mapComponent.down('ol3mapcomponent').map;
        var layersQuery = map.getLayers().array_;
        this.getSelectedFeature(layersQuery);
        if (this.getOl3Map().getCurrentSelection().length > 0) {
            if (this.getOl3Map().getCurrentSelection().length <= this.getOl3Map().getFeatureIndex()){
                this.getOl3Map().setFeatureIndex(0);
                this.updateFeatureView();
            } else {
                this.updateFeatureView();
            }
        } else {
            if (mapComponent.down('map_edit_feature')) {
                mapComponent.down('map_edit_feature').destroy();
                mapComponent.down('#featureDetailsView').collapse();
            }
        }
    },


    updateMapSize: function() {
        this.getOl3Map().getMap().updateSize();
    },

    unselectFeature: function () {
        var selection = this.getOl3Map().getCurrentSelection();
        for (var i = 0; i < selection.length; i++) {
            if (selection[i].featureCache_){
                var pathToIntent = selection[i].featureCache_.idLookup_;
                for (var key in pathToIntent) {
                    if (pathToIntent[key].renderIntent_ === 'selected'){
                        pathToIntent[key].setRenderIntent('default');
                    }
                }
            }
        }
    },

    updateFeatureView: function () {
        if (this.drawToolInUse === 'none'){
            var currentSelection = this.getOl3Map().getCurrentSelection();
            var mapComponent = this.getOl3Map().up('mapcomponent');
            var currentIndex = this.getOl3Map().getFeatureIndex();
            var currentFeature = currentSelection[currentIndex];
            if (mapComponent.down('map_edit_feature') != null) {
                mapComponent.down('map_edit_feature').destroy();
            }
            var editFeatureView = Ext.create('Savanna.map.view.part.EditFeature');
            var userLayer = this.getOl3Map().getUserLayer();
            var inUserLayer = false;
            for (var key in userLayer.featureCache_.idLookup_) {
                if (currentFeature === userLayer.featureCache_.idLookup_[key]){
                    inUserLayer = true;
                }
            }
            if (inUserLayer === false) {
                editFeatureView.down('#removeFeature').disable();
            }
            var featureDetailsView = mapComponent.down('#featureDetailsView');
            featureDetailsView.add(editFeatureView);
            editFeatureView.show();
            editFeatureView.down('#featureIndexDisplay').setText((currentIndex + 1) + ' of ' + currentSelection.length);
            editFeatureView.down('#previousFeature').setDisabled((currentIndex > 0)? false:true);
            editFeatureView.down('#nextFeature').setDisabled((currentIndex < currentSelection.length -1)? false:true);
            this.setUpEditWindow(currentFeature, editFeatureView);
            featureDetailsView.expand();
        }
    },

    setUpEditWindow: function (feature, editFeatureView) {
        var items = [];
        var attributes = feature.values_;
        for (var key in attributes) {
            if (key != 'geometry') {
                items.push({field: key, value: attributes[key]})
            }
        }
        var data = {'items': items};
        var columns = [
            {text: 'Field Name', dataIndex: 'field', flex: 1, menuDisabled: true},
            {text: 'Value', dataIndex: 'value', flex: 1, menuDisabled: true, editor: 'textfield'}
        ];
        var gridStore = Ext.create('Ext.data.Store', {
            fields: ['field','value'],
            data: data,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }});
        editFeatureView.reconfigure(gridStore, columns);
    },

    removeCurrentFeature: function () {
        var userLayer = this.getOl3Map().getUserLayer();
        var currentSelection = this.getOl3Map().getCurrentSelection();
        var currentIndex = this.getOl3Map().getFeatureIndex();
        userLayer.removeFeatures([currentSelection[currentIndex]]);
        currentSelection.splice(currentIndex,1);
        this.getOl3Map().setFeatureIndex(0);
        this.updateFeatureView();
    }
});