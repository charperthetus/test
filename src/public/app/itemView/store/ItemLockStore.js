/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.store.ItemLockStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.proxy.Cors'
    ],

    storeId: 'itemLock',

    constructor: function () {

        this.callParent(arguments);

        var me = this;

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.itemLockUrl,
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            },
            modifyRequest: function (request) {
                if ('read' == request.action) {
                    request.method = 'GET';
                    /*
                    clean up the request..?
                     */
                    request.url = request.url.replace((request.url.substr(request.url.indexOf(';jsessionid='))), '');
                }

                if ('destroy' == request.action) {
                    request.method = 'DELETE';
                    /*
                     clean up the request..?
                     */
                    request.url = request.url.replace((request.url.substr(request.url.indexOf(';jsessionid='))), '');
                }
                return request;
            }
        });
    }
});
