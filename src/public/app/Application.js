Ext.define('Savanna.Application', {
    extend: "Deft.mvc.Application",
    requires: [
        "Deft.mixin.Controllable",
        "Deft.mixin.Injectable",
        "Savanna.view.Viewport"
    ],

    init: function() {
        return Ext.create("Savanna.view.Viewport");
    },

//    launch: function() {
//        var viewportQueryResults = Ext.ComponentQuery.query('viewport');
//
//        if (viewportQueryResults && viewportQueryResults.length > 0) {
//            this.viewport = viewportQueryResults[0];
//        }
//        else {
//            // TODO: Fatal condition...how to handle?
//            Ext.Error.raise('no viewport found. cannot start application');
//        }
//    },

    // CUSTOM CONFIGURATION
    jsessionid: '', // keep track of the user's session id
    savannauser: '' // current savanna username
});
