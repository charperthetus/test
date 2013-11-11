/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:17 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.upload.model.UploadItem', {

    extend: 'Ext.data.Model',
    fields: ['status','fileName','fileSize','progress','fileId','docUri', 'classification']

});
