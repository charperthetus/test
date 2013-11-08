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
        'Ext.String',
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
                    var uri = me.getAt(0).data.uri;
                    me.setItemUri(encodeURIComponent(uri));
                    request.method = 'PUT';
                    request.params = {id: encodeURI(encodeURIComponent(uri))};
                    request.url = SavannaConfig.modelProcessSaveUrl + ';jsessionid=' + Savanna.jsessionid;
                } else if ('read' === request.action) {
                    request.url = SavannaConfig.modelProcessLoadUrl + encodeURI(encodeURIComponent(me.getItemUri())) + ';jsessionid=' + Savanna.jsessionid;
                }
                return request;
            }
        });
    },

    load: function() {
        this.callParent(arguments);
    }
});
