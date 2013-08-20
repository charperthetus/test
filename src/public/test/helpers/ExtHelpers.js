/* global Ext: false,
          console: false,
          ThetusTestHelpers: false
*/
/**
 * ThetusTestHelpers.ExtHelpers
 *
 * Helper methods for testing ExtJS
 */
(function() {
    'use strict';

    if (!ThetusTestHelpers) {
        ThetusTestHelpers = {};
    }

    var helpers = ThetusTestHelpers.ExtHelpers = {};

    ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID = 'test-html';

    /**
     * Ensures that our test html container is empty
     */
    helpers.cleanTestDom = function() {
        var testDom = Ext.get(ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID),
            extJsTooltips = Ext.get('ext-quicktips-tip');

        if (testDom && testDom.dom && testDom.dom.children ) {
            testDom.dom.innerHTML = '';
        }

        if (extJsTooltips) {
            extJsTooltips.remove();
        }
    };

    /**
     * Ensures that we have a DOM Node to use as the root of any HTML content built by ExtJS
     */
    helpers.createTestDom = function() {
        if (!document.querySelector('#' + ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID)) {
            var body = document.querySelector('body');
            if (body) {
                var div = document.createElement('div');
                div.id = ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID;
                body.appendChild(div);
            }
            else {
                console.error('no body tag to append our test container to');
            }
        }
    };

    /**
     * Sets up an instance of a give Store class such that it:
     *   1) does not append a cache-busting parameter to any request URLs
     *   2) does not append any extraneous query parameters (e.g. paging parameters) to any request URLs
     *
     * @param {String} storeClass
     * @param {object} [options]
     * @returns {*} Savanna Store instance
     */
    helpers.setupNoCacheNoPagingStore = function(storeClass, options) {
        var storeOptions = Ext.merge({ autoLoad: false }, options || {});
        var store = Ext.create(storeClass, storeOptions);

        // NOTE: we have to disable caching or the URL gets a cache-busting query parameter which breaks the fake server
        var proxy = store.getProxy();

        proxy.noCache = false;
        proxy.startParam = undefined;
        proxy.limitParam = undefined;
        proxy.pageParam = undefined;

        return store;
    };

    /**
     * Generates the same URL as would be used in a request (allows you to set up ThetusTestHelpers.FakeServer requests)
     * @param {Ext.data.Proxy} proxy
     * @param {String} action ('read'|'create'|'update'|'destroy')
     * @param {String} method ('GET'|'POST'|'PUT'|'DELETE')
     * @returns {String}
     */
    helpers.buildTestProxyUrl = function(proxy, action, method) {
        var request = Ext.create('Ext.data.Request', {
            action: action,
            method: method,
            url: proxy.url,
            operation: Ext.create('Ext.data.Operation')
        });

        return proxy.buildUrl(request);
    };
})();