/**
 * Created with JetBrains WebStorm.
 * User: ksonger
 * Date: 6/17/13
 * Time: 9:48 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define("Savanna.view.search.SearchToolbar", {
    extend: "Ext.toolbar.Toolbar",
    alias: "widget.mainsearchtoolbar",
    border:false,
    frame:false,
    docked:"top",
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();
        me.callParent(arguments);
        //instantiate the controller for this view
        _savanna.getController("search.SearchToolbar");
    },
    buildItems: function () {

        return [
            {
                text: 'Recent Searches',
                itemId: 'startbutton',
                menu: [
                    {text: 'Cats'},
                    {text: 'Dogs'},
                    {text: 'Terrorists'}
                    ,
                    {
                        xtype: "panel",
                        title:"test",
                        html:"test"
                    }
                ]
            },
            {
                xtype: 'tbfill'
            },
            ,
            {
                text: 'Add to MyStuff'
            },
            {
                text: 'Help'
            }
        ]
    }
});
