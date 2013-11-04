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

    showSystemHighClassification: true,

    /**
     WMS base layer
     **/

//    mapDefaultBaseLayer: {
//        url: 'http://demo.opengeo.org/geoserver/wms',
//        projection: 'EPSG:4326',
//        type: 'WMS',
//        layerName: 'bluemarble',
//        center: '0,0',
//        zoom: 2
//    }

    /**
     MapQuest XYZ Tile Layer (Tiles arranged in a standard XYZ grid)
     **/

//    mapDefaultBaseLayer: {
//    url:  [
//        "http://oatile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
//        "http://oatile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
//        "http://oatile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
//        "http://oatile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"
//    ],
//    projection: 'EPSG:900913',
//    type: 'XYZ',
//    layerName: 'MapQuest Imagery',
//    center: '0,0',
//    zoom: 2
//    }

    mapDefaultBaseLayer: {
        url: 'http://geocache.grayhive.org/tms/',
        projection: 'EPSG:4326',
        resolutions: [0.703125, 0.3515625, 0.17578125, 0.087890625,
            0.0439453125, 0.02197265625, 0.010986328125,
            0.0054931640625, 0.00274658203125, 0.001373291015625,
            0.0006866455078125, 0.00034332275390625, 0.000171661376953125,
            0.0000858306884765625, 0.00004291534423828125, 0.000021457672119140625,
            0.00000268220901489257, 0.000010728836059570312, 0.000005364418029785156],
        type: 'TMS2',
        imgType: 'png',
        layerName: 'vmap',
        center: '0, 0',
        zoom: 1
    }
};