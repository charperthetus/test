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

    requires: [
        'Savanna.utils.CorsAjax'
    ],

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

    doRequest: function (operation, callback, scope) {
        var writer = this.getWriter(),
            request = this.buildRequest(operation, callback, scope);

        request = writer.write(request);

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            disableCaching: this.noCache,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request)
        });

        if (this.modifyRequest) {
            request = this.modifyRequest(request);
        }

        Savanna.utils.CorsAjax.request(request);

        return request;
    },

    buildUrl: function(request) {
        var url = this.getUrl(request);

        if (this.addSessionId) {
            url += ';jsessionid=' + Savanna.jsessionid;
        }

        return url;
    }
});