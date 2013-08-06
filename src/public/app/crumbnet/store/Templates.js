/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:17 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.crumbnet.store.Templates', {
    extend: 'Ext.data.Store',

    storeId: 'templateStore',

    model: 'Savanna.crumbnet.model.TemplateGroup',

    autoLoad: true,

    proxy: {
        type: 'rest',
        // TODO: replace this test URL with real endpoint once we have one...
        url: 'app/assets/data/testCrumbnetTemplates.json',
        reader: {
            type: 'json',
            root: 'groups'
        }
    }
});