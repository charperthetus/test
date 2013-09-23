/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 8/15/13
 * Time: 8:20 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.store.SearchLocation', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.search.model.SearchLocation',
        'Savanna.proxy.Cors'
    ],

    storeId: 'findLocation',

    model: 'Savanna.search.model.SearchLocation',

    autoLoad: false,

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',

            url: SavannaConfig.locationSearchUrl,

            // Use for static store
//            url: 'app/assets/data/testSearchLocationSearch.json',

            addSessionId: false, // this needs to be left in until using correct url or Ted adds node fix

            reader: {
                type: 'json',
                root: 'data'
            }
        });
    }
});