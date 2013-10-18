/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 8/15/13
 * Time: 8:20 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.store.SearchLocation', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.modelSearch.model.SearchLocation',
        'Savanna.proxy.Cors'
    ],

    storeId: 'findLocation',

    model: 'Savanna.modelSearch.model.SearchLocation',

    autoLoad: false,

    constructor: function () {
        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',

            url: SavannaConfig.locationSearch,

            reader: {
                type: 'json',
                root: 'data'
            }
        });
    }
});
