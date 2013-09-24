/* global Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuration information should be maintained
 */
SavannaConfig = {

    // Root for all REST calls
    savannaUrlRoot: 'http://localhost:8080/C2is2/',
    //savannaUrlRoot: 'http://thedevsav1.thetuscorp.com:8080/SavannaX/',

    resourcesPathPrefix: '',

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
SavannaConfig.modelSearchUrl=SavannaConfig.savannaUrlRoot+ 'rest/c2is2/model/search';
SavannaConfig.itemViewUrl = SavannaConfig.savannaUrlRoot + 'rest/c2is2/model/item/';
SavannaConfig.dalSourcesUrl = SavannaConfig.savannaUrlRoot + 'rest/search/sources'; // local dev version: 'resources/data/testSearchDalsWithFormData.json',
SavannaConfig.locationSearch = SavannaConfig.savannaUrlRoot + '/rest/map/search';   // local dev version: 'resources/data/testSearchLocationSearch.json',
// TODO: replace this test URL with real endpoint once we have one...
SavannaConfig.crumbnetTemplatesUrl = SavannaConfig.savannaUrlRoot + 'resources/data/testCrumbnetTemplates.json';

SavannaConfig.testSpacesUrl = 'resources/data/testSpaces.json';
SavannaConfig.savedSpacesUrl = 'resources/data/savedSpaces.json';