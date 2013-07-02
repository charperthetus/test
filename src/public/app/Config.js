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
    savannaUrlRoot: 'https://qac2is2sav.thetuscorp.com:8443/c2is2',

    // Urls for all the searches we do
    loginUrl: '/authcheck/loggedIn.html',
    searchUrl: '/rest/c2is2/model/search',
    itemViewUrl: '/rest/c2is2/model/item/',
    dalSourcesUrl: '/rest/search/sources',

    // Configuration for which top-level UI component to use
    desktopType: 'simpletabbeddesktop'
});