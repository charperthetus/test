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
                if('update' == request.action) {
                    // Must put, not push.  So sayeth endpoint.
                    request.method = 'PUT';
                }
                return request;
            },
            afterRequest: function (request, success) {
                if (success && request.method === 'POST') {
                    var records = request.records;
                    var rec = records[0];
                    var uri = rec.get('uri');
                    me.setItemUri(encodeURIComponent(uri));
                    me.setupUrl();
                }
            }
        });
    },

    setupUrl: function() {
        this.getProxy().url = SavannaConfig.processUrl + '/' + encodeURI(this.getItemUri());
    },

    load: function() {
        this.setupUrl();

        this.callParent(arguments);
    }
});
