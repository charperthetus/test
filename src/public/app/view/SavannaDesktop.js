/**
 * Central view for the Savanna client application
 */
Ext.define('Savanna.view.SavannaDesktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.savannadesktop',
    requires:[
        'Ext.form.RadioGroup',
        'Ext.dd.DragZone',
        'Ext.panel.Panel',
        'Ext.tab.Panel',
        'Ext.draw.Component',
        'Savanna.crumbnet.view.CrumbnetComponent',
        'Savanna.map.view.part.Canvas'
    ],
    layout: {
        type: 'vbox'
    },
    items: [
        //Not sure if we are going to need this section or not
/*        {
            xtype: 'panel',
            itemId: 'buttonbarpanel',
            region: 'top',
            width: '100%',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            defaults: {
                xtype: 'button',
                scale: 'medium',
                iconAlign: 'top',
                toggleGroup: 'mygroup',
                enableToggle: true,
                listeners: {
                    click: function(me, event) {
                        // make sure a button cannot be de-selected
                        me.toggle(true);
                    }
                }
            },
            items: [
                //TODO - make a buttonbar / togglebuttonbar component
                {
                    icon: 'app/assets/icons/workspaceicon.png',
                    text: 'Workspace',
                    pressed: true
                }, {
                    icon: 'app/assets/icons/dashboardicon.png',
                    text: 'Dashboard'
                }, {
                    xtype: '',
                    padding: 3,
                    type: 'rect',
                    width: 8,
                    height: '100%'
                }, {
                    icon: 'app/assets/icons/searchicon.png',
                    text: 'Search'
                }
            ]
        },*/
        {
            xtype: 'panel',
            region: 'center',
            flex: 1,
            width: '100%',
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'tabpanel',
                    itemId: 'tabpanel1',
                    deferredRender: false,
                    activeTab: 0,
                    height: '100%',
                    flex: 2,
                    items: [
                        {
                            xtype:"search_searchcomponent",
                            itemId:"searchcomponent"
                        },
                        {
                            xtype: 'draw',
                            title: 'Another Tab',
                            closable: true,
                            items: [

                                {
                                    type: 'circle',
                                    radius: 90,
                                    x: 100,
                                    y: 100,
                                    fill: 'yellow'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    itemId: 'tabpanel2',
                    deferredRender: false,
                    activeTab: 0,
                    height: '100%',
                    flex: 2,
                    listeners: {
                        add: function(me, tab, tabindex) {
                            var tabBarButton = me.tabBar.items.items[tabindex];
                            var tabEl = tab.getEl();
                            tabBarButton.addListener('afterrender', function(tabbutton){
                                tabbutton.dragZone = Ext.create('Ext.dd.DragZone', tabbutton.getEl(), {
                                    getDragData: function(e) {
                                        var sourceEl = e.getTarget(tabbutton.itemSelector, 10), d;
                                        if (sourceEl) {
                                            d = sourceEl.cloneNode(true);
                                            d.id = Ext.id();
                                            return (tabbutton.dragData = {
                                                sourceEl: sourceEl,
                                                repairXY: Ext.fly(sourceEl).getXY(),
                                                ddel: d
                                            });
                                        }
                                    },

                                    getRepairXY: function() {
                                        return this.dragData.repairXY;
                                    }
                                });

                            });
                        }
                    },
                    items: [
                        {
                            title: 'Crumbnet',
                            xtype: 'go-graph',
                            itemId: 'GRAPH_ONE'
                        },
                        {
                            title: 'Map',
                            xtype: 'map_component',
                            itemId: 'MAP_ONE'
                        },
                        {
                            xtype: 'draw',
                            title: 'Another Tab',
                            closable: true,
                            items: [

                                {
                                    type: 'circle',
                                    radius: 90,
                                    x: 100,
                                    y: 100,
                                    fill: 'blue'
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    ]
});