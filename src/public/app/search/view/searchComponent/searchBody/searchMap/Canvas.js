/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 9/17/13
 * Time: 3:31 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.view.searchComponent.searchBody.searchMap.Canvas', {
    extend: 'Ext.Component',
    alias: 'widget.search_map_canvas',

    center: '0,0',

    zoom: 2,

    map: null,

    drawFeature: null,

    searchLayer: null,

    initComponent: function() {

        this.map = new OpenLayers.Map({
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar({
                    panIcons: false
                })
            ]
        });

        this.callParent(arguments);
    },

    onRender: function() {

        var element;

        this.callParent(arguments);

        element = Ext.DomHelper.insertHtml('afterBegin', this.getEl().dom, '<div class="map" style="width: 100%; height: 100%; position: absolute;"></div>');

        this.map.render(element);
        this.map.setCenter(new OpenLayers.LonLat.fromString(this.center), this.zoom);
    },

    afterRender: function() {
        // Add a feature layer to the map.
        this.searchLayer = new OpenLayers.Layer.Vector('searchLayer');
        this.map.addLayer(this.searchLayer);

        // Add the draw feature control to the map.
        this.drawFeature = new OpenLayers.Control.DrawFeature(this.searchLayer, OpenLayers.Handler.Polygon, {
            featureAdded: this.onFeatureAdded
        });
        this.drawFeature.handler.callbacks.point = this.pointCallback;
        this.map.addControl(this.drawFeature);
    },

    onFeatureAdded: function() {
        // Scope: drawFeature
        this.deactivate();
    },

    pointCallback: function() {
        // Scope: drawFeature
        // Called each time a point is added to the feature.
        if(this.layer.features.length > 0) {
            this.layer.removeAllFeatures();
        }
    },

    onResize: function() {
        this.map.updateSize();
    },

    activateDrawFeature: function() {
        this.drawFeature.activate();
    },

    deactivateDrawFeature: function() {
        this.drawFeature.deactivate();
    },

    removeFeature: function() {
        if(this.searchLayer.features.length > 0) {
            this.searchLayer.removeAllFeatures();
        }
    }
});

