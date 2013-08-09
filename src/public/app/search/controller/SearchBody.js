/* global Ext: false */
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

    init: function () {
        var me = this;
        /*
         These listeners toggle visibility between search options and search results
         */
        me.control({
            'search_searchbody > #mainsearchoptions #mainsearchtabpanel #searchMap #leafletMap': {
                'draw:created': function (layerType) {
                    /* global console: false */
                    console.log('layerType',layerType);
                }
            },
            'search_searchbody > #mainsearchoptions #mainsearchtabpanel #searchMap #searchLocationDockedItems #clearLocationSearch':{
                click: function(button) {
                    button.up('search_searchmap').queryById('leafletMap').fireEvent('locationSearch:clear');
                }
            }
        });
    }
});