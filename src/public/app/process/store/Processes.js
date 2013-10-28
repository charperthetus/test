/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/17/13
 * Time: 11:15 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.store.Processes', {
    extend: 'Ext.data.Store',

    storeId: 'processStore',

    requires: [
        'Savanna.process.model.Process'
    ],

    model: 'Savanna.process.model.Process',

    autoSync: false,

    proxy: {
        type: 'rest',
            api: {
                read: SavannaConfig.ureaProcessDataUrl
//                update: SavannaConfig.savedProcessDataUrl //todo: different endpoint here for updating
            },
        reader: {
            type: 'json'
        }
    }
});
