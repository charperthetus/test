/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.desktop.view.SavannaDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.desktop_savannadesktop',
    requires:[
        'Ext.panel.Panel',
        'Savanna.desktop.view.SavannaWorkspace',
        'Savanna.controller.Factory'
    ],

    tbar: [{
            id: 'logo',
            xtype: 'button',
            scale: 'large',
            text: 'Savanna Logo'
        },
        {
            xtype: 'toolbar',
            scale: 'medium',
            flex: 1,

            layout: {
                pack: 'center'
            },
            items: [{
                text: 'S',
                itemId: 'searchbutton'
            },
            {
                text: 'U',
                itemId: 'uploadbutton'
            }]
        },
        {
            xtype: 'toolbar',
            scale: 'medium',
            items: [{
                text: 'E',
                itemId: 'errorbutton'
        },
        {
            text: 'H',
            itemId: 'helpbutton'
        },
        {
            text: 'U',
            itemId: 'userbutton',
            menu: [{
                text: 'Current Username here',
                itemId: 'currentuser'
            }, {
                text: 'Account Settings',
                itemId: 'accountsettings'
            }, {
                text: 'Log Out',
                itemId: 'savannalogout'
            }]
        }]
    }],

    items: [
        {
            xtype: 'desktop_savannaworkspace',
            itemId: 'savannaworkspace'
        }

    ],

    initComponent: function() {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.desktop.controller.DesktopController');
    }
});
