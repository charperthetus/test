/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/21/13
 * Time: 9:12 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/20/13
 * Time: 9:42 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.store.ProcessActionStore', {
    extend: 'Ext.data.Store',

    //todo: perhaps this store is not necessary? if it is, let's make sure it conforms to action structure

    storeId: 'processActionStore',

    fields:['label'],

    autoload: true,

    data:{'actions':[
        { label: 'Action 1'},
        { label: 'Action 2'},
        { label: 'Action 3'},
        { label: 'Action 4'}
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'actions'
        }
    }
});