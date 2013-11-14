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
        'Savanna.image.view.ImageComponent',
        'Savanna.desktop.view.StartPage'
    ],

    controller: "Savanna.desktop.controller.WorkspaceController",
    layout: 'hbox',
    currentView: 'single',
    tbar: {
        ui: 'workspace-header',
        height: 32,
        items: [
            {
                xtype: 'label',
                text: 'Workspace',
                pack: 'start'
            }
        ]
    },
    items: [
        {
            xtype: 'desktop_tabpanel',
            itemId: 'desktopTabPanel',
            flex: 2,
            height: '100%',
            items: [
                {
                    xtype: 'desktop_startpage',
                    title: 'Start',
                    closable: true,
                    tabConfig: {
                        ui: 'dark'
                    }
                }
            ]
        }
    ]
});