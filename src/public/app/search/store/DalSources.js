/* global Ext: false */
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

    autoLoad: true,

    constructor: function() {
        var me = this,
            readerClass;

        this.callParent(arguments);

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
            type: 'savanna-cors',
            //url: 'resources/data/testSearchDalsWithFormData.json',
            url: Savanna.Config.savannaUrlRoot + Savanna.Config.dalSourcesUrl,
            actionMethods: {
                read: 'GET'
            },
            // Turn off the paging params...
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,
            noCache: false, // TODO: take this out when we are using a real service...
            addSessionId: false,
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