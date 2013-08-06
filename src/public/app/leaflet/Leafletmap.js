Ext.define('Savanna.leaflet.Leafletmap', {
    extend: 'Ext.Component',
    alias: 'widget.leafletmap',
    myMap: null, // keep current map accessible for all methods
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
        var editMode = null;
        var editableLayers = new L.FeatureGroup();
        this.myMap.addLayer(editableLayers);
        var self = this;
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
            /*
            edit: {   //adds edit icon to tool bar
                featureGroup: editableLayers //REQUIRED!!
                //remove: false // true adds trash can to toolbar
            }
            */
        };
        var drawControl = new L.Control.Draw(options);
        this.myMap.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;

            if (type === 'marker') {
                // Do marker specific actions
            }
            self.fireEvent('draw:created', e);
            // Do whatever else you need to. (save to db, add to map etc)
            editableLayers.addLayer(layer);
        });
        this.myMap.on('click', function(e){
            console.log('editMode',editMode);
            if (editMode) {
                editMode.save();
                editMode.disable();
            }
        });
        var popup = L.popup().setContent('<p>Hello world!<br />This is a nice popup.</p>');
        editableLayers.on('contextmenu', function(e) {
            popup.openOn(self.myMap);
            console.log('contextmenu', e);
        });
        editableLayers.on('click', function (e) {

            console.log('click', e);
            editMode = new L.EditToolbar.Edit(self.myMap,{
                featureGroup: editableLayers,
                selectedPathOptions: drawControl.options.edit.selectedPathOptions
            })
            editMode.enable();
            //self.myMap.removeLayer(editableLayers);
        });
        this.myMap.on('blur', function() {
            editMode.save();
            editMode.disable();
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