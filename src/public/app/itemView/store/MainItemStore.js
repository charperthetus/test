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

    addSessionId: false,

    updateJson: function() {
        var writer = Ext.create('Ext.data.writer.Json');
        var record = Ext.getStore('MainItemStore').first();
        console.log(writer, record);
        return (writer.getRecordData(record))
    },

    constructor: function () {
        var me = this;
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
                    //request.url = SavannaConfig.itemViewUrl
                    //request.jsonData = me.updateJson()
                    request.method = 'PUT';
                }
                if('destroy' == request.action) {
                    request.url = request.url.replace((request.url.substr(request.url.indexOf(';jsessionid='))), '');
                    request.method = 'DELETE';
                }
                return request;
            }
        });
    }
});
