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

    load: function() {
        // Take this line out to use the Provided URI below.
        this.getProxy().url = SavannaConfig.metadataTestDataUrl;
        // Put this line back in to use the URI set in the constructor.
        //this.getProxy().url = SavannaConfig.metadataUrl + '/' + this.itemURI;

        this.callParent(arguments);
    }

});