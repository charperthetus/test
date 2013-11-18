Ext.define('Savanna.map.view.part.OL3MapComponent', {
    extend: 'Ext.Component',
    alias: 'widget.ol3mapcomponent',

//    requires: 'Savanna.map.controller.MapController',
//
//    controller: 'Savanna.map.controller.MapController',

    config: {
        map: null
    },

    onRender: function() {
        var element;

        /*
        Create user Vector default style rules
         */

        var userVectorLayer = new ol.layer.Vector({
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

        this.callParent(arguments);

        element = Ext.DomHelper.insertHtml(
            'afterBegin',
            this.getEl().dom,
            '<div class="map" style="width: 100%; height: 100%; position: absolute;"></div>'
        );

        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.MapQuestOpenAerial()
                }), userVectorLayer
            ],
            renderer: ol.RendererHint.CANVAS
        });

        /*
        Map Events
         */

        this.map.on('dragstart', function(evt) {
            this.fireEvent('dragStart', evt);
        }, this);

        this.map.on('dragend', function (evt){
            this.fireEvent('dragEnd', evt);
        }, this);

        var task = new Ext.util.DelayedTask(function(){
            this.fireEvent('clickEvent', this.event);
        }, this);

        this.map.on('singleclick', function(evt) {
            this.event = evt;
            task.delay(50, null, this);
        }, this);

        userVectorLayer.on('featureadd', function (arguments) {
            this.fireEvent('userFeatureAdded', arguments)
        }, this);

        /*
        Add selectInteraction to map so that it can be removed on demand
         */

        this.map.selectInteraction = new ol.interaction.Select({
            layers: function(layer) {
                return layer.get('id') == 'vector';
            }
        });

        this.map.addInteraction(this.map.selectInteraction);

        /*
        Set View
         */

        this.map.setView(new ol.View2D({
            center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
            zoom: 4
        }));

        this.map.setTarget(element);
    }
});