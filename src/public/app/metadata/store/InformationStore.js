Ext.define('Savanna.metadata.store.InformationStore', {
    extend: 'Ext.data.Store',
    requires: [
        'Savanna.metadata.model.Metadata',
        'Savanna.proxy.Cors'
    ],
    autoLoad: false,
    itemUri: null,

    model: 'Savanna.metadata.model.Metadata',
    proxy: {
        type: 'savanna-cors',

        modifyRequest: function(request) {
            if('update' === request.action) {
                request.method = 'PUT';

                if(!Ext.isArray(request.jsonData)) {
                    request.jsonData = [request.jsonData];
                }
            }
            return request;
        }
    },

    load: function() {
        this.getProxy().url = SavannaConfig.metadataUrl + '/' + this.itemUri;
        this.callParent(arguments);
    }


});