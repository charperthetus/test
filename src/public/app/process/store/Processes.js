/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/17/13
 * Time: 11:15 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.store.Processes', {
    extend: 'Ext.data.Store',

    storeId: 'processStore',

    requires: [
        'Savanna.process.model.Process',
        'Savanna.proxy.Cors'
    ],

    model: 'Savanna.process.model.Process',

    autoSync: false,

    config: {
        itemUri: ''
    },

    constructor: function() {
        this.callParent(arguments);

        var me = this;

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.processUrl,
            modifyRequest: function(request) {
                if('update' === request.action || 'create' === request.action) {
                    // Must put, not push.  So sayeth endpoint.
                    request.method = 'PUT';
                    //request.params = {id: encodeURIComponent(me.getAt(0).data.identifier)};
                    request.params = {id: me.getAt(0).data.identifier};
                    request.url = SavannaConfig.modelProcessSaveUrl + ';jsessionid=' + Savanna.jsessionid;
                } else if ('read' === request.action) {
                    request.url = SavannaConfig.modelProcessLoadUrl + encodeURI(this.getItemUri());
                }
                return request;
            },
            afterRequest: function (request, success) {
                if (success && request.method === 'PUT') {
                    var uri = request.proxy.reader.jsonData;
                    me.getAt(0).data.uri = uri;
                    me.setItemUri(encodeURIComponent(uri));
                }
            }
        });
    },

    load: function() {
        this.callParent(arguments);
    }
});
