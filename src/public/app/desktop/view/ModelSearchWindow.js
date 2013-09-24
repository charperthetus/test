/**
 * Created with IntelliJ IDEA.
 * User: amartin
 * Date: 09/23/2013
 * Time: 8:43 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.ModelSearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.desktop_modelsearchwindow',

    title: 'Model Search',
    height: 600,
    width: 600,
    minWidth: 200,
    minHeight: 200,
    items: [{
        xtype: 'modelsearch'

    }]
});
