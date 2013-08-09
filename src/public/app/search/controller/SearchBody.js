/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.search.controller.SearchBody', {
    extend: 'Ext.app.Controller',

    requires: [
        'Savanna.search.controller.SearchDals'
    ],

    models: [
        // coming soon...
    ],
    stores: [
        // coming soon...
    ],

    views: [
        'Savanna.search.view.SearchBody'
    ],

    currentPanel: 'searchoptions',

    init: function (app) {
        var me = this;
        /*
         These listeners toggle visibility between search options and search results
         */
        me.control({
            'search_searchbody > #searchbodytoolbar #optionsbutton': {
                click: function (button, event) {
                    if (me.currentPanel != "searchoptions") {
                        button.up("search_searchbody").queryById("mainsearchoptions").show();
                        button.up("search_searchbody").queryById("mainresults").hide();
                        me.currentPanel = "searchoptions";
                    }
                }
            },
            'search_searchbody > #searchbodytoolbar #resultsbutton': {
                click: function (button, event) {
                    if (me.currentPanel != "results") {
                        button.up("search_searchbody").queryById("mainsearchoptions").hide();
                        button.up("search_searchbody").queryById("mainresults").show();
                        me.currentPanel = "results";
                    }
                }
            },
            'search_searchbody > #mainsearchoptions #mainsearchtabpanel #searchMap #leafletMap': {
                'draw:created': function (layerType){
                    console.log('layerType',layerType);
                }
            },
            'search_searchbody > #mainsearchoptions #mainsearchtabpanel #searchMap #searchLocationDockedItems #clearLocationSearch':{
                click: function(button, event) {
                    button.up('search_searchmap').queryById('leafletMap').fireEvent('locationSearch:clear');
                }
            }
        });
    }
});