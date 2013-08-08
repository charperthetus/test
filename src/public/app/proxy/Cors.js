/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 8/8/13
 * Time: 8:26 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
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
            request = this.buildRequest(operation, callback, scope);

        request = writer.write(request);

        Ext.apply(request, {
            headers: this.headers,
            timeout: this.timeout,
            scope: this,
            callback: this.createRequestCallback(request, operation, callback, scope),
            method: this.getMethod(request),
        });

        if (this.modifyRequest) {
            request = this.modifyRequest(request);
        }

        var origAjaxUseDefaultXhrHeaderFlag = Ext.Ajax.useDefaultXhrHeader;
        var origAjaxCorsFlag = Ext.Ajax.cors;
        var origAjaxWithCredentialsFlag = Ext.Ajax.withCredentials;
        Ext.Ajax.UseDefaultXhrHeader = false;
        Ext.Ajax.cors = this.cors;
        Ext.Ajax.withCredentials = this.withCredentials;
        console.log('request', request);
        Ext.Ajax.request(request);
        Ext.Ajax.cors = origAjaxCorsFlag;
        Ext.Ajax.useDefaultXhrHeader = origAjaxUseDefaultXhrHeaderFlag;
        Ext.Ajax.withCredentials = origAjaxWithCredentialsFlag;

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