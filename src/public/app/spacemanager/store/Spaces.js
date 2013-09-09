/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/5/13
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.spacemanager.store.Spaces', {
    extend: 'Ext.data.Store',

    storeId: 'spaceStore',

    model: 'Savanna.spacemanager.model.Space',

    autoLoad: true,

    proxy: {
        type: 'rest',
        api: {
            read: Savanna.Config.buildSavannaUrl('testSpacesUrl'),
            update: Savanna.Config.buildSavannaUrl('savedSpacesUrl')
        },
        reader: {
            type: 'json',
            root: 'spaces'
        }
    }
});
