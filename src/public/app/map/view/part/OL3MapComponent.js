Ext.define('Savanna.map.view.part.OL3MapComponent', {
    extend: 'Ext.Component',
    alias: 'widget.ol3mapcomponent',

    config: {
        interaction: null,
        userLayer: null,
        map: null
    },

    initComponent: function() {
        this.userLayer = this.setupUserLayer();
        this.map = this.setupMap();
        this.callParent(arguments);
    },

    onRender: function() {
        this.callParent(arguments);
        var element = Ext.DomHelper.insertHtml(
            'afterBegin',
            this.getEl().dom,
            '<div class="map" style="width: 100%; height: 100%; position: fixed"></div>'
        );
        this.map.setTarget(element);
    },

    setupMap: function() {
        return new ol.Map({
            interactions: ol.interaction.defaults().extend([new ol.interaction.Select()]),
            renderer: ol.RendererHint.CANVAS,
            view: new ol.View2D({
                center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
                zoom: 4
            })
        });
    },

    setupUserLayer: function() {
        var userLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
            }),
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
        userLayer.on('featureadd', this.onFeatureAdd, this);
        userLayer.label = 'Feature Layer';
        return userLayer;
    },

    onFeatureAdd: function(event) {
        var feature = event.features.shift();
        var targetLayer = event.target;
        this.fireEvent(event.type, feature, targetLayer);
    }


});