Ext.define('Savanna.store.DalSources', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.Config'
    ],

    model: 'Savanna.model.DalSource',

    storeId: 'dalSources',

    pageSize: 50,

    constructor: function(config) {
        this.callParent(arguments);

        var me = this,
            restUrl = Savanna.Config.savannaUrlRoot + Savanna.Config.dalSourcesUrl,
            readerClass;

        // NOTE: we have to create a custom instance of the Json Reader in order to be able
        //       to parse the defaultId from the returned data since it is outside of the root...
        readerClass = Ext.extend(Ext.data.JsonReader, {
            root: 'sources',
            readRecords: function(data) {
                me.defaultId = data.defaultId || data.sources[0].id;
                return this.callParent([data]);
            }
        });

        this.setProxy({
            type: 'rest',// TODO: change back to "rest" when we have a service endpoint...
            url: restUrl,
            buildUrl: function(request) {
                // TODO: WE REALLY NEED A Savanna.utils.UrlBuilder lib...
                return this.getUrl(request) + ';jsessionid=' + Savanna.jsessionid;
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            reader: new readerClass(),
            writer: {
                type: 'json'
            }
        });
    }
});