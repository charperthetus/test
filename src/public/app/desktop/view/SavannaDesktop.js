/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.desktop.view.SavannaDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.desktop_savannadesktop',
    requires:[
        'Ext.panel.Panel',
        'Savanna.desktop.view.SavannaDashboard',
        'Savanna.desktop.view.SavannaWorkspace',
        'Savanna.space.view.SpaceManagerComponent',
        'Savanna.controller.Factory'
    ],
    layout: {
        type: 'border'
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
                /*todo: - the space manager component is the first child of the desktop container. We should probably
                * change the code to create and add the desktop children only when they are needed. Do we have them
                * as local variables in this view? or do we do that in the controller? What is the proper approach?
                */
                {
                    xtype: 'space_spacemanagercomponent',
                    itemId: 'spacemanager'
                },
                {
                    xtype: 'desktop_savannadashboard',
                    itemId: 'savannadashboard',
                    width: '100%',
                    hidden: true
                },
                {
                    xtype: 'desktop_savannaworkspace',
                    itemId: 'savannaworkspace',
                    hidden: true
                }
            ]
        }

    ],

    initComponent: function() {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.desktop.controller.DesktopController');
    }
});
