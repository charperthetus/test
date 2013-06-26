/**
 * Created with JetBrains WebStorm.
 * User: ksonger
 * Date: 6/24/13
 * Time: 2:59 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.view.ModelSearch', {
    extend: 'Ext.panel.Panel',
    requires: [
        "Ext.layout.container.Border",
        "Ext.toolbar.Toolbar",
        "Savanna.view.search.SearchBar",
        "Savanna.view.search.SearchToolbar",
        "Savanna.view.search.SearchViewToggle",
        "Savanna.view.search.SearchOptionsTabs"

    ],
    alias: 'widget.modelsearch',
    layout: "fit",
    border: false,
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        me.dockedItems = me.buildDockedItems();
        me.callParent();


    },
    buildItems: function () {
        var me = this;

        return {
            layout:"fit",
            items: [
                {
                    layout: 'border',
                    items: [
                        {
                            region: 'north',
                            maxSize: 150,
                            margins: '0 0 0 0',
                            split: true,

                            items: [
                                {
                                    xtype: "mainsearchbar",
                                    itemId: "searchbar",
                                    flex: 1
                                },
                                {
                                    xtype: "searchviewtoggle",
                                    itemId: "searchtoggle",
                                    flex: 1
                                }
                            ]
                        },

                        {
                            xtype: 'tabpanel',
                            plain: true,
                            region: 'center',
                            margins: '0 0 0 0',
                            activeTab: 0,
                            flex: 3,
                            anchor: '100% 100%',
                            tabPosition: 'top',
                            border:false,
                            items: [
                                {
                                    title: 'Search Sources',
                                    flex: 1,
                                    layout: "fit",
                                    border:false,
                                    items: [
                                        {
                                            xtype:"searchsources",
                                            itemId:"searchsources"
                                        }
                                    ]
                                },
                                {
                                    title: 'Location',
                                    layout: 'fit',
                                    // Make sure IE can still calculate dimensions after a resize when the tab is not active.
                                    // With display mode, if the tab is rendered but hidden, IE will mess up the layout on show:
                                    hideMode: Ext.isIE ? 'offsets' : 'display',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            region: 'center',
                                            margins: '5 5 5 5',
                                            layout: "fit",
                                            items: [

                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    buildDockedItems: function () {
        return [
            {
                xtype: "mainsearchtoolbar",
                itemId: "searchtoolbar"
            }
        ]
    }
});