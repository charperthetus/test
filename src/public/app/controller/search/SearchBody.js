/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.controller.search.SearchBody', {
    extend: 'Ext.app.Controller',

    models: [
        // coming soon...
    ],
    stores: [
        // coming soon...
    ],

    views: [
        'search.SearchBody'
    ],

    currentPanel: 'searchoptions',

    init: function (app) {
        var me = this;
        /*
        These listeners toggle visibility between search options and search results
         */
        me.control({
            'mainsearchbody > #searchbodytoolbar #optionsbutton': {
                click: function(button, event) {
                    if(me.currentPanel != "searchoptions")  {
                        button.up("mainsearchbody").queryById("mainsearchoptions").show();
                        button.up("mainsearchbody").queryById("mainresults").hide();
                        me.currentPanel = "searchoptions";
                    }
                }
            },
            'mainsearchbody > #searchbodytoolbar #resultsbutton': {
                click: function(button, event) {
                    if(me.currentPanel != "results")  {
                        button.up("mainsearchbody").queryById("mainsearchoptions").hide();
                        button.up("mainsearchbody").queryById("mainresults").show();
                        me.currentPanel = "results";
                    }
                }
            }
        });
    }
});
