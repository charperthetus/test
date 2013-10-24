//Config for internal urls and other global settings that do not get altered by a administrator.
Ext.define('Savanna.Config', {
    singleton: true,
    constructor: function() {
        var sc = SavannaConfig;
        var rUrl = sc.savannaUrlRoot;
        // Urls for all the rest endpoints
        sc.loginUrl = rUrl + 'authcheck/loggedIn.html';
        sc.logoutUrl = rUrl + 'j_spring_security_logout';
        sc.pingUrl = rUrl + 'public/ping';
        sc.searchUrl = rUrl + 'rest/search'; // local dev version: 'app/assets/data/testSearchResults.json',
        sc.searchMetadataUrl = rUrl + 'rest/metadata/get';
        sc.itemViewUrl = rUrl + 'rest/model/mock/item/';
        sc.modelSearchUrl = rUrl + 'rest/mockModelSearch/keyword/item';
        sc.dalSourcesUrl = rUrl + 'rest/search/sources'; // local dev version: 'resources/data/testSearchDalsWithFormData.json',
        sc.locationSearch = rUrl + '/rest/map/search';   // local dev version: 'resources/data/testSearchLocationSearch.json',
        sc.uploadUrl = rUrl + 'rest/document/upload';
        sc.metadataUrl = rUrl + 'rest/metadata';
        sc.resultsMetadataUrl = rUrl + 'rest/metadata';
        // TODO: replace this test URL with real endpoint once we have one....
        sc.processTemplatesUrl = 'resources/data/Process.json';
        sc.metadataTestDataUrl = 'resources/data/Metadata.json';
        sc.ureaProcessDataUrl = 'resources/data/UreaProcess.json';
        //Version number of the build - This is replaced in the build process
        sc.version = 'Developer Build';
    }
});