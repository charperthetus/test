/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 8:02 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.store.Templates', {
    extend: 'Ext.data.Store',

    storeId: 'processTemplateStore',

    model: 'Savanna.process.model.TemplateGroup',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: SavannaConfig.processTemplatesUrl,
        reader: {
            type: 'json',
            root: 'groups'
        }
    }
});