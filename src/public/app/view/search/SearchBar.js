/**
 * Created with JetBrains WebStorm.
 * User: ksonger
 * Date: 6/14/13
 * Time: 1:39 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.view.search.SearchBar", {
    extend: "Ext.panel.Panel",
    alias: "widget.mainsearchbar",
    id:"mainsearchbar",
    requires: [
        "Ext.ux.layout.Center",
        "Ext.form.field.Text"
    ],
    bodyPadding: 5,
    border: false,
    frame:false,
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        me.callParent(arguments);
        //instantiate the controller for this view
        _savanna.getController("search.SearchBar");
    },
    buildItems: function () {
        return [
            {
                xtype: "panel",
                layout: "ux.center",
                border:false,
                items: [
                    {
                        xtype: "panel",
                        layout: "vbox",
                        border: false,
                        items: [
                            {
                                xtype: "panel",
                                layout: "hbox",
                                border: false,
                                items: [
                                    {
                                        xtype: "textfield",
                                        width: 300,
                                        fieldLabel: "",
                                        name: "search_terms",
                                        enableKeyEvents: true,
                                        emptyText:"Search"
                                    },
                                    {
                                        xtype: "button",
                                        text: "Search"
                                    },
                                    {
                                        xtype: "button",
                                        text: "Advanced",
                                        style: {
                                            background: "transparent",
                                            border: "none"
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: "panel",
                                border:false,
                                bodyPadding:0,
                                items: [
                                    {
                                        xtype: "button",
                                        text: "Start New Search",
                                        style: {
                                            background: "transparent",
                                            border: "none",
                                            margin:"0px",
                                            padding:"0px"
                                        }
                                    }
                                ]
                            }
                        ],
                        width: "30%",
                        minWidth: 420
                    }
                ]
            }


        ]
    }
});