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

    itemURI: '',

    constructor: function() {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.processUrl,
            modifyRequest: function(request) {
                if('update' == request.action) {
                    // Must put, not push.  So sayeth endpoint.
                    request.method = 'PUT';
                }
                return request;
            }

        });
    },

    load: function() {
        // Take this line out to use the Provided URI below.
        //this.getProxy().url = SavannaConfig.ureaProcessDataUrl;
        // Put this line back in to use the URI set in the constructor.
        this.getProxy().url = SavannaConfig.processUrl + '/' + this.itemURI;

        this.callParent(arguments);
    }
});
