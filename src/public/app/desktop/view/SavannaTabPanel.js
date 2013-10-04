/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/11/13
 * Time: 9:29 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.desktop.view.SavannaTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.desktop_tabpanel',
    requires: [
        'Ext.ux.TabReorderer',
        'Ext.ux.TabCloseMenu',
        'Savanna.crumbnet.view.CrumbnetComponent',
        'Savanna.metadata.view.Details',
        'Savanna.process.view.ProcessEditorComponent'
    ],
    ui: 'dark',
    enableTabScroll: true,
//    plugins: [
//            Ext.create('Ext.ux.TabReorderer'),
//            Ext.create('Ext.ux.TabCloseMenu', {
//                extraItemsHead: [
//                    '-',
//                    {
//                        text: 'Split',
//                        hideOnClick: true,
//                        handler: function (item) {
//                            currentItem.tab.setClosable(item.checked);
//                        }
//                    },
//                    '-',
//                    {
//                        text: 'Move right',
//                        hideOnClick: true,
//                        hidden: (this.mainPanel === false),
//                        handler: function(item) {
//                            currentItem.tab.setDisabled(!item.checked);
//                        }
//                    }
//                ],
//            })
//    ],
    tabBar:{
        ui: 'dark',
        items:[{
            xtype: 'tab',
            text:'+',
            closable: false,
            ui: 'dark',
            menu: {
                xtype: 'menu',
                plain: true,
                items: [
                    {
                        text: 'Details',
                        handler: function(item) {
                            var tabPanel = item.up('tabpanel');
                            if (tabPanel) {
                                var detailsView = Ext.create('widget.metadata_details', {
                                    title: 'Details',
                                    //itemURI: 'SolrJdbc%252FRich%252F2fa25cdf-9aab-471f-85b6-5359c0cd0dfd'
                                    itemURI: 'SolrJdbc%252FRich%252F061aedc6-d88c-497e-81dc-77d809b3262c',
                                    tabConfig: {
                                        ui: 'dark'
                                    }
                                });
                                var tab = tabPanel.add(detailsView);
                                tabPanel.doLayout();
                                tabPanel.setActiveTab(tab);
                            }
                        }
                    },
                    {
                        text: 'Process',
                        handler: function(item) {
                            var tabPanel = item.up('tabpanel');
                            if (tabPanel) {
                                var processComponent = Ext.create('Savanna.process.view.ProcessEditorComponent', {
                                    title: 'Untitled Process', //todo: decide on default name for a new process
                                    tabConfig: {
                                        ui: 'dark'
                                    }
                                });
                                var tab = tabPanel.add(processComponent);
                                tabPanel.doLayout();
                                tabPanel.setActiveTab(tab);
                            }

                        }
                    },
                    {
                        text: 'Item',
                        handler: function(item) {
                            var tabPanel = item.up('tabpanel');
                            if (tabPanel) {
                                var itemComponent = Ext.create('Ext.panel.Panel', {
                                    title: 'Untitled Item', //todo: decide on default name for a new item
                                    tabConfig: {
                                        ui: 'dark'
                                    }
                                });
                                var tab = tabPanel.add(itemComponent);
                                tabPanel.doLayout();
                                tabPanel.setActiveTab(tab);
                            }

                        }
                    }
                ]
            }
        }]
    }
});
