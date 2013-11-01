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

    map: null,

    searchLayer: null,

    resultsLayer: null,

    controls: null,

    baseLayer: SavannaConfig.mapDefaultBaseLayer,

    initComponent: function() {

        this.map = new OpenLayers.Map({
            projection: new OpenLayers.Projection(this.baseLayer.projection),
            controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoomBar({
                    panIcons: false
                })
            ]
        });

        this.callParent(arguments);
    },

    onRender: function () {
        this.callParent(arguments);
        this.map.render(this.getEl().dom);
        this.map.setCenter(new OpenLayers.LonLat.fromString(this.baseLayer.center), this.baseLayer.zoom);
    }
});

