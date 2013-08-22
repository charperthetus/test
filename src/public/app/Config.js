/* global: Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuraiton information should be maintained
 *
 * Right now this file is static, but in future it may be dynamically generated (if we create an "admin" interface to
 * manage these sorts of settings)
 */
Ext.define('Savanna.Config', {
    singleton: true,

    // Root for all REST calls
    //savannaUrlRoot: 'http://thedevsav1.thetuscorp.com:8080/SavannaX/',
    //savannaUrlRoot: 'http://qac2is2sav2/c2is2/',
    // use this if you have Savanna 3.4 running.
    // Launch chrome from terminal with security disabled: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security

    savannaUrlRoot: 'http://localhost:8080/SavannaX/',

    // Urls for all the searches we do
    loginUrl: 'authcheck/loggedIn.html',
    searchUrl: 'rest/search', // local dev version: 'app/assets/data/testSearchResults.json',
    searchHistoryUrl: 'rest/search/history',// local dev version: 'app/assets/data/testSearchHistory.json',
    itemViewUrl: 'rest/c2is2/model/item/',
    dalSourcesUrl: 'rest/search/sources', // local dev version: 'resources/data/testSearchDalsWithFormData.json',
    // TODO: replace this test URL with real endpoint once we have one...
    crumbnetTemplatesUrl: 'resources/data/testCrumbnetTemplates.json',

    // number of past search terms to store in recent history
    searchHistoryPageSize: 10,

    resourcesPathPrefix: '',

    buildSavannaUrl: function(key) {
        var url

        if (typeof this[key] !== 'undefined') {
            url = this[key];
        }
        else {
            Ext.Error.raise({ msg: 'No url found for "' + key + '"' });
        }

        return this.savannaUrlRoot + url;
    }
});