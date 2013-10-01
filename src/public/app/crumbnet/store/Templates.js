/* global Ext: false, Savanna: false */
Ext.define('Savanna.crumbnet.store.Templates', {
    extend: 'Ext.data.Store',

    storeId: 'templateStore',

    model: 'Savanna.crumbnet.model.TemplateGroup',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: SavannaConfig.crumbnetTemplatesUrl,
        reader: {
            type: 'json',
            root: 'groups'
        }
    }
});