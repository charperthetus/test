/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.desktop.view.SavannaDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.desktop_savannadesktop',
    requires:[
        'Ext.panel.Panel',
        'Savanna.desktop.view.SavannaToolbar',
        'Savanna.desktop.view.SavannaWorkspace',
        'Savanna.controller.Factory'
    ],
    layout: {
        type: 'border'
    },
    items: [
        {
            xtype: 'desktop_savannatoolbar',
            itemId: 'savannatoolbar',
            region: 'north'
        },
        {
            xtype: 'panel',
            itemId: 'desktopcontainer',
            layout: 'fit',
            region: 'center',
            items: [
                {
                    xtype: 'desktop_savannaworkspace',
                    itemId: 'savannaworkspace'
                }
            ]
        }

    ],

    initComponent: function() {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.desktop.controller.DesktopController');
    }
});
