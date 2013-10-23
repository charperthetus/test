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

    model: 'Savanna.itemView.model.AutoCompleteModel',

    storeId: 'mainItem',

    constructor: function () {

        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.itemPredicateUrl,
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            }
        });
    }
});
