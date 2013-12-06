Ext.define('Savanna.map.controller.MapController', {
    extend: 'Deft.mvc.ViewController',
    requires: ['Savanna.map.view.part.layerUpload.LayerUploadWindow'],

    control: {
        ol3Map: {
            boxready: 'addMapBaseLayer',
            resize: 'updateMapSize',
            mapclick: 'onMapClick'
        },
        drawPointButton: {
            click: 'activateDrawPoint'
        },
        drawLineButton: {
            click: 'activateDrawLine'
        },
        drawPolygonButton: {
            click: 'activateDrawPolygon'
        },
        ol3MapLayerPanel: {
            addvector: 'addMapVectorLayer',
            addwms: 'addMapWmsLayer',
            addkml: 'addMapKmlLayer',
            upload: 'uploadLayer',
            createuserlayer: 'createUserLayer'
        },
        ol3MapLayerList: true,
        editFeaturePanel: {
            live: true,
            listeners: {
                createguidelayer: 'showCurrentFeatureOnMap',
                removecurrentfeature: 'removeFeatures'
            }
        }
    },

    addMapBaseLayer: function() {
        var baseLayer = new ol.layer.Tile({
            source: new ol.source.MapQuestOpenAerial()
        });
        baseLayer.label = 'MapQuest Aerial Tiles';
        baseLayer.id = 'baseLayer';
        this.addLayer(baseLayer);
    },

    updateMapSize: function() {
        this.getOl3Map().getMap().updateSize();
    },

    onMapClick: function(event) {
        var ol3Map = this.getOl3Map();
        var userLayer = ol3Map.getUserLayer();
        var features = userLayer.getSource().getFeatures();
        var numFeatures = features.length;

        // Remove the guide layer to disallow a selection to be made on it.
        if (ol3Map.getGuideLayer()) {
            ol3Map.getMap().removeLayer(ol3Map.getGuideLayer());
            ol3Map.setGuideLayer(null);
        }

        if(ol3Map.getNumFeatures() != numFeatures) {
            if(ol3Map.getNumFeatures() === 0) {
                this.addLayer(userLayer);
            }

            this.addFeature(features[numFeatures - 1]);

            ol3Map.setNumFeatures(numFeatures);
            ol3Map.getMap().removeInteraction(ol3Map.getInteraction());
            ol3Map.setInteraction(null);
        }
        else {
            if (!ol3Map.getInteraction()){
                var map = ol3Map.getMap();
                var shiftCheck = event.browserEvent.shiftKey;
                var pixel = map.getEventPixel(event.browserEvent);
                map.getFeatures({
                    pixel: pixel,
                    layers: map.getLayers().getArray(),
                    success: Ext.bind(this.onGetFeatures, this, [shiftCheck], true)
                });
            }
        }
    },

    addFeature: function(feature) {
        var attributes = feature.values_;
        attributes.Date_Created = Ext.Date.format(new Date(), 'F j, Y, g:i a');
        attributes.Title = 'None';
        attributes.Location_Description = 'None';
        attributes.Importance = Math.floor(Math.random() * (100 - 3 + 1)) + 3;

        this.getOl3Map().setSelectedFeatures(feature);
        this.onGetFeatures([[feature]], false);
    },

    onGetFeatures: function(features, shiftCheck) {
        var ol3Map = this.getOl3Map();

        var newSelection = [];
        for(var key in features) {
            for(var j = 0; j < features[key].length; j++) {
                var renderCheck = features[key][j].getId();
                newSelection.push({
                    layerId: key,
                    feature: features[key][j]
                });
            }
        }

        if(shiftCheck) {
            var currentSelection = ol3Map.getSelectedFeatures();
            newSelection = currentSelection.concat(newSelection);
        }
        ol3Map.setSelectedFeatures(newSelection);

        if(newSelection.length > 0 && newSelection.length <= ol3Map.getFeatureIndex()) {
            ol3Map.setFeatureIndex(0);
        }

        this.getEditFeaturePanel().fireEvent('updatefeaturepanel',
            newSelection, ol3Map.getFeatureIndex(), ol3Map.getUserLayer());
    },

    activateDrawPoint: function () {
        this.addInteraction('point');
    },

    activateDrawLine: function () {
        this.addInteraction('linestring');
    },

    activateDrawPolygon: function () {
        this.addInteraction('polygon');
    },

    addMapVectorLayer: function() {
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                parser: new ol.parser.GeoJSON(),
                url: '/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=usa:states&maxfeatures=100&outputformat=json'
            })
        });
        vectorLayer.id = 'vectorLayer';
        vectorLayer.label = 'My Vector Layer';
        this.addLayer(vectorLayer);
    },

    addMapWmsLayer: function() {
        var wmsLayer = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: '/geoserver/usa/wms',
                crossOrigin: 'anonymous',
                params: {
                    'LAYERS': 'topp:states'
                }
            })
        });
        wmsLayer.id = 'wmsLayer';
        wmsLayer.label = 'My WMS Layer';
        this.addLayer(wmsLayer);
    },

    addMapKmlLayer: function() {
        var kmlLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                parser: new ol.parser.KML(),
                url: 'http://www.corsproxy.com/earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week_age.kml',
                crossOrigin: 'anonymous'
            })
        });
        kmlLayer.id = 'kml';
        kmlLayer.label = 'USGS EarthQuake KML Service';
        this.addLayer(kmlLayer);
    },

    uploadLayer: function() {
        var window = Ext.create('Savanna.map.view.part.layerUpload.LayerUploadWindow');
        window.show();
        window.on('uploadcomplete', this.onUploadComplete, this);
    },

    onUploadComplete: function(target, tasks) {
        for(var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var workspaceName = task.target.dataStore.workspace.name;
            var layerName = task.layer.name;
            var layerId = workspaceName + ':' + layerName;

            var layer = this.createVectorLayer(layerId);
            layer.id = layerId;
            layer.label = layerName;
            this.addLayer(layer);
        }
    },

    addLayer: function(layer) {
        // Add layer to map.
        this.getOl3Map().getMap().addLayer(layer);

        var layerList = this.getOl3Map().getMap().getLayers();

        // Add layer to layer list.
        var layerIndex = this.getOl3MapLayerList().getRootNode().childNodes.length;
        var layerLabel = layer.label;
        var layerId = layer.id;

        var root = this.getOl3MapLayerList().getRootNode();
        var node = Ext.create('Savanna.map.model.LayerModel', {
            layerIndex: layerIndex,
            layerLabel: layerLabel,
            layerId: layerId
        });
        var refNode = root.firstChild;
        root.insertBefore(node, refNode);
    },

    removeLayer: function(layer) {
        // Remove layer from map.
        this.getOl3Map().getMap().removeLayer(layer);

        // Remove layer from layer list.
        var root = this.getOl3MapLayerList().getRoot();
        var node = root.findChild('layerId', layer.id);
        root.remove(node);
    },

    createVectorLayer: function(typeName) {
        var source = new ol.source.Vector({});
        if(typeName) {
            source = new ol.source.Vector({
                parser: new ol.parser.GeoJSON(),
                url: '/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + typeName
                    + '&maxfeatures=100&outputformat=json'
            });
        }
        return new ol.layer.Vector({
            source: source,
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
    },

    addInteraction: function(type) {
        var ol3Map = this.getOl3Map();
        var drawInteraction = new ol.interaction.Draw({
            layer: ol3Map.getUserLayer(),
            type: type
        });
        // Remove the current map interaction.
        ol3Map.getMap().removeInteraction(ol3Map.getInteraction());

        // Set the current map interaction so it may be referenced later.
        ol3Map.setInteraction(drawInteraction);

        // Add the new interaction.
        ol3Map.getMap().addInteraction(drawInteraction);
    },

    createUserLayer: function () {
        //TODO:move this into a deft service and use promise api
        var uuidLayerName = Ext.data.IdGenerator.get('uuid').generate();
        var username = Savanna.userInfo.username;
        var auth = 'YWRtaW46Z2Vvc2VydmVy';
        var xmlAsString =
            '<featureType>'
                + '<name>' +  uuidLayerName + '</name>'
                + '<nativeName>' +  uuidLayerName + '</nativeName>'
                + '<title>DemoLayer</title>'
                + '<srs>EPSG:4326</srs>'
                + '<attributes>'
                + '<attribute>'
                + '<name>the_geom</name>'
                + '<binding>com.vividsolutions.jts.geom.Geometry</binding>'
                + '</attribute>'
                + '<attribute>'
                + '<name>id</name>'
                + '<binding>java.lang.String</binding>'
                + '</attribute>'
                + '<attribute>'
                + '<name>attributes</name>'
                + '<binding>java.lang.String</binding>'
                + '</attribute>'
                + '</attributes>'
                + '</featureType>';
        Ext.Ajax.request({
            //todo: this will need to have the username in the url for the geoserver workspace once security is implemented
            url : '/geoserver/rest/workspaces/SAVANNA_USER_ADMIN/datastores/savanna_user_admin/featuretypes',
            method: 'POST',
            xmlData: xmlAsString,
            requestHeaders: {Authorization : auth},
            headers: {'Content-Type': 'text/xml'},
            success: function(response){
                console.log(response.responseXML);
            },
            failure: function(response){
                console.log(response.responseXML);
            }
        });

    },

    wfsUpdateAttributes: function(layerID, featureID, propertyList){
        //test wfs update command on layer
        var username = Savanna.userInfo.username;
        var auth = 'YWRtaW46Z2Vvc2VydmVy';
        var updateXML =
            '<wfs:Transaction service="WFS" version="1.0.0" '
                + 'xmlns:usa="http://census.gov" '
                + 'xmlns:ogc="http://www.opengis.net/ogc" '
                + 'xmlns:wfs="http://www.opengis.net/wfs"> '
                + '<wfs:Update typeName="' + layerID + '">';
        for (key in propertyList){
            if (key != 'geometry') {
                updateXML += '<wfs:Property><wfs:Name>'+ key + '</wfs:Name><wfs:Value>'+ propertyList[key] + '</wfs:Value></wfs:Property>';
            }
        };
        updateXML += '<ogc:Filter><ogc:FeatureId fid="' + featureID + '"/></ogc:Filter></wfs:Update></wfs:Transaction>'
        Ext.Ajax.request({
            url : '/geoserver/wfs',
            method: 'POST',
            xmlData: updateXML,
            requestHeaders: {Authorization : auth},
            headers: {'Content-Type': 'text/xml'},
            success: function(response){
                console.log(response);
            },
            failure: function(response){
                console.log(response);
            }
        });
    },

    showCurrentFeatureOnMap: function (currentFeature) {
        /*
         This method creates a temporary guide layer to show which feature is the current index on the map
         */
        var ol3Map = this.getOl3Map();
        var map = ol3Map.map;

        if (currentFeature){
            if (ol3Map.getGuideLayer()) {
                map.removeLayer(ol3Map.getGuideLayer());
                ol3Map.setGuideLayer(null);
            }
            ol3Map.setGuideFeature(currentFeature);
            var guideLayer = new ol.layer.Vector({
                source: new ol.source.Vector({
                }),
                id: 'guideLayer',
                style: new ol.style.Style({
                    rules: [
                        new ol.style.Rule({
                            symbolizers: [
                                new ol.style.Shape({
                                    fill: new ol.style.Fill({
                                        color: '#FF00FF',
                                        opacity: 1
                                    }),
                                    stroke: new ol.style.Stroke({
                                        color: 'white',
                                        opacity: 0.75
                                    }),
                                    size: 14
                                }),
                                new ol.style.Fill({
                                    color: '#FF00FF',
                                    opacity: 0.5
                                }),
                                new ol.style.Stroke({
                                    color: 'white',
                                    width: 5
                                }),
                                new ol.style.Stroke({
                                    color: '#FF00FF',
                                    width: 3
                                })
                            ]
                        })
                    ]
                })
            });
            guideLayer.getSource().featureCache_.add(ol3Map.getGuideFeature());
            ol3Map.setGuideLayer(guideLayer);
            map.addLayer(guideLayer);
        } else {
            if (ol3Map.getGuideLayer()){
                map.removeLayer(ol3Map.getGuideLayer());
            }
        }
    },

    removeFeatures: function (feature) {
        var ol3Map = this.getOl3Map();

        // Remove guide layer if it exists
        if (ol3Map.getGuideLayer()) {
            ol3Map.getMap().removeLayer(ol3Map.getGuideLayer());
            ol3Map.setGuideLayer(null);
        }

        ol3Map.getUserLayer().getSource().removeFeatures([feature]);
        ol3Map.getSelectedFeatures().splice(ol3Map.getFeatureIndex(),1);

        /*
         Subtract from the feature count on the user layer
         */
        ol3Map.setNumFeatures(ol3Map.getNumFeatures() - 1);

        ol3Map.setFeatureIndex(0);

        this.getEditFeaturePanel().fireEvent('updatefeaturepanel',
            ol3Map.getSelectedFeatures(), ol3Map.getFeatureIndex(), ol3Map.getUserLayer());
    }
});