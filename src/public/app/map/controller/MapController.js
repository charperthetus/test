Ext.define('Savanna.map.controller.MapController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.map.view.part.AddFeatureWindow'
    ],

    dataCardState: {
        type: 'in-place',
        lastX: 0,
        lastY: 0,
        featureX: 0,
        featureY: 0
    },

    drawToolInUse: false,

    control: {
        ol3Map: {
            resize: 'updateMapSize'
        },

        addPointWindow: {
            click: 'showAddFeatureWindow'
        },

        removeSelectedFeature: {
            click: 'removeSelectedFeature'
        },

        addPointFeature: {
            click: 'activateAddPoint'
        },

        drawLineFeature: {
            click: 'activateDrawLine'
        }
//
//        drawPolygonFeature: {
//            click: 'activateDrawPolygon'
//        }

    },

    init: function() {
        EventHub.on('itemSelected', this.enableGeoInputField, this);
        EventHub.on('addFeature', this.addFeatureToMap, this);
        EventHub.on('randomFeature', this.randomFeatureToMap, this);
        EventHub.on('clickEvent', this.clickEvent, this);
        EventHub.on('selectEvent', this.hideDataCard, this);
        EventHub.on('dragStart', this.dragStart, this);
        EventHub.on('dragEnd', this.checkDataCardState, this);
        EventHub.on('removeSelectedFeature', this.removeSelectedFeature, this);
        EventHub.on('doubleclick', this.doubleClickEvent, this);
        this.callParent(arguments);
    },

    destroy: function() {
        EventHub.un('itemSelected', this.enableGeoInputField, this);
        EventHub.un('addFeature', this.addFeatureToMap, this);
        EventHub.un('randomFeature', this.randomFeatureToMap, this);
        EventHub.un('clickEvent', this.clickEvent, this);
        EventHub.un('selectEvent', this.hideDataCard, this);
        EventHub.un('dragStart', this.dragStart, this);
        EventHub.un('dragEnd', this.checkDataCardState, this);
        EventHub.un('removeSelectedFeature', this.removeSelectedFeature, this);
        EventHub.un('doubleclick', this.doubleClickEvent, this);
        this.callParent(arguments);
    },

    doubleClickEvent: function () {
        var mapCanvas = this.getOl3Map();
        var map = mapCanvas.map;
        map.removeInteraction(map.drawInteraction);
        var mapComponent = mapCanvas.up('mapcomponent');
        mapComponent.down('#addPointFeature').enable();
        mapComponent.down('#drawLineFeature').enable();
        mapComponent.down('#drawLineFeature').toolsInUse = false;
        this.drawToolInUse = false;
    },

    activateDrawLine: function () {
        var mapCanvas = this.getOl3Map();
        var map = mapCanvas.map;
        var mapComponent = mapCanvas.up('mapcomponent');

        /*
        Disable buttons while drawing feature
         */
        mapComponent.down('#addPointFeature').disable();
        mapComponent.down('#drawLineFeature').disable();
        mapComponent.down('#drawLineFeature').toolsInUse = true;
        this.drawToolInUse = true;

        map.drawInteraction = new ol.interaction.Draw({
            layer: new ol.layer.Vector({
                source: new ol.source.Vector({parser: null}),
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
            }),
            type: 'linestring'
        });
        map.addInteraction(map.drawInteraction);

    },

    getSelectedFeature: function (layerList) {
        var features = {};
        var selection = [];
        var hiddens = [];
        for (var i = 0; i < layerList.length; i++) {
            if (layerList[i].featureCache_){
                var pathToIntent = layerList[i].featureCache_.idLookup_;
                for (var key in pathToIntent) {
                    if (pathToIntent[key].renderIntent_ === 'selected') {
                        selection.push(layerList[i]);
                    }
                    if (pathToIntent[key].renderIntent_ === 'hidden'){
                        hiddens.push(layerList[i]);
                    }
                }
            }
        }
        features.selected = selection;
        features.hidden = hiddens;
        return features
    },

    clickEvent: function (evt) {
        console.log(arguments);
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var map = mapComponent.down('ol3mapcomponent').map;

        /*
        If the Add Point Feature button is disabled call addPointOnClick method
         */
        var addPointButton = mapComponent.down('#addPointFeature');
        if (addPointButton.toolInUse === true) {
            this.addPointOnClick(evt, addPointButton);
        }

        var features;
        var layersQuery = map.getLayers().array_;
        features = this.getSelectedFeature(layersQuery);
        if (features.selected.length === 1) {
            this.displayDataCard(features.selected[0], evt, mapComponent);
        }
    },

    updateMapSize: function() {
        this.getOl3Map().getMap().updateSize();
    },

    showAddFeatureWindow: function () {
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var window = mapComponent.down('#createFeatureWindow');
        window.show();
    },

    removeSelectedFeature: function () {
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var map = mapComponent.down('ol3mapcomponent').map;
        var layersQuery = map.getLayers().array_;
        var features = this.getSelectedFeature(layersQuery);
        if (features.selected) {
            for (var i = 0; i < features.selected.length; i++){
                map.removeLayer(features.selected[i]);
            }
        }
        if (features.hidden) {
            for (var j = 0; j < features.hidden.length; j++){
                map.removeLayer(features.hidden[j]);
            }
        }
        this.hideDataCard();
    },

    enableGeoInputField: function () {
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var window = mapComponent.down('#createFeatureWindow');
        var addFeatureButton = window.down('#addFeatureToMap');
        addFeatureButton.enable();
    },

    randomFeatureToMap : function () {
        var randomFeature = [];
        var numberOfPoints = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
        for (var i = 0; i < numberOfPoints; i++) {
            randomFeature.push([(Math.random() * (180 - (-180)) + (-180)),
                (Math.random() * (90 - (-90)) + (-90))]);
        }
        var coordinates = [randomFeature];
        var newRandomFeature = {
            type: 'Polygon',
            coordinates: coordinates
        };
        this.addVector(newRandomFeature);
    },

    addFeatureToMap: function () {
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var fieldText = mapComponent.down('#createFeatureWindow').down('#jsonInputField');
        this.addVector(fieldText.rawValue);

    },

    addVector: function (data) {
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var map = mapComponent.down('ol3mapcomponent').map;
        var vector = new ol.layer.Vector({
            source: new ol.source.Vector({
                parser: new ol.parser.GeoJSON(),
                data: data,
                attributions: {
                    Title: 'This is a really cool spot',
                    Importance: Math.floor(Math.random() * (100 - 3 + 1)) + 3,
                    Date_Created: Ext.Date.format(new Date(), 'F j, Y, g:i a'),
                    fieldTest1: 'S - This is a test field to see if there is a limit to the number of characters you can put into one of these here cells. I remember back in old savanna when map limited this to 184 characters and sometimes it would upset Deane and I would have to explain that it is ESRIs fault and now we get to see if this is Senchas issue or GeoServer...',
                    fieldTest2: 'C',
                    fieldTest3: 'R',
                    fieldTest4: 'O',
                    fieldTest5: 'L',
                    fieldTest6: 'L'
                }
            }),
            id: 'vector',
            style: new ol.style.Style({rules: [
                new ol.style.Rule({
                    symbolizers: [
                        new ol.style.Fill({
                            color: 'white',
                            opacity: 0.6
                        }),
                        new ol.style.Stroke({
                            color: '#319FD3',
                            opacity: 1
                        }),
//                        new ol.style.Icon({
//                            url: './resources/OpenLayers-2.13.1/img/mapMarker.png'
//                        })
                        new ol.style.Shape({
                            size: 20,
                            fill: new ol.style.Fill({
                                color: 'white',
                                opacity: 0.6
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#319FD3',
                                opacity: 1
                            })
                        })
                    ]
                }),
                new ol.style.Rule({
                    filter: 'renderIntent("selected")',
                    symbolizers: [
                        new ol.style.Fill({
                            color: '#ffffff',
                            opacity: 0.5
                        }),
                        new ol.style.Shape({
                            size: 20,
                            fill: new ol.style.Fill({
                                color: 'white',
                                opacity: 0.5
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#319FD3',
                                opacity: 1
                            })
                        })
                    ]
                })
            ]})
        });
        map.addLayer(vector);
    },

    activateAddPoint: function () {
        var button = this.getAddPointFeature();
        button.disable();
        button.toolInUse = true;
        this.drawToolInUse = true;
    },

    addPointOnClick: function (evt, button) {
        var pointFeature = {};
        var pointTransform = ol.proj.transform([evt.coordinate_[0], evt.coordinate_[1]], 'EPSG:3857', 'EPSG:4326');
        pointFeature.coordinates = [pointTransform[0], pointTransform[1]];
        pointFeature.type = 'Point';
        this.addVector(pointFeature);
        button.enable();
        button.toolInUse = false;
        this.drawToolInUse = false;
    },

    displayDataCard: function (feature, evt, mapComponent) {
        var dataCard = mapComponent.down('#featureDataCard');
        if (this.drawToolInUse === false){
            this.setUpDataCardContent(feature, mapComponent);
            dataCard.show();
            this.position(dataCard, mapComponent, evt.pixel_);
        }
    },

    setUpDataCardContent: function (feature, mapComponent) {
        var dataCardGrid = mapComponent.down('map_popup_datacard');
        var attributes = feature.source_.attributions_;
        var dataItems = [];
        for (var key in attributes) {
            dataItems.push({'field': key, 'value': attributes[key]});
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
    },

    position: function(dataCard, mapComponent, pixel) {
        //define the position that the popup window and assign class to popup anchor
        this.dataCardState.featureX = pixel[0];
        this.dataCardState.featureY = pixel[1];

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

    dragStart: function (evt) {
        this.dataCardState.lastX = evt.browserEvent.offsetX;
        this.dataCardState.lastY = evt.browserEvent.offsetY;
        this.hideDataCard();
    },

    hideDataCard: function () {
        this.dataCardState.type = 'in-place';
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var dataCard = mapComponent.down('#featureDataCard');
        if (dataCard.hidden === false){
            this.unselectFeature(mapComponent);
        }
        dataCard.hide();
    },

    unselectFeature: function (mapComponent) {
        var map = mapComponent.down('ol3mapcomponent').map;
        var layerList = map.getLayers().array_;
        for (var i = 0; i < layerList.length; i++) {
            if (layerList[i].featureCache_){
                var pathToIntent = layerList[i].featureCache_.idLookup_;
                for (var key in pathToIntent) {
                    if (pathToIntent[key].renderIntent_ === 'selected'){
                        this.dataCardState.type = 'on-move';
                    }
                }
            }
        }
    },

    checkDataCardState: function (evt) {
        console.log(evt.browserEvent.offsetX, evt.browserEvent.offsetY);
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var dataCard = mapComponent.down('#featureDataCard');
        var moveX = this.dataCardState.lastX - evt.browserEvent.offsetX;
        var moveY = this.dataCardState.lastY - evt.browserEvent.offsetY;
        var pixel = [(this.dataCardState.featureX - moveX), (this.dataCardState.featureY - moveY)];
        if (this.dataCardState.type === 'on-move') {
            this.position(dataCard, mapComponent, pixel);
            dataCard.show();
            this.dataCardState.type = 'in-place';
        }
    }
});