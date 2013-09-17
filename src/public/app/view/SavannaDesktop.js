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
                        //TODO - This seems to break flexpaper if it is not the first item
                        {
                            title: 'Document',
                            xtype: 'flexpaper_flexpapercomponent',
                            itemId: 'docviewer',
                            pdfFile: 'resources/flexpaper/pdf/Report.pdf'
                        },
                        {
                            xtype:"search_searchcomponent",
                            itemId:"searchcomponent"
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
                        }
                    ]
                }
            ]
        }

    ]
});