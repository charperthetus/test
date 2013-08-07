Ext.define('Savanna.leaflet.Leafletmap', {
    extend: 'Ext.Component',
    alias: 'widget.leafletmap',

    myMap: null, // keep current map accessible for all methods
    editMode: null,
    editableLayers: null,
    drawControl: null,

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
                zoomControl: false, // turns off default +- control from zoom
                doubleClickZoom: false
            });
            this.myMap.setView([this.lat, this.lng], 2);
            this.setMap(this.myMap);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.myMap);
            this.addDrawControl();
        }
    },

    addDrawControl: function(){
        this.editableLayers = new L.FeatureGroup();
        this.myMap.addLayer(this.editableLayers);
        var options = {
            position: 'topright',
            draw: {
                polyline: false,
                circle: true,
                marker: false,
                rectangle: true,
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
            }
        };

        this.drawControl = new L.Control.Draw(options);
        this.myMap.addControl(this.drawControl);

        this.myMap.on('draw:created', this.drawingAddedToMap, this);
        this.myMap.on('click', this.clickOnMap, this);
        this.myMap.on('blur', this.mapLostFocus, this);

        this.editableLayers.on('click', this.clickOnLayer, this);
    },

    drawingAddedToMap: function(e) {
        var layer = e.layer;
        this.fireEvent('draw:created', e); //update with new points
        this.editableLayers.addLayer(layer);
    },

    mapLostFocus: function(e) {
        if (this.editMode) {
            this.editMode.save();
            this.editMode.disable();
        }
    },

    clickOnLayer: function(e) {
        this.editMode = new L.EditToolbar.Edit(this.myMap,{
            featureGroup: this.editableLayers,
            selectedPathOptions: this.drawControl.options.edit.selectedPathOptions
        })
        this.editMode.enable();
        //this.myMap.removeLayer(this.editableLayers);
    },

    clickOnMap: function(e) {
        if (this.editMode && this.editMode._enabled) {
            this.editMode.save();
            this.editMode.disable();
        }
    },

    onResize: function(w, h, oW, oH){
        this.callParent(arguments);
        var map = this.getMap();
        if (map){
            map.invalidateSize();
        }
    }
});