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

            url: 'app/assets/data/testMetadata.json',
            //url: SavannaConfig.metadataUrl + '/' + itemURI,

            addSessionId: false, // this needs to be left in until using correct url or Ted adds node fix
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,

            reader: {
                type: 'json'
                //root: 'data'
            },
            writer: {
                type: 'json'
            }

        });

    },

    load: function() {
        //this.getProxy().url = SavannaConfig.metadataUrl + '/' + this.itemURI;
        this.callParent(arguments);
        console.log('URL ', this.getProxy().url);
    }

});