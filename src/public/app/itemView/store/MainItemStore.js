/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.store.MainItemStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.proxy.Cors'
    ],

    model: 'Savanna.itemView.model.MainItemModel',

    storeId: 'mainItem',

    constructor: function () {

        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.itemViewUrl,
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            },
            modifyRequest: function(request) {
                if('update' == request.action) {
                    console.log('------------ UPDATE ------------');
                    request.method = 'PUT';
                }
                return request;
            }
        });
    }
});
