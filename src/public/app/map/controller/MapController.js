Ext.define('Savanna.map.controller.MapController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.map.view.part.EditFeature'
    ],

    drawToolInUse: 'none',
    identifyTool: 'disabled',
    modifyTool: 'disabled',

    control: {
        ol3Map: {
            resize: 'updateMapSize',
            clickEvent: 'clickEvent',
            dragStart: 'hideDataCard',
            userFeatureAdded: 'addFeatureEvent',
            zoomEvent: 'hideDataCard'
        },

        addPointFeature: {
            click: 'activateDrawPoint'
        },

        drawLineFeature: {
            click: 'activateDrawLine'
        },

        drawPolygonFeature: {
            click: 'activateDrawPolygon'
        },

        identifyFeature: {
            click: 'activateIdentify'
        },

        modifyFeatureTool: {
            click: 'activateModifyTool'
        }
    },

    init: function() {
        EventHub.on('hideDataCard', this.hideDataCard, this);
        EventHub.on('unselectFeature', this.unselectFeature, this);
        this.callParent(arguments);
    },

    destroy: function() {
        EventHub.un('hideDataCard', this.hideDataCard, this);
        EventHub.un('unselectFeature', this.unselectFeature, this);
        this.callParent(arguments);
    },

    addFeatureEvent: function (evt) {
        var feature = evt.features[0];
        feature.attributes = [
            {field: "Feature_Type", value: this.drawToolInUse},
            {field: "Date_Created", value: Ext.Date.format(new Date(), 'F j, Y, g:i a')},
            {field: "Title", value: 'None'},
            {field: "Location_Description", value: 'None'},
            {field: "Importance", value: Math.floor(Math.random() * (100 - 3 + 1)) + 3}
        ];
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
        this.hideDataCard();
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
        this.hideDataCard();
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
        this.hideDataCard();
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
                        selection.push(layerList[i]);
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
        var features = mapComponent.down('ol3mapcomponent').getCurrentSelection();
        if (features.length === 1 && this.identifyTool === 'active') {
            this.displayDataCard(features[0], evt, mapComponent);
            this.getIdentifyFeature().enable();
            this.getModifyFeatureTool().enable();
            this.identifyTool = 'disabled';
        } else if (features.length === 1 && this.modifyTool === 'active'){
            this.hideDataCard();
            this.handleModifyInteraction();
        } else {
            this.hideDataCard();
            if (this.getOl3Map().map.modifyInteraction != null) {
                this.getOl3Map().map.removeInteraction(this.getOl3Map().map.modifyInteraction);
                this.getOl3Map().map.modifyInteraction = null;
            }
            this.getIdentifyFeature().enable();
            this.getModifyFeatureTool().enable();
            this.modifyTool = 'disabled';
            this.identifyTool = 'disabled';
        }
    },


    updateMapSize: function() {
        this.getOl3Map().getMap().updateSize();
    },

    removeSelectedFeature: function () {
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var mapView = mapComponent.down('ol3mapcomponent');
        var userVectorLayer = mapView.getUserLayer();
        var features = userVectorLayer.featureCache_.idLookup_;
        for (var key in features) {
            if (features[key].renderIntent_ === 'selected') {
                userVectorLayer.removeFeatures([features[key]]);
            }
            this.hideDataCard();
        }
    },

    displayDataCard: function (feature, evt, mapComponent) {
        var dataCard = mapComponent.down('#featureDataCard');
        if (this.drawToolInUse === 'none'){
            this.setUpDataCardContent(feature, mapComponent);
            dataCard.show();
            this.position(dataCard, mapComponent, evt.pixel_);
        }
    },

    setUpDataCardContent: function (layer, mapComponent) {
        var dataCardGrid = mapComponent.down('map_popup_datacard');
        var featureList = layer.featureCache_.idLookup_;
        for (var key in featureList) {
            if (featureList[key].renderIntent_ === 'selected') {
                var selectedFeature = featureList[key];
                var dataItems = [];
                var attributes = featureList[key].attributes;
                for (var i = 0; i < attributes.length; i++) {
                    dataItems.push(attributes[i]);
                }
                var data = {'items': dataItems};
                var columns = [
                    {text: 'Field Name', dataIndex: 'field', flex: 1, menuDisabled: true},
                    {text: 'Value', dataIndex: 'value', flex: 1, menuDisabled: true}
                ];
                dataCardGrid.reconfigure(Ext.create('Ext.data.Store', {
                    fields: ['field','value'],
                    data: data,
                    proxy: {
                        type: 'memory',
                        reader: {
                            type: 'json',
                            root: 'items'
                        }
                    }}), columns);
            }
        }
        dataCardGrid.setCurrentFeature(selectedFeature);
    },

    position: function(dataCard, mapComponent, pixel) {
        //define the position that the popup window and assign class to popup anchor
        var dom = Ext.dom.Query.select('.popUpAnchor');
        var dataCardAnchor = Ext.get(dom[0]);
        dataCardAnchor.removeCls("top left right bottom");
        var mapBox = mapComponent.getBox(true);
        var shift;
        var top = null;
        var left = null;
        var ancLeft = null;
        var ancTop = null;

        var horizontalOffset = (pixel[0] > mapBox.width / 2) ? 'right' : 'left';
        var verticalOffset = (pixel[1] > mapBox.height / 2) ? 'bottom' : 'top';
        dataCardAnchor.addCls(horizontalOffset);
        dataCardAnchor.addCls(verticalOffset);
        var anchorSize = {
            height: 44,
            width: 51
        };

        if (horizontalOffset === 'right') {
            left = pixel[0] - dataCard.width;
            if (left < 0) {
                shift = Math.abs(pixel[0] - dataCard.width) + 5;
                left = left + shift;
                ancLeft = dataCard.width - anchorSize.width - shift;
            } else {
                ancLeft = dataCard.width - anchorSize.width;
            }
        } else {
            left = pixel[0];
            if (left + dataCard.width > mapBox.width) {
                shift = (left + dataCard.width + 5) - (mapBox.width);
                left = left - shift;
                ancLeft = 0 + shift;
            } else {
                ancLeft = 0;
            }
        }
        if (verticalOffset === 'bottom') {
            top = pixel[1] - (dataCard.height + anchorSize.height);
            ancTop = dataCard.height;
        } else {
            top = pixel[1] + anchorSize.height;
            ancTop -= anchorSize.height;
        }
        //Set the position of the feature popup panel and the popup anchor
        dataCard.setPosition(left, top);
        dataCardAnchor.setLeftTop(ancLeft, ancTop);
    },

    hideDataCard: function () {
        var mapComponent = this.getOl3Map().up('mapcomponent');
        var dataCard = mapComponent.down('#featureDataCard');
        dataCard.hide();
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

    activateIdentify: function () {
        this.getIdentifyFeature().disable();
        this.getModifyFeatureTool().disable();
        this.identifyTool = 'active';
    },

    activateModifyTool: function () {
        this.getModifyFeatureTool().disable();
        this.getIdentifyFeature().disable();
        this.modifyTool = 'active';
    },

    handleModifyInteraction: function () {
        var map = this.getOl3Map().map;
        var Layers = map.getLayers().array_;
        map.modifyInteraction = new ol.interaction.Modify({
            layers: Layers
        });
        map.addInteraction(map.modifyInteraction);
        this.modifyTool = 'disabled';
    }
});