//Config for internal urls and other global settings that do not get altered by a administrator.
Ext.define('Savanna.Config', {
    singleton: true,
    constructor: function(config) {
        // Urls for all the rest endpoints
        SavannaConfig.loginUrl = SavannaConfig.savannaUrlRoot + 'authcheck/loggedIn.html';
        SavannaConfig.searchUrl = SavannaConfig.savannaUrlRoot + 'rest/search'; // local dev version: 'app/assets/data/testSearchResults.json',
        SavannaConfig.searchMetadataUrl = SavannaConfig.savannaUrlRoot + 'rest/metadata/get';
        SavannaConfig.itemViewUrl = SavannaConfig.savannaUrlRoot + 'rest/c2is2/model/item/';
        SavannaConfig.dalSourcesUrl = SavannaConfig.savannaUrlRoot + 'rest/search/sources'; // local dev version: 'resources/data/testSearchDalsWithFormData.json',
        SavannaConfig.locationSearch = SavannaConfig.savannaUrlRoot + '/rest/map/search';   // local dev version: 'resources/data/testSearchLocationSearch.json',
        SavannaConfig.uploadUrl = SavannaConfig.savannaUrlRoot + 'rest/document/upload';
        SavannaConfig.metadataUrl = SavannaConfig.savannaUrlRoot + 'rest/metadata';
        SavannaConfig.resultsMetadataUrl = SavannaConfig.savannaUrlRoot + 'rest/metadata';
        // TODO: replace this test URL with real endpoint once we have one....
        SavannaConfig.crumbnetTemplatesUrl = 'resources/data/Crumbnet.json';
        SavannaConfig.processTemplatesUrl = 'resources/data/Process.json';
        SavannaConfig.metadataTestDataUrl = 'resources/data/Metadata.json';
    }
});