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
        'Savanna.desktop.view.SavannaTabPanel'
    ],
    layout: 'hbox',
    currentView: 'single',
    tbar: {
        ui:'workspace-header',
        height: 30,
        items: [
            {
                xtype: 'button',
                icon: 'arrow',
                menu:{
                    items: [{
                        text: 'Item1'
                    }, {
                        text: 'Item2'
                    }, {
                        text: 'Item3'
                    }]
                }
            },
            {
                xtype: 'label',
                text: 'Workspace'
            },
            '->',
            {
                xtype: 'button',
                itemId: 'singleviewbutton',
                text: 'Single View',
                enableToggle: true,
                allowDepress: false,
                pressed: true,
                toggleGroup: 'tabviewgroup'
            },
            {
                xtype: 'button',
                itemId: 'splitviewbutton',
                text: 'Split View',
                enableToggle: true,
                allowDepress: false,
                toggleGroup: 'tabviewgroup'
            }
        ]
    },
    items: [
        {
            xtype: 'desktop_tabpanel',
            itemId: 'maintabpanel',
            flex: 2,
            height: '100%',
            items: [
                {
                    title: 'Crumbnet',
                    xtype: 'go-graph'
                },
                {
                    title: 'Map',
                    xtype: 'map_component',
                    itemId: 'MAP_ONE'
                }
            ]
        }
    ]
});