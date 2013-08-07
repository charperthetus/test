/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 7/22/13
 * Time: 10:52 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.require('Savanna.search.view.SearchBody');

describe('Search Map', function() {

    beforeEach(function() {
        createTestDom();
    });

    afterEach(function() {
        cleanTestDom();
    });

    describe('Savanna.search.view.SearchMap', function() {

        describe('constructor', function() {

            it('should be able to create a search map', function() {
                var map = Ext.create('Savanna.search.view.SearchMap',  { renderTo: 'test-html' });

                expect(map instanceof Savanna.search.view.SearchMap).toBeTruthy();

            });

        });
    });
    describe('Savanna.leaflet.Leafletmap', function() {
        var map;
        var myPanel;
        var southWest = new L.LatLng(40.712, -74.227),
            northEast = new L.LatLng(40.774, -74.125),
            bounds = new L.LatLngBounds(southWest, northEast);
        var layer = L.rectangle(bounds);

        beforeEach(function() {
            myPanel = Ext.create('Ext.panel.Panel', {
                layout: 'fit',
                renderTo: 'test-html'
            });
            map = Ext.create('Savanna.leaflet.Leafletmap');
            spyOn(map, 'afterRender').andCallThrough();
            spyOn(map, 'addDrawControl').andCallThrough();
        });

        afterEach(function() {
            myPanel = null;
            map = null;
        });

        it('afterRender should call afterRender and addDrawControl', function() {
            myPanel.add(map);
            expect(map.afterRender).toHaveBeenCalled();
            expect(map.addDrawControl).toHaveBeenCalled();
            expect(map.myMap).toBeTruthy();
        });

        describe('events:', function() {
            var e = {};
            beforeEach(function() {
                e.layer = layer;
                e.type = 'polyline';
                myPanel.add(map);
                spyOn(map, 'fireEvent').andCallThrough();
                spyOn(map.editableLayers, 'addLayer').andCallThrough();
            });

            afterEach(function() {
                e = null;
            });

            // events need to be run one after another to follow state correctly
            it('should call the right functions', function() {
                //myPanel.add(map);
                map.drawingAddedToMap(e);
                expect(map.fireEvent).toHaveBeenCalled();
                expect(map.editableLayers.addLayer).toHaveBeenCalled()

                //clickOnLayer turns on editMode
                expect(map.editMode).toBeFalsy();
                map.clickOnLayer();
                expect(map.editMode._enabled).toBeTruthy();

                //clicking on map should turn off edit mode
                map.clickOnMap();
                expect(map.editMode._enabled).toBeFalsy();

                // turn edit mode back on
                map.clickOnLayer();
                expect(map.editMode._enabled).toBeTruthy();

                //when map loses focus turn off edit mode
                map.mapLostFocus();
                expect(map.editMode._enabled).toBeFalsy();
            });

        });
        describe('afterRender', function() {
            it('with no leaflet reference should call update', function() {
                delete window.L;
                spyOn(map, 'update').andCallThrough();
                myPanel.add(map);
                expect(map.update).toHaveBeenCalledWith('No leaflet library loaded');
            });
        });
    });
});
