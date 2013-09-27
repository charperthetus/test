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

    layout: {
        type: 'fit'
    },
    tbar: {
        ui:'brand-header',
        items: [{
            itemId: 'logobutton',
            cls:'logoButtonFramework',
            scale: 'large',
            xtype: 'button',
            ui: 'brand-header',
            listeners: {
                afterrender: function(){
                    this.setLocalY(0)
                }
            }
        }, {
            xtype: 'toolbar',
            flex: 1,
            ui:'brand-header',
            layout: {
                pack: 'center',
                ui: 'brand-header',
                defaultMargins:'5'
            },
            items: [{
                itemId: 'searchbutton',
                cls:'searchButtonFramework',
                ui:'brand-header',
                scale: 'medium'

            }, {
                itemId: 'uploadbutton',
                cls:'uploadButtonFramework',
                ui:'brand-header',
                scale: 'medium'
            }]
        }, {
            xtype: 'toolbar',
            scale: 'medium',
            ui:'brand-header',
            layout: {
                defaultMargins:'5'
            },
            items: [{
                itemId: 'errorbutton',
                cls:'errorButtonFramework',
                ui:'brand-header',
                scale: 'medium'
            }, {
                itemId: 'helpbutton',
                cls:'helpButtonFramework',
                ui:'brand-header',
                scale: 'medium'
            }, {
                itemId: 'userbutton',
                cls:'userButtonFramework',
                ui:'brand-header',
                scale: 'medium',
                menu: {
                    ui: 'brand-header',
                    items: [{
                        text: 'Current Username here',
                        itemId: 'currentuser'
                    }, {
                        text: 'Account Settings',
                        itemId: 'accountsettings',
                    }, {
                        text: 'Log Out',
                        itemId: 'savannalogout'
                    }]
                }
            }]
        }]
    },
    items: [
        {
            xtype: 'panel',
            itemId: 'desktopcontainer',
            layout: 'fit',
            region: 'center',
            items: [
            {
                text: 'Help',
                itemId: 'helpbutton'
            },
        {
            text: 'User',
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
