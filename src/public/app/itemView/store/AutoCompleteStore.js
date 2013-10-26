/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/22/13
 * Time: 9:50 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.store.AutoCompleteStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.proxy.Cors'
    ],

    config: {
        urlEndPoint: "",
        paramsObj: {}
    },

    model: 'Savanna.itemView.model.AutoCompleteModel',

    constructor: function (configs) {
        this.callParent(arguments);
        this.initConfig(configs);

        this.setProxy({
            type: 'savanna-cors',
            url: this.getUrlEndPoint(),
            extraParams: this.getParamsObj(),

            reader: {
                type: 'json',
                root: 'response'
            },
            writer: {
                type: 'json'
            }
        });
    }
});
