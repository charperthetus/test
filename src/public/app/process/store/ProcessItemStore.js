/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/20/13
 * Time: 9:42 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.store.ProcessItemStore', {
    extend: 'Ext.data.Store',

    //todo: perhaps this store is not necessary? if it is, let's make sure it conforms to item structure

    storeId: 'processItemStore',

    fields:['label'],

    autoload: true,

    data:{'items':[
        { label: 'Item 1'},
        { label: 'Item 2'},
        { label: 'Item 3'},
        { label: 'Item 4'}
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});