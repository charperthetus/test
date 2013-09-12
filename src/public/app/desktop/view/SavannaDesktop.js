/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.desktop.view.SavannaDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.desktop_savannadesktop',
    requires:[
        'Ext.form.RadioGroup',
        'Ext.dd.DragZone',
        'Ext.panel.Panel',
        'Ext.tab.Panel',
        'Ext.draw.Component',
        'Savanna.crumbnet.view.CrumbnetComponent',
        'Savanna.desktop.view.SavannaToolbar',
        'Savanna.desktop.view.SavannaDashboard',
        'Savanna.desktop.view.SavannaWorkspace',
        'Savanna.space.view.SpaceManagerComponent',
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
//                {
//                    xtype: 'tabpanel',
//                    itemId: 'tabpanel1',
//                    deferredRender: false,
//                    activeTab: 0,
//                    height: '100%',
//                    flex: 2,
//                    items: [
////                        {
////                            xtype:"search_searchcomponent",
////                            itemId:"searchcomponent"
////                        },
//                        {
//                            xtype: 'draw',
//                            title: 'Another Tab',
//                            closable: true,
//                            items: [
//
//                                {
//                                    type: 'circle',
//                                    radius: 90,
//                                    x: 100,
//                                    y: 100,
//                                    fill: 'yellow'
//                                }
//                            ]
//                        }
//                    ]
//                },
//                {
//                    xtype: 'tabpanel',
//                    itemId: 'tabpanel2',
//                    deferredRender: false,
//                    activeTab: 0,
//                    height: '100%',
//                    flex: 2,
//                    listeners: {
//                        add: function(me, tab, tabindex) {
//                            var tabBarButton = me.tabBar.items.items[tabindex];
//                            var tabEl = tab.getEl();
//                            tabBarButton.addListener('afterrender', function(tabbutton){
//                                tabbutton.dragZone = Ext.create('Ext.dd.DragZone', tabbutton.getEl(), {
//                                    getDragData: function(e) {
//                                        var sourceEl = e.getTarget(tabbutton.itemSelector, 10), d;
//                                        if (sourceEl) {
//                                            d = sourceEl.cloneNode(true);
//                                            d.id = Ext.id();
//                                            return (tabbutton.dragData = {
//                                                sourceEl: sourceEl,
//                                                repairXY: Ext.fly(sourceEl).getXY(),
//                                                ddel: d
//                                            });
//                                        }
//                                    },
//
//                                    getRepairXY: function() {
//                                        return this.dragData.repairXY;
//                                    }
//                                });
//
//                            });
//                        }
//                    },
//                    items: [
//                        {
//                            title: 'Crumbnet',
//                            xtype: 'go-graph',
//                            itemId: 'GRAPH_ONE'
//                        },
//                        {
//                            xtype: 'draw',
//                            title: 'Another Tab',
//                            closable: true,
//                            items: [
//
//                                {
//                                    type: 'circle',
//                                    radius: 90,
//                                    x: 100,
//                                    y: 100,
//                                    fill: 'blue'
//                                }
//                            ]
//                        }
//                    ]
//                }
            ]
        }

    ],

    initComponent: function() {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.desktop.controller.DesktopController');
    }
});
