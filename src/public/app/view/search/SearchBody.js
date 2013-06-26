/**
 * Created with JetBrains WebStorm.
 * User: ksonger
 * Date: 6/17/13
 * Time: 11:55 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.view.search.SearchBody", {
    extend: "Ext.panel.Panel",
    alias: "widget.mainsearchbody",
    layout: "fit",
    border: false,
    requires: [

    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        _savanna.getController("search.SearchBody");
    },
    items: [
        /*
         This is the panel that contains Search Options,
         need to make another absolutely
         positioned panel for results, controlled by
         the docked toolbar
         */

        {
            xtype: "panel",
            layout: "border",
            itemId: "mainsearchoptions",
            items: [
                {
                    xtype: 'tabpanel',
                    plain: true,
                    region: 'center',
                    margins: '10 0 0 0',
                    activeTab: 0,
                    flex: 3,
                    anchor: '100% 100%',
                    tabPosition: 'top',
                    border: false,
                    items: [
                        {
                            title: "Search Sources",
                            html: "sources here"
                        },
                        {
                            title: "Location",
                            html: "leaflet here"
                        }
                    ]
                }
            ]

        }
    ],
    dockedItems: [
        {
            xtype: "toolbar",
            border: false,
            width: "100%",
            docked: "top",
            items: [
                {
                    xtype: "button",
                    text: "Search Options",
                    style: {
                        background: "transparent",
                        border: "none"
                    }
                },
                {
                    xtype: "button",
                    text: "Results",
                    style: {
                        background: "transparent",
                        border: "none"
                    }
                }
            ]
        }
    ]
})