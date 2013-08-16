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
    searchUrl: 'rest/c2is2/model/search',
    itemViewUrl: 'rest/c2is2/model/item/',
    dalSourcesUrl: 'rest/search/sources',

    // number of past search terms to store in recent history
    searchHistoryPageSize: 10,

    resourcesPathPrefix: ''
});