/* global Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuration information should be maintained
 */
SavannaConfig = {

    // Root for all REST calls
    savannaUrlRoot: 'http://c2aptsav1:8080/c2is2/',
    //savannaUrlRoot: 'http://thedevsav1.thetuscorp.com:8080/SavannaX/',

    resourcesPathPrefix: '',

    locationSearchUrl: 'http://thedevsav1.thetuscorp.com:8080/SavannaX/rest/map/search',
//    locationSearchUrl: '../test/fixtures/LocationSources.js',

    // Map base layer
    mapBaseLayerUrl: 'http://demo.opengeo.org/geoserver/wms',
    mapBaseLayerName: 'bluemarble',
    mapBaseLayerLabel: 'Satellite',
    mapDefaultCenter: '0,0',
    mapDefaultZoom: 2
};


//TODO - This section needs to get moved to a different file
// Urls for all the rest endpoints
SavannaConfig.loginUrl = SavannaConfig.savannaUrlRoot + 'authcheck/loggedIn.html';
SavannaConfig.searchUrl = SavannaConfig.savannaUrlRoot + 'rest/search'; // local dev version: 'app/assets/data/testSearchResults.json',
SavannaConfig.itemViewUrl = SavannaConfig.savannaUrlRoot + 'rest/c2is2/model/item/';
SavannaConfig.dalSourcesUrl = SavannaConfig.savannaUrlRoot + 'rest/search/sources'; // local dev version: 'resources/data/testSearchDalsWithFormData.json',
SavannaConfig.locationSearch = SavannaConfig.savannaUrlRoot + '/rest/map/search';   // local dev version: 'resources/data/testSearchLocationSearch.json',
SavannaConfig.metadataUrl = SavannaConfig.savannaUrlRoot + 'rest/metadata';
// TODO: replace this test URL with real endpoint once we have one....
SavannaConfig.crumbnetTemplatesUrl = 'fixture/Crumbnet.json';
SavannaConfig.metadataTestDataUrl = 'fixture/Metadata.json';
