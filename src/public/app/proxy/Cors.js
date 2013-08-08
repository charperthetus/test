/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 8/8/13
 * Time: 8:26 AM
 */
/* global Ext: false */
/**
 * Savanna.proxy.Cors
 *
 * A proxy that enables CORS communication for JSON REST endpoints. Typical usage:
 *
 * var store = Ext.create('Ext.data.Store', {
 *      proxy: {
 *          type: 'savanna-cors',
 *          url: 'http://some/url'
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

        console.log('request', request);
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

    // TODO: this is a custom function to be defined by the code using this proxy
    modifyRequest: function(request) {
        if (this.restAction === 'POST') {
            Ext.apply(request, {
                jsonData: Ext.JSON.encode(this.searches)
            });
        }

        return request;
    }
});