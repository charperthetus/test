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
            api: {
                create: SavannaConfig.itemCreateUrl,
                read: SavannaConfig.itemViewUrl,
                update: SavannaConfig.itemViewUrl,
                destroy: SavannaConfig.itemDestroyUrl
            },
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            },
            modifyRequest: function(request) {
                console.log(request);
                if('update' == request.action) {
                    console.log('------------ UPDATE ------------');
                    request.method = 'PUT';
                }
                if('create' == request.action || 'read' == request.action) {
                    console.log('------------ CREATE OR READ ------------');
                    request.method = 'GET';
                }
                if('destroy' == request.action) {
                    console.log('------------ DELETE ------------');
                    request.method = 'DELETE';
                }
                return request;
            }
        });
    }
});
