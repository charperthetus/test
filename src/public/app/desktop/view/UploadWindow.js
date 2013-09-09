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

    title: 'Upload',
    height: 600,
    width: 600,
    layout: 'fit',

    items: [{
        xtype: 'label',
        text: 'This is the upload dialog'
    }]
});
