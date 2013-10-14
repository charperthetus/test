/* global Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuration information should be maintained
 */
SavannaConfig = {
    // Root for all REST calls
    savannaUrlRoot: 'https://c2devsav1:8443/c2is2/',
    // savannaUrlRoot: 'https://c2devsav1:8443/c2is2/', NOTE: Used for itemview
    //savannaUrlRoot: 'http://thedevsav1.thetuscorp.com:8080/SavannaX/',

    resourcesPathPrefix: '',

    // Map base layer
    mapBaseLayerUrl: 'http://demo.opengeo.org/geoserver/wms',
    mapBaseLayerName: 'bluemarble',
    mapBaseLayerLabel: 'Satellite',
    mapDefaultCenter: '0,0',
    mapDefaultZoom: 2
};