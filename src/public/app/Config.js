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
        sc.userInfoUrl = rUrl + 'rest/user/info';
        sc.searchUrl = rUrl + 'rest/search'; // local dev version: 'app/assets/data/testSearchResults.json',
        sc.searchMetadataUrl = rUrl + 'rest/metadata/get';
        sc.itemViewUrl = rUrl + 'rest/model/item/';
        sc.itemLockUrl = rUrl + 'rest/lock/';
        sc.itemViewPerspective = rUrl + 'rest/perspective/';
        sc.itemCreateUrl = rUrl + 'rest/model/item/create/';
        sc.itemDeleteUrl = rUrl + 'rest/model/item/';
        sc.modelProcessLoadUrl = rUrl + 'rest/model/process/';
        sc.modelProcessSaveUrl = rUrl + 'rest/model/process/save';
        sc.modelSearchUrl = rUrl + 'rest/model/search/keyword/item';
        sc.dalSourcesUrl = rUrl + 'rest/search/sources'; // local dev version: 'resources/data/testSearchDalsWithFormData.json',
        sc.locationSearch = rUrl + '/rest/map/search';   // local dev version: 'resources/data/testSearchLocationSearch.json',
        sc.documentUrl = rUrl + 'rest/document/';
        sc.uploadUrl = rUrl + 'rest/document/upload';
        sc.metadataUrl = rUrl + 'rest/metadata';
        sc.capcoUrl = rUrl + 'rest/capco/';
        sc.processUrl = rUrl + 'rest/modelProcess';
        sc.workflowActions = rUrl + 'rest/workflow/actions';
        sc.workflowEvents = rUrl + 'rest/workflow/events/';
        sc.workflowRejectionReasons = rUrl + 'rest//workflow/rejectionReasons';
        sc.workflowStates = rUrl + 'rest/workflow/states';
        sc.workflowStatesPrivate = rUrl + 'rest/workflow/states/private';
        sc.workflowStatesRejected = rUrl + 'rest/workflow/states/rejected';

        sc.mockItemViewUrl = rUrl + 'rest/model/mock/item/';

        //Version number of the build - This is replaced in the build process
        sc.version = '0.1-SNAPSHOT_dev';
    }
});
