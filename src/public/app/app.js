/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".

 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

/* global Ext: false */
// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
Ext.Loader.setConfig( {enabled: true, disableCaching: false} );
//<debug>
Ext.Loader.setPath({
    'Deft': 'packages/deft/src/js'
});
Ext.syncRequire(['Deft.mixin.Injectable','Deft.mixin.Controllable']);
//</debug>

//@require Deft.mixin.Injectable
//@require Deft.mixin.Controllable

Ext.setGlyphFontFamily('SickFont');
Ext.application({
    name: 'Savanna',

    views: [
        'Login',
        'Viewport'
    ],

    controllers: [
        'Main'
    ],

    requires: [
        'Savanna.patch.AbstractComponent',
        'Ext.layout.container.Border',
        //Main
        'Savanna.controller.Factory',
        'Savanna.Config',
        //Desktop
        'Savanna.desktop.controller.DesktopController',
        //Flexpaper
        'Savanna.flexpaper.controller.FlexpaperComponent',
        //Search
        'Savanna.search.controller.SearchComponent',
        //Crumbnet
        'Savanna.crumbnet.controller.CrumbnetController',
        //Map
        'Savanna.map.controller.MapController',
        //ItemView
        'Savanna.itemView.controller.ItemViewController',
        //Model Search
        'Savanna.modelSearch.controller.SearchComponent',
        //Upload
        'Savanna.upload.controller.UploadController',
        //Process Stores
        'Savanna.process.store.Processes',
        'Savanna.process.store.ProcessItemStore',
        'Savanna.process.store.ProcessActionStore'
    ],

    autoCreateViewport: false,

    launch: function() {
        Deft.Injector.configure({
            'application': {
                value: this
            },
            processStore: 'Savanna.process.store.Processes',
            processItemStore: 'Savanna.process.store.ProcessItemStore',
            processActionStore: 'Savanna.process.store.ProcessActionStore'
        });

        //in order to get Injection to work, I had to set autoCreateViewport to false and then manually create the viewport here
        Ext.create('Savanna.view.Viewport');

        var viewportQueryResults = Ext.ComponentQuery.query('viewport');

        if (viewportQueryResults && viewportQueryResults.length > 0) {
            this.viewport = viewportQueryResults[0];
        }
        else {
            // TODO: Fatal condition...how to handle?
            Ext.Error.raise('no viewport found. cannot start application');
        }
    },

    // CUSTOM CONFIGURATION
    jsessionid: '', // keep track of the user's session id
    savannauser: '' // current savanna username
});
