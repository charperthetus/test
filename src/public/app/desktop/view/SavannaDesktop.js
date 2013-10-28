/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.desktop.view.SavannaDesktop', {
    extend: 'Savanna.component.ClassificationPanel',
    alias: 'widget.desktop_savannadesktop',
    requires:[
        'Savanna.component.ClassificationPanel',
        'Savanna.desktop.controller.DesktopController',
        'Savanna.desktop.view.SavannaWorkspace'
    ],

    controller: 'Savanna.desktop.controller.DesktopController',

    layout: 'fit',

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
                },{
                // TODO: Change this out to a button or remove it depending on where MS lives
                itemId: 'modelsearchbutton',
                cls:'modelSearchButtonFramework',
                ui:'brand-header',
                scale: 'medium',
                text: 'Model Search'
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
            /*{ //TODO - commented until we have a real help link to point to.
                itemId: 'helpbutton',
                cls:'helpButtonFramework',
                ui:'brand-header',
                scale: 'medium'
            },*/
            {
                itemId: 'userbutton',
                cls:'userButtonFramework',
                ui:'brand-header',
                scale: 'medium',
                menu: {
                    items: [{
                        itemId: 'currentuser'
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
    ]
});
