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
        'Savanna.metadata.view.Details'
    ],
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
        items:[{
            xtype: 'button',
            text:'+',
            closable: false,
            menu: {
                xtype: 'menu',
                plain: true,
                defaults: {
                    handler: function(item) {
                        var tabPanel = item.up('tabpanel');
                        var tab;
                        // Stealing tab D as a temporary place to put the details panel.  (You know, "D" for Details.)
                        if('D' == item.text)
                        {
                            var detailsView = Ext.create('widget.metadata_details', {
                                title: 'Details',
                                //itemURI: 'SolrJdbc%252FRich%252F2fa25cdf-9aab-471f-85b6-5359c0cd0dfd'
                                itemURI: 'SolrJdbc%252FRich%252F061aedc6-d88c-497e-81dc-77d809b3262c'
                            });
                            tab = tabPanel.add(detailsView);
                        } else {
                            var dummyCrumbnet = Ext.create('Savanna.crumbnet.view.CrumbnetComponent', {title: 'Tab' + item.text});
                            tab = tabPanel.add(dummyCrumbnet);
                        }
                        tabPanel.doLayout();
                        tabPanel.setActiveTab(tab);
                    }
                },
                items: [
                    { text: 'A' },
                    { text: 'B' },
                    { text: 'C' },
                    { text: 'D' },
                    { text: 'E' }
                ]
            }
        }]
    }
});