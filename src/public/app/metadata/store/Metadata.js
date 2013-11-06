/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 10:14 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.store.Metadata', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.metadata.model.Metadata',
        'Savanna.proxy.Cors'
    ],

    model: 'Savanna.metadata.model.Metadata',

    storeId: 'metadata',

    autoLoad: false,

    itemURI: '',

    constructor: function() {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.metadataUrl,
            modifyRequest: function(request) {
                if('update' == request.action) {
                    // Must put, not push.  So sayeth endpoint.
                    request.method = 'PUT';
                    // This endpoint wants an array of json objects.
                    // If there's only one, the store gives us only that object.
                    // We'll make an array of it.
                    if(!Ext.isArray( request.jsonData ) ) {
                        request.jsonData = [request.jsonData];
                    }
                }
                return request;
            }

        });
    },

    load: function() {
        this.getProxy().url = SavannaConfig.metadataUrl + '/' + this.itemURI;

        this.callParent(arguments);
    }

});