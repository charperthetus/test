/* global Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuration information should be maintained
 */
SavannaConfig = {
// Root for all REST calls
    
//    savannaUrlRoot: 'http://c2aptsav1:8080/c2is2/',
//    savannaUrlRoot: 'https://c2astsav1.thetuscorp.com/c2is2/',
    savannaUrlRoot: 'http://c2devsav1:8080/c2is2/',
    //savannaUrlRoot: 'http://10.0.3.169:8080/c2is2/',

    helpUrl: 'http://www.google.com',

    showSystemHighClassification: true,

    /**
     MapQuest XYZ Tile Layer (Tiles arranged in a standard XYZ grid)
     **/
    mapDefaultBaseLayer: {
        url: [
            "http://oatile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
            "http://oatile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
            "http://oatile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg",
            "http://oatile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.jpg"
        ],
        projection: 'EPSG:900913',
        type: 'XYZ',
        layerName: 'MapQuest Imagery',
        center: '0,0',
        zoom: 2
    },

    debug: true //Setting just for devs, this doesn't need to be included in the customer config file.

};