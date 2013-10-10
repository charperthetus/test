/* global Ext: false, Savanna: false */
Ext.define('Savanna.upload.store.UploadGridStore', {
    extend: 'Ext.data.Store',
    requires:'Savanna.upload.model.UploadItem',
    storeId: 'uploadGridStore',
    model: 'Savanna.upload.model.UploadItem',
    autoLoad: false
});
