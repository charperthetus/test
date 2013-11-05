/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/22/13
 * Time: 9:50 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.store.TypeAheadStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.process.model.TypeAheadModel',
        'Savanna.proxy.Cors'
    ],

    config: {
        urlEndPoint: "",
        paramsObj: {}
    },

    model: 'Savanna.process.model.TypeAheadModel',

    constructor: function (configs) {
        this.callParent(arguments);
        this.initConfig(configs);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.savannaUrlRoot + 'rest//model/search/typeahead',
            extraParams: this.getParamsObj(),

            reader: {
                type: 'json',
                root: 'results'
            },
            writer: {
                type: 'json'
            }
        });
    }
});
