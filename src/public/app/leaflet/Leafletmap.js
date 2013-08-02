Ext.define('Savanna.leaflet.Leafletmap', {
    extend: 'Ext.Component',
    alias: 'widget.leafletmap',
    // This appears to use the Leaflet.draw plugin 
    // https://github.com/Leaflet/Leaflet.draw/blob/master/README.md
    //polyPoints: [],
    myMap: null,
    config:{
        map: null,
        lat: 45.5236,
        lng: -122.6750
    },
    afterRender: function(t, eOpts){
        this.callParent(arguments);
        var leafletRef = window.L;
        if (leafletRef == null){
            this.update('No leaflet library loaded');
        } else {
            this.myMap = L.map(this.getId(), {
                zoomControl: false,
                doubleClickZoom: false
            });
            this.myMap.setView([this.lat, this.lng], 2);
            this.setMap(this.myMap);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.myMap);
            this.addDrawControl();
        }
    },
    addDrawControl: function(){
        var editableLayers = new L.FeatureGroup();
        this.myMap.addLayer(editableLayers);
        var self = this;
        var options = {
            position: 'topright',
            draw: {
                polyline: false,
                circle: false, // Turns off this drawing tool
                marker: false,
                rectangle: false,
                polygon: {
                    zIndexOffset: 100000,
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        message: '' +
                            'Polygon Lines May Not Intersect' // Message that will show when intersect
                    },
                    shapeOptions: {
                        color: '#0073ae',
                        weight: 2
                    }
                }
            },
            edit: {
                featureGroup: editableLayers, //REQUIRED!!
                remove: false
            }
        };
        var drawControl = new L.Control.Draw(options);
        this.myMap.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                // Do marker specific actions
            }

            // Do whatever else you need to. (save to db, add to map etc)
            self.myMap.addLayer(layer);
        });
        this.myMap.addControl(drawControl);
    },
    onResize: function(w, h, oW, oH){
        this.callParent(arguments);
        var map = this.getMap();
        if (map){
            map.invalidateSize();
        }
    }
});