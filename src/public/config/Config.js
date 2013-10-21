/* global Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuration information should be maintained
 */
SavannaConfig = {
    // Root for all REST calls
    savannaUrlRoot: 'http://c2aptsav1:8080/c2is2/',
//    savannaUrlRoot: 'http://thedevsav1:8080/SavannaX/',

    helpUrl: 'http://www.google.com',

    resourcesPathPrefix: '',

    // Map base layer
    mapBaseLayerUrl: 'http://demo.opengeo.org/geoserver/wms',
    mapBaseLayerName: 'bluemarble',
    mapBaseLayerLabel: 'Satellite',
    mapDefaultCenter: '0,0',
    mapDefaultZoom: 2
};
