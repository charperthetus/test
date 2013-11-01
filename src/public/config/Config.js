/* global Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuration information should be maintained
 */
SavannaConfig = {
    // Root for all REST calls
//    savannaUrlRoot: 'http://c2aptsav1:8080/c2is2/',
    savannaUrlRoot: 'http://c2devsav1:8080/c2is2/',
//    savannaUrlRoot: 'http://thedevsav1:8080/SavannaX/',

    helpUrl: 'http://www.google.com',

    resourcesPathPrefix: '',

    /**
     WMS base layer
     **/

//    mapDefaultBaseLayer: {
//        url: 'http://demo.opengeo.org/geoserver/wms',
//        projection: 'EPSG:4326',
//        type: 'WMS',
//        layerName: 'bluemarble',
//        layerLabel: 'Satellite',
//        center: '0,0',
//        zoom: 2
//    }

    /**
     MapQuest XYZ Tile Layer (Tiles arranged in a standard XYZ grid)
     **/

    mapDefaultBaseLayer: {
    url:  [
        "http://oatile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
        "http://oatile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
        "http://oatile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
        "http://oatile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"
    ],
    projection: 'EPSG:900913',
    type: 'XYZ',
    layerName: 'MapQuest Imagery',
    layerLabel: 'MapQuest Imagery',
    center: '0,0',
    zoom: 2
    }
};