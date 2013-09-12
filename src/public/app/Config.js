/* global Ext: false */
/**
 * Configuration object for Savanna client application
 *
 * This is where any globally available configuraiton information should be maintained
 *
 * Right now this file is static, but in future it may be dynamically generated (if we create an "admin" interface to
 * manage these sorts of settings)
 *
 * @tag config
 */
Ext.define('Savanna.Config', {
    singleton: true,

    // Root for all REST calls
    savannaUrlRoot: 'http://thedevsav1.thetuscorp.com:8080/SavannaX/',
    //savannaUrlRoot: 'http://qac2is2sav2/c2is2/',
    // use this if you have Savanna 3.4 running.
    // Launch chrome from terminal with security disabled: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security

    //savannaUrlRoot: 'http://localhost:8080/SavannaX/',

    // Urls for all the rest endpoints
    loginUrl: 'authcheck/loggedIn.html',
    searchUrl: 'rest/search', // local dev version: 'app/assets/data/testSearchResults.json',
    itemViewUrl: 'rest/c2is2/model/item/',
    dalSourcesUrl: 'rest/search/sources', // local dev version: 'resources/data/testSearchDalsWithFormData.json',
    locationSearch: '/rest/map/search',   // local dev version: 'resources/data/testSearchLocationSearch.json',
    // TODO: replace this test URL with real endpoint once we have one...
    crumbnetTemplatesUrl: 'resources/data/testCrumbnetTemplates.json',

    resourcesPathPrefix: '',

    buildSavannaUrl: function(key) {

        var url,
            re = /\.json$/i;

        if (typeof this[key] !== 'undefined') {
            url = this[key];
        }
        else {
            Ext.Error.raise({ msg: 'No url found for "' + key + '"' });
        }

        if (!re.test(url)) {
            url = this.savannaUrlRoot + url;
        }

        return url;
    }
});
