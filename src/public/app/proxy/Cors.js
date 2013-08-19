/* global Ext: false, Savanna: false */
/**
 * Savanna.proxy.Cors
 *
 * A proxy that enables CORS communication for JSON REST endpoints. Typical usage:
 *
 * var store = Ext.create('Ext.data.Store', {
 *      proxy: {
 *          type: 'savanna-cors',
 *          url: 'http://some/url',
 *          devUrl: 'http://some.development/url.json', // useful if you have a hard-coded asset data file that you want to use in development
 *          devMode: true, // setting this to true along with defining a devUrl, will ensure you get unit-test safe URLs (ie. ones that can be used with the ThetusTestHelpers.FakeServer)
 *          addSessionId: false, // if you want to suppress adding "jsessionid" to your url
 *          modifyRequest: function(request) {
 *              // do something to the request...
 *              return request;
 *          }
 *      },
 *      reader: {
 *          type: 'json',
 *          root: 'myRecordsRoot
 *      }
 * });
 *
 * // do all your store magic....
 */
Ext.define('Savanna.proxy.Cors', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.savanna-cors',

    cors: true,
    withCredentials: true,

    actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'POST',
        destroy: 'POST'
    },

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    reader: {
        type: 'json'
    },

    writer: {
        type: 'json'
    },

    addSessionId: true,

    devMode: false,

    constructor: function(config) {
        if (config && config.devMode) {
            this.noCache = false;
            this.startParam = undefined;
            this.limitParam = undefined;
            this.pageParam = undefined;
        }

        this.callParent(arguments);
    },

    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation, callback, scope),
            origAjaxUseDefaultXhrHeaderFlag = Ext.Ajax.useDefaultXhrHeader,
            origAjaxCorsFlag = Ext.Ajax.cors,
            origAjaxWithCredentialsFlag = Ext.Ajax.withCredentials,
            origAjaxDisableCachingFlag = Ext.Ajax.disableCaching;

        request = writer.write(request);

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request)
        });

        if (this.modifyRequest) {
            request = this.modifyRequest(request);
        }

        Ext.Ajax.UseDefaultXhrHeader = false;
        Ext.Ajax.cors = this.cors;
        Ext.Ajax.withCredentials = this.withCredentials;
        Ext.Ajax.disableCaching = this.noCache;

        Ext.Ajax.request(request);

        Ext.Ajax.cors = origAjaxCorsFlag;
        Ext.Ajax.useDefaultXhrHeader = origAjaxUseDefaultXhrHeaderFlag;
        Ext.Ajax.withCredentials = origAjaxWithCredentialsFlag;
        Ext.Ajax.disableCaching = origAjaxDisableCachingFlag;

        return request;
    },

    buildUrl: function(request) {
        var url = '',
            origAddSessionId = this.addSessionId;

        if (this.devMode && this.devUrl) {
            url = this.devUrl;
            this.addSessionId = false;
        }
        else {
            url = this.getUrl(request);
        }

        if (this.addSessionId) {
            url += ';jsessionid=' + Savanna.jsessionid;
        }

        this.addSessionId = origAddSessionId;

        return url;
    }
});