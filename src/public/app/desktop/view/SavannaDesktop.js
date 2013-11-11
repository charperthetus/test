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
                ui: 'brand-header',
                flex: 1
            }, {
                xtype: 'toolbar',
                ui:'brand-header',
                flex: 2,
                layout: {
                    pack: 'center',
                    ui: 'brand-header',
                    defaultMargins:'5'
                },
                items: [{
                    itemId: 'searchbutton',
                    cls:'searchButtonFramework',
                    ui:'brand-header',
                    width: 29,
                    height:29,
                    margin:'3 0 0 0',
                    glyph:'search',
                    tooltip: 'Click to search internal and external data sources.'
                },{
                    itemId: 'modelsearchbutton',
                    cls:'modelSearchButtonFramework',
                    ui:'brand-header',
                    width: 29,
                    height:29,
                    margin:'3 0 0 0',
                    glyph:'modelSearch',
                    tooltip: 'Click to search the Red Nodal Model.'
                },{
                    itemId: 'uploadbutton',
                    cls:'uploadButtonFramework',
                    ui:'brand-header',
                    width: 29,
                    height:29,
                    margin:'3 0 0 0',
                    glyph:'upload',
                    tooltip: 'Click to upload files.'
                }
                ]
            },
            {
                xtype: 'toolbar',
                scale: 'medium',
                ui:'brand-header',
                flex: 1,
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
                     width: 29,
                     height:29,
                     margin:'3 0 0 0',
                     glyph:'help'
                     },*/
                     '->',
                    {
                        itemId: 'userbutton',
                        cls:'userButtonFramework',
                        ui:'brand-header',
                        rtl: true,
                        width: 36,
                        height: 29,
                        margin:'3 0 0 0',
                        glyph:'silhouette',
                        menu: {
                            items: [{
                                itemId: 'currentuser'
                            }, {
                                text: 'Log Out',
                                itemId: 'savannalogout'
                            }]
                        }
                    }
                ]
            }
        ]
    },
    items: [
        {
            xtype: 'desktop_savannaworkspace',
            itemId: 'savannaworkspace'
        }
    ]
});
