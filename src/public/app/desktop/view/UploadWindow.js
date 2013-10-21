/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 8/29/13
 * Time: 8:43 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.UploadWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.desktop_uploadwindow',

    requires: [
        'Savanna.upload.view.UploadComponent'
    ],

    title: 'Upload',
    layout:'fit',
    height: 570,
    width: 640,
    minWidth: 430,
    minHeight: 325,
    ghost: false,
    items: [
        {
            xtype: 'upload_uploadcomponent'
        }
    ]
});
