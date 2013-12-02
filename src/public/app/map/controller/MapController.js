Ext.define('Savanna.map.controller.MapController', {
    extend: 'Deft.mvc.ViewController',
    requires: ['Savanna.map.view.part.layerUpload.LayerUploadWindow'],

    control: {
        ol3Map: {
            boxready: 'addMapBaseLayer',
            resize: 'updateMapSize',
            featureadd: 'onFeatureAdd'
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
            upload: 'uploadLayer'
        },
        ol3MapLayerList: true
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

    onFeatureAdd: function(feature, targetLayer) {
        var ol3Map = this.getOl3Map();
        var layers = ol3Map.getMap().getLayers();
        if(layers.getArray().indexOf(targetLayer) === -1) {
            this.addLayer(targetLayer);
        }
        // Remove the current map interaction.
        ol3Map.getMap().removeInteraction(ol3Map.getInteraction());

        ol3Map.setInteraction(null);
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
    }
});