/**
 * TODO: Document what events we may emit/consume...
 */
Ext.define('Savanna.search.controller.SearchBar', {
    extend: 'Ext.app.Controller',

    models: [
        // coming soon...
    ],

    stores: [
        // coming soon...
    ],

    views: [
        'Savanna.search.view.SearchBar'
    ],

    handleKeyPress: function(evt)    {
        console.log(evt);
    }
});
