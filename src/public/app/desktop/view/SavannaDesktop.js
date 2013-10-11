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
            height: 44,
            ui: 'brand-header'
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
        }, 
        {
            xtype: 'toolbar',
            scale: 'medium',
            ui:'brand-header',
            layout: {
                defaultMargins:'5'
            },
            items: [
            // TODO: when development is ready for error messages, uncomment this block for alert button
            // {
            //     itemId: 'errorbutton',
            //     cls:'errorButtonFramework',
            //     ui:'brand-header',
            //     scale: 'medium'
            // }, 
            {
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
                    items: [{
                        text: 'Current Username here',
                        itemId: 'currentuser'
                    }, {
                        text: 'Account Settings',
                        itemId: 'accountsettings'
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
            xtype: 'desktop_savannaworkspace',
            itemId: 'savannaworkspace'
        }

    ],

    initComponent: function() {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.desktop.controller.DesktopController');
    }
});
