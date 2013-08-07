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
    refs: [
        { ref: 'optionsButton', selector: 'search_searchbody > #searchbodytoolbar #optionsbutton' },
        {ref:"resultsButton", selector: "search_searchbody > #searchbodytoolbar #resultsbutton"}
    ],

    onButtonClick:function (button, event) {
        if (button.up("#searchbody").currentPanel != "searchoptions" && button == this.getOptionsButton()) {
            button.up("search_searchbody").queryById("mainsearchoptions").show();
            button.up("search_searchbody").queryById("searchresults").hide();
            button.up("#searchbody").currentPanel = "searchoptions";
        }
        if (button.up("#searchbody").currentPanel != "results" && button == this.getResultsButton()) {
            button.up("search_searchbody").queryById("mainsearchoptions").hide();
            button.up("search_searchbody").queryById("searchresults").show();
            button.up("#searchbody").currentPanel = "results";
        }
    },

    onButtonClick:function (button, event) {
        if (this.currentPanel != "searchoptions" && button == this.getOptionsButton()) {
            button.up("search_searchbody").queryById("mainsearchoptions").show();
            button.up("search_searchbody").queryById("mainresults").hide();
            this.currentPanel = "searchoptions";
        }
        if (this.currentPanel != "results" && button == this.getResultsButton()) {
            button.up("search_searchbody").queryById("mainsearchoptions").hide();
            button.up("search_searchbody").queryById("mainresults").show();
            this.currentPanel = "results";
        }
    },

    init: function (app) {
        this.control({
            'search_searchbody > #searchbodytoolbar #optionsbutton': {
                click: this.onButtonClick
            },
            'search_searchbody > #searchbodytoolbar #resultsbutton': {
                click: this.onButtonClick
            }
        });
    }
});