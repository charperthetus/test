/* global Ext: false, Savanna: false */
Ext.define('Savanna.search.store.DalSources', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.Config',
        'Savanna.proxy.Cors'
    ],

    model: 'Savanna.search.model.DalSource',

    storeId: 'dalSources',

    pageSize: 50,

    constructor: function() {
        this.callParent(arguments);

        var me = this,
            restUrl = Savanna.Config.savannaUrlRoot + Savanna.Config.dalSourcesUrl,
            readerClass;

        // NOTE: we have to create a custom instance of the Json Reader in order to be able
        //       to parse the defaultId from the returned data since it is outside of the root...
        readerClass = Ext.extend(Ext.data.JsonReader, {
            root: 'sources',
            readRecords: function(data) {
                console.log('data', data);
                me.defaultId = data.defaultId || data.sources[0].id;
                return this.callParent([data]);
            }
        });

        console.log('url', restUrl);
        this.setProxy({
            actionMethods: {
                read: 'GET'
            },
            type: 'savanna-cors',
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