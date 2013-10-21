/* global Ext: false, SavannaConfig: false */
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

    storeId: 'mainItem',

    model: 'Savanna.itemView.model.MainItemModel',

    autoLoad: false,

    proxy: {
        type: 'savanna-cors',
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        }
    }
});

