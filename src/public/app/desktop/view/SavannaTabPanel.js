/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/11/13
 * Time: 9:29 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.SavannaTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.desktop_tabpanel',
    requires: [
        'Ext.ux.TabReorderer'
    ],
    enableTabScroll: true,
    plugins: Ext.create('Ext.ux.TabReorderer'),
    tabBar:{
        items:[{
            text:'+',
            closable: false,
            handler: function(btn) {
                var tabPanel = btn.up('tabpanel');
                var tab = tabPanel.add(Ext.create('Savanna.crumbnet.view.CrumbnetComponent', {
                    title: 'Crumbnet'
                }));
            }
        }]
    }
});