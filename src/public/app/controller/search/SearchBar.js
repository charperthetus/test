/**
 * Created with JetBrains WebStorm.
 * User: ksonger
 * Date: 6/14/13
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.controller.search.SearchBar", {
    extend: "Ext.app.Controller",
    models: [

    ],
    stores: [

    ],
    views: [
        "search.SearchBar"
    ],
    init: function () {
        var me = this;
    },
    handleKeyPress:function(evt)    {
        console.log(evt);
    }
});