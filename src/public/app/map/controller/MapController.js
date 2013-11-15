Ext.define('Savanna.map.controller.MapController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.map.view.part.EditFeatureWindow'
    ],

    dataCardState: {
        type: 'in-place',
        lastX: 0,
        lastY: 0,
        featureX: 0,
        featureY: 0
    },

    drawToolInUse: 'none',

    control: {
        ol3Map: {
            resize: 'updateMapSize',
            clickEvent: 'clickEvent',
            dragStart: 'dragStart',
            dragEnd: 'checkDataCardState',
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
        EventHub.on('hideDataCard', this.hideDataCard, this);
        this.callParent(arguments);
    },

    destroy: function() {
        EventHub.un('hideDataCard', this.hideDataCard, this);
        this.callParent(arguments);
    },

    addFeatureEvent: function (evt) {
        var feature = evt.features[0];
        feature.attributes = {
            Feature_Type: this.drawToolInUse,
            Importance: Math.floor(Math.random() * (100 - 3 + 1)) + 3,
            Date_Created: Ext.Date.format(new Date(), 'F j, Y, g:i a')
        };
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

    activateDrawPoint: function () {
        var mapCanvas = this.getOl3Map();
        var map = mapCanvas.map;
        var mapComponent = mapCanvas.up('mapcomponent');
        this.hideDataCard();

        /*
         Remove the select interaction from the map while feature is being drawn
         */
        map.removeInteraction(map.selectInteraction);

        /*
         need to find better way of calling userCreatedLayer
         */
        var targetLayer = map.getLayers().array_[1];

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
        var mapCanvas = this.getOl3Map();
        var map = mapCanvas.map;
        var mapComponent = mapCanvas.up('mapcomponent');
        this.hideDataCard();

        /*
        Remove the select interaction from the map while feature is being drawn
         */
        map.removeInteraction(map.selectInteraction);

        /*
        need to find better way of calling userCreatedLayer
         */
        var targetLayer = map.getLayers().array_[1];

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
        var mapCanvas = this.getOl3Map();
        var map = mapCanvas.map;
        var mapComponent = mapCanvas.up('mapcomponent');
        this.hideDataCard();

        /*
         Remove the select interaction from the map while feature is being drawn
         */
        map.removeInteraction(map.selectInteraction);

        /*
         need to find better way of calling userCreatedLayer
         */
        var targetLayer = map.getLayers().array_[1];

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
        var mapComponent = this.getOl3Map().up('mapcomponent');
        var map = mapComponent.down('ol3mapcomponent').map;
        var features;
        var layersQuery = map.getLayers().array_;
        features = this.getSelectedFeature(layersQuery);
        if (features.selected.length === 1) {
            this.displayDataCard(features.selected[0], evt, mapComponent);
        } else {
            this.hideDataCard();
        }
    },

    updateMapSize: function() {
        this.getOl3Map().getMap().updateSize();
    },

    removeSelectedFeature: function () {
        var mapComponent = this.getAddPointWindow().up('mapcomponent');
        var map = mapComponent.down('ol3mapcomponent').map;
        var userVectorLayer = map.getLayers().array_[1];
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
                for (var index in attributes) {
                    dataItems.push({'field': index, 'value': attributes[index]});
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
        dataCardGrid.currentFeature = selectedFeature;
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
        var mapComponent = this.getOl3Map().up('mapcomponent');
        var dataCard = mapComponent.down('#featureDataCard');
        this.dataCardState.lastX = evt.browserEvent.offsetX;
        this.dataCardState.lastY = evt.browserEvent.offsetY;
        if (dataCard.hidden === false){
            this.dataCardState.type = 'on-move'
        }
        this.hideDataCard();
    },

    hideDataCard: function () {
        var mapComponent = this.getOl3Map().up('mapcomponent');
        var dataCard = mapComponent.down('#featureDataCard');
        if (dataCard.hidden === false && this.dataCardState.type === 'in-place'){
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
                        pathToIntent[key].setRenderIntent('default');
                    }
                }
            }
        }
    },

    checkDataCardState: function (evt) {
        var mapComponent = this.getOl3Map().up('mapcomponent');
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