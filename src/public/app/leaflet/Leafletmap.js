Ext.define('Savanna.leaflet.Leafletmap', {
    extend: 'Ext.Component',
    alias: 'widget.leafletmap',

    myMap: null, // keep current map accessible for all methods
    editMode: null,
    editableLayers: null,
    drawControl: null,
    myLayer: null,
    keydownEvent: null,
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
        this.myMap.on('focus', this.mapGotFocus, this);

        this.editableLayers.on('click', this.clickOnLayer, this);
        this.editableLayers.on('contextmenu', this.drawingContextMenu, this);
        this.keydownEvent = Ext.bind(this.keyPressedOnMap, this);
        this.getEl().dom.addEventListener('keydown', this.keydownEvent);
    },

    keyPressedOnMap: function(e) {
        if (e.keyCode === 46 && this.editMode && this.editMode._enabled){  // delete key press in edit mode
            this.editMode.save();
            this.editableLayers.removeLayer(this.myLayer);
            this.editMode.disable();

        }
    },

    drawingContextMenu: function(e) {
        var contextMenu = new Ext.menu.Menu({
            items:[{
                text: 'Delete',
                handler: this.deleteDrawing,
                scope: this
            }]
        });
        contextMenu.showAt(e.originalEvent.clientX, e.originalEvent.clientY);
    },

    deleteDrawing: function() {
        this.editableLayers.removeLayer(this.myLayer);
    },

    drawingAddedToMap: function(e) {
        this.myLayer = e.layer;
        this.fireEvent('draw:created', e); //update with new points
        this.editableLayers.addLayer(this.myLayer);
        console.log('this.drawControl',this.drawControl);
    },
    mapGotFocus: function() {
        this.getEl().dom.addEventListener('keydown', this.keydownEvent);
    },
    mapLostFocus: function() {
        if (this.editMode) {
            this.editMode.save();
            this.editMode.disable();
        }
        this.getEl().dom.removeEventListener('keydown', this.keydownEvent, false)
    },

    clickOnLayer: function() {
        this.editMode = new L.EditToolbar.Edit(this.myMap,{
            featureGroup: this.editableLayers,
            selectedPathOptions: this.drawControl.options.edit.selectedPathOptions
        });
        this.editMode.enable();
    },

    clickOnMap: function() {
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