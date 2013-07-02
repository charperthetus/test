/**
 * TODO: Document what events we may emit/consume...
 */
Ext.define('Savanna.controller.search.SearchBar', {
    extend: 'Ext.app.Controller',

    models: [
        // coming soon...
    ],

    stores: [
        // coming soon...
    ],

    views: [
        'search.SearchBar'
    ],

    handleKeyPress: function(evt)    {
        console.log(evt);
    }
});
