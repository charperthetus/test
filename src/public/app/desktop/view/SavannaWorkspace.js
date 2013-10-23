/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/11/13
 * Time: 4:15 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.SavannaWorkspace', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.desktop_savannaworkspace',
    requires: [
        'Savanna.desktop.controller.WorkspaceController',
        'Savanna.desktop.view.SavannaTabPanel',
        'Savanna.crumbnet.view.CrumbnetComponent',
        'Savanna.map.view.MapComponent',
        'Savanna.process.view.ProcessEditorComponent'
    ],

    controller: "Savanna.desktop.controller.WorkspaceController",
    layout: 'hbox',
    currentView: 'single',
    tbar: {
        ui:'workspace-header',
        height: 32,
        items: [{
            xtype: 'label',
            text: 'Workspace',
            pack: 'start'
            },
            '->',
            {   
            xtype: 'toolbar',
            ui: 'workspace-header',
            layout: {
                defaultMargins: '0 5 0 5'
            },
            items: [{
                xtype: 'button',
                ui:'workspace-header',
                itemId: 'singleviewbutton',
                cls:'singleViewButtonFramework',
                enableToggle: true,
                allowDepress: false,
                pressed: true,
                toggleGroup: 'tabviewgroup'
            },
            {
                xtype: 'button',
                ui:'workspace-header',
                itemId: 'splitviewbutton',
                cls:'splitViewButtonFramework',
                enableToggle: true,
                allowDepress: false,
                toggleGroup: 'tabviewgroup'
            }]
        }]
    },
    items: [{
        xtype: 'desktop_tabpanel',
        itemId: 'maintabpanel',
        flex: 2,
        height: '100%',
        items: [
            {
                title: 'Crumbnet',
                xtype: 'go-graph',
                tabConfig: {
                    ui: 'dark'
                },
                closable: true
            }, {
                title: 'Map',
                xtype: 'map_component',
                itemId: 'MAP_ONE',
                tabConfig: {
                    ui: 'dark'
                },
                closable: true
            }
        ]
    }]
});