Ext.define('Savanna.classification.store.OptionsStore', {
    extend: 'Ext.data.Store',
    alias: 'widget.classification_options_store',
    autoLoad: false,

    storeId: 'classificationOptions',

    fields: ['dissemMarkings', 'classificationMarkings', 'fgiMarkings', 'sciMarkings', 'relMarkings'],
    proxy: {
        url: SavannaConfig.capcoOptions + ';jsessionid=' + Savanna.jsessionid,
        type: 'savanna-cors'
    }
});